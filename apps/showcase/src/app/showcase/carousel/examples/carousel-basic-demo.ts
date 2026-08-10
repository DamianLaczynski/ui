import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CarouselComponent, CarouselItem } from 'lui';

@Component({
  selector: 'app-carousel-basic-demo',
  standalone: true,
  imports: [CarouselComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: ` <ui-carousel [items]="heroSlides" (itemClick)="(0)" /> `,
})
export class CarouselBasicDemoComponent {
  protected readonly heroSlides: CarouselItem[] = [
    {
      id: 'hero-1',
      image: 'https://picsum.photos/seed/ui-carousel-1/1200/640',
      title: 'Launch seasonal workspace themes',
      description:
        'Use carousel for broad visual storytelling when each slide needs enough room for a headline, supporting copy, and imagery.',
    },
    {
      id: 'hero-2',
      image: 'https://picsum.photos/seed/ui-carousel-2/1200/640',
      title: 'Promote key releases without custom layout',
      description:
        'Slides move one item at a time and keep controls, indicators, and transitions consistent across the product.',
    },
    {
      id: 'hero-3',
      image: 'https://picsum.photos/seed/ui-carousel-3/1200/640',
      title: 'Keep copy short and scannable',
      description:
        'Treat each slide like a focused card, not a scrolling page. Carousel works best when users can compare a small set of highlights.',
    },
  ];
}
