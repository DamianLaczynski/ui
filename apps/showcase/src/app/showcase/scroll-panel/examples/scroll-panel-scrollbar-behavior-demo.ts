import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollPanelComponent } from 'ui';

@Component({
  selector: 'app-scroll-panel-scrollbar-behavior-demo',
  standalone: true,
  imports: [ScrollPanelComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem;width:100%;max-width:48rem"
    >
      @for (behavior of behaviors; track behavior) {
        <div
          style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
        >
          <div style="font-size:0.875rem;font-weight:600">{{ behavior }}</div>
          <ui-scroll-panel
            [scrollbarBehavior]="behavior"
            maxHeight="14rem"
            ariaLabel="Scrollbar behavior demo"
          >
            <div style="display:flex;flex-direction:column;gap:0.625rem">
              @for (item of items; track item.id) {
                <div
                  style="padding:0.75rem 0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background-rest);font-size:0.8125rem"
                >
                  {{ item.label }}
                </div>
              }
            </div>
          </ui-scroll-panel>
        </div>
      }
    </div>
  `,
})
export class ScrollPanelScrollbarBehaviorDemoComponent {
  protected readonly behaviors = ['auto', 'always', 'never'] as const;
  protected readonly items = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    label: `Scrollable row ${index + 1}`,
  }));
}
