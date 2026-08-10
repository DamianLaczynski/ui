import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateComponent } from 'lui';

@Component({
  selector: 'app-date-constraints-demo',
  standalone: true,
  imports: [FormsModule, DateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;max-width:22rem">
      <ui-date
        label="Booking date"
        placeholder="YYYY-MM-DD"
        min="2026-05-12"
        max="2026-05-26"
        [(ngModel)]="value"
        [ngModelOptions]="{ standalone: true }"
      />

      <div
        style="display:flex;flex-direction:column;gap:0.375rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest);font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
      >
        <span>Allowed window: 2026-05-12 to 2026-05-26</span>
        <span>Selected: {{ value || 'None' }}</span>
      </div>
    </div>
  `,
})
export class DateConstraintsDemoComponent {
  protected value = '2026-05-15';
}
