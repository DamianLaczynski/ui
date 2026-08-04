import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { RangeComponent, NumericRange } from 'ui';

function minimumGapValidator(gap: number): ValidatorFn {
  return control => {
    const value = control.value as NumericRange | null;
    if (!value) {
      return null;
    }

    return value.max - value.min >= gap ? null : { minimumGap: true };
  };
}

@Component({
  selector: 'app-range-reactive-form-demo',
  standalone: true,
  imports: [ReactiveFormsModule, RangeComponent, JsonPipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem;width:100%;max-width:44rem;">
      <form [formGroup]="form" style="display:grid;gap:1rem;">
        <ui-range
          label="Working budget"
          helpText="Keep at least a $1,000 band so the query stays meaningful."
          [showMinMax]="true"
          [formatValue]="formatCurrency"
          [errorText]="budgetError()"
          formControlName="budget"
        />
      </form>

      <div
        style="display:flex;flex-wrap:wrap;gap:12px;padding:12px 14px;border:1px dashed var(--color-neutral-stroke-rest);border-radius:12px;background:var(--color-neutral-background2-rest);"
      >
        <div style="font-weight:600;">Form value</div>
        <div>{{ form.value | json }}</div>
      </div>
    </div>
  `,
})
export class RangeReactiveFormDemoComponent {
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.group({
    budget: this.fb.nonNullable.control<NumericRange>({ min: 2000, max: 6000 }, [
      Validators.required,
      minimumGapValidator(1000),
    ]),
  });

  protected readonly formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  protected readonly budgetError = computed(() => {
    const control = this.form.controls.budget;
    if (!control.touched && !control.dirty) {
      return '';
    }
    return control.hasError('minimumGap') ? 'Choose a wider budget band.' : '';
  });
}
