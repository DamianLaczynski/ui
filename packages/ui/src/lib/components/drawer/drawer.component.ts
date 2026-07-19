import {
  Component,
  input,
  output,
  model,
  HostListener,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Directionality, Direction } from '@angular/cdk/bidi';
import { startWith } from 'rxjs/operators';

import { QuickAction } from '../utils';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { UiI18nService } from '../../i18n';
export type DrawerBackdrop = 'static' | 'dynamic';
export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type DrawerType = 'overlay' | 'inline';
export type DrawerModalType = 'modal' | 'non-modal' | 'alert';

@Component({
  selector: 'ui-drawer',
  templateUrl: './drawer.component.html',
  imports: [ButtonComponent, IconComponent, CdkTrapFocus],
  host: {
    '[style.display]': '"block"',
    '[style.height]': 'type() === "inline" ? "100%" : null',
    '[style.minWidth]': '"0"',
  },
})
export class DrawerComponent {
  private static readonly CLOSE_ANIMATION_FALLBACK_MS = 340;
  private static readonly CLOSE_ANIMATION_NAMES = new Set([
    'slideOutLeft',
    'slideOutRight',
    'slideOutTop',
    'slideOutBottom',
    'panelInlineWidthCollapse',
  ]);

  //Service
  private readonly i18n = inject(UiI18nService);
  private readonly directionality = inject(Directionality);
  private readonly direction = toSignal(
    this.directionality.change.pipe(startWith(this.directionality.value)),
    { initialValue: this.directionality.value },
  );
  private readonly rendered = signal(false);
  readonly isClosing = signal(false);
  private wasTrapFocusActive = false;
  private lastFocusedElement: HTMLElement | null = null;
  private closeAnimationTimer: ReturnType<typeof setTimeout> | null = null;

  //Translations
  private readonly closeAriaLabel = this.i18n.tSignal('drawer.closeAriaLabel', 'Close drawer');

  //Inputs
  title = input<string>('');
  position = input<DrawerPosition>('right');
  backdrop = input<DrawerBackdrop>('dynamic');
  closable = input<boolean>(true);
  size = input<'small' | 'medium' | 'large'>('medium');
  type = input<DrawerType>('overlay');
  bodyScrollable = input<boolean>(true);
  modalType = input<DrawerModalType>('modal');
  visible = model<boolean>(false);

  primaryAction = input<QuickAction | null>(null);
  secondaryAction = input<QuickAction | null>(null);
  additionalActions = input<QuickAction[]>([]);

  //Outputs
  close = output<void>();
  backdropClick = output<void>();
  openChange = output<{ open: boolean }>();

  //Computed
  ariaLabelComputed = computed(() => this.closeAriaLabel());

  isOverlay = computed(() => this.type() === 'overlay');

  isInline = computed(() => this.type() === 'inline');

  hasActions = computed(
    () => !!(this.primaryAction() || this.secondaryAction() || this.additionalActions().length > 0),
  );

  canCloseByBackdrop = computed(() => {
    if (this.modalType() === 'alert') return false;
    return this.backdrop() === 'dynamic' && this.closable();
  });

  canCloseByEscape = computed(() => {
    if (this.modalType() === 'alert') return false;
    return this.closable();
  });

  isModal = computed(() => this.modalType() === 'modal');
  shouldTrapFocus = computed(() => this.visible() && this.isOverlay() && this.isModal());
  shouldRender = computed(() => this.rendered());
  effectivePosition = computed<DrawerPosition>(() =>
    this.resolvePositionForDirection(this.position(), this.direction()),
  );

  drawerClasses = computed(() => {
    return [
      'drawer',
      `drawer--${this.effectivePosition()}`,
      `drawer--${this.type()}`,
      `drawer--size-${this.size()}`,
      this.isClosing() ? 'drawer--closing' : '',
    ].join(' ');
  });

  backdropClasses = computed(() => {
    return ['drawer__backdrop', this.isClosing() ? 'drawer__backdrop--hidden' : ''].join(' ');
  });

  contentClasses = computed(() => {
    return [
      'drawer__content',
      `drawer__content--${this.effectivePosition()}`,
      `drawer__content--${this.size()}`,
    ].join(' ');
  });

  headerClasses = computed(() => {
    return 'drawer__header';
  });

  bodyClasses = computed(() => {
    return ['drawer__body', !this.bodyScrollable() ? 'drawer__body--no-scroll' : ''].join(' ');
  });

  footerClasses = computed(() => {
    return 'drawer__footer';
  });

  constructor() {
    effect(() => {
      const visible = this.visible();
      if (visible) {
        this.clearCloseAnimationTimer();
        this.isClosing.set(false);
        this.rendered.set(true);
        return;
      }

      if (!this.rendered() || this.isClosing()) {
        return;
      }

      this.isClosing.set(true);
      if (this.shouldSkipCloseAnimation()) {
        this.finalizeCloseAnimation();
        return;
      }

      this.closeAnimationTimer = setTimeout(() => {
        this.finalizeCloseAnimation();
      }, DrawerComponent.CLOSE_ANIMATION_FALLBACK_MS);
    });

    effect(() => {
      const shouldTrap = this.shouldTrapFocus();
      if (shouldTrap && !this.wasTrapFocusActive) {
        this.lastFocusedElement = document.activeElement as HTMLElement | null;
      }

      if (!shouldTrap && this.wasTrapFocusActive) {
        this.restoreFocus();
      }

      this.wasTrapFocusActive = shouldTrap;
    });
  }

  //Event handlers
  onBackdropClick(event: MouseEvent): void {
    if (this.canCloseByBackdrop() && event.target === event.currentTarget) {
      this.backdropClick.emit();
      this.closeDrawer();
    }
  }

  onCloseClick(): void {
    if (this.closable()) {
      this.closeDrawer();
    }
  }

  onContentAnimationEnd(event: AnimationEvent): void {
    if (event.target !== event.currentTarget || !this.isClosing()) {
      return;
    }

    if (!DrawerComponent.CLOSE_ANIMATION_NAMES.has(event.animationName)) {
      return;
    }

    this.finalizeCloseAnimation();
  }

  onContainerAnimationEnd(event: AnimationEvent): void {
    if (event.target !== event.currentTarget || !this.isClosing() || !this.isInline()) {
      return;
    }

    if (!DrawerComponent.CLOSE_ANIMATION_NAMES.has(event.animationName)) {
      return;
    }

    this.finalizeCloseAnimation();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.visible() && this.canCloseByEscape()) {
      event.preventDefault();
      this.closeDrawer();
    }
  }

  private closeDrawer(): void {
    this.visible.set(false);
    this.close.emit();
    this.openChange.emit({ open: false });
  }

  handlePrimaryAction(): void {
    const action = this.primaryAction();
    if (action && !action.disabled) {
      action.action();
    }
  }

  handleSecondaryAction(): void {
    const action = this.secondaryAction();
    if (action && !action.disabled) {
      action.action();
    }
  }

  handleAdditionalAction(action: QuickAction): void {
    if (!action.disabled) {
      action.action();
    }
  }

  private restoreFocus(): void {
    if (this.lastFocusedElement && document.contains(this.lastFocusedElement)) {
      this.lastFocusedElement.focus();
    }
    this.lastFocusedElement = null;
  }

  private resolvePositionForDirection(
    position: DrawerPosition,
    direction: Direction | null | undefined,
  ): DrawerPosition {
    if (direction !== 'rtl') {
      return position;
    }

    if (position === 'left') {
      return 'right';
    }

    if (position === 'right') {
      return 'left';
    }

    return position;
  }

  private shouldSkipCloseAnimation(): boolean {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private clearCloseAnimationTimer(): void {
    if (this.closeAnimationTimer) {
      clearTimeout(this.closeAnimationTimer);
      this.closeAnimationTimer = null;
    }
  }

  private finalizeCloseAnimation(): void {
    this.clearCloseAnimationTimer();
    this.isClosing.set(false);
    this.rendered.set(false);
  }
}
