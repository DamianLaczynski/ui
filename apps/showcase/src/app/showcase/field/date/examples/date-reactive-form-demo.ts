import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, DateComponent, MessageBarComponent } from 'lui';

@Component({
  selector: 'app-date-reactive-form-demo',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, DateComponent, MessageBarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;max-width:24rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Review deadline</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Date usually matters as part of a real form flow with validation and submit state.
        </div>
      </div>

      <ui-date
        label="Deadline date"
        placeholder="YYYY-MM-DD"
        helpText="Choose the final review deadline."
        [required]="true"
        [formControl]="dateControl"
      />

      @if (dateControl.invalid && dateControl.touched) {
        <ui-message-bar
          title="Date required"
          message="Choose the deadline date before continuing."
          variant="warning"
          appearance="subtle"
          [dismissible]="false"
        />
      }

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary" [disabled]="dateControl.invalid">
          Save deadline
        </ui-button>
        <ui-button type="button" appearance="subtle" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ summary() }}
        </span>
      </div>
    </div>
  `,
})
export class DateReactiveFormDemoComponent {
  protected readonly dateControl = new FormControl<string | null>('2026-05-19', {
    nonNullable: false,
    validators: [Validators.required],
  });

  protected readonly summary = computed(() => this.dateControl.value || 'No date selected.');

  protected reset(): void {
    this.dateControl.reset('2026-05-19');
  }
}
