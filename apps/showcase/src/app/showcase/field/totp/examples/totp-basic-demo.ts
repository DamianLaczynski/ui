import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TotpComponent } from 'lui';

@Component({
  selector: 'app-totp-basic-demo',
  standalone: true,
  imports: [FormsModule, TotpComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div
        style="flex:1 1 18rem;min-width:16rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Authenticator app code</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Good default for standard 6-digit verification.
          </div>
        </div>

        <ui-totp
          label="Verification code"
          helpText="Enter the 6-digit code from your authenticator app."
        />
      </div>

      <div
        style="flex:1 1 18rem;min-width:16rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Pre-filled example</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Shows how pasted or restored values distribute across the inputs.
          </div>
        </div>

        <ui-totp
          label="TOTP code"
          helpText="You can paste the full code or type digit by digit."
          [(ngModel)]="code"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>
    </div>
  `,
})
export class TotpBasicDemoComponent {
  protected code = '123456';
}
