import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeekComponent } from 'lui';

@Component({
  selector: 'app-week-formats-demo',
  standalone: true,
  imports: [FormsModule, WeekComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;align-items:start"
    >
      <ui-week
        label="Date range"
        placeholder="Select week"
        displayFormat="date-range"
        [(ngModel)]="rangeValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-week
        label="Week / year"
        placeholder="Select week"
        displayFormat="week-year"
        [(ngModel)]="weekYearValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-week
        label="ISO format"
        placeholder="Select week"
        displayFormat="iso"
        [(ngModel)]="isoValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class WeekFormatsDemoComponent {
  protected rangeValue = '2026-W20';
  protected weekYearValue = '2026-W21';
  protected isoValue = '2026-W22';
}
