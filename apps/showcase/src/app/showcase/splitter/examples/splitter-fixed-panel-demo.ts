import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SplitterComponent, SplitterPanelDirective, type SplitterPanel } from 'lui';

@Component({
  selector: 'app-splitter-fixed-panel-demo',
  standalone: true,
  imports: [SplitterComponent, SplitterPanelDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:52rem">
      <div style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest)">
        Sometimes one panel should stay fixed while the neighboring region absorbs resizing. This is
        useful for a locked utility rail or a compact metrics strip.
      </div>

      <div
        style="height:18rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;overflow:hidden;background:var(--color-neutral-background-rest)"
      >
        <ui-splitter [panels]="panels" orientation="horizontal" [gutterSize]="8">
          <ng-template uiSplitterPanel="rail">
            <div
              style="height:100%;padding:1rem;background:var(--color-neutral-background-rest);border-right:1px solid var(--color-neutral-stroke-rest)"
            >
              <div style="font-size:0.875rem;font-weight:600">Utility rail</div>
              <div
                style="margin-top:0.5rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
              >
                This panel is marked non-resizable.
              </div>
            </div>
          </ng-template>

          <ng-template uiSplitterPanel="content">
            <div
              style="height:100%;padding:1rem;background:linear-gradient(180deg,var(--color-neutral-background-rest),var(--color-neutral-background2-rest))"
            >
              <div style="font-size:0.875rem;font-weight:600">Flexible content</div>
              <div
                style="margin-top:0.5rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
              >
                Use this pattern when only one side of the layout is meant to stretch and compress.
              </div>
            </div>
          </ng-template>
        </ui-splitter>
      </div>
    </div>
  `,
})
export class SplitterFixedPanelDemoComponent {
  protected readonly panels: SplitterPanel[] = [
    { id: 'rail', size: 18, minSize: 160, maxSize: 200, resizable: false },
    { id: 'content', size: 82, minSize: 420 },
  ];
}
