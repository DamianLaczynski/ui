import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeSpanComponent } from 'ui';

@Component({
  selector: 'app-time-span-states-demo',
  standalone: true,
  imports: [FormsModule, TimeSpanComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));gap:1rem;align-items:start"
    >
      <ui-time-span
        label="Readonly"
        helpText="The duration stays visible but cannot be changed."
        [readonly]="true"
        [showHours]="true"
        [showMinutes]="true"
        [(ngModel)]="readonlyValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-time-span
        label="Disabled"
        helpText="The field is unavailable."
        [disabled]="true"
        [showDays]="true"
        [showHours]="true"
        [(ngModel)]="disabledValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-time-span
        label="Clearable required"
        helpText="Choose the timeout duration."
        [required]="true"
        [clearable]="true"
        [showMinutes]="true"
        [showSeconds]="true"
        [(ngModel)]="requiredValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class TimeSpanStatesDemoComponent {
  protected readonlyValue = 'PT8H';
  protected disabledValue = 'P2DT6H';
  protected requiredValue = '';
}
