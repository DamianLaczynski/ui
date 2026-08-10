import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import {
  SplitterComponent,
  SplitterPanelDirective,
  type SplitterPanel,
  type SplitterResizeEvent,
} from 'lui';

@Component({
  selector: 'app-splitter-vertical-demo',
  standalone: true,
  imports: [SplitterComponent, SplitterPanelDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Summary: <strong>{{ sizes()[0].toFixed(0) }}%</strong></span
        >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Feed: <strong>{{ sizes()[1].toFixed(0) }}%</strong></span
        >
      </div>

      <div
        style="height:24rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;overflow:hidden;background:var(--color-neutral-background-rest)"
      >
        <ui-splitter
          [panels]="panels()"
          orientation="vertical"
          [gutterSize]="8"
          (panelResize)="onResize($event)"
        >
          <ng-template uiSplitterPanel="summary">
            <div style="height:100%;padding:1rem;background:var(--color-neutral-background-rest)">
              <div style="font-size:0.875rem;font-weight:600">Summary</div>
              <div
                style="margin-top:0.5rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
              >
                Vertical splitters fit dashboards with a compact header region above a denser
                content area.
              </div>
            </div>
          </ng-template>

          <ng-template uiSplitterPanel="feed">
            <div
              style="height:100%;padding:1rem;background:linear-gradient(180deg,var(--color-neutral-background-rest),var(--color-neutral-background2-rest))"
            >
              <div style="font-size:0.875rem;font-weight:600">Activity feed</div>
              <div
                style="margin-top:0.5rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
              >
                The lower region can grow when users need more scrolling room.
              </div>
            </div>
          </ng-template>
        </ui-splitter>
      </div>
    </div>
  `,
})
export class SplitterVerticalDemoComponent {
  protected readonly panels = signal<SplitterPanel[]>([
    { id: 'summary', size: 34, minSize: 120, maxSize: 220 },
    { id: 'feed', size: 66, minSize: 220 },
  ]);

  protected readonly sizes = signal([34, 66]);

  protected onResize(event: SplitterResizeEvent): void {
    const next = [...this.sizes()];
    next[event.panelIndex] = event.newSize;
    this.sizes.set(next);
  }
}
