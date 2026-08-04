import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateComponent } from 'ui';

@Component({
  selector: 'app-date-states-demo',
  standalone: true,
  imports: [FormsModule, DateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;align-items:start"
    >
      <ui-date
        label="Readonly"
        placeholder="YYYY-MM-DD"
        [readonly]="true"
        [(ngModel)]="readonlyValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-date
        label="Disabled"
        placeholder="YYYY-MM-DD"
        [disabled]="true"
        [(ngModel)]="disabledValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-date
        label="Required"
        placeholder="YYYY-MM-DD"
        helpText="Choose the confirmation date."
        [required]="true"
        [(ngModel)]="requiredValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class DateStatesDemoComponent {
  protected readonlyValue = '2026-05-18';
  protected disabledValue = '2026-05-20';
  protected requiredValue = '';
}
