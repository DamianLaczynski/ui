import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CardComponent, EmptyStateComponent } from 'lui';

@Component({
  selector: 'app-empty-state-scenarios-demo',
  standalone: true,
  imports: [CardComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;width:100%;max-width:56rem"
    >
      <ui-card style="height:100%;" ariaLabel="No results empty state">
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          No results
        </p>
        <ui-empty-state
          title="No matches found"
          description="Try different keywords or clear some filters."
          icon="search"
        />
      </ui-card>

      <ui-card style="height:100%;" ariaLabel="First run empty state">
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          First run
        </p>
        <ui-empty-state
          title="Create your first board"
          description="Start with a new board to organize work and track progress."
          icon="board"
        />
      </ui-card>

      <ui-card style="height:100%;" ariaLabel="No access empty state">
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          No access
        </p>
        <ui-empty-state
          title="Access restricted"
          description="You do not have permission to view this content. Contact an administrator for access."
          icon="shield"
        />
      </ui-card>
    </div>
  `,
})
export class EmptyStateScenariosDemoComponent {}
