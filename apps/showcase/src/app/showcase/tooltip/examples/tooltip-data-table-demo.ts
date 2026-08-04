import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, TooltipDirective } from 'ui';

@Component({
  selector: 'app-tooltip-data-table-example',
  standalone: true,
  imports: [ButtonComponent, TooltipDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.5rem;width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div
        style="display:grid;grid-template-columns:minmax(0,1.5fr) minmax(8rem,0.9fr) auto;gap:0.75rem;padding-bottom:0.5rem;border-bottom:1px solid var(--color-neutral-stroke-rest);font-size:0.75rem;font-weight:600;color:var(--color-neutral-foreground2-rest);text-transform:uppercase;letter-spacing:0.03em"
      >
        <div>Job</div>
        <div>Status</div>
        <div>Actions</div>
      </div>

      <div
        style="display:grid;grid-template-columns:minmax(0,1.5fr) minmax(8rem,0.9fr) auto;gap:0.75rem;align-items:center;padding:0.5rem 0"
      >
        <div>Nightly billing sync</div>
        <div
          style="display:inline-flex;align-items:center;gap:0.375rem"
          uiTooltip="Completed 8 minutes ago. Duration: 2m 14s."
        >
          <span style="width:0.5rem;height:0.5rem;border-radius:999px;background:#107c10"></span>
          <span>Healthy</span>
        </div>
        <ui-button
          type="button"
          icon="info"
          shape="circular"
          appearance="subtle"
          uiTooltip="Last payload contained 1,248 records with no retries."
          uiTooltipRelationship="label"
        ></ui-button>
      </div>

      <div
        style="display:grid;grid-template-columns:minmax(0,1.5fr) minmax(8rem,0.9fr) auto;gap:0.75rem;align-items:center;padding:0.5rem 0"
      >
        <div>Region cache warmup</div>
        <div
          style="display:inline-flex;align-items:center;gap:0.375rem"
          uiTooltip="Retry 2 of 3. Temporary network timeout on the edge worker."
        >
          <span style="width:0.5rem;height:0.5rem;border-radius:999px;background:#d83b01"></span>
          <span>Attention</span>
        </div>
        <ui-button
          type="button"
          variant="secondary"
          appearance="outline"
          uiTooltip="Opens the incident timeline in a side panel."
        >
          Inspect
        </ui-button>
      </div>
    </div>
  `,
})
export class TooltipDataTableExampleComponent {}
