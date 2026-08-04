import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TagComponent } from 'ui';

@Component({
  selector: 'app-tag-workspace-panel-demo',
  standalone: true,
  imports: [TagComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.375rem">
        <div style="font-size:1rem;font-weight:600">Project metadata card</div>
        <div
          style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest);line-height:1.45"
        >
          Tags often work best as compact metadata inside a richer surface, not as isolated
          decorative chips.
        </div>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:flex-start">
        <ui-tag
          text="Enterprise"
          appearance="filled"
          variant="secondary"
          icon="building_bank_toolbox"
        />
        <ui-tag text="Launch ready" appearance="filled" variant="success" icon="checkmark" />
        <ui-tag text="Security review" appearance="tint" variant="warning" icon="shield" />
        <ui-tag
          text="Tracked"
          secondaryText="JIRA-214"
          appearance="outline"
          variant="info"
          icon="ticket_diagonal"
        />
      </div>

      <div
        style="padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.9375rem;font-weight:600">Next milestone</div>
        <div
          style="margin-top:0.375rem;font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest)"
        >
          Finalize the review package and confirm launch blockers before the Friday release window.
        </div>
      </div>
    </div>
  `,
})
export class TagWorkspacePanelDemoComponent {}
