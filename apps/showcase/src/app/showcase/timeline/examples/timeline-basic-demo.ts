import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TimelineComponent, type TimelineItem } from 'lui';

@Component({
  selector: 'app-timeline-basic-demo',
  standalone: true,
  imports: [TimelineComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:36rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-timeline [items]="items" ariaLabel="Release activity" />
    </div>
  `,
})
export class TimelineBasicDemoComponent {
  protected readonly items: TimelineItem[] = [
    {
      id: 'draft',
      title: 'Draft saved',
      timestamp: '09:12',
      description: 'Campaign brief updated with new audience notes.',
      meta: 'Ava Lopez',
    },
    {
      id: 'review',
      title: 'Review requested',
      timestamp: '10:48',
      description: 'Legal and brand teams were added as reviewers.',
      meta: 'Marek Nowak',
      icon: 'person_mail',
      variant: 'info',
    },
    {
      id: 'approved',
      title: 'Approved for launch',
      timestamp: '14:05',
      description: 'All required reviewers signed off on the final version.',
      meta: 'System',
      icon: 'checkmark_circle',
      variant: 'success',
    },
  ];
}
