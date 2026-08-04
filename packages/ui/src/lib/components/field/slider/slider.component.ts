import {
  Component,
  computed,
  forwardRef,
  input,
  model,
  OnInit,
  signal,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'ui-slider',
  imports: [CommonModule, FieldComponent],
  templateUrl: './slider.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true,
    },
  ],
})
export class SliderComponent extends FieldComponent implements ControlValueAccessor, OnInit {
  @ViewChild('sliderInput') sliderInput!: ElementRef<HTMLInputElement>;

  // Component inputs
  valueModel = model<number>();

  // Slider-specific inputs
  min = input<number>(0);
  max = input<number>(100);
  step = input<number>(1);
  unit = input<string>('');
  formatValue = input<(value: number) => string>(value => value.toString());
  vertical = input<boolean>(false);
  ariaValueText = input<string | ((value: number) => string) | null>(null);
  showStepMarkers = input<boolean>(false);
  showMinMax = input<boolean>(false);

  private dragging = signal(false);
  readonly isDragging = computed(() => this.dragging());

  readonly sliderClasses = computed(() => {
    const classes = ['slider'];

    classes.push(`slider--${this.size()}`);

    if (this.disabled()) {
      classes.push('slider--disabled');
    }

    if (this.readonly()) {
      classes.push('slider--readonly');
    }

    if (this.dragging()) {
      classes.push('slider--dragging');
    }

    if (this.vertical()) {
      classes.push('slider--vertical');
    }

    return classes.join(' ');
  });

  readonly currentValue = computed(() => {
    const modelValue = this.valueModel();
    if (typeof modelValue === 'number' && Number.isFinite(modelValue)) {
      return modelValue;
    }

    return this.min();
  });

  readonly fillPercentage = computed(() => {
    const range = this.max() - this.min();
    if (range <= 0) {
      return 0;
    }

    const valueOffset = this.currentValue() - this.min();
    const percentage = (valueOffset / range) * 100;
    return Math.min(100, Math.max(0, percentage));
  });

  readonly computedAriaLabel = computed(() => {
    const explicit = this.ariaLabel()?.trim();
    if (explicit) {
      return explicit;
    }

    const fallback = this.label()?.trim();
    return fallback || null;
  });

  readonly computedAriaValueText = computed(() => {
    const aria = this.ariaValueText();
    if (!aria) return null;
    if (typeof aria === 'function') return aria(this.currentValue());
    return aria;
  });

  readonly stepsPercent = computed(() => {
    if (!this.showStepMarkers()) return null;
    const s = this.step();
    const minVal = this.min();
    const maxVal = this.max();
    if (s <= 0 || maxVal <= minVal) return null;
    const range = maxVal - minVal;
    const numSteps = Math.round(range / s);
    if (numSteps < 2) return null;
    return `${100 / numSteps}%`;
  });

  readonly visualStyle = computed<Record<string, string>>(() => {
    const progress = `${this.fillPercentage()}%`;
    const stepsPercent = this.stepsPercent();
    const style: Record<string, string> = {
      '--slider-progress': progress,
    };
    if (stepsPercent) {
      style['--slider-steps-percent'] = stepsPercent;
    }
    return style;
  });

  readonly thumbWrapperStyle = computed<Record<string, string>>(() => {
    const progress = `${this.fillPercentage()}%`;
    const position = `clamp(var(--slider-thumb-radius), ${progress}, calc(100% - var(--slider-thumb-radius)))`;
    const style: Record<string, string> = {
      transform: this.vertical() ? 'translate(-50%, 50%)' : 'translate(-50%, -50%)',
    };

    if (this.vertical()) {
      style['bottom'] = position;
    } else {
      style['inset-inline-start'] = position;
      style['transform'] = 'translate(var(--slider-thumb-translate-x), -50%)';
    }

    return style;
  });

  private setCurrentValue(value: number): void {
    const min = this.min();
    const max = this.max();
    const normalized = Math.min(max, Math.max(min, value));

    this.value = normalized;
    this.valueModel.set(normalized);
    this.onChange(normalized);
  }

  onSliderInput(event: Event): void {
    if (this.disabled() || this.readonly()) return;
    const target = event.target as HTMLInputElement;
    const newValue = parseFloat(target.value);
    if (isFinite(newValue) && !isNaN(newValue)) {
      this.setCurrentValue(newValue);
    }
  }

  onSliderChange(event: Event): void {
    if (this.disabled() || this.readonly()) return;
    const target = event.target as HTMLInputElement;
    const newValue = parseFloat(target.value);
    if (isFinite(newValue) && !isNaN(newValue)) {
      this.setCurrentValue(newValue);
      this.change.emit(newValue);
    }
  }

  onSliderKeyDown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) {
      event.preventDefault();
      return;
    }

    const step = this.step() > 0 ? this.step() : 1;
    let nextValue: number | null = null;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        nextValue = this.currentValue() + step;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        nextValue = this.currentValue() - step;
        break;
      case 'PageUp':
        nextValue = this.currentValue() + step * 10;
        break;
      case 'PageDown':
        nextValue = this.currentValue() - step * 10;
        break;
      case 'Home':
        nextValue = this.min();
        break;
      case 'End':
        nextValue = this.max();
        break;
    }

    if (nextValue !== null) {
      event.preventDefault();
      this.setCurrentValue(nextValue);
      this.change.emit(this.currentValue());
    }
  }

  override onBlur(event: FocusEvent): void {
    this._isFocused = false;
    this.dragging.set(false);
    this.onTouched();
    this.blur.emit(event);
  }

  onMouseDown(): void {
    if (!this.disabled() && !this.readonly()) {
      this.dragging.set(true);
    }
  }

  onMouseUp(): void {
    this.dragging.set(false);
  }

  // ControlValueAccessor methods
  override writeValue(value: unknown): void {
    const minValue = this.min();

    if (value !== null && value !== undefined) {
      const numValue = typeof value === 'number' ? value : parseFloat(String(value));
      const normalized = Number.isFinite(numValue) ? numValue : minValue;
      this.value = normalized;
      this.valueModel.set(normalized);
    } else {
      this.value = minValue;
      this.valueModel.set(minValue);
    }
  }

  setValue(value: number): void {
    this.setCurrentValue(value);
    this.change.emit(this.currentValue());
  }
}
