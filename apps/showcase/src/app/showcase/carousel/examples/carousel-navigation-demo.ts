import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CarouselComponent, CarouselItem } from 'ui';

@Component({
  selector: 'app-carousel-navigation-demo',
  standalone: true,
  imports: [CarouselComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem">
      <div
        style="display:grid;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <strong style="font-size:0.875rem;color:var(--color-neutral-foreground-rest)"
          >Full navigation</strong
        >
        <ui-carousel [items]="slides" />
      </div>

      <div
        style="display:grid;gap:0.75rem;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <strong style="font-size:0.875rem;color:var(--color-neutral-foreground-rest)"
          >Indicators only, no loop</strong
        >
        <ui-carousel [items]="slides" [showControls]="false" [loop]="false" />
      </div>
    </div>
  `,
})
export class CarouselNavigationDemoComponent {
  protected readonly slides: CarouselItem[] = [
    {
      id: 'nav-1',
      image: 'https://picsum.photos/seed/ui-carousel-nav-1/960/480',
      title: 'Plan',
      description: 'First slide in a bounded sequence.',
    },
    {
      id: 'nav-2',
      image: 'https://picsum.photos/seed/ui-carousel-nav-2/960/480',
      title: 'Build',
      description: 'Second slide keeps the same surface and controls.',
    },
    {
      id: 'nav-3',
      image: 'https://picsum.photos/seed/ui-carousel-nav-3/960/480',
      title: 'Review',
      description: 'Last slide stops when loop is disabled.',
    },
  ];
}
