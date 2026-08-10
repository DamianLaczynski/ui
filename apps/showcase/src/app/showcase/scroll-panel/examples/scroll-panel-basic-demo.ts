import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollPanelComponent } from 'lui';

@Component({
  selector: 'app-scroll-panel-basic-demo',
  standalone: true,
  imports: [ScrollPanelComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:28rem">
      <div
        style="border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest);padding:0.5rem"
      >
        <ui-scroll-panel maxHeight="22rem" ariaLabel="Activity feed panel">
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
export class ScrollPanelBasicDemoComponent {
  protected readonly items = Array.from({ length: 14 }, (_, index) => ({
    id: index + 1,
    title: `Update ${index + 1}`,
    body: 'A basic vertical scroll region is useful for feeds, drawers, and side panels with constrained height.',
  }));
}
