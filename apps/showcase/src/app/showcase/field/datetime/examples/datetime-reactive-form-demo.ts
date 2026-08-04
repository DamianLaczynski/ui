import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, DatetimeComponent, MessageBarComponent } from 'ui';

@Component({
  selector: 'app-datetime-reactive-form-demo',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, DatetimeComponent, MessageBarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;max-width:24rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Approval call</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Datetime usually matters inside a real scheduling flow with validation and submit state.
        </div>
      </div>

      <ui-datetime
        label="Call time"
        placeholder="YYYY-MM-DD HH:mm"
        helpText="Choose the approval call slot."
        [required]="true"
        [formControl]="datetimeControl"
      />

      @if (datetimeControl.invalid && datetimeControl.touched) {
        <ui-message-bar
          title="Date and time required"
          message="Choose the approval slot before continuing."
          variant="warning"
          appearance="subtle"
          [dismissible]="false"
        />
      }

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary" [disabled]="datetimeControl.invalid">
          Save schedule
        </ui-button>
        <ui-button type="button" appearance="subtle" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ summary() }}
        </span>
      </div>
    </div>
  `,
})
export class DatetimeReactiveFormDemoComponent {
  protected readonly datetimeControl = new FormControl<string | null>('2026-05-14T11:00', {
    nonNullable: false,
    validators: [Validators.required],
  });

  protected readonly summary = computed(
    () => this.datetimeControl.value || 'No date and time selected.',
  );

  protected reset(): void {
    this.datetimeControl.reset('2026-05-14T11:00');
  }
}
