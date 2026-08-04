import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BadgeComponent, ButtonComponent, EmailComponent } from 'ui';

@Component({
  selector: 'app-email-invite-panel-demo',
  standalone: true,
  imports: [BadgeComponent, ButtonComponent, EmailComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div
        style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:0.875rem"
      >
        <div style="display:grid;gap:0.375rem;max-width:28rem">
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
            <ui-badge text="Invite flow" variant="info" appearance="tint" />
            <ui-badge text="Email required" variant="warning" appearance="outline" />
          </div>
          <strong style="font-size:0.9375rem;color:var(--color-neutral-foreground-rest)"
            >Invite a collaborator</strong
          >
          <span
            style="font-size:0.875rem;line-height:1.55;color:var(--color-neutral-foreground2-rest)"
          >
            A stronger composition pattern than a raw field: short context, one email input, and a
            direct action.
          </span>
        </div>

        <ui-button size="small" appearance="subtle">View pending invites</ui-button>
      </div>

      <div style="display:grid;gap:0.875rem;max-width:32rem">
        <ui-email
          label="Email address"
          placeholder="teammate@contoso.com"
          helpText="The address will receive a sign-in link and workspace role details."
          [(ngModel)]="inviteEmail"
        />

        <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
          <ui-button>Send invite</ui-button>
          <ui-button appearance="outline">Copy link instead</ui-button>
        </div>
      </div>
    </div>
  `,
})
export class EmailInvitePanelDemoComponent {
  protected inviteEmail = '';
}
