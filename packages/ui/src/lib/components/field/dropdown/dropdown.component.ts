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
  viewChild,
  effect,
  untracked,
  OnDestroy,
  inject,
  DestroyRef,
  TemplateRef,
  contentChild,
  NgZone,
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
import { ButtonComponent } from '../../button';
import { SearchComponent } from '../search';
import { TagComponent } from '../../tag';
import {
  ScrollContainerComponent,
  ScrollContainerDataSource,
} from '../../scroll-container/scroll-container.component';
import { Observable, Subject, debounceTime, distinctUntilChanged, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QueryParams, QueryResult } from '../../../api';
import { UiI18nService } from '../../../i18n';
import {
  openConnectedOverlay,
  OverlayHandle,
  DEFAULT_CONNECTED_POSITIONS,
  DEFAULT_VIEWPORT_MARGIN,
} from '../../overlay/open-connected-overlay';
import { EmptyStateComponent } from '../../empty-state/empty-state.component';

export { DropdownHelper } from './dropdown.helper';

export interface DropdownItem {
  value: string | number;
  label: string;
  icon?: IconName;
  disabled?: boolean;
  selected?: boolean;
  data?: any;
}

export type DropdownMode = 'single' | 'multi';

@Component({
  selector: 'ui-dropdown',
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
    ButtonComponent,
    SearchComponent,
    TagComponent,
    ScrollContainerComponent,
    EmptyStateComponent,
  ],
  templateUrl: './dropdown.component.html',
  styles: [
    `
      .dropdown-trigger-wrapper {
        display: inline-block;
      }
    `,
  ],
  host: {
    '[style.display]': '"block"',
    '[class.dropdown--focus-within]': 'isOpen() && isNavigating()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent extends FieldComponent implements OnDestroy {
  //Service
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private destroyRef = inject(DestroyRef);
  private scrollDispatcher = inject(ScrollDispatcher);
  private ngZone = inject(NgZone);
  private readonly i18n = inject(UiI18nService);

  //Translations
  private readonly compactAriaLabel = this.ts('compactAriaLabel', 'Filter');
  private readonly searchPlaceholderText = this.ts('searchPlaceholder', 'Search...');
  private readonly defaultPlaceholderText = this.ts('placeholder', 'Select...');
  private readonly clearSelectionAriaLabel = this.ts('clearSelectionAriaLabel', 'Clear selection');
  private readonly toggleMenuAriaLabel = this.ts('toggleMenuAriaLabel', 'Toggle menu');
  private readonly panelEmptyItemsText = this.ts('emptyItems', 'No items to display');
  private readonly panelNoMatchingItemsText = this.ts('noMatchingItems', 'No matching options');

  private overlayHandle: OverlayHandle | null = null;

  private isDestroyed = false;
  private closeDropdownScheduled?: ReturnType<typeof setTimeout>;

  private typeaheadTimeout?: number;
  private typeaheadString = '';
  private searchSubject = new Subject<string>();
  private isWritingValue = false; // Flag to prevent circular updates

  //Inputs
  items = input<DropdownItem[]>([]);
  dataSource = input<
    ((params: QueryParams<any>) => Observable<QueryResult<DropdownItem>>) | undefined
  >(undefined);
  mode = input<DropdownMode>('single');
  searchable = input<boolean>(false);
  clearable = input<boolean>(false);
  maxHeight = input<string>('300px');
  compact = input<boolean>(false);
  compactIcon = input<IconName>('filter');
  pageSize = input<number>(20);
  searchDebounceMs = input<number>(300);

  // Panel width control
  minPanelWidth = input<number | undefined>(undefined);
  maxPanelWidth = input<number>(400);
  panelWidth = input<number | undefined>(undefined);

  //Outputs
  selectionChange = output<any>();
  opened = output<void>();
  closed = output<void>();

  //State
  isOpen = signal<boolean>(false);
  searchQuery = signal<string>('');
  selectedValues = signal<Set<string | number>>(new Set());
  activeDescendant = signal<string | null>(null);
  isNavigating = signal<boolean>(false);
  loadedItems = signal<DropdownItem[]>([]);

  //Templates
  itemTemplate = contentChild<TemplateRef<any>>('itemTemplate');
  dropdownPanelEmptyTpl = viewChild<TemplateRef<unknown>>('dropdownPanelEmpty');
  @ViewChild('scrollItemTemplate') scrollItemTemplate?: TemplateRef<any>;
  @ViewChild('scrollContainer') scrollContainer?: ScrollContainerComponent<DropdownItem>;
  @ViewChild('triggerElement', { read: ElementRef }) triggerElement!: ElementRef;
  @ViewChild('panelTemplate') panelTemplate!: TemplateRef<any>;

  //Computed
  availableItems = computed(() => {
    // When using dataSource, use loaded items; otherwise use items input
    const items = this.dataSource() ? this.loadedItems() : this.items();
    const query = this.searchQuery().toLowerCase();

    if (!query || this.dataSource()) {
      // No filtering if using dataSource (filtering happens server-side)
      return items;
    }

    // Client-side filtering for static items
    return items.filter(item => item.label.toLowerCase().includes(query));
  });

  // === COMPUTED - Selected items ===
  selectedItems = computed(() => {
    const selectedValues = this.selectedValues();
    // When using dataSource, use loaded items; otherwise use items input
    const items = this.dataSource() ? this.loadedItems() : this.items();

    return Array.from(selectedValues)
      .map(value => items.find(item => item.value === value))
      .filter((item): item is DropdownItem => item !== undefined);
  });

  // === COMPUTED - Display ===
  displayText = computed(() => {
    const selected = this.selectedItems();
    if (selected.length === 0) {
      return this.placeholder() || this.defaultPlaceholderText();
    }
    if (this.mode() === 'single') {
      return selected[0]?.label || '';
    }
    return '';
  });

  selectedItemsForTags = computed(() => {
    return this.mode() === 'multi' ? this.selectedItems() : [];
  });

  computedCompactIcon = computed(() => {
    const selected = this.selectedItems();
    if (selected.length > 0 && selected[0]?.icon) {
      return selected[0].icon;
    }
    return this.compactIcon();
  });

  panelEmptyDescription = computed(() =>
    this.searchable() && this.searchQuery().trim().length > 0
      ? this.panelNoMatchingItemsText()
      : this.panelEmptyItemsText(),
  );

  panelEmptyIcon = computed<IconName | undefined>(() =>
    this.searchable() && this.searchQuery().trim().length > 0 ? 'search' : undefined,
  );

  // === COMPUTED - Scroll container data source ===
  scrollContainerDataSource = computed<ScrollContainerDataSource<DropdownItem>>(() => {
    const dataSourceFn = this.dataSource();
    const currentSearchQuery = this.searchQuery();

    if (dataSourceFn) {
      // Dynamic mode: use provided dataSource
      return (page: number, pageSize: number) => {
        const params: QueryParams<DropdownItem> = {
          page,
          pageSize,
          searchTerm: currentSearchQuery || undefined,
        };
        return dataSourceFn(params);
      };
    }

    // Static mode: paginate availableItems
    return (page: number, pageSize: number) => {
      const allItems = this.availableItems();
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const pageItems = allItems.slice(startIndex, endIndex);

      return of({
        items: pageItems,
        hasNextPage: endIndex < allItems.length,
        hasPreviousPage: page > 1,
        totalCount: allItems.length,
      });
    };
  });

  selectableItems = computed(() => {
    return this.availableItems().filter(item => !item.disabled);
  });

  activeItemIndex = computed(() => {
    const activeId = this.activeDescendant();
    if (!activeId) return -1;
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

      // Check if value actually changed compared to last emitted value
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

        // Use untracked to prevent triggering this effect again
        untracked(() => {
          this.value = newValue;
          this.onChange(newValue);
        });
      }
    });

    // Effect 3: Refresh scroll container when search changes
    effect(() => {
      this.searchQuery();
      const isOpen = this.isOpen();

      // Use untracked to prevent triggering change detection loop
      untracked(() => {
        if (isOpen && this.scrollContainer) {
          this.scrollContainer.refresh();
        }
      });
    });

    // Effect 4: Scroll to active item when activeDescendant changes
    effect(() => {
      const activeId = this.activeDescendant();
      const isNavigating = this.isNavigating();

      if (activeId && isNavigating) {
        // Use setTimeout to ensure DOM is updated
        untracked(() => {
          setTimeout(() => this.scrollToActiveItem(), 0);
        });
      }
    });

    // Setup search debounce
    this.searchSubject
      .pipe(
        debounceTime(this.searchDebounceMs()),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(search => {
        this.searchQuery.set(search);
        // Note: refresh is called by Effect 3 when searchQuery changes
        // No need to call it here to avoid double refresh
      });
  }

  override ngOnDestroy(): void {
    this.isDestroyed = true;
    if (this.closeDropdownScheduled !== undefined) {
      clearTimeout(this.closeDropdownScheduled);
      this.closeDropdownScheduled = undefined;
    }
    if (this.typeaheadTimeout) {
      clearTimeout(this.typeaheadTimeout);
    }
    this.searchSubject.complete();
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
    if (this.isOpen()) return;

    // Mark as touched when user opens the dropdown (first interaction)
    this.onTouched();

    // Ensure triggerElement is available (should be set by @ViewChild)
    if (!this.triggerElement?.nativeElement) {
      return;
    }

    const triggerWidth = this.triggerElement.nativeElement.offsetWidth;
    let minWidth: number;
    let maxWidth: number;
    let width: number | undefined;

    if (this.panelWidth()) {
      width = this.panelWidth();
      minWidth = width!;
      maxWidth = width!;
    } else {
      if (this.minPanelWidth()) {
        minWidth = this.minPanelWidth()!;
      } else if (this.compact()) {
        minWidth = Math.max(200, triggerWidth);
      } else {
        minWidth = triggerWidth;
      }
      maxWidth = this.maxPanelWidth();
    }

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
        minWidth,
        maxWidth,
        width,
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
    this.typeaheadString = '';

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

  selectItem(item: DropdownItem, event?: Event, closeOnSelect: boolean = true): void {
    if (item.disabled) {
      return;
    }

    if (event) {
      event.stopPropagation();
    }

    if (closeOnSelect) {
      this.isNavigating.set(false);
    }

    const newSelected = new Set(this.selectedValues());

    if (this.mode() === 'single') {
      // Single mode: replace selection
      newSelected.clear();
      newSelected.add(item.value);
      this.selectedValues.set(newSelected);
      this.selectionChange.emit(item.value);

      if (closeOnSelect) {
        this.scheduleCloseDropdown(false);
      }
    } else {
      // Multi mode: toggle selection
      if (newSelected.has(item.value)) {
        newSelected.delete(item.value);
      } else {
        newSelected.add(item.value);
      }
      this.selectedValues.set(newSelected);
      this.selectionChange.emit(Array.from(newSelected));
    }
  }

  isItemSelected(item: DropdownItem): boolean {
    return this.selectedValues().has(item.value);
  }

  clearSelection(): void {
    this.selectedValues.set(new Set());
    this.value = this.mode() === 'single' ? '' : [];
    this.onChange(this.value);
    this.selectionChange.emit([]);
  }

  removeItem(item: DropdownItem): void {
    if (this.disabled() || this.readonly() || this.mode() !== 'multi') {
      return;
    }

    const newSelected = new Set(this.selectedValues());
    newSelected.delete(item.value);
    this.selectedValues.set(newSelected);
    this.value = Array.from(newSelected);
    this.onChange(this.value);
    this.selectionChange.emit(Array.from(newSelected));
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (this.dataSource()) {
      this.searchSubject.next(value);
    } else {
      this.searchQuery.set(value);
      this.scrollContainer?.refresh();
    }
  }

  onScrollContainerLoadMore(event: { page: number; items: DropdownItem[] }): void {
    if (this.dataSource()) {
      const currentItems = this.loadedItems();
      const existingIds = new Set(currentItems.map(item => item.value));
      const newItems = event.items.filter(item => !existingIds.has(item.value));

      if (newItems.length > 0 || event.page === 1) {
        const mergedItems = event.page === 1 ? event.items : [...currentItems, ...newItems];
        this.loadedItems.set(mergedItems);
      }
    }
  }

  override writeValue(value: any): void {
    this.isWritingValue = true;

    if (value === null || value === undefined) {
      this.selectedValues.set(new Set());
      super.writeValue(this.mode() === 'single' ? '' : []);
      this.isWritingValue = false;
      return;
    }

    // Normalize value based on mode
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

  itemToNode(item: DropdownItem): Node<DropdownItem> {
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

  shouldShowCheckbox(item: DropdownItem): boolean {
    return this.mode() === 'multi';
  }

  shouldShowCheckmark(item: DropdownItem): boolean {
    return this.mode() === 'single' && this.isItemSelected(item);
  }

  getItemId(item: DropdownItem): string {
    return `dropdown-option-${this.id() || 'default'}-${item.value}`;
  }

  getListboxId(): string {
    return `dropdown-listbox-${this.id() || 'default'}`;
  }

  isItemActive(item: DropdownItem): boolean {
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
          const selected = Array.from(this.selectedValues());
          const selectedItem =
            selected.length > 0 ? selectable.find(item => selected.includes(item.value)) : null;
          const targetItem = selectedItem || selectable[0];
          this.activeDescendant.set(this.getItemId(targetItem));
          if (this.mode() === 'single' && targetItem) {
            this.selectItem(targetItem, event, false);
          }
          this.isNavigating.set(true);
        } else {
          if (currentIndex === -1) {
            this.activeDescendant.set(this.getItemId(selectable[0]));
            if (this.mode() === 'single' && selectable[0]) {
              this.selectItem(selectable[0], event, false);
            }
          } else {
            const nextIndex = currentIndex < selectable.length - 1 ? currentIndex + 1 : 0;
            const nextItem = selectable[nextIndex];
            this.activeDescendant.set(this.getItemId(nextItem));
            if (this.mode() === 'single' && nextItem) {
              this.selectItem(nextItem, event, false);
            }
          }
          this.isNavigating.set(true);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        event.stopPropagation();
        if (!this.isOpen()) {
          this.openDropdown(true);
          const selected = Array.from(this.selectedValues());
          const selectedItem =
            selected.length > 0 ? selectable.find(item => selected.includes(item.value)) : null;
          const targetItem = selectedItem || selectable[selectable.length - 1];
          this.activeDescendant.set(this.getItemId(targetItem));
          if (this.mode() === 'single' && targetItem) {
            this.selectItem(targetItem, event, false);
          }
          this.isNavigating.set(true);
        } else {
          if (currentIndex === -1) {
            const lastItem = selectable[selectable.length - 1];
            this.activeDescendant.set(this.getItemId(lastItem));
            if (this.mode() === 'single' && lastItem) {
              this.selectItem(lastItem, event, false);
            }
          } else {
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : selectable.length - 1;
            const prevItem = selectable[prevIndex];
            this.activeDescendant.set(this.getItemId(prevItem));
            if (this.mode() === 'single' && prevItem) {
              this.selectItem(prevItem, event, false);
            }
          }
          this.isNavigating.set(true);
        }
        break;

      case 'Home':
        event.preventDefault();
        event.stopPropagation();
        if (!this.isOpen()) {
          this.openDropdown(true);
        }
        const firstItem = selectable[0];
        this.activeDescendant.set(this.getItemId(firstItem));
        if (this.mode() === 'single' && firstItem) {
          this.selectItem(firstItem, event, false);
        }
        this.isNavigating.set(true);
        break;

      case 'End':
        event.preventDefault();
        event.stopPropagation();
        if (!this.isOpen()) {
          this.openDropdown(true);
        }
        const lastItem = selectable[selectable.length - 1];
        this.activeDescendant.set(this.getItemId(lastItem));
        if (this.mode() === 'single' && lastItem) {
          this.selectItem(lastItem, event, false);
        }
        this.isNavigating.set(true);
        break;

      case 'PageUp':
        if (this.isOpen()) {
          event.preventDefault();
          event.stopPropagation();
          const pageSize = 10;
          const newIndex = Math.max(0, currentIndex - pageSize);
          const pageUpItem = selectable[newIndex];
          this.activeDescendant.set(this.getItemId(pageUpItem));
          if (this.mode() === 'single' && pageUpItem) {
            this.selectItem(pageUpItem, event, false);
          }
          this.isNavigating.set(true);
        }
        break;

      case 'PageDown':
        if (this.isOpen()) {
          event.preventDefault();
          event.stopPropagation();
          const pageSize = 10;
          const newIndex = Math.min(selectable.length - 1, currentIndex + pageSize);
          const pageDownItem = selectable[newIndex];
          this.activeDescendant.set(this.getItemId(pageDownItem));
          if (this.mode() === 'single' && pageDownItem) {
            this.selectItem(pageDownItem, event, false);
          }
          this.isNavigating.set(true);
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

      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          if (!this.isOpen()) {
            this.openDropdown(true);
          }
          this.handleTypeahead(event.key);
          this.isNavigating.set(true);
        }
        break;
    }
  }

  private handleTypeahead(key: string): void {
    if (this.typeaheadTimeout) {
      clearTimeout(this.typeaheadTimeout);
    }

    this.typeaheadString += key.toLowerCase();

    const selectable = this.selectableItems();
    const currentIndex = this.activeItemIndex();
    const startIndex = currentIndex >= 0 ? currentIndex + 1 : 0;

    // Search from current position, wrapping around
    let foundIndex = -1;
    for (let i = 0; i < selectable.length; i++) {
      const index = (startIndex + i) % selectable.length;
      const item = selectable[index];
      if (item.label.toLowerCase().startsWith(this.typeaheadString)) {
        foundIndex = index;
        break;
      }
    }

    if (foundIndex >= 0) {
      const foundItem = selectable[foundIndex];
      this.activeDescendant.set(this.getItemId(foundItem));
      if (this.mode() === 'single' && foundItem) {
        this.selectItem(foundItem, undefined, false);
      }
    }

    this.typeaheadTimeout = window.setTimeout(() => {
      this.typeaheadString = '';
    }, 1000);
  }

  getCompactTriggerAriaLabel(): string {
    return this.ariaLabel().trim() || this.label().trim() || this.compactAriaLabel();
  }

  getSearchPlaceholderText(): string {
    return this.searchPlaceholderText();
  }

  getDefaultPlaceholderText(): string {
    return this.defaultPlaceholderText();
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
    return this.i18n.tSignal(`field.dropdown.${key}`, fallback, params);
  }
}
