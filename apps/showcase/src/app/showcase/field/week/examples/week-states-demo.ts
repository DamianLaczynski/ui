import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeekComponent } from 'ui';

@Component({
  selector: 'app-week-states-demo',
  standalone: true,
  imports: [FormsModule, WeekComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;align-items:start"
    >
      <ui-week
        label="Small"
        placeholder="Select week"
        size="small"
        [(ngModel)]="smallValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-week
        label="Readonly"
        placeholder="Select week"
        [readonly]="true"
        [(ngModel)]="readonlyValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-week
        label="Disabled"
        placeholder="Select week"
        [disabled]="true"
        [(ngModel)]="disabledValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-week
        label="Required with helper"
        placeholder="Select week"
        helpText="Choose the delivery week."
        [required]="true"
        [(ngModel)]="requiredValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class WeekStatesDemoComponent {
  protected smallValue = '2026-W19';
  protected readonlyValue = '2026-W21';
  protected disabledValue = '2026-W24';
  protected requiredValue = '';
}
