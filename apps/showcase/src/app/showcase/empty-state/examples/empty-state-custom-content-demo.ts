import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, CardComponent, EmptyStateComponent } from 'ui';

@Component({
  selector: 'app-empty-state-custom-content-demo',
  standalone: true,
  imports: [ButtonComponent, CardComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <ui-card
      appearance="filled"
      style="width:100%;max-width:32rem;"
      ariaLabel="Empty state with custom content"
    >
      <ui-empty-state title="Connect a source" icon="plug_connected">
        <ng-template #content>
          <div
            style="display:flex;flex-direction:column;gap:0.875rem;align-items:center;text-align:center"
          >
            <p style="margin:0;max-width:24rem;color:var(--color-neutral-foreground2-rest)">
              Choose a data source to start syncing records into this workspace.
            </p>
            <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:0.5rem">
              <ui-button appearance="outline" variant="secondary">Learn more</ui-button>
              <ui-button variant="primary">Connect source</ui-button>
            </div>
          </div>
        </ng-template>
      </ui-empty-state>
    </ui-card>
  `,
})
export class EmptyStateCustomContentDemoComponent {}
