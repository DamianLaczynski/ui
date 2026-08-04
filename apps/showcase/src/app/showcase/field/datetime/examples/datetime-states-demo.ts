import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatetimeComponent } from 'ui';

@Component({
  selector: 'app-datetime-states-demo',
  standalone: true,
  imports: [FormsModule, DatetimeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));gap:1rem;align-items:start"
    >
      <ui-datetime
        label="Small"
        placeholder="YYYY-MM-DD HH:mm"
        size="small"
        [(ngModel)]="smallValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-datetime
        label="Readonly"
        placeholder="YYYY-MM-DD HH:mm"
        [readonly]="true"
        [(ngModel)]="readonlyValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-datetime
        label="Disabled"
        placeholder="YYYY-MM-DD HH:mm"
        [disabled]="true"
        [(ngModel)]="disabledValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-datetime
        label="Required"
        placeholder="YYYY-MM-DD HH:mm"
        helpText="Choose the final review slot."
        [required]="true"
        [(ngModel)]="requiredValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class DatetimeStatesDemoComponent {
  protected smallValue = '2026-05-12T09:00';
  protected readonlyValue = '2026-05-14T15:30';
  protected disabledValue = '2026-05-16T11:00';
  protected requiredValue = '';
}
