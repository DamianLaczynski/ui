import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';

import { IconComponent } from '../icon/icon.component';
import { Size } from '../utils';
import { UiI18nService } from '../../i18n';

@Component({
  selector: 'ui-rating',
  templateUrl: './rating.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [IconComponent],
})
export class RatingComponent {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly i18n = inject(UiI18nService);
  private readonly defaultStarAriaLabelFormatter = (star: number, max: number) =>
    `Rate ${star} out of ${max}`;
  private readonly defaultCurrentValueAriaLabelFormatter = (value: number, max: number) =>
    `Rating: ${value} out of ${max} stars`;

  // Inputs
  value = input<number>(0);
  max = input<number>(5);
  size = input<Size, Size | undefined>('medium', {
    transform: (value: Size | undefined) => value ?? 'medium',
  });
  readOnly = input<boolean>(false);
  disabled = input<boolean>(false);
  showValue = input<boolean>(false);
  ariaLabel = input<string>('');
  starAriaLabelFormatter = input<(star: number, max: number) => string>(
    this.defaultStarAriaLabelFormatter,
  );
  currentValueAriaLabelFormatter = input<(value: number, max: number) => string>(
    this.defaultCurrentValueAriaLabelFormatter,
  );

  // Outputs
  valueChange = output<number>();

  // Internal state for hover
  hoveredValue = signal<number | null>(null);

  // Computed properties
  stars = computed(() => {
    const maxValue = Math.max(0, this.max());
    return Array.from({ length: maxValue }, (_, i) => i + 1);
  });

  displayValue = computed(() => {
    const normalized = this.normalizeValue(this.value());
    const hovered = this.hoveredValue();

    // In read-only mode, don't show hover effect
    if (this.readOnly()) {
      return normalized;
    }
    if (hovered === null) {
      return normalized;
    }

    return this.normalizeValue(hovered);
  });

  getRatingClasses(): string {
    const classes = ['rating'];
    classes.push(`rating--${this.size()}`);

    if (this.disabled()) {
      classes.push('rating--disabled');
    }

    if (this.readOnly()) {
      classes.push('rating--readonly');
    }

    return classes.join(' ');
  }

  isStarFilled(starIndex: number): boolean {
    const displayVal = this.displayValue();
    return starIndex <= displayVal;
  }

  onStarClick(starIndex: number): void {
    if (this.readOnly() || this.disabled()) {
      return;
    }
    this.valueChange.emit(this.normalizeValue(starIndex));
    this.hoveredValue.set(null);
  }

  onStarHover(starIndex: number): void {
    if (this.readOnly() || this.disabled()) {
      return;
    }
    this.hoveredValue.set(starIndex);
  }

  onStarLeave(): void {
    if (this.readOnly() || this.disabled()) {
      return;
    }
    this.hoveredValue.set(null);
  }

  onStarKeyDown(event: KeyboardEvent, starIndex: number): void {
    if (this.readOnly() || this.disabled()) {
      return;
    }

    const max = this.max();
    let nextValue: number | null = null;

    switch (event.key) {
      case 'ArrowRight':
        nextValue = starIndex + 1;
        break;
      case 'ArrowLeft':
        nextValue = starIndex - 1;
        break;
      case 'ArrowUp':
        nextValue = starIndex + 1;
        break;
      case 'ArrowDown':
        nextValue = starIndex - 1;
        break;
      case 'Home':
        nextValue = 1;
        break;
      case 'End':
        nextValue = max;
        break;
      case ' ':
      case 'Enter':
        nextValue = starIndex;
        break;
      default:
        return;
    }

    event.preventDefault();
    const normalized = this.normalizeSelectableValue(nextValue ?? starIndex);
    this.valueChange.emit(normalized);
    this.hoveredValue.set(null);
    this.focusStar(normalized);
  }

  getGroupAriaLabel(): string {
    const explicit = this.ariaLabel().trim();
    if (explicit) {
      return explicit;
    }

    const value = this.normalizeValue(this.value());
    const max = this.max();
    const formatter = this.currentValueAriaLabelFormatter();
    if (formatter !== this.defaultCurrentValueAriaLabelFormatter) {
      return formatter(value, max);
    }
    return this.i18n.t('rating.currentValueAriaLabel', `Rating: ${value} out of ${max} stars`, {
      value,
      max,
    });
  }

  getStarAriaLabel(starIndex: number): string {
    const formatter = this.starAriaLabelFormatter();
    const max = this.max();
    if (formatter !== this.defaultStarAriaLabelFormatter) {
      return formatter(starIndex, max);
    }
    return this.i18n.t('rating.starAriaLabel', `Rate ${starIndex} out of ${max}`, {
      star: starIndex,
      max,
    });
  }

  getStarTabIndex(starIndex: number): number {
    if (this.disabled() || this.readOnly()) {
      return -1;
    }

    const selected = this.normalizeValue(this.value());
    const fallback = this.stars().length > 0 ? 1 : -1;
    const active = selected > 0 ? selected : fallback;

    return starIndex === active ? 0 : -1;
  }

  private normalizeValue(value: number): number {
    if (!Number.isFinite(value)) {
      return 0;
    }

    return Math.min(this.max(), Math.max(0, value));
  }

  private normalizeSelectableValue(value: number): number {
    if (!Number.isFinite(value)) {
      return 1;
    }

    return Math.min(this.max(), Math.max(1, value));
  }

  private focusStar(starIndex: number): void {
    const hostElement = this.host.nativeElement as HTMLElement;
    const starButton = hostElement.querySelector(
      `.rating__star[data-star="${starIndex}"]`,
    ) as HTMLButtonElement | null;
    starButton?.focus();
  }
}
