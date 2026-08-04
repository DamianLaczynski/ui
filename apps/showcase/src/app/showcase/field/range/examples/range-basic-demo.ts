import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumericRange, RangeComponent } from 'ui';

const dashedCardStyle =
  'padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);min-width:12rem';

@Component({
  selector: 'app-range-basic-demo',
  standalone: true,
  imports: [FormsModule, RangeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:48rem;"
    >
      <div style="flex:1 1 18rem;min-width:16rem;max-width:30rem;">
        <ui-range
          label="Quiet hours"
          [min]="0"
          [max]="24"
          [step]="1"
          [showMinMax]="true"
          [formatValue]="formatHour"
          [(ngModel)]="quietHours"
          [ngModelOptions]="{ standalone: true }"
          [ariaValueText]="getAriaValueText"
        />
      </div>
      <div [attr.style]="dashedCardStyle">
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Current range
        </p>
        <div style="display:grid;gap:0.5rem;font-size:0.875rem;">
          <div style="display:flex;justify-content:space-between;gap:1rem;">
            <span style="color:var(--color-neutral-foreground2-rest)">Start</span>
            <strong>{{ formatHour(quietHours.min) }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem;">
            <span style="color:var(--color-neutral-foreground2-rest)">End</span>
            <strong>{{ formatHour(quietHours.max) }}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RangeBasicDemoComponent {
  readonly dashedCardStyle = dashedCardStyle;

  protected quietHours: NumericRange = { min: 8, max: 18 };

  protected readonly formatHour = (value: number) => `${String(value).padStart(2, '0')}:00`;
  protected readonly getAriaValueText = (value: NumericRange) =>
    `From ${this.formatHour(value.min)} to ${this.formatHour(value.max)}`;
}
