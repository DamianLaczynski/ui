import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProgressBarComponent } from 'ui';

@Component({
  selector: 'app-progress-bar-upload-queue-example',
  standalone: true,
  imports: [ProgressBarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:36rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div
        style="display:flex;justify-content:space-between;gap:1rem;align-items:flex-start;flex-wrap:wrap"
      >
        <div style="display:flex;flex-direction:column;gap:0.2rem">
          <div style="font-size:0.9375rem;font-weight:600">Upload queue</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            3 files active, 1 waiting for validation
          </div>
        </div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          8.4 MB / 12 MB
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:0.875rem">
        <div style="display:flex;flex-direction:column;gap:0.45rem">
          <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.8125rem">
            <span style="font-weight:600">hero-banner.png</span>
            <span>82%</span>
          </div>
          <ui-progress-bar
            variant="primary"
            [value]="82"
            ariaLabel="Uploading hero-banner.png"
            ariaValueText="82 percent uploaded"
          />
        </div>

        <div style="display:flex;flex-direction:column;gap:0.45rem">
          <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.8125rem">
            <span style="font-weight:600">quarterly-report.pdf</span>
            <span>Processing</span>
          </div>
          <ui-progress-bar
            variant="info"
            type="indeterminate"
            ariaLabel="Processing quarterly-report.pdf"
            ariaValueText="File uploaded, processing in progress"
          />
        </div>

        <div style="display:flex;flex-direction:column;gap:0.45rem">
          <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.8125rem">
            <span style="font-weight:600">avatar-export.zip</span>
            <span>Failed at 41%</span>
          </div>
          <ui-progress-bar
            variant="danger"
            [value]="41"
            ariaLabel="Upload failed for avatar-export.zip"
            ariaValueText="Upload failed at 41 percent"
          />
        </div>
      </div>
    </div>
  `,
})
export class ProgressBarUploadQueueExampleComponent {}
