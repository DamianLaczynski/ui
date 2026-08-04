import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BreadcrumbComponent, type Breadcrumb } from 'ui';

@Component({
  selector: 'app-breadcrumb-overflow-example',
  standalone: true,
  imports: [BreadcrumbComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.35rem">
        <div style="font-size:0.875rem;font-weight:600">Hidden middle items in overflow menu</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          This keeps the start and current location visible while intermediate levels move into the
          overflow menu.
        </div>
      </div>
      <ui-breadcrumb
        [items]="longPath"
        appearance="subtle"
        [showIcons]="true"
        [maxDisplayedItems]="4"
        [responsiveOverflow]="false"
      />

      <div style="display:flex;flex-direction:column;gap:0.35rem">
        <div style="font-size:0.875rem;font-weight:600">Resizable container with truncation</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Shrink the frame to force a tighter layout, then use arrow keys to move across visible
          items.
        </div>
      </div>
      <div
        style="width:20rem;min-width:14rem;max-width:100%;overflow:hidden;resize:horizontal;padding:0.75rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem"
      >
        <ui-breadcrumb
          [items]="longPath"
          appearance="subtle"
          [showIcons]="true"
          [responsiveOverflow]="true"
          [truncateLength]="18"
          focusMode="arrow"
        />
      </div>
    </div>
  `,
})
export class BreadcrumbOverflowExampleComponent {
  protected readonly longPath: Breadcrumb[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'clients', label: 'Enterprise clients', icon: 'people' },
    { id: 'europe', label: 'Europe region accounts', icon: 'globe' },
    { id: 'contracts', label: 'Long-running renewal contracts', icon: 'document' },
    { id: 'current', label: 'Final approval checklist', icon: 'checkmark_circle', selected: true },
  ];
}
