import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastContainerComponent, IconComponent } from 'ui';
import { ScrollService } from '@shared/scroll/scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, ToastContainerComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      .app-fab {
        position: fixed;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        padding: 0;
        border: 1px solid var(--color-neutral-stroke-rest);
        border-radius: 50%;
        background: var(--color-neutral-background-rest);
        color: var(--color-neutral-foreground-rest);
        cursor: pointer;
        transition:
          background 0.2s,
          border-color 0.2s,
          color 0.2s;
      }

      .app-fab:hover {
        background: var(--color-neutral-background2-rest);
        border-color: var(--color-brand-primary);
        color: var(--color-brand-primary);
      }

      .app-back-to-top {
        bottom: 16px;
        right: 16px;
        transition: opacity 0.2s;
      }

      .app-back-to-top--hidden {
        opacity: 0;
        pointer-events: none;
      }
    `,
  ],
})
export class AppComponent {
  private readonly scrollService = inject(ScrollService);

  readonly showBackToTop = computed(() => this.scrollService.scrollY() > 300);

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }
}
