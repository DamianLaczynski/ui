import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, FileComponent } from 'ui';

@Component({
  selector: 'app-file-states-validation-demo',
  standalone: true,
  imports: [ButtonComponent, FileComponent, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:48rem">
      <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start">
        <div style="flex:1 1 20rem;min-width:16rem">
          <ui-file
            label="Signed approval"
            [formControl]="requiredFileControl"
            helpText="Required before publishing."
            accept=".pdf"
          />
        </div>

        <div style="flex:1 1 20rem;min-width:16rem;display:flex;flex-direction:column;gap:1rem">
          <ui-file
            mode="inline"
            label="Readonly archive"
            [readonly]="true"
            [(ngModel)]="readonlyFile"
            [ngModelOptions]="{ standalone: true }"
          />

          <ui-file
            label="Disabled upload"
            [disabled]="true"
            uploadText="Upload is disabled for archived records"
            uploadHint="Contact an administrator to change files."
          />
        </div>
      </div>

      <div
        style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary" (click)="validateRequiredFile()">
          Validate required upload
        </ui-button>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Readonly keeps the current file visible. Disabled removes interaction entirely.
        </span>
      </div>
    </div>
  `,
})
export class FileStatesValidationDemoComponent {
  protected readonly requiredFileControl = new FormControl<File | null>(null, {
    validators: [Validators.required],
  });

  protected readonly readonlyFile = new File(['copy'], 'archived-brief.pdf', {
    type: 'application/pdf',
  });

  protected validateRequiredFile(): void {
    this.requiredFileControl.markAsTouched();
    this.requiredFileControl.updateValueAndValidity();
  }
}
