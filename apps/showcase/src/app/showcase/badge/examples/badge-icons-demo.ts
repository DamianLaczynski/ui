import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent } from 'ui';

@Component({
  selector: 'app-badge-icons-demo',
  standalone: true,
  imports: [BadgeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-badge text="Approved" icon="checkmark_circle" variant="success" appearance="tint" />
        <ui-badge text="Overdue" icon="clock" variant="warning" appearance="outline" />
        <ui-badge text="Unread" icon="mail" variant="info" />
        <ui-badge text="Customer" icon="person" variant="secondary" appearance="tint" />
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-badge
          text="Due today"
          icon="calendar"
          iconPosition="after"
          variant="primary"
          appearance="outline"
        />
        <ui-badge
          text="Escalated"
          icon="warning"
          iconPosition="after"
          variant="danger"
          appearance="tint"
        />
      </div>
    </div>
  `,
})
export class BadgeIconsDemoComponent {}
