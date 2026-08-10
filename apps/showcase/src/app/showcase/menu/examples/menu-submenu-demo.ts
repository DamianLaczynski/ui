import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, MenuComponent, type MenuItem } from 'lui';

@Component({
  selector: 'app-menu-submenu-demo',
  standalone: true,
  imports: [ButtonComponent, MenuComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Last action: <strong>{{ lastAction() || 'none' }}</strong>
        </span>
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-menu
          triggerVariant="dropdown"
          text="Insert"
          icon="document_add"
          [menuItems]="insertItems"
          appearance="outline"
          variant="secondary"
          (menuOpened)="lastAction.set('Opened insert menu')"
          (menuItemClick)="onItemClick($event)"
        />

        <ui-menu
          triggerVariant="dropdown"
          text="Export"
          icon="arrow_download"
          [menuItems]="exportItems"
          variant="primary"
          (menuOpened)="lastAction.set('Opened export menu')"
          (menuItemClick)="onItemClick($event)"
        />
      </div>
    </div>
  `,
})
export class MenuSubmenuDemoComponent {
  protected readonly lastAction = signal('');

  protected readonly insertItems: MenuItem[] = [
    {
      id: 'heading',
      label: 'Heading',
      icon: 'text_font',
      submenuItems: [
        { id: 'h1', label: 'Heading 1', icon: 'text_font' },
        { id: 'h2', label: 'Heading 2', icon: 'text_font' },
        { id: 'h3', label: 'Heading 3', icon: 'text_font' },
      ],
    },
    {
      id: 'media',
      label: 'Media',
      icon: 'image',
      submenuItems: [
        { id: 'image', label: 'Image', icon: 'image' },
        { id: 'carousel', label: 'Carousel', icon: 'arrow_circle_right' },
      ],
    },
    { id: 'divider', label: 'Divider', icon: 'divider_tall' },
  ];

  protected readonly exportItems: MenuItem[] = [
    {
      id: 'share',
      label: 'Share',
      icon: 'share',
      submenuItems: [
        { id: 'copy-link', label: 'Copy link', icon: 'link' },
        { id: 'invite-reviewers', label: 'Invite reviewers', icon: 'person_add' },
      ],
    },
    { id: 'pdf', label: 'PDF', icon: 'document' },
    { id: 'markdown', label: 'Markdown', icon: 'document' },
  ];

  protected onItemClick(item: MenuItem): void {
    this.lastAction.set(item.label);
  }

  protected reset(): void {
    this.lastAction.set('');
  }
}
