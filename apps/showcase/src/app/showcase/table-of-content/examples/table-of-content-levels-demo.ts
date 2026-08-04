import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TableOfContentComponent } from 'ui';

@Component({
  selector: 'app-table-of-content-levels-demo',
  standalone: true,
  imports: [TableOfContentComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:60rem"
    >
      <div
        style="flex:1 1 18rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          H2-H3 navigation
        </p>
        <ui-table-of-content
          containerSelector=".toc-levels-content"
          [minLevel]="2"
          [maxLevel]="3"
        />
      </div>

      <div
        style="flex:1 1 18rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          H3-H4 navigation
        </p>
        <ui-table-of-content
          containerSelector=".toc-levels-content"
          [minLevel]="3"
          [maxLevel]="4"
          appearance="outline"
        />
      </div>

      <div
        class="toc-levels-content"
        style="flex:1 1 100%;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <h2 id="toc-levels-getting-started">Getting started</h2>
        <p style="margin:0 0 1rem">Top-level docs section.</p>
        <h3 id="toc-levels-installation">Installation</h3>
        <p style="margin:0 0 1rem">Install and wire the target container.</p>
        <h4 id="toc-levels-cli">CLI setup</h4>
        <p style="margin:0 0 1rem">Project scaffolding details.</p>
        <h3 id="toc-levels-configuration">Configuration</h3>
        <p style="margin:0 0 1rem">Heading range and sticky offset live here.</p>
        <h4 id="toc-levels-routing">Routing</h4>
        <p style="margin:0">Deep topic for nested content.</p>
      </div>
    </div>
  `,
})
export class TableOfContentLevelsDemoComponent {}
