import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AccordionComponent,
  ButtonComponent,
  CheckboxComponent,
  SwitchComponent,
  TextComponent,
} from 'ui';

@Component({
  selector: 'app-accordion-settings-form-example',
  standalone: true,
  imports: [
    FormsModule,
    AccordionComponent,
    ButtonComponent,
    CheckboxComponent,
    SwitchComponent,
    TextComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Notification settings</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          A practical accordion often groups related form controls into compact sections instead of
          acting as a purely decorative disclosure.
        </div>
      </div>

      <ui-accordion label="Delivery channels" icon="mail">
        <div style="display:flex;flex-direction:column;gap:0.75rem">
          <ui-switch
            label="Email updates"
            [(ngModel)]="emailUpdates"
            [ngModelOptions]="{ standalone: true }"
          />
          <ui-switch
            label="Push alerts"
            [(ngModel)]="pushAlerts"
            [ngModelOptions]="{ standalone: true }"
          />
          <ui-checkbox
            label="Digest only"
            [(ngModel)]="digestOnly"
            [ngModelOptions]="{ standalone: true }"
          />
        </div>
      </ui-accordion>

      <ui-accordion label="Escalation details" icon="person">
        <div style="display:flex;flex-direction:column;gap:0.75rem">
          <ui-text
            label="Owner"
            placeholder="Enter owner"
            [(ngModel)]="owner"
            [ngModelOptions]="{ standalone: true }"
          />
          <ui-text
            label="Fallback contact"
            placeholder="Enter fallback contact"
            [(ngModel)]="fallbackContact"
            [ngModelOptions]="{ standalone: true }"
          />
        </div>
      </ui-accordion>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary">Save settings</ui-button>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ summary }}
        </span>
      </div>
    </div>
  `,
})
export class AccordionSettingsFormExampleComponent {
  protected emailUpdates = true;
  protected pushAlerts = false;
  protected digestOnly = false;
  protected owner = 'Nina Woods';
  protected fallbackContact = 'Theo Murphy';

  protected get summary(): string {
    return `${this.owner} owns alerts. Digest only: ${this.digestOnly ? 'On' : 'Off'}.`;
  }
}
