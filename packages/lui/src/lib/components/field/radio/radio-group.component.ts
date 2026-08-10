import { Component, forwardRef, input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './radio.component';
import { FieldComponent } from '../field/field.component';
import { Orientation, ContentPosition } from '../../utils';

export interface RadioItem {
  id: string | number;
  label: string;
  value: any;
  labelPosition?: ContentPosition;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-radio-group',
  imports: [CommonModule, FieldComponent, RadioComponent],
  templateUrl: './radio-group.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
})
export class RadioGroupComponent extends FieldComponent implements ControlValueAccessor, OnInit {
  items = input<RadioItem[]>([]);
  orientation = input<Orientation>('vertical');

  get groupClasses(): string {
    const classes = ['radio-group'];

    classes.push(`radio-group--${this.orientation()}`);
    classes.push(`radio-group--${this.size()}`);

    if (this.disabled()) {
      classes.push('radio-group--disabled');
    }

    return classes.join(' ');
  }

  /**
   * Check if specific radio button should be checked
   */
  isRadioChecked(itemValue: any): boolean {
    return this.value === itemValue;
  }

  /**
   * Handle radio button selection.
   * Called when user clicks a radio button.
   */
  onRadioSelected(selectedValue: any): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    // Update internal value
    this.value = selectedValue;

    // Notify Angular Forms
    this.onChange(selectedValue);
    this.onTouched();

    // Emit change event for parent components
    this.change.emit(selectedValue);
  }
}
