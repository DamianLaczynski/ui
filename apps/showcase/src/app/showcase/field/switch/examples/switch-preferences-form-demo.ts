import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SwitchComponent } from 'lui';

@Component({
  selector: 'app-switch-preferences-form-example',
  standalone: true,
  imports: [ReactiveFormsModule, SwitchComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:minmax(0,1fr) minmax(12rem,16rem);gap:1rem;align-items:start;width:100%;max-width:42rem"
    >
      <form
        [formGroup]="preferencesForm"
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-switch
          label="Weekly summary email"
          helpText="A digest of unresolved tasks and team activity."
          formControlName="summaryEmail"
        />
        <ui-switch
          label="Comment mentions"
          helpText="Send an alert when someone mentions you directly."
          formControlName="mentions"
        />
        <ui-switch label="Calendar reminders" formControlName="calendarReminders" />
        <ui-switch label="Marketing updates" formControlName="marketing" />
      </form>

      <div
        style="padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest);font-size:0.8125rem;line-height:1.5"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Values
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.45rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Summary email</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              preferencesForm.controls.summaryEmail.getRawValue() ? 'On' : 'Off'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Mentions</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              preferencesForm.controls.mentions.getRawValue() ? 'On' : 'Off'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Calendar reminders</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              preferencesForm.controls.calendarReminders.getRawValue() ? 'On' : 'Off'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Marketing</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              preferencesForm.controls.marketing.getRawValue() ? 'On' : 'Off'
            }}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SwitchPreferencesFormExampleComponent {
  protected readonly preferencesForm = new FormGroup({
    summaryEmail: new FormControl(true, { nonNullable: true }),
    mentions: new FormControl(true, { nonNullable: true }),
    calendarReminders: new FormControl(false, { nonNullable: true }),
    marketing: new FormControl(false, { nonNullable: true }),
  });
}
