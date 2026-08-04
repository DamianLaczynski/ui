import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatetimeComponent } from 'ui';

@Component({
  selector: 'app-datetime-constraints-demo',
  standalone: true,
  imports: [FormsModule, DatetimeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;max-width:24rem">
      <ui-datetime
        label="Booking window"
        placeholder="YYYY-MM-DD HH:mm"
        min="2026-05-12T08:00"
        max="2026-05-12T18:00"
        [step]="1800"
        [(ngModel)]="value"
        [ngModelOptions]="{ standalone: true }"
      />

      <div
        style="display:flex;flex-direction:column;gap:0.375rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest);font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
      >
        <span>Allowed window: 2026-05-12 08:00 to 18:00</span>
        <span>Selected: {{ value || 'None' }}</span>
      </div>
    </div>
  `,
})
export class DatetimeConstraintsDemoComponent {
  protected value = '2026-05-12T10:00';
}
