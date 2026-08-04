import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, MessageBarComponent, TimeSpanComponent } from 'ui';

@Component({
  selector: 'app-time-span-reactive-form-demo',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, MessageBarComponent, TimeSpanComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;max-width:24rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Retention policy</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Time span often matters as an ISO 8601 duration in real settings or policy forms.
        </div>
      </div>

      <ui-time-span
        label="Auto-archive after"
        helpText="The stored output is an ISO 8601 duration string."
        [required]="true"
        [showDays]="true"
        [showHours]="true"
        [showMinutes]="true"
        [formControl]="timeSpanControl"
      />

      @if (timeSpanControl.invalid && timeSpanControl.touched) {
        <ui-message-bar
          title="Duration required"
          message="Choose the retention duration before continuing."
          variant="warning"
          appearance="subtle"
          [dismissible]="false"
        />
      }

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary" [disabled]="timeSpanControl.invalid">
          Save policy
        </ui-button>
        <ui-button type="button" appearance="subtle" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ summary() }}
        </span>
      </div>
    </div>
  `,
})
export class TimeSpanReactiveFormDemoComponent {
  protected readonly timeSpanControl = new FormControl<string | null>('P7DT12H', {
    nonNullable: false,
    validators: [Validators.required],
  });

  protected readonly summary = computed(
    () => this.timeSpanControl.value || 'No duration selected.',
  );

  protected reset(): void {
    this.timeSpanControl.reset('P7DT12H');
  }
}
