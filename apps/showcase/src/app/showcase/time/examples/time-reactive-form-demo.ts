import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, MessageBarComponent, TimeComponent } from 'ui';

@Component({
  selector: 'app-time-reactive-form-demo',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, MessageBarComponent, TimeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;max-width:24rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Standup time</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Time usually matters inside a real form flow with validation and submit state.
        </div>
      </div>

      <ui-time
        label="Daily standup"
        placeholder="HH:mm"
        helpText="Choose the recurring standup time."
        [required]="true"
        [formControl]="timeControl"
      />

      @if (timeControl.invalid && timeControl.touched) {
        <ui-message-bar
          title="Time required"
          message="Choose the standup time before continuing."
          variant="warning"
          appearance="subtle"
          [dismissible]="false"
        />
      }

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary" [disabled]="timeControl.invalid">
          Save time
        </ui-button>
        <ui-button type="button" appearance="subtle" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ summary() }}
        </span>
      </div>
    </div>
  `,
})
export class TimeReactiveFormDemoComponent {
  protected readonly timeControl = new FormControl<string | null>('09:45', {
    nonNullable: false,
    validators: [Validators.required],
  });

  protected readonly summary = computed(() => this.timeControl.value || 'No time selected.');

  protected reset(): void {
    this.timeControl.reset('09:45');
  }
}
