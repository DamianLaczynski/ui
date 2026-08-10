import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, FileComponent } from 'lui';

@Component({
  selector: 'app-file-form-demo',
  standalone: true,
  imports: [ButtonComponent, FileComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <form
      [formGroup]="uploadForm"
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:54rem"
    >
      <div
        style="flex:1 1 22rem;min-width:18rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Workspace asset update</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Pair a single cover asset with a multi-file attachment group inside one reactive form.
          </div>
        </div>

        <ui-file
          label="Cover image"
          formControlName="coverImage"
          accept="image/*"
          mode="inline"
          placeholder="Choose cover image"
          helpText="Recommended size: 1600 x 900 px."
        />

        <ui-file
          label="Reference files"
          formControlName="attachments"
          [multiple]="true"
          [maxFiles]="4"
          accept=".pdf,.fig,.zip,.png"
          uploadText="Upload files for review"
          uploadHint="Up to 4 files."
        />

        <div
          style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <ui-button type="button" variant="primary">Save draft</ui-button>
          <ui-button type="button" variant="secondary" appearance="outline"
            >Send for review</ui-button
          >
          <ui-button type="button" appearance="subtle" (click)="resetForm()">Reset</ui-button>
        </div>
      </div>

      <div
        style="flex:0 0 18rem;min-width:16rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Form values
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.5rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Cover image</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              uploadForm.controls.coverImage.value?.name ?? 'None'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Attachments</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              uploadForm.controls.attachments.value?.length ?? 0
            }}</strong>
          </div>
          <div
            style="margin-top:0.25rem;padding-top:0.5rem;font-size:0.75rem;color:var(--color-neutral-foreground2-rest);border-top:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 65%,transparent)"
          >
            Use this pattern when the upload is only one part of a larger form flow.
          </div>
        </div>
      </div>
    </form>
  `,
})
export class FileFormDemoComponent {
  protected readonly uploadForm = new FormGroup({
    coverImage: new FormControl<File | null>(
      new File(['cover'], 'cover-image.png', { type: 'image/png' }),
    ),
    attachments: new FormControl<File[] | null>([
      new File(['brief'], 'campaign-brief.pdf', { type: 'application/pdf' }),
    ]),
  });

  protected resetForm(): void {
    this.uploadForm.reset({
      coverImage: null,
      attachments: [],
    });
  }
}
