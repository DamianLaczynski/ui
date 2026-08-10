import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, SearchComponent } from 'lui';

type SearchResult = {
  title: string;
  meta: string;
};

@Component({
  selector: 'app-search-results-panel-demo',
  standalone: true,
  imports: [ButtonComponent, FormsModule, SearchComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.375rem">
        <div style="font-size:1rem;font-weight:600">Workspace search panel</div>
        <div
          style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest);line-height:1.45"
        >
          A realistic search surface includes the query field, lightweight result count, and a
          compact list of matching entities.
        </div>
      </div>

      <ui-search
        label="Search workspace"
        placeholder="Search by project, document, or teammate"
        [(ngModel)]="query"
        [ngModelOptions]="{ standalone: true }"
        helpText="Results update from the current query preview below."
      />

      <div
        style="display:flex;justify-content:space-between;gap:1rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          {{ filteredResults.length }} result{{ filteredResults.length === 1 ? '' : 's' }}
        </span>
        <ui-button type="button" appearance="subtle" (click)="query = ''">Clear query</ui-button>
      </div>

      <div style="display:flex;flex-direction:column;gap:0.625rem">
        @for (result of filteredResults; track result.title) {
          <div
            style="display:flex;flex-direction:column;gap:0.2rem;padding:0.875rem 1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
          >
            <div style="font-size:0.9375rem;font-weight:600">{{ result.title }}</div>
            <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
              {{ result.meta }}
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class SearchResultsPanelDemoComponent {
  protected query = 'release';

  private readonly results: SearchResult[] = [
    { title: 'Release handoff checklist', meta: 'Document | Updated 2 hours ago' },
    { title: 'Q3 release plan', meta: 'Project | Owned by Nina Woods' },
    { title: 'Release notes template', meta: 'Template | Shared with Product Ops' },
    { title: 'Design review board', meta: 'Channel | Last active yesterday' },
  ];

  protected get filteredResults(): SearchResult[] {
    const query = this.query.trim().toLowerCase();
    if (!query) {
      return this.results;
    }

    return this.results.filter(result =>
      `${result.title} ${result.meta}`.toLowerCase().includes(query),
    );
  }
}
