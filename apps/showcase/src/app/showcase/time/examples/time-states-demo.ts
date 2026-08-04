import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeComponent } from 'ui';

@Component({
  selector: 'app-time-states-demo',
  standalone: true,
  imports: [FormsModule, TimeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;align-items:start"
    >
      <ui-time
        label="Readonly"
        placeholder="HH:mm"
        [readonly]="true"
        [(ngModel)]="readonlyValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-time
        label="Disabled"
        placeholder="HH:mm"
        [disabled]="true"
        [(ngModel)]="disabledValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-time
        label="Required"
        placeholder="HH:mm"
        helpText="Choose the support handoff time."
        [required]="true"
        [(ngModel)]="requiredValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class TimeStatesDemoComponent {
  protected readonlyValue = '10:15';
  protected disabledValue = '12:00';
  protected requiredValue = '';
}
