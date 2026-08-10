import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonthComponent } from 'lui';

@Component({
  selector: 'app-month-states-demo',
  standalone: true,
  imports: [FormsModule, MonthComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;align-items:start"
    >
      <ui-month
        label="Readonly"
        placeholder="YYYY-MM"
        [readonly]="true"
        [(ngModel)]="readonlyValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-month
        label="Disabled"
        placeholder="YYYY-MM"
        [disabled]="true"
        [(ngModel)]="disabledValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-month
        label="Required"
        placeholder="YYYY-MM"
        helpText="Choose the closing month."
        [required]="true"
        [(ngModel)]="requiredValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class MonthStatesDemoComponent {
  protected readonlyValue = '2026-07';
  protected disabledValue = '2026-08';
  protected requiredValue = '';
}
