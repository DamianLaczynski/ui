import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SplitterComponent, SplitterPanelDirective, type SplitterPanel } from 'ui';

@Component({
  selector: 'app-splitter-nested-workspace-demo',
  standalone: true,
  imports: [SplitterComponent, SplitterPanelDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:62rem">
      <div style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest)">
        Nested splitters are useful for editor-like shells with a sidebar, top context region, main
        canvas, and a secondary status or log area.
      </div>

      <div
        style="height:28rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;overflow:hidden;background:var(--color-neutral-background-rest)"
      >
        <ui-splitter [panels]="outerPanels" orientation="horizontal" [gutterSize]="8">
          <ng-template uiSplitterPanel="sidebar">
            <div
              style="height:100%;padding:1rem;background:var(--color-neutral-background-rest);border-right:1px solid var(--color-neutral-stroke-rest)"
            >
              <div style="font-size:0.875rem;font-weight:600">Project sidebar</div>
              <div
                style="margin-top:0.5rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
              >
                Folders, views, or explorer items usually live here.
              </div>
            </div>
          </ng-template>

          <ng-template uiSplitterPanel="main">
            <ui-splitter [panels]="innerPanels" orientation="vertical" [gutterSize]="8">
              <ng-template uiSplitterPanel="header">
                <div
                  style="height:100%;padding:1rem;background:var(--color-neutral-background-rest);border-bottom:1px solid var(--color-neutral-stroke-rest)"
                >
                  <div style="font-size:0.875rem;font-weight:600">Editor header</div>
                  <div
                    style="margin-top:0.5rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
                  >
                    Toolbar, breadcrumbs, or active file info.
                  </div>
                </div>
              </ng-template>

              <ng-template uiSplitterPanel="canvas">
                <div
                  style="height:100%;padding:1rem;background:linear-gradient(180deg,var(--color-neutral-background-rest),var(--color-neutral-background2-rest))"
                >
                  <div style="font-size:0.875rem;font-weight:600">Canvas</div>
                  <div
                    style="margin-top:0.5rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
                  >
                    This is the main content region that usually needs the most space.
                  </div>
                </div>
              </ng-template>

              <ng-template uiSplitterPanel="footer">
                <div
                  style="height:100%;padding:1rem;background:var(--color-neutral-background-rest);border-top:1px solid var(--color-neutral-stroke-rest)"
                >
                  <div style="font-size:0.875rem;font-weight:600">Output panel</div>
                  <div
                    style="margin-top:0.5rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
                  >
                    Logs, errors, or test output fit naturally in a smaller bottom region.
                  </div>
                </div>
              </ng-template>
            </ui-splitter>
          </ng-template>
        </ui-splitter>
      </div>
    </div>
  `,
})
export class SplitterNestedWorkspaceDemoComponent {
  protected readonly outerPanels: SplitterPanel[] = [
    { id: 'sidebar', size: 22, minSize: 180, maxSize: 320 },
    { id: 'main', size: 78, minSize: 540 },
  ];

  protected readonly innerPanels: SplitterPanel[] = [
    { id: 'header', size: 18, minSize: 90, maxSize: 160 },
    { id: 'canvas', size: 60, minSize: 240 },
    { id: 'footer', size: 22, minSize: 100, maxSize: 180 },
  ];
}
