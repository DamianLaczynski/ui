import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TabsComponent, type Tab } from 'ui';

const tabs: Tab[] = [
  { id: 'files', label: 'Files' },
  { id: 'people', label: 'People' },
  { id: 'notes', label: 'Notes' },
];

@Component({
  selector: 'app-tabs-appearance-layout-demo',
  standalone: true,
  imports: [TabsComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem">
      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.9375rem;font-weight:600">Subtle surface tabs</div>
        <ui-tabs [tabs]="tabs" appearance="subtle" variant="primary" size="medium" />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.9375rem;font-weight:600">Full-width section tabs</div>
        <ui-tabs
          [tabs]="tabs"
          appearance="filled"
          variant="secondary"
          size="large"
          [fullWidth]="true"
          shape="circular"
        />
      </div>
    </div>
  `,
})
export class TabsAppearanceLayoutDemoComponent {
  protected readonly tabs = tabs;
}
