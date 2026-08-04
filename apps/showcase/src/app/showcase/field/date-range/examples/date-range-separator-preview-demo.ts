import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateRange, DateRangeComponent } from 'ui';

@Component({
  selector: 'app-date-range-separator-preview-demo',
  standalone: true,
  imports: [FormsModule, DateRangeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));gap:1rem;align-items:start"
    >
      <ui-date-range
        label="Default separator"
        helpText="Standard range input with hover preview between dates."
        [(ngModel)]="defaultRange"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-date-range
        label="Custom separator"
        helpText="Useful when the surrounding product language prefers the word to."
        separator=" to "
        [(ngModel)]="customSeparatorRange"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-date-range
        label="Month jump enabled"
        helpText="Open the picker and use the month or year header to move faster."
        [showMonthYearPicker]="true"
        [(ngModel)]="pickerRange"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class DateRangeSeparatorPreviewDemoComponent {
  protected defaultRange: DateRange | null = {
    startDate: '2026-06-02',
    endDate: '2026-06-06',
  };

  protected customSeparatorRange: DateRange | null = {
    startDate: '2026-06-10',
    endDate: '2026-06-14',
  };

  protected pickerRange: DateRange | null = {
    startDate: '2026-07-01',
    endDate: '2026-07-09',
  };
}
