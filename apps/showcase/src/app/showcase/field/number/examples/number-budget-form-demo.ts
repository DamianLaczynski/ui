import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NumberComponent } from 'lui';

@Component({
  selector: 'app-number-budget-form-demo',
  standalone: true,
  imports: [ReactiveFormsModule, NumberComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="font-size:0.9375rem;font-weight:600">Budget setup</div>
      <div
        style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:1rem;width:100%"
      >
        <ui-number
          label="Seats"
          [formControl]="budgetForm.controls.seats"
          [min]="1"
          [step]="1"
          helpText="How many paid seats should be provisioned."
        />

        <ui-number
          label="Cost per seat"
          [formControl]="budgetForm.controls.costPerSeat"
          [min]="0"
          [step]="0.5"
          helpText="Half-unit steps fit common pricing adjustments."
        />

        <ui-number
          label="Reserve"
          [formControl]="budgetForm.controls.reserve"
          [min]="0"
          [step]="10"
          helpText="Optional buffer for overruns or changes."
        />
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Monthly total: <strong>{{ total() }}</strong></span
        >
      </div>
    </div>
  `,
})
export class NumberBudgetFormDemoComponent {
  protected readonly budgetForm = new FormGroup({
    seats: new FormControl(12, { nonNullable: true }),
    costPerSeat: new FormControl(24.5, { nonNullable: true }),
    reserve: new FormControl(50, { nonNullable: true }),
  });

  protected readonly total = computed(() => {
    const seats = this.budgetForm.controls.seats.getRawValue();
    const costPerSeat = this.budgetForm.controls.costPerSeat.getRawValue();
    const reserve = this.budgetForm.controls.reserve.getRawValue();
    return (seats * costPerSeat + reserve).toFixed(2);
  });
}
