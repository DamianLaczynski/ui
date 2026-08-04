import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, TextareaComponent } from 'ui';

@Component({
  selector: 'app-textarea-validation-demo',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, TextareaComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <form
      [formGroup]="feedbackForm"
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem"
      (ngSubmit)="markTouched()"
    >
      <ui-textarea
        label="Reason for escalation"
        placeholder="Explain why this item should be escalated"
        [rows]="5"
        helpText="Required. Use at least 20 characters."
        formControlName="reason"
        [errorText]="reasonError"
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
export class TextareaValidationDemoComponent {
  protected readonly feedbackForm = new FormGroup({
    reason: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(20)],
    }),
  });

  protected get reasonError(): string {
    const control = this.feedbackForm.controls.reason;
    if (!control.touched && !control.dirty) {
      return '';
    }
    if (control.hasError('required')) {
      return 'Reason is required.';
    }
    if (control.hasError('minlength')) {
      return 'Use at least 20 characters.';
    }
    return '';
  }

  protected markTouched(): void {
    this.feedbackForm.markAllAsTouched();
  }

  protected fillExample(): void {
    this.feedbackForm.controls.reason.setValue(
      'Escalating because the incident affects multiple enterprise customers and blocks checkout.',
    );
    this.feedbackForm.controls.reason.markAsTouched();
  }
}
