import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CardComponent, EmptyStateComponent } from 'ui';

@Component({
  selector: 'app-empty-state-basic-demo',
  standalone: true,
  imports: [CardComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <ui-card style="width:100%;max-width:28rem;" ariaLabel="Basic empty state card">
      <ui-empty-state
        title="No items yet"
        description="There is nothing to show in this section right now."
      />
    </ui-card>
  `,
})
export class EmptyStateBasicDemoComponent {}
