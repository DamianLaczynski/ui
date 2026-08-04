import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeSpanComponent } from 'ui';

@Component({
  selector: 'app-time-span-unit-presets-demo',
  standalone: true,
  imports: [FormsModule, TimeSpanComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));gap:1rem;align-items:start"
    >
      <ui-time-span
        label="Hours and minutes"
        placeholder="1h 30m"
        [showHours]="true"
        [showMinutes]="true"
        [(ngModel)]="hoursMinutes"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-time-span
        label="Days, hours, and minutes"
        placeholder="2d 4h"
        [showDays]="true"
        [showHours]="true"
        [showMinutes]="true"
        [(ngModel)]="daysHoursMinutes"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-time-span
        label="Years and months"
        placeholder="1y 3mo"
        [showYears]="true"
        [showMonths]="true"
        [showDays]="false"
        [showHours]="false"
        [showMinutes]="false"
        [showSeconds]="false"
        [(ngModel)]="yearsMonths"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class TimeSpanUnitPresetsDemoComponent {
  protected hoursMinutes = 'PT2H15M';
  protected daysHoursMinutes = 'P1DT4H30M';
  protected yearsMonths = 'P1Y6M';
}
