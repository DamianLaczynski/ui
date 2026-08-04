import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FileComponent } from 'ui';

@Component({
  selector: 'app-file-layout-demo',
  standalone: true,
  imports: [FileComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:46rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="flex:1 1 15rem;min-width:14rem">
          <ui-file
            label="Compact receipt"
            labelPosition="above"
            mode="inline"
            size="small"
            inputVariant="filled-lighter"
            placeholder="Attach receipt"
          />
        </div>

        <div style="flex:1 1 15rem;min-width:14rem">
          <ui-file
            label="Contract scan"
            labelPosition="before"
            mode="inline"
            size="medium"
            inputVariant="filled"
            placeholder="Choose file"
          />
        </div>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.9375rem;font-weight:600">Large upload step</div>
        <ui-file
          label="Campaign assets"
          size="large"
          inputVariant="filled"
          helpText="Use the larger surface when upload is the main task in the view."
          uploadText="Click to upload campaign assets or drag them here"
          uploadHint="PNG, JPG, MP4 files up to 25 MB"
          accept="image/*,video/*"
        />
      </div>
    </div>
  `,
})
export class FileLayoutDemoComponent {}
