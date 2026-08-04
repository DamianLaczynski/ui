import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, FileComponent } from 'ui';

@Component({
  selector: 'app-file-request-panel-demo',
  standalone: true,
  imports: [ButtonComponent, FileComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.375rem">
        <div style="font-size:1rem;font-weight:600">Client handoff package</div>
        <div
          style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest);line-height:1.45"
        >
          Collect the signed deck, export archive, and any screenshots before publishing the final
          delivery package.
        </div>
      </div>

      <ui-file
        label="Primary files"
        [multiple]="true"
        [maxFiles]="5"
        accept=".pdf,.zip,.png,.jpg"
        uploadText="Upload handoff materials"
        uploadHint="Signed deck, ZIP export, screenshots."
        [(ngModel)]="handoffFiles"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-file
        label="Release note"
        mode="inline"
        accept=".txt,.md,.pdf"
        placeholder="Optional release note"
        [(ngModel)]="releaseNote"
        [ngModelOptions]="{ standalone: true }"
      />

      <div
        style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary">Send package</ui-button>
        <ui-button type="button" variant="secondary" appearance="outline">Save draft</ui-button>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          {{ handoffFiles.length }} file{{ handoffFiles.length === 1 ? '' : 's' }} ready for review
        </div>
      </div>
    </div>
  `,
})
export class FileRequestPanelDemoComponent {
  protected handoffFiles: File[] = [
    new File(['summary'], 'release-summary.pdf', { type: 'application/pdf' }),
    new File(['archive'], 'workspace-export.zip', { type: 'application/zip' }),
  ];

  protected releaseNote: File | null = null;
}
