import { Component } from '@angular/core';
import { TextareaComponent } from 'ui';

@Component({
  selector: 'app-textarea-resize-demo',
  standalone: true,
  imports: [TextareaComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1.5rem;width:100%;max-width:56rem">
      <div
        style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;width:100%"
      >
        <ui-textarea
          label="No resize (default)"
          resize="none"
          [rows]="4"
          placeholder="Fixed writing area"
          helpText="Fluent 2 default. Overflow scrolls inside the field."
        />

        <ui-textarea
          label="Vertical resize"
          resize="vertical"
          [rows]="4"
          placeholder="Drag the bottom edge"
          helpText="Use when users may need more vertical room while typing."
        />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Horizontal resize starts narrower than the container so you can drag the handle to the
          right.
        </div>

        <ui-textarea
          label="Horizontal resize"
          resize="horizontal"
          [rows]="4"
          placeholder="Drag the right edge"
          helpText="Rare, but useful in wide authoring layouts."
        />

        <ui-textarea
          label="Both directions"
          resize="both"
          [rows]="4"
          placeholder="Drag any corner handle"
          helpText="Gives the most control over visible writing space."
        />
      </div>
    </div>
  `,
})
export class TextareaResizeDemoComponent {}
