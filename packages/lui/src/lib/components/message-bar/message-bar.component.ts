import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';

import { ButtonComponent } from '../button';
import { IconComponent, IconName } from '../icon';
import { UiI18nService } from '../../i18n';
import { Appearance, Shape, QuickAction, Size, Variant } from '../utils';

@Component({
  selector: 'ui-message-bar',
  templateUrl: './message-bar.component.html',
  imports: [IconComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageBarComponent {
  private readonly i18n = inject(UiI18nService);
  readonly dismissAriaLabel = this.i18n.tSignal('messageBar.dismissAriaLabel', 'Dismiss');

  title = input<string>('');
  message = input<string>('');
  actions = input<QuickAction[]>([]);
  icon = input<IconName | undefined>(undefined);

  variant = input<Variant>('info');
  appearance = input<Appearance>('tint');
  size = input<Size>('medium');

  showIcon = input<boolean>(true);
  dismissible = input<boolean>(true);
  multiline = input<boolean>(true);

  dismiss = output<void>();
  actionSelect = output<QuickAction>();

  messageBarClasses(): string {
    const classes = ['message-bar'];

    classes.push(`message-bar--${this.variant()}`);
    classes.push(`message-bar--${this.appearance()}`);
    classes.push(`message-bar--${this.size()}`);

    if (!this.multiline()) {
      classes.push('message-bar--single-line');
    }

    if (!this.showIcon()) {
      classes.push('message-bar--no-icon');
    }

    return classes.join(' ');
  }

  ariaLive(): 'assertive' | 'polite' {
    return this.variant() === 'danger' ? 'assertive' : 'polite';
  }

  iconName(): IconName {
    if (this.icon()) {
      return this.icon()!;
    }

    switch (this.variant()) {
      case 'success':
        return 'checkmark_circle';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'error_circle';
      case 'info':
      case 'primary':
      case 'secondary':
      default:
        return 'info';
    }
  }

  onDismiss(): void {
    this.dismiss.emit();
  }

  onActionClick(action: QuickAction): void {
    if (action.disabled) {
      return;
    }

    action.action();
    this.actionSelect.emit(action);
  }

  actionVariant(action: QuickAction): Variant {
    return action.variant ?? 'secondary';
  }

  actionAppearance(action: QuickAction): Appearance {
    return action.appearance ?? 'outline';
  }

  actionSize(action: QuickAction): Size {
    return action.size ?? this.size();
  }

  actionShape(action: QuickAction): Shape {
    return action.shape ?? 'rounded';
  }
}
