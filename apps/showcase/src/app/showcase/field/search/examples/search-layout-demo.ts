import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SearchComponent } from 'lui';

@Component({
  selector: 'app-search-layout-demo',
  standalone: true,
  imports: [SearchComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:46rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="flex:1 1 15rem;min-width:14rem">
          <ui-search
            label="Compact table search"
            size="small"
            inputVariant="filled-lighter"
            placeholder="Search rows"
          />
        </div>

        <div style="flex:1 1 15rem;min-width:14rem">
          <ui-search
            label="Sidebar search"
            labelPosition="before"
            size="medium"
            inputVariant="filled-gray"
            placeholder="Search templates"
          />
        </div>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.9375rem;font-weight:600">Primary content search</div>
        <ui-search
          label="Knowledge base"
          size="large"
          inputVariant="filled"
          placeholder="Search articles, how-tos, and release notes"
          helpText="Use a larger search field when finding content is the main action on the page."
        />
      </div>
    </div>
  `,
})
export class SearchLayoutDemoComponent {}
