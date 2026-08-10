import {
  Component,
  input,
  output,
  model,
  computed,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Variant,
  Appearance,
  Size,
  Shape,
  ExtendedSize,
  ButtonType,
  AnchorPosition,
} from '../utils';
import { IconComponent, IconName } from '../icon';
import { SpinnerComponent } from '../spinner';
import { BadgeComponent } from '../badge';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  imports: [CommonModule, IconComponent, SpinnerComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.tabindex]': '"-1"',
    '[style.width]': 'fullWidth() ? "100%" : "fit-content"',
  },
})
export class ButtonComponent {
  private readonly elementRef = inject(ElementRef);

  variant = input<Variant>('secondary');
  appearance = input<Appearance>('filled');
  size = input<Size>('medium');
  shape = input<Shape>('rounded');

  icon = input<IconName | undefined>(undefined);
  text = input<string | undefined>(undefined);
  ariaLabel = input<string>();

  selectable = input<boolean>(false);
  type = input<ButtonType>('button');
  fullWidth = input<boolean>(false);
  role = input<'button' | 'radio' | 'menuitem'>('button');
  ariaChecked = input<boolean | undefined>(undefined);
  tabIndex = input<number | undefined>(undefined);

  selected = model<boolean>(false);
  disabled = model<boolean>(false);
  loading = input<boolean>(false);

  badge = input<string | undefined>(undefined);
  badgeVariant = input<Variant>('danger');
  badgeAppearance = input<Appearance>('filled');
  badgeShape = input<Shape>('circular');
  badgePosition = input<AnchorPosition>('top-end');
  badgeAriaLabel = input<string | undefined>(undefined);
  hideBadgeWhenLoading = input<boolean>(true);

  click = output<MouseEvent>();

  spinnerSize = computed<ExtendedSize>(() => {
    const sizeMap: Record<Size, ExtendedSize> = {
      small: 'extra-small',
      medium: 'small',
      large: 'medium',
    };
    return sizeMap[this.size()] ?? 'small';
  });

  showBadge = computed(() => {
    if (this.hideBadgeWhenLoading() && this.loading()) {
      return false;
    }

    const value = this.badge();
    return value !== undefined && value !== null && value !== '';
  });

  badgeSize = computed<Size>(() => {
    const sizeMap: Record<Size, Size> = {
      small: 'small',
      medium: 'small',
      large: 'medium',
    };
    return sizeMap[this.size()] ?? 'small';
  });

  badgeClasses = computed(() => `button__badge button__badge--${this.badgePosition()}`);

  buttonClasses = computed(() => {
    const classes = ['button'];

    classes.push(`button--${this.variant()}`);
    classes.push(`button--${this.appearance()}`);
    classes.push(`button--${this.size()}`);
    classes.push(`button--${this.shape()}`);

    if (this.disabled()) {
      classes.push('button--disabled');
    }

    if (this.loading()) {
      classes.push('button--loading');
    }

    if (this.selected()) {
      classes.push('button--selected');
    }

    if (this.fullWidth()) {
      classes.push('button--full-width');
    }

    return classes.join(' ');
  });

  onClick(event: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      return;
    }

    // Don't prevent default for submit buttons - let form handle submission
    if (this.type() !== 'submit') {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.selectable()) {
      this.selected.set(!this.selected());
    }

    this.click.emit(event);
  }

  focus(): void {
    (this.elementRef.nativeElement as HTMLElement)
      .querySelector<HTMLButtonElement>('button')
      ?.focus();
  }

  contains(node: Node | null): boolean {
    return node ? (this.elementRef.nativeElement as HTMLElement).contains(node) : false;
  }
}
