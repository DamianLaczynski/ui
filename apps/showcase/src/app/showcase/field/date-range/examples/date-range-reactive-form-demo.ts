import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, DateRange, DateRangeComponent, MessageBarComponent } from 'ui';

@Component({
  selector: 'app-date-range-reactive-form-demo',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, DateRangeComponent, MessageBarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;max-width:24rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Campaign period</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Date range usually matters as part of a real form flow with validation and submit state.
        </div>
      </div>

      <ui-date-range
        label="Launch period"
        helpText="Choose the start and end date for the campaign."
        [required]="true"
        [formControl]="rangeControl"
      />

      @if (rangeControl.invalid && rangeControl.touched) {
        <ui-message-bar
          title="Range required"
          message="Choose both dates before continuing."
          variant="warning"
          appearance="subtle"
          [dismissible]="false"
        />
      }

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary" [disabled]="rangeControl.invalid">
          Save period
        </ui-button>
        <ui-button type="button" appearance="subtle" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ summary() }}
        </span>
      </div>
    </div>
  `,
})
export class DateRangeReactiveFormDemoComponent {
  protected readonly rangeControl = new FormControl<DateRange | null>(
    {
      startDate: '2026-06-01',
      endDate: '2026-06-15',
    },
    { validators: [this.rangeValidator] },
  );

  protected readonly summary = computed(() => {
    const value = this.rangeControl.value;
    if (!value?.startDate && !value?.endDate) {
      return 'No range selected.';
    }

    return `${value?.startDate || '...'} - ${value?.endDate || '...'}`;
  });

  protected reset(): void {
    this.rangeControl.reset({
      startDate: '2026-06-01',
      endDate: '2026-06-15',
    });
  }

  private rangeValidator(control: AbstractControl<DateRange | null>) {
    const value = control.value;
    return value?.startDate && value?.endDate ? null : { required: true };
  }
}
