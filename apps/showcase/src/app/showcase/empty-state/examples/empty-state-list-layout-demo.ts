import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, CardComponent, EmptyStateComponent, TextComponent } from 'ui';

@Component({
  selector: 'app-empty-state-list-layout-demo',
  standalone: true,
  imports: [ButtonComponent, CardComponent, EmptyStateComponent, TextComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <ui-card style="width:100%;max-width:60rem;" ariaLabel="Project list empty state card">
      <div uiCardBody style="display:grid;gap:1rem;">
        <div
          style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem"
        >
          <ui-text placeholder="Search projects..." style="width:16rem" />
          <ui-button variant="secondary" appearance="outline">Filters</ui-button>
        </div>

        <ui-card
          style="height:100%;"
          appearance="filled-alternative"
          borderStyle="dashed"
          ariaLabel="Small outline card"
        >
          <ui-empty-state
            title="No projects in this view"
            description="Try clearing filters or create a new project to get started."
            icon="folder"
          />
        </ui-card>
      </div>
    </ui-card>
  `,
})
export class EmptyStateListLayoutDemoComponent {}
