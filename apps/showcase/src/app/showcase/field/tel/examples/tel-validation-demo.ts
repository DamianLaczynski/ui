import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, TelComponent } from 'ui';

@Component({
  selector: 'app-tel-validation-demo',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, TelComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <form
      [formGroup]="phoneForm"
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem"
      (ngSubmit)="markTouched()"
    >
      <ui-tel
        label="SMS verification number"
        placeholder="+1 (555) 123-4567"
        helpText="Required. Use at least 7 digits."
        formControlName="phone"
        [errorText]="phoneError"
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
export class TelValidationDemoComponent {
  protected readonly phoneForm = new FormGroup({
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(7)],
    }),
  });

  protected get phoneError(): string {
    const control = this.phoneForm.controls.phone;
    if (!control.touched && !control.dirty) {
      return '';
    }
    if (control.hasError('required')) {
      return 'Phone number is required.';
    }
    if (control.hasError('minlength')) {
      return 'Enter at least 7 characters.';
    }
    return '';
  }

  protected markTouched(): void {
    this.phoneForm.markAllAsTouched();
  }

  protected fillExample(): void {
    this.phoneForm.controls.phone.setValue('+48 600 700 800');
    this.phoneForm.controls.phone.markAsTouched();
  }
}
