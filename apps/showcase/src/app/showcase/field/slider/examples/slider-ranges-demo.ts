import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from 'ui';

const dashedCardStyle =
  'padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);min-width:12rem';

@Component({
  selector: 'app-slider-ranges-example',
  standalone: true,
  imports: [FormsModule, SliderComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:48rem;"
    >
      <div
        style="flex:1 1 18rem;display:flex;min-width:16rem;max-width:30rem;flex-direction:column;gap:1rem"
      >
        <ui-slider
          label="Rating"
          [min]="0"
          [max]="10"
          [step]="1"
          [(ngModel)]="rating"
          [ngModelOptions]="{ standalone: true }"
          [ariaValueText]="getRatingText"
        />
        <ui-slider
          label="Discount"
          [min]="0"
          [max]="100"
          [step]="5"
          [(ngModel)]="discount"
          [ngModelOptions]="{ standalone: true }"
          [ariaValueText]="getDiscountText"
        />
        <ui-slider
          label="Budget cap"
          [min]="5000"
          [max]="50000"
          [step]="2500"
          [showMinMax]="true"
          [formatValue]="formatCurrency"
          [(ngModel)]="budget"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>
      <div [attr.style]="dashedCardStyle">
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Values
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.5rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Rating</span>
            <strong
              style="font-weight:600;color:var(--color-neutral-foreground-rest);font-variant-numeric:tabular-nums"
              >{{ rating }}/10</strong
            >
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Discount</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)"
              >{{ discount }}%</strong
            >
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Budget</span>
            <strong
              style="font-weight:600;color:var(--color-neutral-foreground-rest);font-variant-numeric:tabular-nums"
              >{{ formatCurrency(budget) }}</strong
            >
          </div>
          <div
            style="margin-top:0.25rem;padding-top:0.5rem;font-size:0.75rem;color:var(--color-neutral-foreground2-rest);border-top:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 65%,transparent)"
          >
            {{ getRatingText(rating) }}. {{ getDiscountText(discount) }}.
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SliderRangesExampleComponent {
  readonly dashedCardStyle = dashedCardStyle;

  protected rating = 7;
  protected discount = 20;
  protected budget = 20000;

  protected readonly formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  protected readonly getRatingText = (value: number) => `${value} out of 10`;
  protected readonly getDiscountText = (value: number) => `${value} percent discount`;
}
