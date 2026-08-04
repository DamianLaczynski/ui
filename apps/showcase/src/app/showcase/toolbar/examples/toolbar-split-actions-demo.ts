import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ToolbarComponent, type MenuItem, type ToolbarItem } from 'ui';

@Component({
  selector: 'app-toolbar-split-actions-demo',
  standalone: true,
  imports: [ToolbarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:52rem"
    >
      <div
        style="flex:0 0 28rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-toolbar [items]="items" (itemClick)="lastAction.set($event.label || $event.id)" />
      </div>

      <div
        style="flex:1 1 16rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Last action
        </p>
        <div style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground-rest)">
          {{ lastAction() || 'No action yet.' }}
        </div>
      </div>
    </div>
  `,
})
export class ToolbarSplitActionsDemoComponent {
  protected readonly lastAction = signal('');

  protected readonly items: ToolbarItem[] = [
    {
      id: 'save',
      type: 'split',
      label: 'Save',
      icon: 'save',
      variant: 'primary',
      menuItems: this.createMenuItems('Save'),
    },
    {
      id: 'publish',
      type: 'split',
      label: 'Publish',
      icon: 'rocket',
      appearance: 'outline',
      menuItems: this.createMenuItems('Publish'),
    },
    { id: 'preview', label: 'Preview', icon: 'eye', tooltip: 'Preview' },
  ];

  private createMenuItems(label: string): MenuItem[] {
    return [
      { id: `${label}-as`, label: `${label} as copy` },
      { id: `${label}-all`, label: `${label} all` },
      { id: `${label}-draft`, label: `${label} draft only` },
    ];
  }
}
