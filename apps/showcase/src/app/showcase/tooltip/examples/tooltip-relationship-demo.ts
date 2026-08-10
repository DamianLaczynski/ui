import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, TooltipDirective } from 'lui';

@Component({
  selector: 'app-tooltip-relationship-example',
  standalone: true,
  imports: [ButtonComponent, TooltipDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:34rem">
      <div
        style="display:flex;flex-direction:column;gap:0.375rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Description relationship</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Visible label stays primary, tooltip adds supporting context.
        </div>
        <ui-button
          type="button"
          appearance="outline"
          uiTooltip="Runs only checks impacted by files changed in the current branch."
          uiTooltipRelationship="description"
        >
          Smart test run
        </ui-button>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.375rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Label relationship</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Use only when the trigger itself does not expose a sufficient accessible name.
        </div>
        <ui-button
          type="button"
          icon="info"
          shape="circular"
          appearance="subtle"
          uiTooltip="Billing policy details"
          uiTooltipRelationship="label"
        ></ui-button>
      </div>
    </div>
  `,
})
export class TooltipRelationshipExampleComponent {}
