import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TableOfContentComponent } from 'ui';

@Component({
  selector: 'app-table-of-content-basic-demo',
  standalone: true,
  imports: [TableOfContentComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:58rem"
    >
      <div
        style="flex:0 0 16rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-table-of-content containerSelector=".toc-basic-content" [minLevel]="2" [maxLevel]="3" />
      </div>

      <div
        class="toc-basic-content"
        style="flex:1 1 24rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <h2 id="toc-basic-overview">Overview</h2>
        <p style="margin:0 0 1rem">
          Table of content scans headings inside the target container and builds in-page navigation
          automatically.
        </p>
        <h3 id="toc-basic-import">Import</h3>
        <p style="margin:0 0 1rem">Point the component at the content area you want to index.</p>
        <h2 id="toc-basic-usage">Usage</h2>
        <p style="margin:0 0 1rem">
          Use semantic heading order so nested sections remain understandable.
        </p>
        <h3 id="toc-basic-structure">Structure</h3>
        <p style="margin:0">
          Keep heading depth intentional instead of generating long noisy trees.
        </p>
      </div>
    </div>
  `,
})
export class TableOfContentBasicDemoComponent {}
