import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RatingComponent } from 'lui';

@Component({
  selector: 'app-rating-scale-example',
  standalone: true,
  imports: [RatingComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1.25rem">
      <div style="display:flex;flex-wrap:wrap;gap:1.25rem">
        <div style="display:flex;flex-direction:column;gap:0.5rem;min-width:10rem">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
            >Five stars</span
          >
          <ui-rating
            [value]="shortScale()"
            [max]="5"
            [showValue]="true"
            (valueChange)="shortScale.set($event)"
          />
        </div>
        <div style="display:flex;flex-direction:column;gap:0.5rem;min-width:10rem">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
            >Ten stars</span
          >
          <ui-rating
            [value]="longScale()"
            [max]="10"
            [showValue]="true"
            (valueChange)="longScale.set($event)"
          />
        </div>
      </div>
      <div style="padding-top:0.75rem;border-top:1px solid var(--color-neutral-stroke-rest)">
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
          >Published aggregate</span
        >
        <div style="margin-top:0.35rem">
          <ui-rating [value]="8" [max]="10" [readOnly]="true" [showValue]="true" />
        </div>
      </div>
    </div>
  `,
})
export class RatingScaleExampleComponent {
  protected readonly shortScale = signal(4);

  protected readonly longScale = signal(7);
}
