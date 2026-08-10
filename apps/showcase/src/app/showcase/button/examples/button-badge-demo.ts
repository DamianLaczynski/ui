import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from 'lui';

@Component({
  selector: 'app-button-badge-demo',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem">
      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button icon="mail" text="Inbox" badge="24" badgeAriaLabel="24 unread messages" />
        <ui-button
          icon="alert"
          text="Alerts"
          badge="3"
          badgeVariant="warning"
          appearance="outline"
        />
        <ui-button icon="cart" text="Cart" badge="99+" badgeVariant="danger" variant="primary" />
      </div>

      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:1rem;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button
          icon="mail"
          ariaLabel="Inbox"
          shape="circular"
          badge="8"
          badgeAriaLabel="8 unread messages"
        />
        <ui-button
          icon="alert"
          ariaLabel="Notifications"
          shape="circular"
          appearance="outline"
          badge="2"
          badgeVariant="info"
        />
        <ui-button
          icon="person"
          ariaLabel="Team"
          shape="circular"
          size="large"
          badge="12"
          badgePosition="bottom-end"
          badgeVariant="success"
        />
      </div>
    </div>
  `,
})
export class ButtonBadgeDemoComponent {}
