import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent, CarouselComponent, CarouselItem } from 'ui';

@Component({
  selector: 'app-carousel-workspace-highlights-demo',
  standalone: true,
  imports: [CarouselComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-badge
          text="Use for a small set of high-value slides"
          variant="secondary"
          appearance="tint"
        />
        <ui-badge
          text="Avoid dumping long feeds into a carousel"
          variant="warning"
          appearance="outline"
        />
      </div>

      <ui-carousel [items]="workspaceSlides" [autoPlay]="true" [autoPlayInterval]="4500" />
    </div>
  `,
})
export class CarouselWorkspaceHighlightsDemoComponent {
  protected readonly workspaceSlides: CarouselItem[] = [
    {
      id: 'workspace-1',
      image: 'https://picsum.photos/seed/ui-carousel-workspace-1/1200/640',
      title: 'Workspace highlights',
      description:
        'A carousel can anchor a landing page or team hub when each slide represents one clear destination or story.',
    },
    {
      id: 'workspace-2',
      image: 'https://picsum.photos/seed/ui-carousel-workspace-2/1200/640',
      title: 'Keep the count of slides low',
      description:
        'Three to five slides is usually enough. Beyond that, users stop comparing and start ignoring the surface.',
    },
    {
      id: 'workspace-3',
      image: 'https://picsum.photos/seed/ui-carousel-workspace-3/1200/640',
      title: 'Pair motion with readable pacing',
      description:
        'If auto-play is enabled, keep timing slow and preserve manual navigation so the surface still feels user-controlled.',
    },
  ];
}
