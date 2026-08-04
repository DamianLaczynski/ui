import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailComponent } from 'ui';

@Component({
  selector: 'app-email-form-demo',
  standalone: true,
  imports: [EmailComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:grid;gap:0.25rem">
        <strong style="font-size:0.9375rem;color:var(--color-neutral-foreground-rest)"
          >Notification settings</strong
        >
        <span style="font-size:0.875rem;color:var(--color-neutral-foreground3-rest)">
          Separate addresses for primary contact, invoices, and incident routing.
        </span>
      </div>

      <form [formGroup]="settingsForm" style="display:grid;gap:0.875rem">
        <ui-email label="Primary contact" formControlName="primary" placeholder="owner@team.com" />
        <ui-email label="Billing" formControlName="billing" placeholder="billing@team.com" />
        <ui-email
          label="Incident alerts"
          formControlName="alerts"
          placeholder="alerts@team.com"
          helpText="Use a shared mailbox or distribution list."
        />
      </form>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <div style="display:grid;gap:0.125rem;min-width:10rem">
          <strong style="font-size:0.8125rem">Primary</strong>
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest)">
            {{ settingsForm.controls.primary.getRawValue() || 'Not set' }}
          </span>
        </div>
        <div style="display:grid;gap:0.125rem;min-width:10rem">
          <strong style="font-size:0.8125rem">Billing</strong>
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest)">
            {{ settingsForm.controls.billing.getRawValue() || 'Not set' }}
          </span>
        </div>
        <div style="display:grid;gap:0.125rem;min-width:10rem">
          <strong style="font-size:0.8125rem">Alerts</strong>
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest)">
            {{ settingsForm.controls.alerts.getRawValue() || 'Not set' }}
          </span>
        </div>
      </div>
    </div>
  `,
})
export class EmailFormDemoComponent {
  protected readonly settingsForm = new FormGroup({
    primary: new FormControl('owner@contoso.com', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    billing: new FormControl('billing@contoso.com', {
      nonNullable: true,
      validators: [Validators.email],
    }),
    alerts: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email],
    }),
  });
}
