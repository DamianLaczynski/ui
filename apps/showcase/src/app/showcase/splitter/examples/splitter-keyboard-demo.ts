import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import {
  ButtonComponent,
  SplitterComponent,
  SplitterPanelDirective,
  type SplitterPanel,
  type SplitterResizeEvent,
} from 'lui';

@Component({
  selector: 'app-splitter-keyboard-demo',
  standalone: true,
  imports: [ButtonComponent, SplitterComponent, SplitterPanelDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:50rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Last resize: <strong>{{ lastResize() || 'none' }}</strong></span
        >
      </div>

      <div style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest)">
        Tab to the gutter, then use arrow keys for small adjustments or <code>Home</code> /
        <code>End</code> to move toward the panel limits.
      </div>

      <div
        style="height:16rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;overflow:hidden;background:var(--color-neutral-background-rest)"
      >
        <ui-splitter
          [panels]="panels"
          orientation="horizontal"
          [gutterSize]="8"
          (panelResize)="onResize($event)"
        >
          <ng-template uiSplitterPanel="details">
            <div style="height:100%;padding:1rem;background:var(--color-neutral-background-rest)">
              <div style="font-size:0.875rem;font-weight:600">Details</div>
            </div>
          </ng-template>

          <ng-template uiSplitterPanel="preview">
            <div
              style="height:100%;padding:1rem;background:linear-gradient(180deg,var(--color-neutral-background-rest),var(--color-neutral-background2-rest))"
            >
              <div style="font-size:0.875rem;font-weight:600">Preview</div>
            </div>
          </ng-template>
        </ui-splitter>
      </div>
    </div>
  `,
})
export class SplitterKeyboardDemoComponent {
  protected readonly panels: SplitterPanel[] = [
    { id: 'details', size: 35, minSize: 220, maxSize: 420 },
    { id: 'preview', size: 65, minSize: 320 },
  ];

  protected readonly lastResize = signal('');

  protected onResize(event: SplitterResizeEvent): void {
    this.lastResize.set(`${event.panelId}: ${event.newSize.toFixed(0)}%`);
  }

  protected reset(): void {
    this.lastResize.set('');
  }
}
