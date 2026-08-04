import {
  Component,
  forwardRef,
  input,
  output,
  signal,
  computed,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  effect,
  untracked,
  OnDestroy,
  inject,
  TemplateRef,
  contentChild,
  NgZone,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { FieldComponent } from '../field/field.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent, IconName } from '../../icon';
import { ActionButtonComponent } from '../action-button.component';
import { NodeComponent, Node } from '../../node';
import { SearchComponent } from '../search';
import { UiI18nService } from '../../../i18n';
import {
  openConnectedOverlay,
  OverlayHandle,
  DEFAULT_CONNECTED_POSITIONS,
  DEFAULT_VIEWPORT_MARGIN,
} from '../../overlay/open-connected-overlay';
import { EmptyStateComponent } from '../../empty-state/empty-state.component';

export interface SelectItem {
  value: string | number;
  label: string;
  icon?: IconName;
  disabled?: boolean;
}

export type SelectMode = 'single' | 'multi';

@Component({
  selector: 'ui-select',
  imports: [
    CommonModule,
    A11yModule,
    OverlayModule,
    FieldComponent,
    CheckboxComponent,
    FormsModule,
    IconComponent,
    ActionButtonComponent,
    NodeComponent,
    SearchComponent,
    EmptyStateComponent,
  ],
  templateUrl: './select.component.html',
  host: {
    '[style.display]': '"block"',
    '[class.select--focus-within]': 'isOpen() && isNavigating()',
  },
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent extends FieldComponent implements OnDestroy {
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private scrollDispatcher = inject(ScrollDispatcher);
  private ngZone = inject(NgZone);
  private readonly i18n = inject(UiI18nService);

  private readonly searchPlaceholderText = this.ts('searchPlaceholder', 'Search...');
  private readonly defaultPlaceholderText = this.ts('placeholder', 'Select...');
  private readonly clearSelectionAriaLabel = this.ts('clearSelectionAriaLabel', 'Clear selection');
  private readonly toggleMenuAriaLabel = this.ts('toggleMenuAriaLabel', 'Toggle menu');
  private readonly panelEmptyItemsText = this.ts('emptyItems', 'No items to display');
  private readonly panelNoMatchingItemsText = this.ts('noMatchingItems', 'No matching options');

  private overlayHandle: OverlayHandle | null = null;
  private isDestroyed = false;
  private closeDropdownScheduled?: ReturnType<typeof setTimeout>;
  private isWritingValue = false;

  items = input<SelectItem[]>([]);
  mode = input<SelectMode>('single');
  searchable = input<boolean>(false);
  clearable = input<boolean>(false);
  maxHeight = input<string>('300px');

  selectionChange = output<any>();
  opened = output<void>();
  closed = output<void>();

  isOpen = signal<boolean>(false);
  searchQuery = signal<string>('');
  selectedValues = signal<Set<string | number>>(new Set());
  activeDescendant = signal<string | null>(null);
  isNavigating = signal<boolean>(false);

  itemTemplate = contentChild<TemplateRef<any>>('itemTemplate');
  @ViewChild('triggerElement', { read: ElementRef }) triggerElement!: ElementRef;
  @ViewChild('panelTemplate') panelTemplate!: TemplateRef<any>;

  availableItems = computed(() => {
    const items = this.items();
    const query = this.searchQuery().toLowerCase().trim();

    if (!query) {
      return items;
    }

    return items.filter(item => item.label.toLowerCase().includes(query));
  });

  selectedItems = computed(() => {
    const selectedValues = this.selectedValues();
    const items = this.items();

    return Array.from(selectedValues)
      .map(value => items.find(item => item.value === value))
      .filter((item): item is SelectItem => item !== undefined);
  });

  displayText = computed(() => {
    const selected = this.selectedItems();
    if (selected.length === 0) {
      return this.placeholder() || this.defaultPlaceholderText();
    }
    if (this.mode() === 'single') {
      return selected[0]?.label || '';
    }
    return selected.map(item => item.label).join(', ');
  });

  panelEmptyDescription = computed(() =>
    this.searchable() && this.searchQuery().trim().length > 0
      ? this.panelNoMatchingItemsText()
      : this.panelEmptyItemsText(),
  );

  panelEmptyIcon = computed<IconName | undefined>(() =>
    this.searchable() && this.searchQuery().trim().length > 0 ? 'search' : undefined,
  );

  selectableItems = computed(() => this.availableItems().filter(item => !item.disabled));

  activeItemIndex = computed(() => {
    const activeId = this.activeDescendant();
    if (!activeId) {
      return -1;
    }
    const selectable = this.selectableItems();
    return selectable.findIndex(item => this.getItemId(item) === activeId);
  });

  constructor() {
    super();

    let lastEmittedValue: any = undefined;

    effect(() => {
      if (this.isWritingValue) {
        return;
      }

      const values = Array.from(this.selectedValues());
      const newValue: any = this.mode() === 'single' ? (values[0] ?? '') : values;

      let hasChanged = false;

      if (this.mode() === 'multi') {
        if (!Array.isArray(lastEmittedValue) || !Array.isArray(newValue)) {
          hasChanged = true;
        } else if (lastEmittedValue.length !== newValue.length) {
          hasChanged = true;
        } else {
          hasChanged = !lastEmittedValue.every((val: any, idx: number) => val === newValue[idx]);
        }
      } else {
        hasChanged = lastEmittedValue !== newValue;
      }

      if (hasChanged) {
        lastEmittedValue = this.mode() === 'multi' ? [...(newValue as any[])] : newValue;

        untracked(() => {
          this.value = newValue;
          this.onChange(newValue);
        });
      }
    });

    effect(() => {
      const activeId = this.activeDescendant();
      const isNavigating = this.isNavigating();

      if (activeId && isNavigating) {
        untracked(() => {
          setTimeout(() => this.scrollToActiveItem(), 0);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    if (this.closeDropdownScheduled !== undefined) {
      clearTimeout(this.closeDropdownScheduled);
      this.closeDropdownScheduled = undefined;
    }
    this.overlayHandle?.destroy();
  }

  private scheduleCloseDropdown(shouldFocusTrigger: boolean): void {
    if (this.closeDropdownScheduled !== undefined) {
      clearTimeout(this.closeDropdownScheduled);
    }
    this.closeDropdownScheduled = window.setTimeout(() => {
      this.closeDropdownScheduled = undefined;
      this.closeDropdown(shouldFocusTrigger);
    }, 0);
  }

  toggleDropdown(): void {
    if (this.disabled()) {
      return;
    }
    if (this.isOpen()) {
      this.closeDropdown(false);
    } else {
      this.openDropdown(false);
    }
  }

  openDropdown(setActiveDescendant: boolean = false): void {
    if (this.isOpen()) {
      return;
    }

    this.onTouched();

    if (!this.triggerElement?.nativeElement) {
      return;
    }

    const triggerWidth = this.triggerElement.nativeElement.offsetWidth;

    this.overlayHandle = openConnectedOverlay({
      overlay: this.overlay,
      scrollDispatcher: this.scrollDispatcher,
      ngZone: this.ngZone,
      trigger: this.triggerElement,
      template: this.panelTemplate,
      viewContainerRef: this.viewContainerRef,
      config: {
        positions: DEFAULT_CONNECTED_POSITIONS,
        viewportMargin: DEFAULT_VIEWPORT_MARGIN,
        minWidth: triggerWidth,
        maxWidth: 400,
      },
      onClose: focusTrigger => {
        if (focusTrigger) {
          this.closeDropdown(true);
        } else {
          this.scheduleCloseDropdown(false);
        }
      },
    });

    this.isOpen.set(true);
    this.isNavigating.set(setActiveDescendant);

    if (!setActiveDescendant) {
      this.activeDescendant.set(null);
    }

    this.opened.emit();
  }

  closeDropdown(shouldFocusTrigger: boolean = false): void {
    if (this.isDestroyed) {
      return;
    }
    this.overlayHandle?.destroy();
    this.overlayHandle = null;
    this.isOpen.set(false);
    this.searchQuery.set('');
    this.activeDescendant.set(null);
    this.isNavigating.set(false);

    if (shouldFocusTrigger) {
      try {
        if (
          this.triggerElement?.nativeElement &&
          document.contains(this.triggerElement.nativeElement)
        ) {
          setTimeout(() => this.triggerElement.nativeElement.focus({ preventScroll: true }), 0);
        }
      } catch {
        // Element may have been removed from DOM
      }
    }

    this.closed.emit();
  }

  selectItem(item: SelectItem, event?: Event): void {
    if (item.disabled) {
      return;
    }

    if (event) {
      event.stopPropagation();
    }

    this.isNavigating.set(false);

    const newSelected = new Set(this.selectedValues());

    if (this.mode() === 'single') {
      newSelected.clear();
      newSelected.add(item.value);
      this.selectedValues.set(newSelected);
      this.selectionChange.emit(item.value);
      this.scheduleCloseDropdown(false);
    } else {
      if (newSelected.has(item.value)) {
        newSelected.delete(item.value);
      } else {
        newSelected.add(item.value);
      }
      this.selectedValues.set(newSelected);
      this.selectionChange.emit(Array.from(newSelected));
    }
  }

  isItemSelected(item: SelectItem): boolean {
    return this.selectedValues().has(item.value);
  }

  clearSelection(): void {
    this.selectedValues.set(new Set());
    this.value = this.mode() === 'single' ? '' : [];
    this.onChange(this.value);
    this.selectionChange.emit(this.mode() === 'single' ? '' : []);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  override writeValue(value: any): void {
    this.isWritingValue = true;

    if (value === null || value === undefined) {
      this.selectedValues.set(new Set());
      super.writeValue(this.mode() === 'single' ? '' : []);
      this.isWritingValue = false;
      return;
    }

    let normalizedValues: (string | number)[];
    if (this.mode() === 'single') {
      normalizedValues = value === '' ? [] : [value];
    } else {
      normalizedValues = Array.isArray(value) ? value : [value];
    }

    this.selectedValues.set(new Set(normalizedValues));
    super.writeValue(value);
    this.isWritingValue = false;
  }

  itemToNode(item: SelectItem): Node<SelectItem> {
    return {
      id: item.value,
      label: item.label,
      icon: item.icon,
      disabled: item.disabled || false,
      selected: false,
      data: item,
      onClick: () => this.selectItem(item),
    };
  }

  shouldShowCheckbox(item: SelectItem): boolean {
    return this.mode() === 'multi';
  }

  getItemId(item: SelectItem): string {
    return `select-option-${this.id() || 'default'}-${item.value}`;
  }

  getListboxId(): string {
    return `select-listbox-${this.id() || 'default'}`;
  }

  isItemActive(item: SelectItem): boolean {
    return this.isNavigating() && this.activeDescendant() === this.getItemId(item);
  }

  onItemMouseEnter(): void {
    this.isNavigating.set(false);
  }

  private scrollToActiveItem(): void {
    const overlayRef = this.overlayHandle?.overlayRef;
    if (!this.activeDescendant() || !overlayRef?.overlayElement) {
      return;
    }

    const activeElement = overlayRef.overlayElement.querySelector(`#${this.activeDescendant()}`);
    if (activeElement && typeof activeElement.scrollIntoView === 'function') {
      activeElement.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }

  private getInitialActiveItem() {
    const selectable = this.selectableItems();
    if (selectable.length === 0) {
      return null;
    }

    const selected = Array.from(this.selectedValues());
    if (selected.length > 0) {
      const selectedItem = selectable.find(item => selected.includes(item.value));
      if (selectedItem) {
        return selectedItem;
      }
    }

    return selectable[0];
  }

  private moveActive(delta: number, wrap = true): void {
    const selectable = this.selectableItems();
    if (selectable.length === 0) {
      return;
    }

    const currentIndex = this.activeItemIndex();
    let nextIndex: number;

    if (currentIndex === -1) {
      const initialItem = this.getInitialActiveItem();
      const initialIndex = initialItem ? selectable.indexOf(initialItem) : 0;
      nextIndex = wrap
        ? (initialIndex + delta + selectable.length) % selectable.length
        : Math.max(0, Math.min(selectable.length - 1, initialIndex + delta));
    } else if (wrap) {
      nextIndex = (currentIndex + delta + selectable.length) % selectable.length;
    } else {
      nextIndex = Math.max(0, Math.min(selectable.length - 1, currentIndex + delta));
    }

    this.activeDescendant.set(this.getItemId(selectable[nextIndex]));
    this.isNavigating.set(true);
  }

  private setActiveToIndex(index: number): void {
    const selectable = this.selectableItems();
    if (selectable.length === 0) {
      return;
    }

    const clampedIndex = Math.max(0, Math.min(selectable.length - 1, index));
    this.activeDescendant.set(this.getItemId(selectable[clampedIndex]));
    this.isNavigating.set(true);
  }

  override onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    const selectable = this.selectableItems();
    if (selectable.length === 0) {
      return;
    }

    const currentIndex = this.activeItemIndex();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        event.stopPropagation();
        if (!this.isOpen()) {
          this.openDropdown(true);
          const initialItem = this.getInitialActiveItem();
          if (initialItem) {
            this.activeDescendant.set(this.getItemId(initialItem));
            this.isNavigating.set(true);
          }
        } else {
          this.moveActive(1);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        event.stopPropagation();
        if (!this.isOpen()) {
          this.openDropdown(true);
          const initialItem = this.getInitialActiveItem();
          if (initialItem) {
            this.activeDescendant.set(this.getItemId(initialItem));
            this.isNavigating.set(true);
          }
        } else {
          this.moveActive(-1);
        }
        break;

      case 'Home':
        event.preventDefault();
        event.stopPropagation();
        if (!this.isOpen()) {
          this.openDropdown(true);
        }
        this.setActiveToIndex(0);
        break;

      case 'End':
        event.preventDefault();
        event.stopPropagation();
        if (!this.isOpen()) {
          this.openDropdown(true);
        }
        this.setActiveToIndex(selectable.length - 1);
        break;

      case 'PageUp':
        if (this.isOpen()) {
          event.preventDefault();
          event.stopPropagation();
          this.setActiveToIndex(currentIndex === -1 ? 0 : Math.max(0, currentIndex - 10));
        }
        break;

      case 'PageDown':
        if (this.isOpen()) {
          event.preventDefault();
          event.stopPropagation();
          this.setActiveToIndex(
            currentIndex === -1
              ? selectable.length - 1
              : Math.min(selectable.length - 1, currentIndex + 10),
          );
        }
        break;

      case 'Enter':
      case ' ':
        if (this.isOpen() && currentIndex >= 0) {
          event.preventDefault();
          event.stopPropagation();
          const activeItem = selectable[currentIndex];
          if (activeItem) {
            this.selectItem(activeItem, event);
          }
        } else if (!this.isOpen()) {
          event.preventDefault();
          event.stopPropagation();
          this.openDropdown(true);
          const initialItem = this.getInitialActiveItem();
          if (initialItem) {
            this.activeDescendant.set(this.getItemId(initialItem));
            this.isNavigating.set(true);
          }
        }
        break;

      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          event.stopPropagation();
          this.closeDropdown(true);
        }
        break;

      case 'Tab':
        if (this.isOpen()) {
          this.closeDropdown(false);
        }
        break;

      case 'Delete':
      case 'Backspace':
        if (this.mode() === 'single' && this.selectedValues().size > 0) {
          event.preventDefault();
          event.stopPropagation();
          this.clearSelection();
        }
        break;
    }
  }

  getSearchPlaceholderText(): string {
    return this.searchPlaceholderText();
  }

  getClearSelectionAriaLabel(): string {
    return this.clearSelectionAriaLabel();
  }

  getToggleMenuAriaLabel(): string {
    return this.toggleMenuAriaLabel();
  }

  private ts(
    key: string,
    fallback: string | (() => string),
    params?: Record<string, unknown> | (() => Record<string, unknown> | undefined),
  ) {
    return this.i18n.tSignal(`field.select.${key}`, fallback, params);
  }
}
