import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, UrlComponent } from 'ui';

@Component({
  selector: 'app-url-validation-demo',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, UrlComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <form
      [formGroup]="linkForm"
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem"
      (ngSubmit)="markTouched()"
    >
      <ui-url
        label="Design source URL"
        placeholder="https://www.figma.com/file/..."
        helpText="Required. Use a full URL to the working source."
        formControlName="sourceUrl"
        [errorText]="sourceError"
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
export class UrlValidationDemoComponent {
  protected readonly linkForm = new FormGroup({
    sourceUrl: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected get sourceError(): string {
    const control = this.linkForm.controls.sourceUrl;
    if (!control.touched && !control.dirty) {
      return '';
    }
    if (control.hasError('required')) {
      return 'URL is required.';
    }
    if (control.value && !/^https?:\/\//i.test(control.value)) {
      return 'Use a full URL starting with http:// or https://.';
    }
    return '';
  }

  protected markTouched(): void {
    this.linkForm.markAllAsTouched();
  }

  protected fillExample(): void {
    this.linkForm.controls.sourceUrl.setValue('https://www.figma.com/file/abc123/project-system');
    this.linkForm.controls.sourceUrl.markAsTouched();
  }
}
