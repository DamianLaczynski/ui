import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TabsComponent, type Tab } from 'lui';

@Component({
  selector: 'app-tabs-options-demo',
  standalone: true,
  imports: [TabsComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem">
      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-tabs
          [tabs]="editableTabs"
          [(selectedTabId)]="selectedTabId"
          appearance="subtle"
          variant="primary"
          (tabClose)="closeTab($event)"
        />
      </div>

      <div
        style="padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Current tabs
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.45rem;font-size:0.875rem;line-height:1.4"
        >
          @for (tab of editableTabs; track tab.id) {
            <div style="display:flex;justify-content:space-between;gap:1rem">
              <span style="color:var(--color-neutral-foreground2-rest)">{{ tab.label }}</span>
              <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
                tab.disabled ? 'Disabled' : tab.closable ? 'Closable' : 'Pinned'
              }}</strong>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class TabsOptionsDemoComponent {
  protected editableTabs: Tab[] = [
    { id: 'summary', label: 'Summary', icon: 'book' },
    { id: 'draft', label: 'Draft', icon: 'document', closable: true },
    { id: 'review', label: 'Needs review', icon: 'edit', closable: true },
    { id: 'archive', label: 'Archive', icon: 'archive', disabled: true },
  ];

  protected selectedTabId: string | number = this.editableTabs[0].id;

  protected closeTab(tab: Tab): void {
    this.editableTabs = this.editableTabs.filter(current => current.id !== tab.id);

    if (this.selectedTabId === tab.id && this.editableTabs.length > 0) {
      this.selectedTabId = this.editableTabs[0].id;
    }
  }
}
