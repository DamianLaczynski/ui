import {
  Component,
  computed,
  forwardRef,
  OnInit,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'ui-switch',
  imports: [CommonModule, FieldComponent],
  templateUrl: './switch.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
})
export class SwitchComponent extends FieldComponent implements ControlValueAccessor, OnInit {
  private checked = signal(false);
  readonly isChecked = computed(() => this.checked());

  readonly switchClasses = computed(() => {
    const classes = ['switch'];

    if (this.checked()) {
      classes.push('switch--checked');
    } else {
      classes.push('switch--unchecked');
    }

    if (this.disabled()) {
      classes.push('switch--disabled');
    }

    classes.push(`switch--${this.size()}`);
    classes.push(`switch--label-${this.labelPosition()}`);

    return classes.join(' ');
  });

  readonly trackClasses = computed(() =>
    this.checked() ? 'switch-track switch-track--checked' : 'switch-track switch-track--unchecked',
  );

  readonly thumbClasses = computed(() =>
    this.checked() ? 'switch-thumb switch-thumb--checked' : 'switch-thumb switch-thumb--unchecked',
  );

  readonly computedAriaLabel = computed(() => {
    const explicit = this.ariaLabel()?.trim();
    if (explicit) {
      return explicit;
    }

    const fallback = this.label()?.trim();
    return fallback || null;
  });

  readonly switchLabelClasses = computed(() => {
    const classes = ['switch-label'];

    if (this.disabled()) {
      classes.push('switch-label--disabled');
    }

    if (this.required()) {
      classes.push('switch-label--required');
    }

    classes.push(`switch-label--${this.size()}`);

    return classes.join(' ');
  });

  onSwitchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.checked;
    this.checked.set(target.checked);
    this.onChange(this.value);
    this.change.emit(this.value);
  }

  onSwitchClick(event: MouseEvent): void {
    if (this.disabled() || this.readonly()) {
      event.preventDefault();
      return;
    }
  }

  override writeValue(value: any): void {
    const checked = value === true;
    this.value = checked;
    this.checked.set(checked);
  }
}
