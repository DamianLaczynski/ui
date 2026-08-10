import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccordionComponent } from 'lui';

@Component({
  selector: 'app-accordion-basic-example',
  standalone: true,
  imports: [AccordionComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:38rem">
      <ui-accordion label="What is included in the Pro plan?">
        <div style="display:flex;flex-direction:column;gap:0.5rem">
          <p style="margin:0;color:var(--color-neutral-foreground-rest)">
            Pro includes team workspaces, advanced permissions, export tools, and audit history.
          </p>
          <p style="margin:0;color:var(--color-neutral-foreground2-rest)">
            Use concise headers so users can scan several collapsed sections quickly before opening
            one.
          </p>
        </div>
      </ui-accordion>

      <ui-accordion label="Can I change billing later?">
        <div style="display:flex;flex-direction:column;gap:0.5rem">
          <p style="margin:0;color:var(--color-neutral-foreground-rest)">
            Yes. Billing cadence can be changed from the subscription panel without recreating the
            workspace.
          </p>
        </div>
      </ui-accordion>
    </div>
  `,
})
export class AccordionBasicExampleComponent {}
