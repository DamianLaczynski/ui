import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateRange, DateRangeComponent } from 'lui';

@Component({
  selector: 'app-date-range-constraints-demo',
  standalone: true,
  imports: [FormsModule, DateRangeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;max-width:24rem">
      <ui-date-range
        label="Booking window"
        helpText="Only dates inside the allowed window can be selected."
        min="2026-05-12"
        max="2026-05-26"
        [(ngModel)]="value"
        [ngModelOptions]="{ standalone: true }"
      />

      <div
        style="display:flex;flex-direction:column;gap:0.375rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest);font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
      >
        <span>Allowed window: 2026-05-12 to 2026-05-26</span>
        <span>Selected: {{ value?.startDate || '...' }} - {{ value?.endDate || '...' }}</span>
      </div>
    </div>
  `,
})
export class DateRangeConstraintsDemoComponent {
  protected value: DateRange | null = {
    startDate: '2026-05-14',
    endDate: '2026-05-18',
  };
}
