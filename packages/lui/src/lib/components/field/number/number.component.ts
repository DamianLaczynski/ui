import {
  Component,
  input,
  forwardRef,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldComponent } from '../field/field.component';
import { ActionButtonComponent } from '../action-button.component';

@Component({
  selector: 'ui-number',
  imports: [FieldComponent, ActionButtonComponent],
  templateUrl: './number.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberComponent),
      multi: true,
    },
  ],
})
export class NumberComponent extends FieldComponent {
  @ViewChild('inputElement') inputElement?: ElementRef<HTMLInputElement>;
  step = input<number | string>(1);
  min = input<number | undefined>(undefined);
  max = input<number | undefined>(undefined);

  increment(): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const currentValue = this.parseNumber(this.value);
    const stepValue = this.parseNumber(this.step());
    const newValue = currentValue + stepValue;

    if (this.max() !== undefined && newValue > this.max()!) {
      return;
    }

    this.updateValue(newValue);
  }

  decrement(): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const currentValue = this.parseNumber(this.value);
    const stepValue = this.parseNumber(this.step());
    const newValue = currentValue - stepValue;

    if (this.min() !== undefined && newValue < this.min()!) {
      return;
    }

    this.updateValue(newValue);
  }

  private parseNumber(value: any): number {
    if (value === '' || value === null || value === undefined) {
      return 0;
    }
    const parsed = typeof value === 'string' ? parseFloat(value) : Number(value);
    return isNaN(parsed) ? 0 : parsed;
  }

  private updateValue(newValue: number): void {
    this.value = newValue.toString();
    this.onChange(this.value);
    this.change.emit(this.value);
  }

  override onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;

    if (inputValue === '' || inputValue === '-' || inputValue === '.') {
      this.value = inputValue;
      return;
    }

    const numericValue = this.parseNumber(inputValue);

    if (this.min() !== undefined && numericValue < this.min()!) {
      this.value = this.min()!.toString();
      target.value = this.value;
    } else if (this.max() !== undefined && numericValue > this.max()!) {
      this.value = this.max()!.toString();
      target.value = this.value;
    } else {
      this.value = inputValue;
    }

    this.onChange(this.value);
    this.change.emit(this.value);
  }

  getStepperClasses(): string {
    return `number-stepper--${this.size()}`;
  }
}
