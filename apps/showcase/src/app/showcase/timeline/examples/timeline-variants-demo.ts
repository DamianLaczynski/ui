import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TimelineComponent, type TimelineItem } from 'lui';

@Component({
  selector: 'app-timeline-variants-demo',
  standalone: true,
  imports: [TimelineComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:36rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-timeline [items]="items" size="small" ariaLabel="Deployment status" />
    </div>
  `,
})
export class TimelineVariantsDemoComponent {
  protected readonly items: TimelineItem[] = [
    {
      id: 'queued',
      title: 'Build queued',
      timestamp: '18:01',
      description: 'CI picked up commit 8f2a91 on main.',
      variant: 'secondary',
    },
    {
      id: 'running',
      title: 'Deploy in progress',
      timestamp: '18:04',
      description: 'Rolling out ui-showcase to staging.',
      variant: 'warning',
      icon: 'arrow_sync',
      pending: true,
    },
    {
      id: 'failed',
      title: 'Smoke tests failed',
      timestamp: '18:09',
      description: 'Checkout flow returned 500 on payment step.',
      variant: 'danger',
      icon: 'error_circle',
    },
    {
      id: 'resolved',
      title: 'Hotfix deployed',
      timestamp: '18:22',
      description: 'Payment gateway timeout handling restored service.',
      variant: 'success',
      icon: 'checkmark',
    },
  ];
}
