import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, RatingComponent } from 'ui';

@Component({
  selector: 'app-rating-listing-snapshot-example',
  standalone: true,
  imports: [ButtonComponent, RatingComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:space-between;width:100%;max-width:36rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
    >
      <div style="display:flex;flex-direction:column;gap:0.2rem;min-width:12rem">
        <span style="font-size:0.9375rem;font-weight:600">Weekly digest template</span>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Workflow · 128 ratings
        </span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center">
        <ui-rating [value]="4" [max]="5" [readOnly]="true" size="small" />
        <ui-button type="button" variant="secondary" appearance="outline">Use template</ui-button>
      </div>
    </div>
  `,
})
export class RatingListingSnapshotExampleComponent {}
