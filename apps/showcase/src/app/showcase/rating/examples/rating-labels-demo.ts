import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RatingComponent } from 'ui';

@Component({
  selector: 'app-rating-labels-example',
  standalone: true,
  imports: [RatingComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;max-width:26rem">
      <ui-rating
        [value]="value()"
        [max]="5"
        [showValue]="true"
        ariaLabel="Overall satisfaction with this onboarding"
        [starAriaLabelFormatter]="starLabel"
        [currentValueAriaLabelFormatter]="summaryLabel"
        (valueChange)="value.set($event)"
      />
      <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
        Group and star labels override defaults for product copy or i18n.
      </span>
    </div>
  `,
})
export class RatingLabelsExampleComponent {
  protected readonly value = signal(0);

  protected readonly starLabel = (star: number, max: number) =>
    `Set satisfaction to ${star} out of ${max}`;

  protected readonly summaryLabel = (v: number, max: number) =>
    v === 0 ? `Satisfaction not chosen, scale is ${max} stars` : `Satisfaction ${v} out of ${max}`;
}
