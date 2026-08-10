import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, DateRange, DateRangeComponent } from 'lui';

@Component({
  selector: 'app-date-range-basic-demo',
  standalone: true,
  imports: [FormsModule, ButtonComponent, DateRangeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;max-width:24rem">
      <ui-date-range
        label="Travel window"
        helpText="Pick the start and end date."
        [(ngModel)]="value"
        [ngModelOptions]="{ standalone: true }"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" appearance="subtle" (click)="clear()">Clear</ui-button>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ formatRange(value) }}
        </span>
      </div>
    </div>
  `,
})
export class DateRangeBasicDemoComponent {
  protected value: DateRange | null = {
    startDate: '2026-05-12',
    endDate: '2026-05-18',
  };

  protected clear(): void {
    this.value = null;
  }

  protected formatRange(range: DateRange | null): string {
    if (!range?.startDate && !range?.endDate) {
      return 'No range selected.';
    }

    return `${range?.startDate || '...'} - ${range?.endDate || '...'}`;
  }
}
