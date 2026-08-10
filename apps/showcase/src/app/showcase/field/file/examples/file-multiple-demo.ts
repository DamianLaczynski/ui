import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, FileComponent } from 'lui';

@Component({
  selector: 'app-file-multiple-demo',
  standalone: true,
  imports: [ButtonComponent, FileComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div style="flex:1 1 22rem;min-width:18rem;max-width:34rem">
        <ui-file
          label="Upload supporting files"
          [multiple]="true"
          [maxFiles]="5"
          accept=".pdf,.png,.jpg,.zip"
          uploadText="Drop files here or browse from your device"
          uploadHint="Up to 5 files. ZIP, PDF, PNG, JPG."
          [(ngModel)]="files"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>

      <div
        style="flex:0 0 17rem;display:flex;flex-direction:column;gap:0.75rem;min-width:15rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Selection
        </p>

        <div
          style="display:flex;flex-direction:column;gap:0.5rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Files</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              files.length
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Total size</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              formatBytes(totalBytes)
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Last file</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              files.at(-1)?.name ?? 'None'
            }}</strong>
          </div>
        </div>

        <div
          style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;padding-top:0.75rem;border-top:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 65%,transparent)"
        >
          <ui-button type="button" variant="secondary" appearance="outline" (click)="seedFiles()">
            Load example files
          </ui-button>
          <ui-button type="button" appearance="subtle" (click)="files = []">Clear</ui-button>
        </div>
      </div>
    </div>
  `,
})
export class FileMultipleDemoComponent {
  protected files: File[] = [
    new File(['roadmap'], 'roadmap.pdf', { type: 'application/pdf' }),
    new File(['image'], 'hero-banner.png', { type: 'image/png' }),
  ];

  protected get totalBytes(): number {
    return this.files.reduce((sum, file) => sum + file.size, 0);
  }

  protected seedFiles(): void {
    this.files = [
      new File(['brief'], 'brief-v3.pdf', { type: 'application/pdf' }),
      new File(['archive'], 'source-files.zip', { type: 'application/zip' }),
      new File(['preview'], 'mobile-preview.jpg', { type: 'image/jpeg' }),
    ];
  }

  protected formatBytes(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
