import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent } from 'lui';

@Component({
  selector: 'app-badge-basic-demo',
  standalone: true,
  imports: [BadgeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-badge text="Live" variant="success" />
        <ui-badge text="Draft" variant="secondary" appearance="tint" />
        <ui-badge text="Needs review" variant="warning" appearance="outline" />
        <ui-badge text="Blocked" variant="danger" />
        <ui-badge text="New" variant="info" appearance="subtle" />
      </div>

      <div
        style="display:grid;gap:0.75rem;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <div
          style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;padding:0.875rem 1rem;border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:0">
            <strong style="font-size:0.875rem;color:var(--color-neutral-foreground-rest)"
              >Release checklist</strong
            >
            <span style="font-size:0.8125rem;color:var(--color-neutral-foreground3-rest)"
              >Badge should summarize state without needing a sentence.</span
            >
          </div>
          <ui-badge text="QA passed" variant="success" appearance="tint" />
        </div>
      </div>
    </div>
  `,
})
export class BadgeBasicDemoComponent {}
