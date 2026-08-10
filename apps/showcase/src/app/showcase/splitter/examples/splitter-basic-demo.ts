import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import {
  SplitterComponent,
  SplitterPanelDirective,
  type SplitterPanel,
  type SplitterResizeEvent,
} from 'lui';

@Component({
  selector: 'app-splitter-basic-demo',
  standalone: true,
  imports: [SplitterComponent, SplitterPanelDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:56rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Sidebar: <strong>{{ sizes()[0].toFixed(0) }}%</strong></span
        >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Canvas: <strong>{{ sizes()[1].toFixed(0) }}%</strong></span
        >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Inspector: <strong>{{ sizes()[2].toFixed(0) }}%</strong></span
        >
      </div>

      <div
        style="height:22rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;overflow:hidden;background:var(--color-neutral-background-rest)"
      >
        <ui-splitter
          [panels]="panels()"
          orientation="horizontal"
          [gutterSize]="8"
          (panelResize)="onResize($event)"
        >
          <ng-template uiSplitterPanel="sidebar">
            <div
              style="height:100%;padding:1rem;background:var(--color-neutral-background-rest);border-right:1px solid var(--color-neutral-stroke-rest)"
            >
              <div style="font-size:0.875rem;font-weight:600">Navigation</div>
              <div
                style="margin-top:0.5rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
              >
                Keep project or file navigation resizable, but not too narrow.
              </div>
            </div>
          </ng-template>

          <ng-template uiSplitterPanel="canvas">
            <div
              style="height:100%;padding:1rem;background:linear-gradient(180deg,var(--color-neutral-background-rest),var(--color-neutral-background2-rest))"
            >
              <div style="font-size:0.875rem;font-weight:600">Main workspace</div>
              <div
                style="margin-top:0.5rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
              >
                This center region usually gets the most flexible space.
              </div>
            </div>
          </ng-template>

          <ng-template uiSplitterPanel="inspector">
            <div
              style="height:100%;padding:1rem;background:var(--color-neutral-background-rest);border-left:1px solid var(--color-neutral-stroke-rest)"
            >
              <div style="font-size:0.875rem;font-weight:600">Inspector</div>
              <div
                style="margin-top:0.5rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
              >
                A secondary panel can stay resizable without taking over the layout.
              </div>
            </div>
          </ng-template>
        </ui-splitter>
      </div>
    </div>
  `,
})
export class SplitterBasicDemoComponent {
  protected readonly panels = signal<SplitterPanel[]>([
    { id: 'sidebar', size: 22, minSize: 180, maxSize: 320 },
    { id: 'canvas', size: 53, minSize: 320 },
    { id: 'inspector', size: 25, minSize: 220, maxSize: 420 },
  ]);

  protected readonly sizes = signal([22, 53, 25]);

  protected onResize(event: SplitterResizeEvent): void {
    const next = [...this.sizes()];
    next[event.panelIndex] = event.newSize;
    this.sizes.set(next);
  }
}
