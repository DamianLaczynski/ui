import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateRange, DateRangeComponent } from 'lui';

@Component({
  selector: 'app-date-range-states-demo',
  standalone: true,
  imports: [FormsModule, DateRangeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));gap:1rem;align-items:start"
    >
      <ui-date-range
        label="Readonly"
        helpText="The range stays visible but cannot be changed."
        [readonly]="true"
        [(ngModel)]="readonlyValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-date-range
        label="Disabled"
        helpText="The field is unavailable."
        [disabled]="true"
        [(ngModel)]="disabledValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-date-range
        label="Required"
        helpText="Choose the review period."
        [required]="true"
        [(ngModel)]="requiredValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class DateRangeStatesDemoComponent {
  protected readonlyValue: DateRange | null = {
    startDate: '2026-05-05',
    endDate: '2026-05-09',
  };

  protected disabledValue: DateRange | null = {
    startDate: '2026-05-19',
    endDate: '2026-05-22',
  };

  protected requiredValue: DateRange | null = null;
}
