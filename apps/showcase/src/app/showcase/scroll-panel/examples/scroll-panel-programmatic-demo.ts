import { Component, signal, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, ScrollPanelComponent } from 'lui';

@Component({
  selector: 'app-scroll-panel-programmatic-demo',
  standalone: true,
  imports: [ButtonComponent, ScrollPanelComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" size="small" (click)="scrollToTop()"
          >Top</ui-button
        >
        <ui-button variant="secondary" appearance="outline" size="small" (click)="scrollToBottom()"
          >Bottom</ui-button
        >
        <ui-button variant="secondary" appearance="outline" size="small" (click)="scrollToRight()"
          >Right</ui-button
        >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Last action: <strong>{{ lastAction() || 'none' }}</strong></span
        >
      </div>

      <div
        style="border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest);padding:0.5rem"
      >
        <ui-scroll-panel
          #panel
          orientation="both"
          maxHeight="16rem"
          ariaLabel="Programmatic scroll panel"
        >
          <div
            style="display:grid;grid-template-columns:repeat(5,12rem);gap:0.75rem;width:max-content"
          >
            @for (item of items; track item.id) {
              <div
                style="height:8rem;padding:0.875rem 1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
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
export class ScrollPanelProgrammaticDemoComponent {
  protected readonly panel = viewChild<ScrollPanelComponent>('panel');
  protected readonly lastAction = signal('');

  protected readonly items = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: `Card ${index + 1}`,
    body: 'Programmatic scrolling is useful when the shell needs to jump to a region after an external action.',
  }));

  protected scrollToTop(): void {
    this.panel()?.scrollToTop();
    this.lastAction.set('Scrolled to top');
  }

  protected scrollToBottom(): void {
    this.panel()?.scrollToBottom();
    this.lastAction.set('Scrolled to bottom');
  }

  protected scrollToRight(): void {
    this.panel()?.scrollToRight();
    this.lastAction.set('Scrolled to right edge');
  }
}
