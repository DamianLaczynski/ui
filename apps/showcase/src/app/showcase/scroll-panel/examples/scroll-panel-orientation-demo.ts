import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollPanelComponent } from 'ui';

@Component({
  selector: 'app-scroll-panel-orientation-demo',
  standalone: true,
  imports: [ScrollPanelComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;width:100%;max-width:54rem"
    >
      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Horizontal strip</div>
        <ui-scroll-panel
          orientation="horizontal"
          maxWidth="100%"
          ariaLabel="Horizontal preview strip"
        >
          <div style="display:flex;gap:0.75rem;width:max-content;padding-bottom:0.25rem">
            @for (item of horizontalItems; track item.id) {
              <div
                style="width:11rem;padding:0.875rem 1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
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

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Both directions</div>
        <ui-scroll-panel
          orientation="both"
          maxHeight="16rem"
          maxWidth="100%"
          ariaLabel="Bidirectional canvas"
        >
          <div
            style="display:grid;grid-template-columns:repeat(6,10rem);gap:0.75rem;width:max-content;padding-right:0.25rem"
          >
            @for (item of canvasItems; track item.id) {
              <div
                style="height:7rem;padding:0.875rem 1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:linear-gradient(180deg,var(--color-neutral-background-rest),var(--color-neutral-background2-rest))"
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
export class ScrollPanelOrientationDemoComponent {
  protected readonly horizontalItems = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    title: `Preview ${index + 1}`,
    body: 'Useful for media strips, cards, or dense option galleries.',
  }));

  protected readonly canvasItems = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: `Widget ${index + 1}`,
    body: 'Bidirectional scroll is useful only when the content truly needs two axes.',
  }));
}
