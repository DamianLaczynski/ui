import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent, ToolbarComponent, type ToolbarItem } from 'ui';

@Component({
  selector: 'app-toolbar-all-types-demo',
  standalone: true,
  imports: [BadgeComponent, ToolbarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:46rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-toolbar [items]="items">
        <ui-badge
          text="Draft"
          size="small"
          appearance="outline"
          variant="secondary"
          shape="rounded"
        />
      </ui-toolbar>
    </div>
  `,
})
export class ToolbarAllTypesDemoComponent {
  protected readonly items: ToolbarItem[] = [
    { id: 'new', label: 'New', icon: 'document_add' },
    { id: 'divider-a', type: 'divider' },
    { id: 'bold', type: 'toggle', icon: 'text_bold', selected: true, tooltip: 'Bold' },
    {
      id: 'save',
      type: 'split',
      label: 'Save',
      icon: 'save',
      menuItems: [
        { id: 'save-as', label: 'Save as copy' },
        { id: 'save-all', label: 'Save all' },
      ],
    },
    { id: 'divider-b', type: 'divider' },
    { id: 'custom-slot', type: 'custom' },
  ];
}
