import {
  Component,
  input,
  output,
  signal,
  computed,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  OnDestroy,
  inject,
  PLATFORM_ID,
  NgZone,
  forwardRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Variant, Appearance, Size, Shape, ButtonType } from '../utils';
import { IconComponent, IconName } from '../icon';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuItem } from './models/menu-item.model';
import {
  MENU_OVERLAY_MAX_WIDTH,
  MENU_OVERLAY_MIN_WIDTH,
  MENU_OVERLAY_POSITIONS,
  MENU_OVERLAY_VIEWPORT_MARGIN,
  MENU_SUBMENU_POSITIONS,
  MENU_SUBMENU_MIN_WIDTH,
  MENU_SUBMENU_VIEWPORT_MARGIN,
} from './menu-overlay.config';
import { openConnectedOverlay, OverlayHandle } from '../overlay/open-connected-overlay';
import { UiI18nService } from '../../i18n';

export type MenuTriggerVariant = 'dropdown' | 'split' | 'button';

@Component({
  selector: 'ui-menu',
  templateUrl: './menu.component.html',
  imports: [OverlayModule, IconComponent, forwardRef(() => MenuListComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.menu-trigger-host]':
      'triggerVariant() === "dropdown" || triggerVariant() === "split" || triggerVariant() === "button"',
    '[class.menu-trigger-host--split]': 'triggerVariant() === "split"',
    '[class.menu-trigger-host--menu]':
      'triggerVariant() === "dropdown" || triggerVariant() === "button"',
  },
})
export class MenuComponent implements OnDestroy {
  private i18n = inject(UiI18nService);
  private readonly openMenuAriaLabel = this.i18n.tSignal('menu.openMenuAriaLabel', 'Open menu');
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private platformId = inject(PLATFORM_ID);
  private scrollDispatcher = inject(ScrollDispatcher);
  private ngZone = inject(NgZone);
  private overlayHandle: OverlayHandle | null = null;

  @ViewChild('menuTrigger') menuTrigger!: ElementRef;
  @ViewChild('splitPrimaryPart') splitPrimaryPart?: ElementRef<HTMLButtonElement>;
  @ViewChild('splitDropdownPart') splitDropdownPart?: ElementRef<HTMLButtonElement>;
  @ViewChild('menuTemplate') menuTemplate!: TemplateRef<unknown>;

  triggerVariant = input<MenuTriggerVariant>('button');
  buttonType = input<ButtonType>('button');

  variant = input<Variant>('secondary');
  appearance = input<Appearance>('filled');
  menuItemVariant = input<Variant>('secondary');
  menuItemAppearance = input<Appearance>('subtle');
  size = input<Size>('medium');
  shape = input<Shape>('rounded');

  icon = input<IconName | undefined>(undefined);
  triggerIcon = input<IconName>('chevron_down');
  text = input<string | undefined>(undefined);
  shortcut = input<string | undefined>(undefined);
  ariaLabel = input<string>();

  selected = input<boolean>(false);
  disabled = input<boolean>(false);

  menuItems = input<MenuItem[]>([]);
  menuMaxHeight = input<string>('');
  openAsSubmenu = input<boolean>(false);

  menuItemClick = output<MenuItem>();
  menuOpened = output<void>();
  menuClosed = output<void>();
  primaryClick = output<MouseEvent>();

  isMenuOpen = signal<boolean>(false);

  isSplit = computed(() => this.triggerVariant() === 'split');
  hasMenuItems = computed(() => this.menuItems().length > 0);
  isIconOnlyDropdown = computed(
    () =>
      this.triggerVariant() === 'dropdown' &&
      !!this.icon() &&
      !this.text()?.trim() &&
      !this.shortcut()?.trim(),
  );
  private baseButtonClasses = computed(() => {
    const c = [
      'button',
      `button--${this.variant()}`,
      `button--${this.appearance()}`,
      `button--${this.size()}`,
      `button--${this.shape()}`,
    ];
    if (this.disabled()) c.push('button--disabled');
    if (this.selected()) c.push('button--selected');
    return c;
  });

  triggerClasses = computed(() => {
    const c = ['menu-trigger', ...this.baseButtonClasses()];
    if (this.isIconOnlyDropdown()) c.push('menu-trigger--icon-only');
    if (this.isMenuOpen()) c.push('menu-trigger--open');
    return c.join(' ');
  });

  buttonClasses = computed(() => {
    const c = ['menu-trigger', ...this.baseButtonClasses()];
    if (this.hasMenuItems() && this.isMenuOpen()) c.push('menu-trigger--open');
    return c.join(' ');
  });

  splitContainerClasses = computed(() => {
    const c = [
      'menu-trigger-split',
      `menu-trigger-split--${this.variant()}`,
      `menu-trigger-split--${this.appearance()}`,
      `menu-trigger-split--${this.size()}`,
      `menu-trigger-split--${this.shape()}`,
    ];
    if (this.disabled()) c.push('menu-trigger-split--disabled');
    return c.join(' ');
  });

  primaryPartClasses = computed(() => {
    const c = ['menu-trigger-split__primary', ...this.baseButtonClasses()];
    return c.join(' ');
  });

  dropdownPartClasses = computed(() => {
    const c = ['menu-trigger-split__dropdown', ...this.baseButtonClasses()];
    if (this.isMenuOpen()) c.push('menu-trigger-split__dropdown--open');
    return c.join(' ');
  });

  ngOnDestroy(): void {
    this.overlayHandle?.destroy();
  }

  onTriggerClick(event: MouseEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    event.stopPropagation();
    this.toggleMenu();
  }

  onButtonClick(event: MouseEvent): void {
    if (this.disabled()) return;
    event.stopPropagation();
    if (this.hasMenuItems()) {
      event.preventDefault();
      this.toggleMenu();
    } else {
      this.primaryClick.emit(event);
    }
  }

  onPrimaryClick(event: MouseEvent): void {
    if (this.disabled()) return;
    event.stopPropagation();
    this.primaryClick.emit(event);
  }

  onDropdownClick(event: MouseEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    event.stopPropagation();
    this.toggleMenu();
  }

  toggleMenu(): void {
    if (this.isMenuOpen()) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu(): void {
    if (this.isMenuOpen() || !this.menuItems().length) return;

    const triggerEl = this.menuTrigger.nativeElement;
    const triggerWidth = triggerEl.offsetWidth;
    const isSubmenu = this.openAsSubmenu();
    const positions = isSubmenu ? MENU_SUBMENU_POSITIONS : MENU_OVERLAY_POSITIONS;
    const minWidth = isSubmenu
      ? MENU_SUBMENU_MIN_WIDTH
      : this.isSplit()
        ? MENU_OVERLAY_MIN_WIDTH
        : Math.max(triggerWidth, MENU_OVERLAY_MIN_WIDTH);
    const viewportMargin = isSubmenu ? MENU_SUBMENU_VIEWPORT_MARGIN : MENU_OVERLAY_VIEWPORT_MARGIN;
    const preferredMaxHeight = parseInt(this.menuMaxHeight(), 10) || 250;
    const maxHeight =
      isSubmenu && isPlatformBrowser(this.platformId) && typeof window !== 'undefined'
        ? Math.min(preferredMaxHeight, window.innerHeight - viewportMargin * 2)
        : this.menuMaxHeight();

    this.overlayHandle = openConnectedOverlay({
      overlay: this.overlay,
      scrollDispatcher: this.scrollDispatcher,
      ngZone: this.ngZone,
      trigger: this.menuTrigger,
      template: this.menuTemplate,
      viewContainerRef: this.viewContainerRef,
      config: {
        positions,
        viewportMargin,
        flexibleDimensions: true,
        minWidth,
        maxWidth: MENU_OVERLAY_MAX_WIDTH,
        maxHeight,
      },
      onClose: focusTrigger => this.closeMenu(focusTrigger ? 'escape' : 'outside'),
      onDetach: () => this.syncStateAfterDetach(),
    });

    this.isMenuOpen.set(true);
    this.menuOpened.emit();
  }

  closeMenu(reason?: 'escape' | 'outside'): void {
    const trigger = this.getTriggerElementRef()?.nativeElement;
    this.overlayHandle?.destroy();
    this.overlayHandle = null;
    this.isMenuOpen.set(false);
    this.menuClosed.emit();
    if (trigger && reason === 'escape') {
      setTimeout(() => trigger.focus({ preventScroll: true }), 0);
    }
  }

  private syncStateAfterDetach(): void {
    if (!this.overlayHandle) return;
    this.overlayHandle.destroy();
    this.overlayHandle = null;
    this.isMenuOpen.set(false);
    this.menuClosed.emit();
  }

  onMenuItemClick(item: MenuItem): void {
    this.menuItemClick.emit(item);
    this.closeMenu();
  }

  getTriggerElementRef(): ElementRef<HTMLElement> | null {
    if (this.isSplit() && this.splitPrimaryPart) {
      return this.splitPrimaryPart;
    }
    return this.menuTrigger ?? null;
  }

  getOpenMenuAriaLabel(): string {
    return this.openMenuAriaLabel();
  }
}
