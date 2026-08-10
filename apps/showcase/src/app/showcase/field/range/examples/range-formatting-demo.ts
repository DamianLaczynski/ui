import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumericRange, RangeComponent } from 'lui';

const dashedCardStyle =
  'padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);min-width:14rem';

@Component({
  selector: 'app-range-formatting-demo',
  standalone: true,
  imports: [FormsModule, RangeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:50rem;"
    >
      <div
        style="flex:1 1 18rem;display:flex;min-width:16rem;max-width:32rem;flex-direction:column;gap:1rem;"
      >
        <ui-range
          label="Price filter"
          [min]="0"
          [max]="500"
          [step]="25"
          [showMinMax]="true"
          [formatValue]="formatPrice"
          [(ngModel)]="priceRange"
          [ngModelOptions]="{ standalone: true }"
          [ariaValueText]="formatPriceAria"
        />

        <ui-range
          label="Time estimate"
          [min]="15"
          [max]="240"
          [step]="15"
          [showMinMax]="true"
          [formatValue]="formatMinutes"
          [(ngModel)]="timeRange"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>

      <div [attr.style]="dashedCardStyle">
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Summary
        </p>
        <div style="display:grid;gap:0.5rem;font-size:0.875rem;">
          <div>{{ formatPriceAria(priceRange) }}</div>
          <div>{{ formatMinutes(timeRange.min) }} to {{ formatMinutes(timeRange.max) }}</div>
        </div>
      </div>
    </div>
  `,
})
export class RangeFormattingDemoComponent {
  readonly dashedCardStyle = dashedCardStyle;

  protected priceRange: NumericRange = { min: 75, max: 275 };
  protected timeRange: NumericRange = { min: 45, max: 150 };

  protected readonly formatPrice = (value: number) => `$${value}`;
  protected readonly formatPriceAria = (value: NumericRange) =>
    `Price from ${this.formatPrice(value.min)} to ${this.formatPrice(value.max)}`;
  protected readonly formatMinutes = (value: number) => `${value} min`;
}
