import { Component, OnInit, input, output, model } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContentPosition, InputVariant, Size } from '../../utils';
import { IconComponent } from '../../icon/icon.component';

export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'url'
  | 'search'
  | 'toggle'
  | 'switch'
  | 'date'
  | 'time'
  | 'datetime'
  | 'datetime-local'
  | 'week'
  | 'month'
  | 'year'
  | 'file'
  | 'color'
  | 'range'
  | 'slider'
  | 'number'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'radio-group'
  | 'radio-button-group';

@Component({
  selector: 'ui-field',
  templateUrl: './field.component.html',
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
  imports: [CommonModule, IconComponent],
})
export class FieldComponent implements ControlValueAccessor, OnInit {
  protected readonly messageIconSizePx = 12;

  fieldType = input<FieldType>('text');
  inputVariant = input<InputVariant>('filled');
  label = input<string>('');
  labelPosition = input<ContentPosition>('above');
  placeholder = input<string>('');
  helpText = input<string>('');
  errorText = model<string>('');
  required = input<boolean>(false);
  disabled = model<boolean>(false);
  readonly = model<boolean>(false);
  size = input<Size>('medium');
  name = input<string>('');
  id = model<string | number>('');
  autocomplete = input<string | null>(null);
  showClearButton = input<boolean>(true);
  ariaLabel = input<string>('');
  ariaDescribedBy = input<string>('');

  change = output<any>();
  focus = output<FocusEvent>();
  blur = output<FocusEvent>();
  keyup = output<KeyboardEvent>();
  keydown = output<KeyboardEvent>();

  value: any = '';
  protected _isFocused = false;

  protected onChange = (value: any) => {};
  protected onTouched = () => {};

  fieldClasses(): string {
    const classes = ['field'];

    classes.push(`field--${this.size()}`);

    if (this.disabled()) {
      classes.push('field--disabled');
    }

    return classes.join(' ');
  }

  get wrapperClasses(): string {
    const classes = [`input-wrapper--${this.size()}`, `input-wrapper--${this.inputVariant()}`];

    if (this.disabled()) {
      classes.push('input-wrapper--disabled');
    }

    if (this.readonly()) {
      classes.push('input-wrapper--read-only');
    }

    if (this.errorText()) {
      classes.push('input-wrapper--error');
    }

    return classes.join(' ');
  }

  get labelClasses(): string {
    const classes = [`field-label--${this.size()}`];

    if (this.disabled()) {
      classes.push('field-label--disabled');
    }

    if (this.required()) {
      classes.push('field-label--required');
    }

    return classes.join(' ');
  }

  isFocused(): boolean {
    return this._isFocused;
  }

  getTabIndex(): number {
    return this.disabled() || this.readonly() ? -1 : 0;
  }

  ngOnInit(): void {
    if (!this.id()) {
      if (this.name()) {
        this.id.set(this.name());
      } else {
        this.id.set(this.generateFieldId());
      }
    }
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    this.value = target.value;
    this.onChange(this.value);
    this.change.emit(this.value);
  }

  onFocus(event: FocusEvent): void {
    this._isFocused = true;
    this.focus.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this._isFocused = false;
    this.onTouched();
    this.blur.emit(event);
  }

  onKeyUp(event: KeyboardEvent): void {
    this.keyup.emit(event);
  }

  onKeyDown(event: KeyboardEvent): void {
    this.keydown.emit(event);
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  setReadOnlyState(isReadOnly: boolean): void {
    this.readonly.set(isReadOnly);
  }

  private generateFieldId(): string {
    return `field-${Math.random().toString(36).substr(2, 9)}`;
  }

  clear(): void {
    this.value = '';
    this.onChange(this.value);
    this.change.emit(this.value);
  }

  getLabelElementId(): string | null {
    const id = this.id();
    if (!id || !this.label()) {
      return null;
    }

    return `${id}-label`;
  }

  getHelpTextElementId(): string | null {
    const id = this.id();
    if (!id || !this.helpText() || !!this.errorText()) {
      return null;
    }

    return `${id}-help`;
  }

  getErrorTextElementId(): string | null {
    const id = this.id();
    if (!id || !this.errorText()) {
      return null;
    }

    return `${id}-error`;
  }

  getComputedAriaDescribedBy(): string | null {
    const ids = [
      this.ariaDescribedBy()?.trim() || null,
      this.getHelpTextElementId(),
      this.getErrorTextElementId(),
    ].filter((v): v is string => !!v);

    if (!ids.length) {
      return null;
    }

    return Array.from(new Set(ids)).join(' ');
  }

  getComputedAriaLabel(): string | null {
    const explicit = this.ariaLabel()?.trim();
    if (explicit) {
      return explicit;
    }

    const fallback = this.label()?.trim();
    return fallback || null;
  }
}
