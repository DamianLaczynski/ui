import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordComponent } from 'lui';

@Component({
  selector: 'app-password-basic-demo',
  standalone: true,
  imports: [FormsModule, PasswordComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div
        style="flex:1 1 18rem;min-width:16rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Sign-in password</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Good default for login and short verification steps.
          </div>
        </div>

        <ui-password
          label="Password"
          placeholder="Enter your password"
          autocomplete="current-password"
          helpText="Use the password for this workspace account."
        />
      </div>

      <div
        style="flex:1 1 18rem;min-width:16rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Pre-filled secure value</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Reveal and clear actions are built in when the field is editable.
          </div>
        </div>

        <ui-password
          label="App password"
          placeholder="Enter app password"
          [(ngModel)]="savedPassword"
          [ngModelOptions]="{ standalone: true }"
          helpText="Use show and clear actions directly from the field."
        />
      </div>
    </div>
  `,
})
export class PasswordBasicDemoComponent {
  protected savedPassword = 'P@ssword-2026';
}
