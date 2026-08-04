import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from 'ui';

@Component({
  selector: 'app-search-basic-demo',
  standalone: true,
  imports: [FormsModule, SearchComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div
        style="flex:1 1 18rem;min-width:16rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Global search</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Good default for workspace-wide queries, command bars, or header search.
          </div>
        </div>

        <ui-search
          label="Search"
          placeholder="Search people, files, and projects"
          helpText="Start typing a keyword to search across the workspace."
        />
      </div>

      <div
        style="flex:1 1 18rem;min-width:16rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Search with value</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Shows the built-in clear affordance when the field already contains a query.
          </div>
        </div>

        <ui-search
          label="Search documents"
          placeholder="Search documents"
          [(ngModel)]="query"
          [ngModelOptions]="{ standalone: true }"
          helpText="Use clear to reset the query quickly."
        />
      </div>
    </div>
  `,
})
export class SearchBasicDemoComponent {
  protected query = 'Quarterly planning';
}
