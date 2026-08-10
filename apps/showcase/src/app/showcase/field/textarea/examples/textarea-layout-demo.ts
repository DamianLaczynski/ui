import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TextareaComponent } from 'lui';

@Component({
  selector: 'app-textarea-layout-demo',
  standalone: true,
  imports: [TextareaComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:46rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="flex:1 1 15rem;min-width:14rem">
          <ui-textarea
            label="Compact note"
            size="small"
            inputVariant="filled-lighter"
            [rows]="3"
            placeholder="Add a short note"
          />
        </div>

        <div style="flex:1 1 15rem;min-width:14rem">
          <ui-textarea
            label="Sidebar brief"
            size="medium"
            inputVariant="filled-gray"
            [rows]="4"
            placeholder="Summarize the issue"
          />
        </div>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.9375rem;font-weight:600">Primary writing area</div>
        <ui-textarea
          label="Detailed description"
          size="large"
          inputVariant="filled"
          [rows]="8"
          placeholder="Describe the request, blockers, and expected outcome"
          helpText="Use a larger textarea when writing is the main task in the view."
        />
      </div>
    </div>
  `,
})
export class TextareaLayoutDemoComponent {}
