import { Component, forwardRef, input, ViewChildren, QueryList, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ButtonComponent } from '../../button';
import { FieldComponent } from '../field/field.component';
import { Orientation, Variant, Appearance, Shape, SegmentLayout } from '../../utils';
import { IconName } from '../../icon';

export interface RadioButtonItem {
  id: string | number;
  label: string;
  value: unknown;
  icon?: IconName;
  ariaLabel?: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-radio-button-group',
  imports: [CommonModule, FieldComponent, ButtonComponent],
  templateUrl: './radio-button-group.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonGroupComponent),
      multi: true,
    },
  ],
})
export class RadioButtonGroupComponent extends FieldComponent implements ControlValueAccessor {
  @ViewChildren(ButtonComponent) private buttonComponents!: QueryList<ButtonComponent>;

  private doc = inject(DOCUMENT, { optional: true });

  items = input<RadioButtonItem[]>([]);
  orientation = input<Orientation>('horizontal');
  variant = input<Variant>('primary');
  appearance = input<Appearance>('subtle');
  shape = input<Shape>('rounded');
  layout = input<SegmentLayout>('segmented');

  override get wrapperClasses(): string {
    const classes = ['radio-button-group'];
    classes.push(`radio-button-group--${this.orientation()}`);
    classes.push(`radio-button-group--${this.size()}`);
    classes.push(`radio-button-group--${this.shape()}`);
    classes.push(`radio-button-group--${this.variant()}`);
    classes.push(`radio-button-group--${this.appearance()}`);
    classes.push(`radio-button-group--${this.layout()}`);
    if (this.disabled()) {
      classes.push('radio-button-group--disabled');
    }
    if (this.readonly()) {
      classes.push('radio-button-group--readonly');
    }
    return classes.join(' ');
  }

  isSelected(itemValue: unknown): boolean {
    return this.value === itemValue;
  }

  getItemAppearance(itemValue: unknown): Appearance {
    if (!this.isSelected(itemValue)) {
      return this.layout() === 'separate' ? 'subtle' : 'transparent';
    }

    return this.appearance();
  }

  onItemSelect(selectedValue: unknown): void {
    if (this.disabled() || this.readonly()) {
      return;
    }
    this.value = selectedValue;
    this.onChange(selectedValue);
    this.onTouched();
    this.change.emit(selectedValue);
  }

  getButtonTabIndex(index: number): number {
    if (this.disabled() || this.readonly()) {
      return -1;
    }

    const items = this.items();
    const selectedIndex = this.getSelectedIndex();
    const focusable = this.getFocusableIndices();
    if (focusable.length === 0) return -1;

    const isSelectedEnabled =
      selectedIndex >= 0 && selectedIndex < items.length && !items[selectedIndex].disabled;

    const tabIndexZero = isSelectedEnabled ? selectedIndex : focusable[0];
    return index === tabIndexZero ? 0 : -1;
  }

  private getSelectedIndex(): number {
    const idx = this.items().findIndex(it => it.value === this.value);
    return idx >= 0 ? idx : 0;
  }

  private getFocusableIndices(): number[] {
    return this.items()
      .map((item, i) => (this.disabled() || item.disabled ? -1 : i))
      .filter(i => i >= 0);
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) return;
    const focusable = this.getFocusableIndices();
    if (focusable.length === 0) return;

    const isHorizontal = this.orientation() === 'horizontal';
    const currentIndex = this.getFocusedButtonIndex();
    let nextIndex: number | null = null;

    if (isHorizontal) {
      if (event.key === 'ArrowLeft') {
        nextIndex = this.getPrevIndex(focusable, currentIndex);
        event.preventDefault();
      } else if (event.key === 'ArrowRight') {
        nextIndex = this.getNextIndex(focusable, currentIndex);
        event.preventDefault();
      }
    } else {
      if (event.key === 'ArrowUp') {
        nextIndex = this.getPrevIndex(focusable, currentIndex);
        event.preventDefault();
      } else if (event.key === 'ArrowDown') {
        nextIndex = this.getNextIndex(focusable, currentIndex);
        event.preventDefault();
      }
    }

    if (nextIndex !== null) {
      const item = this.items()[nextIndex];
      if (item && !item.disabled) {
        this.onItemSelect(item.value);
        this.buttonComponents?.get(nextIndex)?.focus();
      }
    }
  }

  private getFocusedButtonIndex(): number {
    const list = this.buttonComponents;
    if (!list?.length) return 0;
    const active = this.doc?.activeElement;
    if (!active) return this.getSelectedIndex();
    for (let i = 0; i < list.length; i++) {
      if (list.get(i)?.contains(active)) return i;
    }
    return this.getSelectedIndex();
  }

  private getNextIndex(focusable: number[], current: number): number {
    const idx = focusable.indexOf(current);
    if (idx < 0) return focusable[0];
    if (idx >= focusable.length - 1) return focusable[focusable.length - 1];
    return focusable[idx + 1];
  }

  private getPrevIndex(focusable: number[], current: number): number {
    const idx = focusable.indexOf(current);
    if (idx <= 0) return focusable[0];
    return focusable[idx - 1];
  }
}
