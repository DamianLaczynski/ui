import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DividerComponent, MessageBarComponent, TableOfContentComponent } from 'ui';

@Component({
  selector: 'app-table-of-content-doc-layout-demo',
  standalone: true,
  imports: [DividerComponent, MessageBarComponent, TableOfContentComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:minmax(14rem,16rem) minmax(0,1fr);gap:1rem;width:100%;max-width:62rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-table-of-content
        containerSelector=".toc-doc-layout-content"
        [sticky]="true"
        [offsetTop]="8"
        appearance="outline"
      />

      <div
        class="toc-doc-layout-content"
        style="display:flex;flex-direction:column;gap:1rem;min-width:0"
      >
        <ui-message-bar
          title="Draft documentation"
          message="This example shows TOC in a richer docs layout with callouts and section separators."
          variant="secondary"
          appearance="subtle"
          [dismissible]="false"
        />

        <h2 id="toc-doc-overview">Overview</h2>
        <p style="margin:0">
          TOC works best when the content column is already intentionally structured.
        </p>
        <ui-divider />
        <h2 id="toc-doc-recommendations">Recommendations</h2>
        <p style="margin:0">
          Keep the number of top-level sections manageable and avoid four layers unless the content
          truly needs it.
        </p>
        <h3 id="toc-doc-copy">Copy style</h3>
        <p style="margin:0">Headings should be scannable labels, not vague marketing phrases.</p>
        <ui-divider />
        <h2 id="toc-doc-reference">Reference</h2>
        <p style="margin:0">
          Reference-heavy pages benefit from a stable, always-visible contents rail.
        </p>
      </div>
    </div>
  `,
})
export class TableOfContentDocLayoutDemoComponent {}
