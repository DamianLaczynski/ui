import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, MenuComponent, SearchComponent, type MenuItem } from 'lui';

@Component({
  selector: 'app-menu-workspace-header-demo',
  standalone: true,
  imports: [ButtonComponent, MenuComponent, SearchComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:56rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div
        style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:1rem"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:1rem;font-weight:600">Q3 launch workspace</div>
          <div style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest)">
            Menus often live beside search, primary actions, and compact overflow actions in one
            command header.
          </div>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center">
          <ui-search placeholder="Search tasks" style="width:14rem" />
          <ui-menu
            triggerVariant="split"
            text="Publish"
            icon="arrow_upload"
            [menuItems]="publishItems"
            variant="primary"
            (primaryClick)="lastAction.set('Published current version')"
            (menuItemClick)="onItemClick($event)"
          />
          <ui-menu
            triggerVariant="dropdown"
            [menuItems]="overflowItems"
            icon="more_horizontal"
            [ariaLabel]="'More actions'"
            (menuItemClick)="onItemClick($event)"
          />
        </div>
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Last action: <strong>{{ lastAction() || 'none' }}</strong>
        </span>
      </div>
    </div>
  `,
})
export class MenuWorkspaceHeaderDemoComponent {
  protected readonly lastAction = signal('');

  protected readonly publishItems: MenuItem[] = [
    { id: 'publish-now', label: 'Publish now', icon: 'arrow_upload' },
    { id: 'schedule', label: 'Schedule publish', icon: 'calendar' },
    { id: 'save-draft', label: 'Save as draft', icon: 'save' },
  ];

  protected readonly overflowItems: MenuItem[] = [
    { id: 'rename', label: 'Rename workspace', icon: 'rename' },
    { id: 'permissions', label: 'Permissions', icon: 'shield' },
    { id: 'archive', label: 'Archive workspace', icon: 'archive' },
  ];

  protected onItemClick(item: MenuItem): void {
    this.lastAction.set(item.label);
  }

  protected reset(): void {
    this.lastAction.set('');
  }
}
