import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CarouselComponent, CarouselItem } from 'lui';

@Component({
  selector: 'app-carousel-autoplay-demo',
  standalone: true,
  imports: [CarouselComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem">
      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-carousel [items]="slides" [autoPlay]="true" [autoPlayInterval]="3500" />
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);font-size:0.8125rem;line-height:1.45;color:var(--color-neutral-foreground3-rest)"
      >
        <span>Auto-play pauses on hover.</span>
        <span>Use it for passive highlights, not for critical reading or forms.</span>
      </div>
    </div>
  `,
})
export class CarouselAutoplayDemoComponent {
  protected readonly slides: CarouselItem[] = [
    {
      id: 'auto-1',
      image: 'https://picsum.photos/seed/ui-carousel-auto-1/1200/640',
      title: 'Passive campaign highlights',
      description: 'Useful for hero banners or dashboards where content can rotate on its own.',
    },
    {
      id: 'auto-2',
      image: 'https://picsum.photos/seed/ui-carousel-auto-2/1200/640',
      title: 'Do not rush the reader',
      description: 'Keep interval generous enough for users to parse text before the next slide.',
    },
    {
      id: 'auto-3',
      image: 'https://picsum.photos/seed/ui-carousel-auto-3/1200/640',
      title: 'Always keep manual controls',
      description:
        'Users should still be able to move backward and forward when something matters.',
    },
  ];
}
