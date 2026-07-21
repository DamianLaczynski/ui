import {
  Component,
  input,
  output,
  signal,
  computed,
  QueryList,
  ViewChildren,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  effect,
  AfterViewInit,
  forwardRef,
} from '@angular/core';

import { A11yModule } from '@angular/cdk/a11y';
import { MenuItem, MenuSection } from '../models/menu-item.model';
import { MenuComponent, MenuTriggerVariant } from '../menu.component';
import { DividerComponent } from '../../divider/divider.component';
import { NavSectionHeaderComponent } from '../../nav/nav-section-header.component';
import { Variant, Size, Appearance } from '../../utils';

@Component({
  selector: 'ui-menu-list',
  templateUrl: './menu-list.component.html',
  imports: [
    A11yModule,
    forwardRef(() => MenuComponent),
    DividerComponent,
    NavSectionHeaderComponent,
  ],
  styles: [
    `
      :host {
        ::ng-deep ui-menu {
          .button {
            font-weight: 400;
          }

          .button:not(.menu-trigger-split__dropdown) {
            justify-content: flex-start;
            width: 100%;
          }

          .button:not(.menu-trigger-split__dropdown):not(:has(.menu-trigger__shortcut))
            > *:last-child {
            margin-left: auto;
          }

          .menu-trigger-host--split {
            justify-content: flex-start;
            width: 100%;
          }

          .menu-trigger-split {
            justify-content: flex-start;
            width: 100%;
          }
        }
      }
    `,
  ],
  host: {
    '[style.max-height]': 'maxHeight()',
    '[style.overflow-y]': 'maxHeight() !== "auto" ? "auto" : "visible"',
    '[style.overflow-x]': 'maxHeight() !== "auto" ? "hidden" : "visible"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuListComponent implements AfterViewInit {
  @ViewChildren(forwardRef(() => MenuComponent)) menuComponents!: QueryList<MenuComponent>;
  @ViewChild('menuContainer') menuContainer!: ElementRef<HTMLElement>;

  sections = input<MenuSection[]>([]);
  items = input<MenuItem[]>([]);
  maxHeight = input<string>('');
  visible = input<boolean>(true);
  size = input<Size>('medium');
  variant = input<Variant>('primary');
  appearance = input<Appearance>('subtle');
  menuItemVariant = input<Variant>('secondary');
  menuItemAppearance = input<Appearance>('subtle');
  autoFocusFirstItem = input(true);

  itemClick = output<MenuItem>();
  submenuClick = output<MenuItem>();
  closed = output<void>();

  focusedItemFlatIndex = signal<number>(-1);
  keyboardNavActive = signal(false);

  hasContent = computed(() => this.sections().length > 0 || this.items().length > 0);

  menuClasses = computed(() => {
    const classes = [
      'menu',
      `menu--${this.size()}`,
      `menu--${this.variant()}`,
      `menu--${this.appearance()}`,
    ];

    if (!this.autoFocusFirstItem() && !this.keyboardNavActive()) {
      classes.push('menu--suppress-focus-ring');
    }

    return classes.join(' ');
  });

  allSections = computed(() => {
    if (this.items().length > 0 && this.sections().length === 0) {
      return [{ items: this.items() }] as MenuSection[];
    }
    return this.sections();
  });

  private flatItems = computed(() => {
    const sections = this.allSections();
    const items: MenuItem[] = [];
    for (const section of sections) {
      items.push(...section.items);
    }
    return items;
  });

  constructor() {
    effect(() => {
      if (
        this.autoFocusFirstItem() &&
        this.visible() &&
        this.hasContent() &&
        this.focusedItemFlatIndex() === -1
      ) {
        this.focusedItemFlatIndex.set(this.getFirstFocusableFlatIndex());
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.visible() || !this.hasContent()) {
      return;
    }

    setTimeout(() => {
      if (this.autoFocusFirstItem()) {
        this.focusItemByFlatIndex(this.getFirstFocusableFlatIndex());
        return;
      }

      this.focusMenuContainer(true);
    }, 0);
  }

  getSectionClasses(section: MenuSection, index: number): string {
    const classes = ['menu__section'];
    if (index > 0) {
      classes.push('menu__section--not-first');
    }
    return classes.join(' ');
  }

  onMenuKeydown(event: KeyboardEvent): void {
    const key = event.key;
    const flatItems = this.flatItems();
    if (flatItems.length === 0) return;

    if (!this.keyboardNavActive()) {
      this.keyboardNavActive.set(true);
    }

    const current = this.focusedItemFlatIndex();
    const move = (direction: 1 | -1) => {
      const next = this.nextFocusableFlatIndex(current, direction);
      if (next !== current) {
        event.preventDefault();
        this.focusItemByFlatIndex(next);
      }
    };

    switch (key) {
      case 'ArrowDown':
        move(1);
        break;
      case 'ArrowUp':
        move(-1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (current >= 0 && current < flatItems.length) {
          const item = flatItems[current];
          if (!item.disabled) {
            const triggerRef = this.getTriggerElement(current);
            triggerRef?.nativeElement?.click();
          }
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.closed.emit();
        break;
      case 'Tab':
        event.preventDefault();
        this.closed.emit();
        break;
      case 'ArrowRight':
        if (current >= 0 && current < flatItems.length) {
          const item = flatItems[current];
          const hasSubmenu = (item.submenuItems?.length ?? 0) > 0;
          if (!item.disabled && hasSubmenu) {
            event.preventDefault();
            this.getMenuComponent(current)?.openMenu();
          }
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.closed.emit();
        break;
      default:
        break;
    }
  }

  onRowPrimaryClick(item: MenuItem): void {
    if (item.disabled) return;
    if (item.action) item.action();
    this.itemClick.emit(item);
  }

  onRowMenuItemClick(selectedItem: MenuItem): void {
    this.itemClick.emit(selectedItem);
  }

  onRowMenuOpened(item: MenuItem): void {
    if (item.submenuAction) item.submenuAction();
    this.submenuClick.emit(item);
  }

  getFlatIndex(sectionIndex: number, itemIndex: number): number {
    const sections = this.allSections();
    let idx = 0;
    for (let s = 0; s < sectionIndex; s++) {
      idx += sections[s].items.length;
    }
    return idx + itemIndex;
  }

  private getTriggerElement(flatIndex: number) {
    const comp = this.getMenuComponent(flatIndex);
    return comp?.getTriggerElementRef() ?? null;
  }

  private getMenuComponent(flatIndex: number): MenuComponent | undefined {
    return this.menuComponents?.toArray()[flatIndex];
  }

  private getFirstFocusableFlatIndex(): number {
    const items = this.flatItems();
    for (let i = 0; i < items.length; i++) {
      if (!items[i].disabled) return i;
    }
    return 0;
  }

  private nextFocusableFlatIndex(current: number, direction: 1 | -1): number {
    const items = this.flatItems();
    if (items.length === 0) return -1;
    let next = current + direction;
    while (next >= 0 && next < items.length) {
      if (!items[next].disabled) return next;
      next += direction;
    }
    if (direction === 1) return this.getFirstFocusableFlatIndex();
    return this.getLastFocusableFlatIndex();
  }

  private getLastFocusableFlatIndex(): number {
    const items = this.flatItems();
    for (let i = items.length - 1; i >= 0; i--) {
      if (!items[i].disabled) return i;
    }
    return 0;
  }

  private focusMenuContainer(invisible = false): void {
    const el = this.menuContainer?.nativeElement;
    if (!el) {
      return;
    }

    if (invisible) {
      el.focus({ preventScroll: true } as FocusOptions);
      return;
    }

    el.focus();
  }

  private focusItemByFlatIndex(flatIndex: number): void {
    if (flatIndex < 0) return;
    const flatItems = this.flatItems();
    if (flatIndex >= flatItems.length) return;
    this.focusedItemFlatIndex.set(flatIndex);
    requestAnimationFrame(() => {
      const ref = this.getTriggerElement(flatIndex);
      const el = ref?.nativeElement;
      if (el?.focus) {
        el.focus();
      } else {
        this.focusMenuContainer();
      }
    });
  }

  getItemTriggerVariant(item: MenuItem): MenuTriggerVariant {
    const t = item.type ?? 'button';
    if (t === 'split') return 'split';
    if (t === 'menu' || (item.submenuItems?.length ?? 0) > 0) return 'dropdown';
    return 'button';
  }

  resolveItemVariant(item: MenuItem): Variant {
    return item.variant ?? this.menuItemVariant();
  }

  resolveItemAppearance(item: MenuItem): Appearance {
    return item.appearance ?? this.menuItemAppearance();
  }

  trackByItemId(index: number, item: MenuItem): string {
    return item.id;
  }

  trackBySectionIndex(index: number): number {
    return index;
  }
}
