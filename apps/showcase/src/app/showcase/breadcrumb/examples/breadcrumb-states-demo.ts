import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BreadcrumbComponent, type Breadcrumb } from 'ui';

@Component({
  selector: 'app-breadcrumb-states-example',
  standalone: true,
  imports: [BreadcrumbComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-breadcrumb
        [items]="selectedItems"
        appearance="subtle"
        [showSelectionIndicator]="true"
        [responsiveOverflow]="false"
      />

      <ui-breadcrumb
        [items]="disabledItems"
        appearance="subtle"
        [showSelectionIndicator]="true"
        indicatorPosition="vertical"
        [responsiveOverflow]="false"
      />
    </div>
  `,
})
export class BreadcrumbStatesExampleComponent {
  protected readonly selectedItems: Breadcrumb[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'account', label: 'Account', icon: 'person' },
    { id: 'security', label: 'Security', icon: 'shield', selected: true },
  ];

  protected readonly disabledItems: Breadcrumb[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'region', label: 'Restricted region', icon: 'globe', disabled: true },
    { id: 'details', label: 'Details', icon: 'info', selected: true },
  ];
}
