import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimePickerComponent } from 'lui';

@Component({
  selector: 'app-time-picker-format-step-demo',
  standalone: true,
  imports: [FormsModule, TimePickerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;">
      <div
        style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;align-items:start"
      >
        <ui-time-picker
          [value]="quarterHourValue"
          [showLabel]="true"
          label="15 minute cadence"
          [step]="900"
          [use24HourFormat]="true"
          (timeChange)="quarterHourValue = $event"
        />

        <ui-time-picker
          [value]="halfHourValue"
          [showLabel]="true"
          label="30 minute cadence"
          [step]="1800"
          [use24HourFormat]="true"
          (timeChange)="halfHourValue = $event"
        />

        <ui-time-picker
          [value]="twelveHourValue"
          [showLabel]="true"
          label="12 hour with AM or PM"
          [step]="1800"
          [use24HourFormat]="false"
          (timeChange)="twelveHourValue = $event"
        />
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);">
          24h storage stays normalized:
          <strong style="color:var(--color-neutral-foreground1-rest)">16:30</strong>
        </span>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);">
          In 12h mode the same value is presented as
          <strong style="color:var(--color-neutral-foreground1-rest)">4:30 PM</strong>
        </span>
      </div>
    </div>
  `,
})
export class TimePickerFormatStepDemoComponent {
  protected quarterHourValue = '09:15';
  protected halfHourValue = '13:30';
  protected twelveHourValue = '16:30';
}
