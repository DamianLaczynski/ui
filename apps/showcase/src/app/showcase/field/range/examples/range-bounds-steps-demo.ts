import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumericRange, RangeComponent } from 'lui';

@Component({
  selector: 'app-range-bounds-steps-demo',
  standalone: true,
  imports: [FormsModule, RangeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem;">
      <ui-range
        label="Review score band"
        helpText="Whole-number ranges work well for discrete scoring scales."
        [min]="1"
        [max]="10"
        [step]="1"
        [showStepMarkers]="true"
        [showMinMax]="true"
        [(ngModel)]="scoreBand"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-range
        label="Budget threshold"
        helpText="Larger steps make the range easier to scan when precision is not critical."
        [min]="0"
        [max]="10000"
        [step]="500"
        [showStepMarkers]="true"
        [showMinMax]="true"
        [formatValue]="formatCurrency"
        [(ngModel)]="budgetBand"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class RangeBoundsStepsDemoComponent {
  protected scoreBand: NumericRange = { min: 3, max: 7 };
  protected budgetBand: NumericRange = { min: 2000, max: 6500 };

  protected readonly formatCurrency = (value: number) => `$${value.toLocaleString()}`;
}
