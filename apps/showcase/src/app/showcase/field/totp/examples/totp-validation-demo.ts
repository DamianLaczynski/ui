import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, TotpComponent } from 'lui';

@Component({
  selector: 'app-totp-validation-demo',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, TotpComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <form
      [formGroup]="verifyForm"
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem"
      (ngSubmit)="markTouched()"
    >
      <ui-totp
        label="SMS code"
        [digitsCount]="6"
        helpText="Required. Enter the full 6-digit code."
        formControlName="code"
        [errorText]="codeError"
      />

      <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
        <ui-button type="submit">Validate</ui-button>
        <ui-button type="button" appearance="outline" (click)="fillExample()"
          >Use example</ui-button
        >
      </div>
    </form>
  `,
})
export class TotpValidationDemoComponent {
  protected readonly verifyForm = new FormGroup({
    code: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    }),
  });

  protected get codeError(): string {
    const control = this.verifyForm.controls.code;
    if (!control.touched && !control.dirty) {
      return '';
    }
    if (control.hasError('required')) {
      return 'Verification code is required.';
    }
    if (control.hasError('minlength') || control.hasError('maxlength')) {
      return 'Enter all 6 digits.';
    }
    return '';
  }

  protected markTouched(): void {
    this.verifyForm.markAllAsTouched();
  }

  protected fillExample(): void {
    this.verifyForm.controls.code.setValue('482915');
    this.verifyForm.controls.code.markAsTouched();
  }
}
