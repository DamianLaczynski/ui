import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, TotpComponent } from 'lui';

@Component({
  selector: 'app-totp-verification-panel-demo',
  standalone: true,
  imports: [ButtonComponent, FormsModule, TotpComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:38rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.375rem">
        <div style="font-size:1rem;font-weight:600">Two-factor verification</div>
        <div
          style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest);line-height:1.45"
        >
          A realistic verification surface combines the code input, context about where the code
          came from, and nearby next-step actions.
        </div>
      </div>

      <ui-totp
        label="Verification code"
        [(ngModel)]="code"
        [ngModelOptions]="{ standalone: true }"
        helpText="Code sent to your authenticator app for account ending in 27."
        [errorText]="panelError"
      />

      <div
        style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary">Verify code</ui-button>
        <ui-button type="button" variant="secondary" appearance="outline" (click)="code = ''">
          Clear
        </ui-button>
        <ui-button type="button" appearance="subtle">Use recovery code</ui-button>
      </div>
    </div>
  `,
})
export class TotpVerificationPanelDemoComponent {
  protected code = '';

  protected get panelError(): string {
    if (!this.code) {
      return '';
    }
    return this.code.length === 6 ? '' : 'Enter all 6 digits before continuing.';
  }
}
