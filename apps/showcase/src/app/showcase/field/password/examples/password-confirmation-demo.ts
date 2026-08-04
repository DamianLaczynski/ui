import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, PasswordComponent } from 'ui';

@Component({
  selector: 'app-password-confirmation-demo',
  standalone: true,
  imports: [ButtonComponent, PasswordComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <form
      [formGroup]="passwordForm"
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem"
      (ngSubmit)="markTouched()"
    >
      <ui-password
        label="New password"
        placeholder="Create password"
        autocomplete="new-password"
        formControlName="password"
        helpText="Use at least 8 characters."
        [errorText]="passwordError"
      />

      <ui-password
        label="Confirm password"
        placeholder="Repeat password"
        autocomplete="new-password"
        formControlName="confirmPassword"
        [helpText]="confirmHelpText"
        [errorText]="confirmError"
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
export class PasswordConfirmationDemoComponent {
  protected readonly passwordForm = new FormGroup({
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected get passwordError(): string {
    const control = this.passwordForm.controls.password;
    if (!control.touched && !control.dirty) {
      return '';
    }
    if (control.hasError('required')) {
      return 'Password is required.';
    }
    if (control.hasError('minlength')) {
      return 'Use at least 8 characters.';
    }
    return '';
  }

  protected get confirmError(): string {
    const control = this.passwordForm.controls.confirmPassword;
    if (!control.touched && !control.dirty) {
      return '';
    }
    if (control.hasError('required')) {
      return 'Confirm the password.';
    }
    if (control.value && control.value !== this.passwordForm.controls.password.value) {
      return 'Passwords do not match.';
    }
    return '';
  }

  protected get confirmHelpText(): string {
    const confirmValue = this.passwordForm.controls.confirmPassword.value;
    if (!confirmValue) {
      return 'Repeat the password exactly.';
    }
    return confirmValue === this.passwordForm.controls.password.value
      ? 'Passwords match.'
      : 'The value must match the first field.';
  }

  protected markTouched(): void {
    this.passwordForm.markAllAsTouched();
  }

  protected fillExample(): void {
    this.passwordForm.setValue({
      password: 'TeamPortal2026!',
      confirmPassword: 'TeamPortal2026!',
    });
    this.passwordForm.markAllAsTouched();
  }
}
