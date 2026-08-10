import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from 'lui';

const dashedCardStyle =
  'padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);min-width:10rem';

@Component({
  selector: 'app-slider-steps-example',
  standalone: true,
  imports: [FormsModule, SliderComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:38rem;"
    >
      <div style="flex:1 1 17rem;min-width:14rem">
        <ui-slider
          label="Review score"
          [min]="0"
          [max]="12"
          [step]="3"
          [showStepMarkers]="true"
          [showMinMax]="true"
          [(ngModel)]="score"
          [ngModelOptions]="{ standalone: true }"
          helpText="Moves in discrete steps."
        />
      </div>
      <div [attr.style]="dashedCardStyle">
        <p style="margin:0 0 0.35rem;font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          Selected score
        </p>
        <p
          style="margin:0;font-size:1rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
        >
          {{ score }}
        </p>
      </div>
    </div>
  `,
})
export class SliderStepsExampleComponent {
  readonly dashedCardStyle = dashedCardStyle;

  protected score = 6;
}
