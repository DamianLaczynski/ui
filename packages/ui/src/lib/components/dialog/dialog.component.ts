import {
  Component,
  input,
  output,
  model,
  HostListener,
  inject,
  computed,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { QuickAction } from '../utils';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { UiI18nService } from '../../i18n';
export type DialogBackdrop = 'static' | 'dynamic';

@Component({
  selector: 'ui-dialog',
  templateUrl: './dialog.component.html',

  imports: [CommonModule, A11yModule, ButtonComponent, IconComponent],
})
export class DialogComponent {
  private static readonly CLOSE_FALLBACK_MS = 320;
  private static readonly BACKDROP_EXIT = 'fadeOut';
  private static readonly CONTENT_EXIT = new Set(['scaleOut', 'fadeOut']);

  //Service
  private readonly i18n = inject(UiI18nService);
  private readonly rendered = signal(false);
  readonly isClosing = signal(false);
  private closeFallbackTimer: ReturnType<typeof setTimeout> | null = null;

  //Translations
  private readonly closeAriaLabel = this.i18n.tSignal('dialog.closeAriaLabel', 'Close dialog');

  //Inputs
  title = input<string>('');
  backdrop = input<DialogBackdrop>('dynamic');
  closable = input<boolean>(true);
  fullscreen = input<boolean>(false);
  width = input<string>('');
  height = input<string>('');
  visible = model<boolean>(false);

  primaryAction = input<QuickAction | null>(null);
  secondaryAction = input<QuickAction | null>(null);
  additionalActions = input<QuickAction[]>([]);

  //Outputs
  close = output<void>();
  backdropClick = output<void>();

  //Computed
  closeAriaLabelComputed = computed(() => this.closeAriaLabel());

  hasActions = computed(() => {
    return !!(
      this.primaryAction() ||
      this.secondaryAction() ||
      this.additionalActions().length > 0
    );
  });

  shouldRender = computed(() => this.rendered());

  dialogClasses = computed(() => {
    return ['dialog', this.isClosing() ? 'dialog--closing' : ''].join(' ');
  });

  backdropClasses = computed(() => {
    return [
      'dialog__backdrop',
      this.isClosing() ? 'dialog__backdrop--closing' : '',
      this.fullscreen() ? 'dialog__backdrop--fullscreen' : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  contentClasses = computed(() => {
    return ['dialog__content', this.fullscreen() ? 'dialog__content--fullscreen' : ''].join(' ');
  });

  contentStyles = computed(() => {
    const styles: { [key: string]: string } = {};

    if (this.width() && !this.fullscreen()) {
      styles['width'] = this.width();
      styles['max-width'] = this.width();
    }

    if (this.height() && !this.fullscreen()) {
      styles['height'] = this.height();
      styles['max-height'] = this.height();
    }

    return styles;
  });

  headerClasses = computed(() => {
    return 'dialog__header';
  });

  bodyClasses = computed(() => {
    return 'dialog__body';
  });

  footerClasses = computed(() => {
    return 'dialog__footer';
  });

  constructor() {
    effect(() => {
      const visible = this.visible();
      if (visible) {
        this.clearCloseFallback();
        this.isClosing.set(false);
        this.rendered.set(true);
        return;
      }

      if (!this.rendered() || this.isClosing()) {
        return;
      }

      this.isClosing.set(true);
      if (this.prefersReducedMotion()) {
        this.finalizeClose();
        return;
      }

      this.closeFallbackTimer = setTimeout(() => {
        this.finalizeClose();
      }, DialogComponent.CLOSE_FALLBACK_MS);
    });
  }

  onBackdropClick(event: MouseEvent): void {
    if (this.backdrop() === 'dynamic' && event.target === event.currentTarget) {
      this.closeDialog();
      this.backdropClick.emit();
    }
  }

  onCloseClick(): void {
    if (this.closable()) {
      this.closeDialog();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.visible() && this.closable()) {
      event.preventDefault();
      this.closeDialog();
    }
  }

  private closeDialog(): void {
    if (!this.visible()) {
      return;
    }
    this.visible.set(false);
    this.close.emit();
  }

  onBackdropAnimationEnd(event: AnimationEvent): void {
    if (event.target !== event.currentTarget || !this.isClosing()) {
      return;
    }

    if (event.animationName !== DialogComponent.BACKDROP_EXIT) {
      return;
    }

    this.finalizeClose();
  }

  onContentAnimationEnd(event: AnimationEvent): void {
    if (event.target !== event.currentTarget || !this.isClosing()) {
      return;
    }

    if (!DialogComponent.CONTENT_EXIT.has(event.animationName)) {
      return;
    }

    this.finalizeClose();
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

  private prefersReducedMotion(): boolean {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private clearCloseFallback(): void {
    if (this.closeFallbackTimer) {
      clearTimeout(this.closeFallbackTimer);
      this.closeFallbackTimer = null;
    }
  }

  private finalizeClose(): void {
    this.clearCloseFallback();
    if (!this.rendered()) {
      return;
    }
    this.isClosing.set(false);
    this.rendered.set(false);
  }
}
