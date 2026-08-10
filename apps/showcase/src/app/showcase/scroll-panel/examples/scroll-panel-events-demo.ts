import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, ScrollPanelComponent } from 'lui';

@Component({
  selector: 'app-scroll-panel-events-demo',
  standalone: true,
  imports: [ButtonComponent, ScrollPanelComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:30rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" (click)="reset()"
          >Reset counters</ui-button
        >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Top: <strong>{{ scrollTop() }}px</strong></span
        >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Ended: <strong>{{ scrollEndCount() }}</strong></span
        >
      </div>

      <div
        style="border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest);padding:0.5rem"
      >
        <ui-scroll-panel
          maxHeight="18rem"
          ariaLabel="Scroll events demo"
          (scroll)="onScroll($event)"
          (scrollEnd)="onScrollEnd()"
        >
          <div style="display:flex;flex-direction:column;gap:0.75rem">
            @for (item of items; track item.id) {
              <div
                style="padding:0.875rem 1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
              >
                <div style="font-size:0.875rem;font-weight:600">{{ item.title }}</div>
                <div
                  style="margin-top:0.25rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
                >
                  {{ item.body }}
                </div>
              </div>
            }
          </div>
        </ui-scroll-panel>
      </div>
    </div>
  `,
})
export class ScrollPanelEventsDemoComponent {
  protected readonly scrollTop = signal(0);
  protected readonly scrollEndCount = signal(0);

  protected readonly items = Array.from({ length: 16 }, (_, index) => ({
    id: index + 1,
    title: `Event row ${index + 1}`,
    body: 'Listening to scroll and scrollEnd is useful for analytics, sticky shell logic, or lazy UI reactions.',
  }));

  protected onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    this.scrollTop.set(Math.round(target.scrollTop));
  }

  protected onScrollEnd(): void {
    this.scrollEndCount.update(count => count + 1);
  }

  protected reset(): void {
    this.scrollTop.set(0);
    this.scrollEndCount.set(0);
  }
}
