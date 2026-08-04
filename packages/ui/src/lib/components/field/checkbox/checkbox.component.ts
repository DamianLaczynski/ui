import {
  Component,
  computed,
  effect,
  forwardRef,
  input,
  model,
  OnInit,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Shape } from '../../utils';
import { FieldComponent } from '../field/field.component';
import { IconComponent } from '../../icon';
import { NgClass } from '@angular/common';
import { IconName } from '../../icon/generated/icon-name.type';

@Component({
  selector: 'ui-checkbox',
  imports: [FieldComponent, IconComponent, NgClass],
  templateUrl: './checkbox.component.html',
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent extends FieldComponent implements ControlValueAccessor, OnInit {
  // Unified Design System
  shape = input<Shape>('rounded');
  indeterminate = model<boolean>(false);
  private checked = signal(false);

  constructor() {
    super();
    effect(() => {
      // Synchronize indeterminate state with the native checkbox element
      if (this.indeterminate()) {
        this.checked.set(false);
        this.value = false;
      }
    });
  }

  readonly isChecked = computed(() => this.checked() === true && !this.indeterminate());

  readonly isUnchecked = computed(() => this.value == false && !this.indeterminate());

  readonly isIndeterminate = computed(() => this.indeterminate());

  readonly checkboxClasses = computed(() => {
    const classes = [
      'checkbox',
      `checkbox--${this.shape()}`,
      `checkbox--${this.size()}`,
      `checkbox--label-${this.labelPosition()}`,
    ];

    if (this.isChecked()) {
      classes.push('checkbox--checked');
    } else if (this.isIndeterminate()) {
      classes.push('checkbox--indeterminate');
    } else {
      classes.push('checkbox--unchecked');
    }

    if (this.disabled()) {
      classes.push('checkbox--disabled');
    }

    return classes.join(' ');
  });

  readonly checkboxLabelClasses = computed(() => {
    const classes = ['checkbox-label'];

    if (this.disabled()) {
      classes.push('checkbox-label--disabled');
    }

    if (this.required()) {
      classes.push('checkbox-label--required');
    }

    return classes.join(' ');
  });

  readonly computedAriaLabel = computed(() => {
    const explicit = this.ariaLabel()?.trim();
    if (explicit) {
      return explicit;
    }

    const fallback = this.label()?.trim();
    return fallback || null;
  });

  readonly iconName = computed<IconName>(() => {
    const shape = this.shape();
    if (this.isIndeterminate()) {
      return shape === 'circular' ? 'subtract_circle' : 'subtract_square';
    }

    if (this.isChecked()) {
      if (shape === 'circular') {
        return 'checkmark_circle';
      }

      return shape === 'square' ? 'checkmark_square' : 'checkbox_checked';
    }

    if (shape === 'circular') {
      return 'circle';
    }

    return shape === 'square' ? 'square' : 'checkbox_unchecked';
  });

  readonly iconVariant = computed<'regular' | 'filled'>(() =>
    this.isChecked() ? 'filled' : 'regular',
  );

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (this.indeterminate()) {
      // Cycle: indeterminate -> checked
      this.indeterminate.set(false);
      this.checked.set(true);
      this.value = true;
    } else {
      // Normal toggle: unchecked <-> checked
      this.checked.set(target.checked);
      this.value = target.checked;
    }

    this.onChange(this.value);
    this.change.emit(this.value);
  }

  onCheckboxClick(event: MouseEvent): void {
    // Prevent default to control the state manually
    if (this.disabled() || this.readonly()) {
      event.preventDefault();
      return;
    }
  }

  override onFocus(event: FocusEvent): void {
    this._isFocused = true;
    this.focus.emit(event);
  }

  override onBlur(event: FocusEvent): void {
    this._isFocused = false;
    this.onTouched();
    this.blur.emit(event);
  }

  // ControlValueAccessor methods
  override writeValue(value: any): void {
    const checked = value === true;
    this.checked.set(checked);
    this.value = checked;
  }
}
