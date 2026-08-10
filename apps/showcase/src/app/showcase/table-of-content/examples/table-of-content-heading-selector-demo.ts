import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TableOfContentComponent } from 'lui';

@Component({
  selector: 'app-table-of-content-heading-selector-demo',
  standalone: true,
  imports: [TableOfContentComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:60rem"
    >
      <div
        style="flex:0 0 16rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-table-of-content
          containerSelector=".toc-heading-selector-content"
          headingSelector="[data-toc]"
          [minLevel]="1"
          [maxLevel]="6"
        />
      </div>

      <div
        class="toc-heading-selector-content"
        style="flex:1 1 26rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div
          data-toc
          id="toc-selector-hero"
          style="margin:0 0 0.75rem;font-size:1.125rem;font-weight:700"
        >
          Hero section
        </div>
        <p style="margin:0 0 1rem">
          You can build a TOC from custom markers, not only semantic heading tags.
        </p>
        <div
          data-toc
          id="toc-selector-usage"
          style="margin:0 0 0.75rem;font-size:1rem;font-weight:700"
        >
          Usage notes
        </div>
        <p style="margin:0 0 1rem">
          This helps when content is rendered from CMS blocks or custom prose components.
        </p>
        <div
          data-toc
          id="toc-selector-api"
          style="margin:0 0 0.75rem;font-size:1rem;font-weight:700"
        >
          API notes
        </div>
        <p style="margin:0">
          Use this selectively. Normal semantic headings are still the cleaner default.
        </p>
      </div>
    </div>
  `,
})
export class TableOfContentHeadingSelectorDemoComponent {}
