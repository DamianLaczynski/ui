import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, PasswordComponent } from 'lui';

@Component({
  selector: 'app-password-reset-panel-demo',
  standalone: true,
  imports: [ButtonComponent, PasswordComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <form
      [formGroup]="resetForm"
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.375rem">
        <div style="font-size:1rem;font-weight:600">Reset workspace password</div>
        <div
          style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest);line-height:1.45"
        >
          A realistic reset flow usually combines the current password, a new password, and short
          policy guidance in one contained surface.
        </div>
      </div>

      <ui-password
        label="Current password"
        placeholder="Enter current password"
        autocomplete="current-password"
        formControlName="currentPassword"
      />

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem">
        <ui-password
          label="New password"
          placeholder="Create new password"
          autocomplete="new-password"
          formControlName="newPassword"
          helpText="Use at least 8 characters and avoid reusing the current password."
        />

        <ui-password
          label="Confirm password"
          placeholder="Repeat new password"
          autocomplete="new-password"
          formControlName="confirmPassword"
          [errorText]="confirmError"
          [helpText]="confirmHelpText"
        />
      </div>

      <div
        style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary" [disabled]="resetForm.invalid || !!confirmError">
          Update password
        </ui-button>
        <ui-button
          type="button"
          variant="secondary"
          appearance="outline"
          (click)="resetForm.reset(defaults)"
        >
          Reset values
        </ui-button>
      </div>
    </form>
  `,
})
export class PasswordResetPanelDemoComponent {
  protected readonly defaults = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  protected readonly resetForm = new FormGroup({
    currentPassword: new FormControl(this.defaults.currentPassword, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    newPassword: new FormControl(this.defaults.newPassword, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
    confirmPassword: new FormControl(this.defaults.confirmPassword, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected get confirmError(): string {
    const confirmValue = this.resetForm.controls.confirmPassword.value;
    if (!confirmValue) {
      return '';
    }
    return confirmValue === this.resetForm.controls.newPassword.value
      ? ''
      : 'Passwords do not match.';
  }

  protected get confirmHelpText(): string {
    const confirmValue = this.resetForm.controls.confirmPassword.value;
    if (!confirmValue) {
      return 'Repeat the new password.';
    }
    return confirmValue === this.resetForm.controls.newPassword.value
      ? 'Ready to update.'
      : 'Use the same value as the new password field.';
  }
}
