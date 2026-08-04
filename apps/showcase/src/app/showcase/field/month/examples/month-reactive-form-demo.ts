import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, MessageBarComponent, MonthComponent } from 'ui';

@Component({
  selector: 'app-month-reactive-form-demo',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, MessageBarComponent, MonthComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;max-width:24rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Monthly close</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Month selection usually lives in reporting, finance, or scheduling forms rather than as an
          isolated picker.
        </div>
      </div>

      <ui-month
        label="Closing month"
        placeholder="YYYY-MM"
        helpText="Select the month for the financial close."
        [required]="true"
        [formControl]="monthControl"
      />

      @if (monthControl.invalid && monthControl.touched) {
        <ui-message-bar
          title="Month required"
          message="Choose the reporting month before continuing."
          variant="warning"
          appearance="subtle"
          [dismissible]="false"
        />
      }

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary" [disabled]="monthControl.invalid">
          Save close
        </ui-button>
        <ui-button type="button" appearance="subtle" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ summary() }}
        </span>
      </div>
    </div>
  `,
})
export class MonthReactiveFormDemoComponent {
  protected readonly monthControl = new FormControl<string | null>('2026-05', {
    nonNullable: false,
    validators: [Validators.required],
  });

  protected readonly summary = computed(() => this.monthControl.value || 'No month selected.');

  protected reset(): void {
    this.monthControl.reset('2026-05');
  }
}
