import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TimelineComponent, type TimelineItem } from 'lui';

@Component({
  selector: 'app-timeline-audit-demo',
  standalone: true,
  imports: [TimelineComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <div
        style="display:flex;flex-direction:column;gap:0.25rem;padding:0.875rem 1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <div style="font-size:0.9375rem;font-weight:600">Customer record #48291</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Audit trail for billing profile changes in the last 24 hours.
        </div>
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-timeline [items]="items" ariaLabel="Customer audit trail" />
      </div>
    </div>
  `,
})
export class TimelineAuditDemoComponent {
  protected readonly items: TimelineItem[] = [
    {
      id: 'viewed',
      title: 'Record viewed',
      timestamp: 'Yesterday 16:14',
      meta: 'Support · Nina Kowalska',
      description: 'Opened billing details from the helpdesk console.',
      icon: 'eye',
      variant: 'info',
    },
    {
      id: 'email',
      title: 'Invoice email updated',
      timestamp: 'Yesterday 17:02',
      meta: 'Finance · Tomasz Wiśniewski',
      description: 'Changed primary invoice recipient to accounts@acme.io.',
      icon: 'mail',
      variant: 'primary',
    },
    {
      id: 'role',
      title: 'Permission denied',
      timestamp: 'Yesterday 17:18',
      meta: 'Security policy',
      description: 'Attempt to export full payment history was blocked.',
      icon: 'shield_error',
      variant: 'danger',
    },
    {
      id: 'note',
      title: 'Internal note added',
      timestamp: 'Today 08:41',
      meta: 'Support · Nina Kowalska',
      description: 'Customer confirmed the new billing contact during phone call.',
      icon: 'comment',
      variant: 'secondary',
    },
  ];
}
