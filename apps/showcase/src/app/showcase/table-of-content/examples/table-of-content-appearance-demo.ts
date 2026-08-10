import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TableOfContentComponent } from 'lui';

@Component({
  selector: 'app-table-of-content-appearance-demo',
  standalone: true,
  imports: [TableOfContentComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;width:100%;max-width:58rem"
    >
      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Subtle
        </p>
        <ui-table-of-content containerSelector=".toc-appearance-content" appearance="subtle" />
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Outline
        </p>
        <ui-table-of-content containerSelector=".toc-appearance-content" appearance="outline" />
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Filled
        </p>
        <ui-table-of-content
          containerSelector=".toc-appearance-content"
          appearance="filled"
          indicatorPosition="horizontal"
        />
      </div>

      <div
        class="toc-appearance-content"
        style="grid-column:1 / -1;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <h2 id="toc-appearance-overview">Overview</h2>
        <p style="margin:0 0 1rem">
          Appearance changes how strong the side navigation feels against the surrounding shell.
        </p>
        <h3 id="toc-appearance-spacing">Spacing</h3>
        <p style="margin:0 0 1rem">Choose the calmer style for long documentation panes.</p>
        <h2 id="toc-appearance-accessibility">Accessibility</h2>
        <p style="margin:0">
          Indicators should remain visible without overpowering the reading surface.
        </p>
      </div>
    </div>
  `,
})
export class TableOfContentAppearanceDemoComponent {}
