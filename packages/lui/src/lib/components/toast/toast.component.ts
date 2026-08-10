import { Component, effect, input, model, output, ChangeDetectionStrategy } from '@angular/core';
import { Variant, Appearance, Size } from '../utils';
import { ToastPosition } from './models/toast.model';
import { IconComponent } from '../icon/icon.component';
import { IconName } from '../icon/generated/icon-name.type';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ui-toast',
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [IconComponent, ButtonComponent],
})
export class ToastComponent {
  title = input<string>('');
  message = input<string>('');

  toastId = input<string | undefined>();

  // Unified Design System
  variant = input<Variant>('info');
  appearance = input<Appearance>('filled');
  size = input<Size>('medium');

  duration = input<number>(5000);
  dismissible = input<boolean>(true);
  showIcon = input<boolean>(true);
  showProgress = input<boolean>(true);
  position = input<ToastPosition>('top-right');
  visible = model<boolean>(true);

  stackFrom = input<'top' | 'bottom'>('top');
  isExiting = input<boolean>(false);

  dismiss = output<void>();
  exitAnimationComplete = output<string>();
  actionClick = output<void>();

  constructor() {
    effect(onCleanup => {
      if (!this.isExiting() || !this.toastId()) {
        return;
      }
      const reduced =
        typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduced) {
        return;
      }
      const id = this.toastId()!;
      const timer = window.setTimeout(() => this.exitAnimationComplete.emit(id), 32);
      onCleanup(() => clearTimeout(timer));
    });
  }

  toastClasses(): string {
    const classes = ['toast'];

    classes.push(`toast--${this.variant()}`);
    classes.push(`toast--${this.appearance()}`);
    classes.push(`toast--${this.size()}`);
    classes.push(`toast--stack-from-${this.stackFrom()}`);

    if (!this.visible()) {
      classes.push('toast--hidden');
      classes.push(`toast--hidden-from-${this.stackFrom()}`);
    }

    if (!this.dismissible()) {
      classes.push('toast--no-dismiss');
    }

    if (!this.showProgress()) {
      classes.push('toast--no-progress');
    }

    return classes.join(' ');
  }

  toastCopyClasses(): string {
    const classes = ['toast__copy'];
    if (this.showIcon()) {
      classes.push('toast__copy--has-icon');
    }
    if (this.title()) {
      classes.push('toast__copy--has-title');
    }
    return classes.join(' ');
  }

  getIconName(): IconName {
    switch (this.variant()) {
      case 'success':
        return 'checkmark_circle';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'error_circle';
      case 'info':
      default:
        return 'info';
    }
  }

  onDismiss(): void {
    if (this.toastId()) {
      this.dismiss.emit();
      return;
    }
    this.visible.set(false);
    this.dismiss.emit();
  }

  onHostAnimationEnd(event: AnimationEvent): void {
    if (!this.isExiting() || !this.toastId()) {
      return;
    }
    if (event.target !== event.currentTarget) {
      return;
    }
    if (!event.animationName || !event.animationName.includes('toast-exit')) {
      return;
    }
    this.exitAnimationComplete.emit(this.toastId()!);
  }

  onActionClick(): void {
    this.actionClick.emit();
  }
}
