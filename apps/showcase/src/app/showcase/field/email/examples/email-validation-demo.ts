import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, EmailComponent } from 'ui';

@Component({
  selector: 'app-email-validation-demo',
  standalone: true,
  imports: [EmailComponent, ButtonComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <form
      [formGroup]="inviteForm"
      style="display:grid;gap:1rem;max-width:34rem"
      (ngSubmit)="markTouched()"
    >
      <ui-email
        label="Invite email"
        placeholder="person@company.com"
        helpText="Required. Must be a valid business email."
        formControlName="inviteEmail"
        [errorText]="emailError"
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
export class EmailValidationDemoComponent {
  protected readonly inviteForm = new FormGroup({
    inviteEmail: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  protected get emailError(): string {
    const control = this.inviteForm.controls.inviteEmail;
    if (!control.touched && !control.dirty) {
      return '';
    }
    if (control.hasError('required')) {
      return 'Email is required.';
    }
    if (control.hasError('email')) {
      return 'Enter a valid email address.';
    }
    return '';
  }

  protected markTouched(): void {
    this.inviteForm.markAllAsTouched();
  }

  protected fillExample(): void {
    this.inviteForm.controls.inviteEmail.setValue('sam.rivers@contoso.com');
    this.inviteForm.controls.inviteEmail.markAsTouched();
  }
}
