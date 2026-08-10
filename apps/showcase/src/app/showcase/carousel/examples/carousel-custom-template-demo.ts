import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent, ButtonComponent, CarouselComponent, CarouselItem } from 'lui';

@Component({
  selector: 'app-carousel-custom-template-demo',
  standalone: true,
  imports: [CarouselComponent, BadgeComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <ui-carousel
      [items]="workspaceSlides"
      [slideTemplate]="workspaceTemplate"
      [showIndicators]="true"
    />

    <ng-template #workspaceTemplate let-item>
      <div
        style="display:flex;flex-direction:column;justify-content:space-between;gap:1rem;width:100%;height:100%;padding:1.5rem;background:linear-gradient(180deg, var(--color-neutral-background-rest) 0%, var(--color-neutral-background2-rest) 100%);color:var(--color-neutral-foreground-rest);text-align:left"
      >
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
          <ui-badge [text]="item.badge" variant="info" appearance="tint" />
          <ui-badge [text]="item.meta" variant="secondary" appearance="subtle" />
        </div>

        <div style="display:grid;gap:0.75rem;max-width:34rem">
          <h3 style="margin:0;font-size:1.5rem;line-height:1.2">{{ item.title }}</h3>
          <p
            style="margin:0;font-size:0.9375rem;line-height:1.6;color:var(--color-neutral-foreground2-rest)"
          >
            {{ item.description }}
          </p>
        </div>

        <div
          style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.875rem;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:rgba(255,255,255,0.72)"
        >
          <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
            <div style="display:grid;gap:0.125rem">
              <strong style="font-size:0.875rem">{{ item.metricA }}</strong>
              <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest)"
                >open items</span
              >
            </div>
            <div style="display:grid;gap:0.125rem">
              <strong style="font-size:0.875rem">{{ item.metricB }}</strong>
              <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest)"
                >contributors</span
              >
            </div>
          </div>

          <ui-button appearance="outline">Open workspace</ui-button>
        </div>
      </div>
    </ng-template>
  `,
})
export class CarouselCustomTemplateDemoComponent {
  protected readonly workspaceSlides: CarouselItem[] = [
    {
      id: 'template-1',
      badge: 'Product updates',
      meta: 'Q2 focus',
      title: 'Roll out the new navigation shell',
      description:
        'Custom slide templates work well when carousel needs richer layouts than an image with caption. Keep each slide structured like a card, not a full page.',
      metricA: '18',
      metricB: '6',
    },
    {
      id: 'template-2',
      badge: 'Design system',
      meta: 'Migration',
      title: 'Track components that still use legacy patterns',
      description:
        'You can embed badges, actions, or metric summaries and still reuse the same carousel navigation behavior.',
      metricA: '9',
      metricB: '4',
    },
    {
      id: 'template-3',
      badge: 'Planning',
      meta: 'Next sprint',
      title: 'Highlight team priorities without building custom chrome',
      description:
        'This pattern is useful for workspace overviews, roadmap highlights, onboarding callouts, or release spotlight sections.',
      metricA: '5',
      metricB: '8',
    },
  ];
}
