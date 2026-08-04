import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import {
  ButtonComponent,
  SplitterComponent,
  SplitterPanelDirective,
  type SplitterPanel,
  type SplitterResizeEvent,
} from 'ui';

@Component({
  selector: 'app-splitter-constraints-demo',
  standalone: true,
  imports: [ButtonComponent, SplitterComponent, SplitterPanelDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:52rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Left: <strong>{{ sizes()[0].toFixed(0) }}%</strong></span
        >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Right: <strong>{{ sizes()[1].toFixed(0) }}%</strong></span
        >
      </div>

      <div
        style="height:18rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;overflow:hidden;background:var(--color-neutral-background-rest)"
      >
        <ui-splitter
          [panels]="panels()"
          orientation="horizontal"
          [gutterSize]="8"
          (panelResize)="onResize($event)"
        >
          <ng-template uiSplitterPanel="filters">
            <div style="height:100%;padding:1rem;background:var(--color-neutral-background-rest)">
              <div style="font-size:0.875rem;font-weight:600">Filters</div>
              <div
                style="margin-top:0.5rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
              >
                This panel has a minimum size so checkboxes and fields stay usable.
              </div>
            </div>
          </ng-template>

          <ng-template uiSplitterPanel="results">
            <div
              style="height:100%;padding:1rem;background:linear-gradient(180deg,var(--color-neutral-background-rest),var(--color-neutral-background2-rest))"
            >
              <div style="font-size:0.875rem;font-weight:600">Results</div>
              <div
                style="margin-top:0.5rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
              >
                The main area still keeps its own minimum size, so the content view does not
                collapse into noise.
              </div>
            </div>
          </ng-template>
        </ui-splitter>
      </div>
    </div>
  `,
})
export class SplitterConstraintsDemoComponent {
  protected readonly initialPanels: SplitterPanel[] = [
    { id: 'filters', size: 32, minSize: 220, maxSize: 360 },
    { id: 'results', size: 68, minSize: 360 },
  ];

  protected readonly panels = signal<SplitterPanel[]>(this.initialPanels);
  protected readonly sizes = signal([32, 68]);

  protected onResize(event: SplitterResizeEvent): void {
    const next = [...this.sizes()];
    next[event.panelIndex] = event.newSize;
    this.sizes.set(next);
  }

  protected reset(): void {
    this.panels.set([...this.initialPanels]);
    this.sizes.set([32, 68]);
  }
}
