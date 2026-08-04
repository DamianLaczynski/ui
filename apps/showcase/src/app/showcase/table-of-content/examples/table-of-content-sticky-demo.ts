import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TableOfContentComponent } from 'ui';

@Component({
  selector: 'app-table-of-content-sticky-demo',
  standalone: true,
  imports: [TableOfContentComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:minmax(14rem,16rem) minmax(0,1fr);gap:1rem;width:100%;max-width:62rem;height:28rem;overflow:auto;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:linear-gradient(180deg,var(--color-neutral-background-rest),var(--color-neutral-background2-rest))"
    >
      <ui-table-of-content
        containerSelector=".toc-sticky-content"
        [sticky]="true"
        [offsetTop]="12"
        [minLevel]="2"
        [maxLevel]="3"
      />

      <div
        class="toc-sticky-content"
        style="display:flex;flex-direction:column;gap:1rem;min-width:0;padding-right:0.5rem"
      >
        <h2 id="toc-sticky-intro">Introduction</h2>
        <p style="margin:0">
          Sticky mode keeps the current section list visible while the reading panel scrolls.
        </p>
        <h2 id="toc-sticky-layout">Layout</h2>
        <p style="margin:0">
          Use offset when the page has a fixed app header or secondary sticky shell.
        </p>
        <h3 id="toc-sticky-side-panels">Side panels</h3>
        <p style="margin:0">TOC often lives beside docs or knowledge content.</p>
        <h2 id="toc-sticky-writing">Writing guidance</h2>
        <p style="margin:0">
          The heading structure should stay cleaner than the TOC configuration itself.
        </p>
        <h3 id="toc-sticky-long-form">Long-form sections</h3>
        <p style="margin:0">
          This container is intentionally taller to make sticky behavior obvious.
        </p>
        <div
          style="height:14rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        ></div>
        <h2 id="toc-sticky-summary">Summary</h2>
        <p style="margin:0">A good TOC reduces scanning cost without overwhelming the page.</p>
      </div>
    </div>
  `,
})
export class TableOfContentStickyDemoComponent {}
