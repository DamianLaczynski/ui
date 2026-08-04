import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent } from 'ui';

@Component({
  selector: 'app-badge-counts-demo',
  standalone: true,
  imports: [BadgeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem">
      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-badge text="3" shape="circular" ariaLabel="3 pending approvals" />
        <ui-badge text="12" shape="circular" variant="info" ariaLabel="12 unread updates" />
        <ui-badge text="99+" shape="circular" variant="danger" ariaLabel="99 or more alerts" />
        <ui-badge text="7 files" variant="secondary" appearance="tint" />
      </div>

      <div
        style="display:grid;gap:0.75rem;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <div
          style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;padding:0.875rem 1rem;border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <div style="display:flex;flex-direction:column;gap:0.25rem">
            <strong style="font-size:0.875rem">Inbox</strong>
            <span style="font-size:0.8125rem;color:var(--color-neutral-foreground3-rest)"
              >Compact count badges fit best when the number is the only thing that matters.</span
            >
          </div>
          <ui-badge text="24" shape="circular" variant="danger" ariaLabel="24 unread messages" />
        </div>
      </div>
    </div>
  `,
})
export class BadgeCountsDemoComponent {}
