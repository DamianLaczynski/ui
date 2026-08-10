import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, DividerComponent, TextComponent } from 'lui';

@Component({
  selector: 'app-divider-auth-split-example',
  standalone: true,
  imports: [ButtonComponent, DividerComponent, TextComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:24rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;min-width:16rem;"
    >
      <ui-button variant="primary" [fullWidth]="true">Continue with Microsoft</ui-button>
      <ui-divider text="OR" />
      <ui-text
        label="Work email"
        placeholder="name@company.com"
        helpText="We will send a secure sign-in link."
      />
      <ui-button variant="secondary" appearance="outline" [fullWidth]="true">
        Send magic link
      </ui-button>
    </div>
  `,
})
export class DividerAuthSplitExampleComponent {}
