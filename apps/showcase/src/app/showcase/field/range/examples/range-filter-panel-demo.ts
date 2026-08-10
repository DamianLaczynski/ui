import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumericRange, RangeComponent, CheckboxComponent, ButtonComponent } from 'lui';

@Component({
  selector: 'app-range-filter-panel-demo',
  standalone: true,
  imports: [FormsModule, RangeComponent, CheckboxComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section
      style="display:grid;gap:1rem;max-width:52rem;padding:1.25rem;border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 70%,transparent);border-radius:1rem;background:color-mix(in srgb,var(--color-neutral-background-rest) 92%,white);"
    >
      <div style="display:grid;gap:0.25rem;">
        <h3 style="margin:0;font-size:1rem;">Analytics filters</h3>
        <p style="margin:0;color:var(--color-neutral-foreground2-rest);font-size:0.875rem;">
          Combine a numeric band with adjacent settings so the range feels like part of a real
          filter surface.
        </p>
      </div>

      <ui-range
        label="Revenue range"
        [min]="0"
        [max]="100000"
        [step]="5000"
        [showMinMax]="true"
        [showStepMarkers]="true"
        [formatValue]="formatCurrency"
        [(ngModel)]="revenueRange"
        [ngModelOptions]="{ standalone: true }"
      />

      <div style="display:flex;flex-wrap:wrap;gap:1rem;">
        <ui-checkbox
          label="Only active accounts"
          [(ngModel)]="onlyActive"
          [ngModelOptions]="{ standalone: true }"
        />
        <ui-checkbox
          label="Include trial users"
          [(ngModel)]="includeTrials"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>

      <div
        style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:1rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);"
      >
        <div style="display:grid;gap:0.375rem;font-size:0.875rem;">
          <div>
            <strong>Revenue:</strong> {{ formatCurrency(revenueRange.min) }} to
            {{ formatCurrency(revenueRange.max) }}
          </div>
          <div><strong>Active only:</strong> {{ onlyActive ? 'Yes' : 'No' }}</div>
          <div><strong>Trials:</strong> {{ includeTrials ? 'Included' : 'Hidden' }}</div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:flex-start;">
          <ui-button text="Reset" appearance="subtle" (click)="reset()" />
          <ui-button text="Apply filters" />
        </div>
      </div>
    </section>
  `,
})
export class RangeFilterPanelDemoComponent {
  protected revenueRange: NumericRange = { min: 20000, max: 70000 };
  protected onlyActive = true;
  protected includeTrials = false;

  protected readonly formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  protected reset(): void {
    this.revenueRange = { min: 20000, max: 70000 };
    this.onlyActive = true;
    this.includeTrials = false;
  }
}
