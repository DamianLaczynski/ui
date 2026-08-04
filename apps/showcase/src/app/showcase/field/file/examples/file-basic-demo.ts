import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FileComponent } from 'ui';

@Component({
  selector: 'app-file-basic-demo',
  standalone: true,
  imports: [FileComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div
        style="flex:1 1 18rem;min-width:16rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Project brief</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            A roomy drop zone works well when upload is the primary action in the section.
          </div>
        </div>

        <ui-file
          label="Upload file"
          helpText="PDF, DOC, or DOCX up to 10 MB."
          accept=".pdf,.doc,.docx"
        />
      </div>

      <div
        style="flex:1 1 18rem;min-width:16rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Inline asset picker</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Inline mode fits compact forms, rows, and dialogs where upload is a secondary step.
          </div>
        </div>

        <ui-file
          mode="inline"
          label="Logo file"
          placeholder="Select a replacement logo"
          helpText="SVG or PNG."
          accept=".svg,.png"
        />
      </div>
    </div>
  `,
})
export class FileBasicDemoComponent {}
