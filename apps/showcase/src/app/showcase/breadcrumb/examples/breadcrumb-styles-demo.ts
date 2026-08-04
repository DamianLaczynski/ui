import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BreadcrumbComponent, type Breadcrumb } from 'ui';

const ITEMS: Breadcrumb[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'design-system', label: 'Design system', icon: 'grid' },
  { id: 'navigation', label: 'Navigation', icon: 'navigation' },
  { id: 'breadcrumb', label: 'Breadcrumb', icon: 'chevron_right', selected: true },
];

@Component({
  selector: 'app-breadcrumb-styles-example',
  standalone: true,
  imports: [BreadcrumbComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-breadcrumb
        [items]="items"
        appearance="subtle"
        variant="primary"
        [showIcons]="true"
        [responsiveOverflow]="false"
      />

      <ui-breadcrumb
        [items]="items"
        appearance="outline"
        variant="secondary"
        [showIcons]="false"
        [responsiveOverflow]="false"
      />

      <ui-breadcrumb
        [items]="items"
        appearance="filled"
        variant="info"
        [showIcons]="true"
        shape="circular"
        [responsiveOverflow]="false"
      />
    </div>
  `,
})
export class BreadcrumbStylesExampleComponent {
  protected readonly items = ITEMS;
}
