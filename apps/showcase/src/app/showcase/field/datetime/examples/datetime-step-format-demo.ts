import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatetimeComponent } from 'ui';

@Component({
  selector: 'app-datetime-step-format-demo',
  standalone: true,
  imports: [FormsModule, DatetimeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem">
      <div
        style="display:grid;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));gap:1rem;align-items:start"
      >
        <ui-datetime
          label="30 minute steps"
          placeholder="YYYY-MM-DD HH:mm"
          helpText="24 hour picker with half-hour increments."
          [step]="1800"
          [use24HourFormat]="true"
          [(ngModel)]="halfHourValue"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-datetime
          label="15 minute steps"
          placeholder="YYYY-MM-DD HH:mm"
          helpText="24 hour picker with denser quarter-hour increments."
          [step]="900"
          [use24HourFormat]="true"
          [(ngModel)]="quarterHourValue"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-datetime
          label="12 hour picker with AM/PM"
          placeholder="YYYY-MM-DD HH:mm"
          helpText="Open the picker to see the 12 hour time list with AM/PM."
          [step]="1800"
          [use24HourFormat]="false"
          [(ngModel)]="twelveHourValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          24h example: <strong style="color:var(--color-neutral-foreground1-rest)">16:30</strong>
        </span>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          12h picker shows the same slot as
          <strong style="color:var(--color-neutral-foreground1-rest)">4:30 PM</strong>
        </span>
      </div>
    </div>
  `,
})
export class DatetimeStepFormatDemoComponent {
  protected halfHourValue = '2026-05-12T09:30';
  protected quarterHourValue = '2026-05-12T13:15';
  protected twelveHourValue = '2026-05-12T16:30';
}
