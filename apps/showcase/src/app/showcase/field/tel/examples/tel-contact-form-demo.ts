import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, TelComponent } from 'ui';

@Component({
  selector: 'app-tel-contact-form-demo',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, TelComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <form
      [formGroup]="contactForm"
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:54rem"
    >
      <div
        style="flex:1 1 22rem;min-width:18rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Contact routing</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Telephone fields are often grouped by purpose: primary contact, escalation, and
            after-hours support.
          </div>
        </div>

        <ui-tel
          label="Primary number"
          placeholder="+1 (555) 123-4567"
          formControlName="primary"
          helpText="Shown on the workspace profile."
        />

        <ui-tel
          label="Escalation number"
          placeholder="+1 (555) 987-6543"
          formControlName="escalation"
          inputVariant="filled-gray"
          helpText="Used by internal support only."
        />

        <ui-tel
          label="After-hours line"
          placeholder="+1 (555) 000-1111"
          formControlName="afterHours"
          helpText="Optional fallback for urgent incidents."
        />

        <div
          style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <ui-button type="button" variant="primary">Save contacts</ui-button>
          <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()">
            Reset
          </ui-button>
        </div>
      </div>

      <div
        style="flex:0 0 18rem;min-width:16rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Current values
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.5rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Primary</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              contactForm.controls.primary.value || 'None'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Escalation</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              contactForm.controls.escalation.value || 'None'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">After-hours</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              contactForm.controls.afterHours.value || 'None'
            }}</strong>
          </div>
        </div>
      </div>
    </form>
  `,
})
export class TelContactFormDemoComponent {
  protected readonly defaults = {
    primary: '+48 600 700 800',
    escalation: '+48 500 400 300',
    afterHours: '',
  };

  protected readonly contactForm = new FormGroup({
    primary: new FormControl(this.defaults.primary, { nonNullable: true }),
    escalation: new FormControl(this.defaults.escalation, { nonNullable: true }),
    afterHours: new FormControl(this.defaults.afterHours, { nonNullable: true }),
  });

  protected reset(): void {
    this.contactForm.reset(this.defaults);
  }
}
