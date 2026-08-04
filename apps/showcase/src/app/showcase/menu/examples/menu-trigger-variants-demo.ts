import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, MenuComponent, type MenuItem } from 'ui';

@Component({
  selector: 'app-menu-trigger-variants-demo',
  standalone: true,
  imports: [ButtonComponent, MenuComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:48rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Last action: <strong>{{ lastAction() || 'none' }}</strong>
        </span>
      </div>

      <div
        style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem;width:100%"
      >
        <div
          style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
        >
          <div style="font-size:0.875rem;font-weight:600">Dropdown trigger</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            A standard menu button with a dedicated chevron.
          </div>
          <ui-menu
            triggerVariant="dropdown"
            text="Share"
            icon="share"
            [menuItems]="shareItems"
            (menuItemClick)="onItemClick($event)"
          />
        </div>

        <div
          style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
        >
          <div style="font-size:0.875rem;font-weight:600">Split trigger</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            One primary action plus a compact menu for alternatives.
          </div>
          <ui-menu
            triggerVariant="split"
            text="Save"
            icon="save"
            [menuItems]="saveItems"
            variant="primary"
            (primaryClick)="lastAction.set('Saved current draft')"
            (menuItemClick)="onItemClick($event)"
          />
        </div>

        <div
          style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
        >
          <div style="font-size:0.875rem;font-weight:600">Button trigger</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Acts like a plain button when no menu items are passed.
          </div>
          <ui-menu
            triggerVariant="button"
            text="Open details"
            icon="open"
            [menuItems]="[]"
            appearance="outline"
            (primaryClick)="lastAction.set('Opened details panel')"
          />
        </div>
      </div>
    </div>
  `,
})
export class MenuTriggerVariantsDemoComponent {
  protected readonly lastAction = signal('');

  protected readonly shareItems: MenuItem[] = [
    { id: 'copy-link', label: 'Copy link', icon: 'link' },
    { id: 'invite', label: 'Invite people', icon: 'person_add' },
    { id: 'export', label: 'Export PDF', icon: 'arrow_download' },
  ];

  protected readonly saveItems: MenuItem[] = [
    { id: 'save', label: 'Save', icon: 'save' },
    { id: 'save-as', label: 'Save as copy', icon: 'document_copy' },
    { id: 'save-template', label: 'Save as template', icon: 'document_add' },
  ];

  protected onItemClick(item: MenuItem): void {
    this.lastAction.set(item.label);
  }

  protected reset(): void {
    this.lastAction.set('');
  }
}
