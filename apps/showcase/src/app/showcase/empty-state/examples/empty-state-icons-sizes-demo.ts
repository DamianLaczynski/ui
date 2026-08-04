import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CardComponent, EmptyStateComponent } from 'ui';

@Component({
  selector: 'app-empty-state-icons-sizes-demo',
  standalone: true,
  imports: [CardComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem;width:100%;max-width:54rem"
    >
      <ui-card style="height:100%;" ariaLabel="Small empty state card">
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Small
        </p>
        <ui-empty-state
          title="No drafts"
          description="Create a draft to start iterating."
          icon="document"
          size="small"
        />
      </ui-card>

      <ui-card style="height:100%;" ariaLabel="Medium empty state card">
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Medium
        </p>
        <ui-empty-state
          title="No results"
          description="Try changing the search term or removing some filters."
          icon="search"
          size="medium"
        />
      </ui-card>

      <ui-card style="height:100%;" ariaLabel="Large empty state card">
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Large
        </p>
        <ui-empty-state
          title="Nothing scheduled"
          description="Plan the next activity to populate this timeline."
          icon="calendar"
          size="large"
        />
      </ui-card>
    </div>
  `,
})
export class EmptyStateIconsSizesDemoComponent {}
