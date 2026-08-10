import {
  Component,
  ElementRef,
  forwardRef,
  ViewChildren,
  QueryList,
  inject,
  signal,
  computed,
  input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FieldComponent } from '../field/field.component';
import { CommonModule } from '@angular/common';
import { UiI18nService } from '../../../i18n';

@Component({
  selector: 'ui-totp',

  imports: [FieldComponent, CommonModule],
  templateUrl: './totp.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TotpComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class TotpComponent
  extends FieldComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly document = inject(DOCUMENT);
  private readonly i18n = inject(UiI18nService);
  private readonly groupAriaLabelI18n = this.i18n.tSignal(
    'field.totp.groupAriaLabel',
    'Verification code',
  );

  digitsCount = input<number>(6);
  groupAriaLabel = input<string>('');

  @ViewChildren('digitInput') digitInputs!: QueryList<ElementRef<HTMLInputElement>>;

  // Internal state for each digit
  digits = signal<string[]>(['', '', '', '', '', '']);

  // Computed full code value
  fullCode = computed(() => {
    return this.digits().join('');
  });

  readonly totpContainerClasses = computed(() => {
    return `totp-container totp-container--${this.size()}`;
  });

  readonly totpInputWrapperClasses = computed(() => {
    const classes = [
      'input-wrapper',
      'totp-input-wrapper',
      `input-wrapper--${this.size()}`,
      `input-wrapper--${this.inputVariant()}`,
    ];

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
  });

  override ngOnInit(): void {
    super.ngOnInit();
    this.syncDigitsLength();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['digitsCount'] && !changes['digitsCount'].firstChange) {
      this.syncDigitsLength();
      this.updateValue();
    }
  }

  onDigitInput(event: Event, index: number): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    // Only allow single digit (0-9)
    if (value.length > 1) {
      // Handle paste - split into digits
      const digits = value.replace(/\D/g, '').slice(0, this.digitsCount());
      this.fillDigits(digits);
      return;
    }

    // Only allow numeric input
    if (value && !/^\d$/.test(value)) {
      target.value = this.digits()[index];
      return;
    }

    // Update digit
    const currentDigits = [...this.digits()];
    currentDigits[index] = value;
    this.digits.set(currentDigits);

    // Move to next field if digit entered
    if (value && index < this.digitsCount() - 1) {
      this.focusCodeNext(index);
    }

    // Update value and emit
    this.updateValue();
  }

  onDigitKeyDown(event: KeyboardEvent, index: number): void {
    const target = event.target as HTMLInputElement;

    // Handle backspace
    if (event.key === 'Backspace') {
      const currentValue = this.digits()[index];

      // If field has value, allow default behavior to clear it
      // The onInput handler will update our state
      if (currentValue) {
        // Don't prevent default - let browser clear the input normally
        // The input event will handle state update
      }
      // If field is empty, move to previous and clear it
      else if (index > 0) {
        event.preventDefault();
        const currentDigits = [...this.digits()];
        currentDigits[index - 1] = '';
        this.digits.set(currentDigits);
        this.updateValue();

        // Update the previous input element value
        const prevInput = this.digitInputs.toArray()[index - 1];
        if (prevInput) {
          prevInput.nativeElement.value = '';
        }

        this.focusCodePrevious(index);
      }
    }
    // Handle delete - clear current and stay
    else if (event.key === 'Delete') {
      const currentDigits = [...this.digits()];
      currentDigits[index] = '';
      this.digits.set(currentDigits);
      this.updateValue();
    }
    // Handle arrow keys
    else if (event.key === 'ArrowLeft' && this.canMovePrevious(index)) {
      event.preventDefault();
      this.focusPrevious(index);
    } else if (event.key === 'ArrowRight' && this.canMoveNext(index)) {
      event.preventDefault();
      this.focusNext(index);
    }
    // Handle paste
    else if (event.ctrlKey && event.key === 'v') {
      // Let paste happen, then handle in onPaste
    }
  }

  onDigitPaste(event: ClipboardEvent, index: number): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    const digits = pastedData.replace(/\D/g, '').slice(0, this.digitsCount());

    if (digits.length > 0) {
      this.fillDigits(digits, index);
    }
  }

  onDigitFocus(event: FocusEvent): void {
    super.onFocus(event);
    const target = event.target as HTMLInputElement;
    // Select all text on focus for easy replacement
    target.select();
  }

  getContainerAriaLabelledBy(): string | null {
    return this.getLabelElementId();
  }

  getContainerAriaLabel(): string | null {
    if (this.label()) {
      return null;
    }

    const explicitAriaLabel = this.ariaLabel().trim();
    if (explicitAriaLabel) {
      return explicitAriaLabel;
    }

    const explicitGroupAriaLabel = this.groupAriaLabel().trim();
    if (explicitGroupAriaLabel) {
      return explicitGroupAriaLabel;
    }

    return this.groupAriaLabelI18n();
  }

  getDigitAriaLabel(index: number): string {
    return this.i18n.t('field.totp.digitAriaLabel', `Digit ${index + 1} of ${this.digitsCount()}`, {
      index: index + 1,
      count: this.digitsCount(),
    });
  }

  getDigitPlaceholder(index: number): string | null {
    const placeholder = this.placeholder();
    if (!placeholder) {
      return null;
    }

    if (placeholder.length === this.digitsCount()) {
      return placeholder[index] || null;
    }

    if (placeholder.length === 1) {
      return placeholder;
    }

    return null;
  }

  private fillDigits(digits: string, startIndex: number = 0): void {
    const currentDigits = [...this.digits()];
    const count = this.digitsCount();

    for (let i = 0; i < digits.length && startIndex + i < count; i++) {
      currentDigits[startIndex + i] = digits[i];
    }

    this.digits.set(currentDigits);
    this.updateValue();

    // Focus the next empty field or the last field
    const nextIndex = Math.min(startIndex + digits.length, count - 1);
    setTimeout(() => {
      this.focusInput(nextIndex);
    }, 0);
  }

  private focusNext(currentIndex: number): void {
    const targetIndex = this.isRtl() ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex >= 0 && targetIndex < this.digitsCount()) {
      this.focusInput(targetIndex);
    }
  }

  private focusPrevious(currentIndex: number): void {
    const targetIndex = this.isRtl() ? currentIndex + 1 : currentIndex - 1;
    if (targetIndex >= 0 && targetIndex < this.digitsCount()) {
      this.focusInput(targetIndex);
    }
  }

  private focusCodeNext(currentIndex: number): void {
    const targetIndex = currentIndex + 1;
    if (targetIndex >= 0 && targetIndex < this.digitsCount()) {
      this.focusInput(targetIndex);
    }
  }

  private focusCodePrevious(currentIndex: number): void {
    const targetIndex = currentIndex - 1;
    if (targetIndex >= 0 && targetIndex < this.digitsCount()) {
      this.focusInput(targetIndex);
    }
  }

  private focusInput(index: number): void {
    const inputs = this.digitInputs.toArray();
    if (inputs[index]) {
      inputs[index].nativeElement.focus();
    }
  }

  private updateValue(): void {
    const code = this.fullCode();
    this.value = code;
    this.onChange(code);
    this.change.emit(code);
  }

  private syncDigitsLength(): void {
    const count = Math.max(1, this.digitsCount());
    const current = this.digits();
    const next = new Array(count).fill('');

    for (let i = 0; i < count && i < current.length; i++) {
      next[i] = current[i];
    }

    this.digits.set(next);
  }

  override writeValue(value: any): void {
    if (!value) {
      this.syncDigitsLength();
      this.value = '';
      return;
    }

    const valueStr = String(value).replace(/\D/g, '');
    const count = this.digitsCount();
    const digits = valueStr.slice(0, count).split('');

    // Pad with empty strings if needed
    while (digits.length < count) {
      digits.push('');
    }

    this.digits.set(digits.slice(0, count));
    this.value = this.fullCode();
  }

  private canMovePrevious(index: number): boolean {
    if (this.isRtl()) {
      return index < this.digitsCount() - 1;
    }

    return index > 0;
  }

  private canMoveNext(index: number): boolean {
    if (this.isRtl()) {
      return index > 0;
    }

    return index < this.digitsCount() - 1;
  }

  private isRtl(): boolean {
    const hostElement = this.host.nativeElement;
    const computedDirection = getComputedStyle(hostElement).direction;
    if (computedDirection === 'rtl') {
      return true;
    }

    if (hostElement.closest('[dir="rtl"]')) {
      return true;
    }

    return this.document?.documentElement?.dir === 'rtl';
  }
}
