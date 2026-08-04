import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  TemplateRef,
  inject,
  DestroyRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { CarouselItem } from './models/carousel-item.model';
import { ButtonComponent } from '../button';
import { UiI18nService } from '../../i18n';

@Component({
  selector: 'ui-carousel',
  templateUrl: './carousel.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ButtonComponent, NgTemplateOutlet],
})
export class CarouselComponent {
  private readonly i18n = inject(UiI18nService);
  private readonly destroyRef = inject(DestroyRef);
  private isDestroyed = false;

  items = input<CarouselItem[]>([]);
  slideTemplate = input<TemplateRef<{ $implicit: CarouselItem; index: number }> | null>(null);
  activeIndex = input<number>(0);
  autoPlay = input<boolean>(false);
  autoPlayInterval = input<number>(3000);
  showIndicators = input<boolean>(true);
  showControls = input<boolean>(true);
  loop = input<boolean>(true);

  itemChange = output<{ item: CarouselItem; index: number }>();
  itemClick = output<{ item: CarouselItem; index: number }>();

  currentIndex = signal<number>(0);
  autoPlayTimer: any = null;

  // Computed properties
  currentItem = computed(() => {
    const items = this.items();
    const index = this.currentIndex();
    return items[index] || null;
  });

  hasNext = computed(() => {
    const items = this.items();
    const index = this.currentIndex();
    if (this.loop()) {
      return items.length > 1;
    }
    return index < items.length - 1;
  });

  hasPrevious = computed(() => {
    const items = this.items();
    const index = this.currentIndex();
    if (this.loop()) {
      return items.length > 1;
    }
    return index > 0;
  });

  constructor() {
    effect(() => {
      const newIndex = this.activeIndex();
      const items = this.items();
      if (newIndex >= 0 && newIndex < items.length) {
        this.currentIndex.set(newIndex);
      }
    });

    effect(() => {
      if (this.autoPlay() && this.items().length > 1) {
        this.startAutoPlay();
      } else {
        this.stopAutoPlay();
      }
      return () => this.stopAutoPlay();
    });

    this.destroyRef.onDestroy(() => {
      this.isDestroyed = true;
      this.stopAutoPlay();
    });
  }

  next(): void {
    const items = this.items();
    if (items.length === 0) return;

    const current = this.currentIndex();
    if (this.loop()) {
      this.currentIndex.set((current + 1) % items.length);
    } else {
      if (current < items.length - 1) {
        this.currentIndex.set(current + 1);
      }
    }
    this.emitItemChange();
    this.resetAutoPlay();
  }

  previous(): void {
    const items = this.items();
    if (items.length === 0) return;

    const current = this.currentIndex();
    if (this.loop()) {
      this.currentIndex.set(current === 0 ? items.length - 1 : current - 1);
    } else {
      if (current > 0) {
        this.currentIndex.set(current - 1);
      }
    }
    this.emitItemChange();
    this.resetAutoPlay();
  }

  goToIndex(index: number): void {
    const items = this.items();
    if (index >= 0 && index < items.length) {
      this.currentIndex.set(index);
      this.emitItemChange();
      this.resetAutoPlay();
    }
  }

  onItemClick(item: CarouselItem, index: number): void {
    this.itemClick.emit({ item, index });
  }

  onControlClick(event: MouseEvent, direction: 'previous' | 'next'): void {
    event.stopPropagation();
    if (direction === 'previous') {
      this.previous();
    } else {
      this.next();
    }
  }

  private emitItemChange(): void {
    if (this.isDestroyed) return;
    const items = this.items();
    const index = this.currentIndex();
    const item = items[index];
    if (item) {
      this.itemChange.emit({ item, index });
    }
  }

  private startAutoPlay(): void {
    if (this.isDestroyed) return;
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      if (this.isDestroyed) {
        this.stopAutoPlay();
        return;
      }
      this.next();
    }, this.autoPlayInterval());
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  private resetAutoPlay(): void {
    if (this.autoPlay()) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }

  onMouseEnter(): void {
    if (this.autoPlay()) {
      this.stopAutoPlay();
    }
  }

  onMouseLeave(): void {
    if (this.autoPlay()) {
      this.startAutoPlay();
    }
  }

  getImageAlt(item: CarouselItem): string {
    return item.title || this.i18n.t('carousel.imageAlt', 'Carousel image');
  }

  getPreviousSlideAriaLabel(): string {
    return this.i18n.t('carousel.previousSlideAriaLabel', 'Previous slide');
  }

  getNextSlideAriaLabel(): string {
    return this.i18n.t('carousel.nextSlideAriaLabel', 'Next slide');
  }

  getGoToSlideAriaLabel(index: number): string {
    const slide = index + 1;
    return this.i18n.t('carousel.goToSlideAriaLabel', `Go to slide ${slide}`, { slide });
  }
}
