import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ButtonComponent, MessageBarComponent, WeekComponent } from 'ui';

@Component({
  selector: 'app-week-reactive-form-demo',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, MessageBarComponent, WeekComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;max-width:24rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Sprint planning</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Pick the sprint week and keep the field inside a normal reactive form flow.
        </div>
      </div>

      <ui-week
        label="Sprint start week"
        placeholder="Select week"
        helpText="Use the ISO sprint week from the roadmap."
        [required]="true"
        [formControl]="weekControl"
      />

      @if (weekControl.invalid && weekControl.touched) {
        <ui-message-bar
          title="Week required"
          message="Choose the sprint week before you continue."
          variant="warning"
          appearance="subtle"
          [dismissible]="false"
        />
      }

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary" [disabled]="weekControl.invalid">
          Save sprint
        </ui-button>
        <ui-button type="button" appearance="subtle" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ summary() }}
        </span>
      </div>
    </div>
  `,
})
export class WeekReactiveFormDemoComponent {
  protected readonly weekControl = new FormControl<string | null>('2026-W23', {
    nonNullable: false,
    validators: [Validators.required],
  });

  protected readonly summary = computed(() => this.weekControl.value || 'No sprint week selected.');

  protected reset(): void {
    this.weekControl.reset('2026-W23');
  }
}
