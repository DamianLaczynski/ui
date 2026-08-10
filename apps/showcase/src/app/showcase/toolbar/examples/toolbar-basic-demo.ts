import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ToolbarComponent, type ToolbarItem } from 'lui';

@Component({
  selector: 'app-toolbar-basic-demo',
  standalone: true,
  imports: [ToolbarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:34rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-toolbar [items]="items" />
    </div>
  `,
})
export class ToolbarBasicDemoComponent {
  protected readonly items: ToolbarItem[] = [
    { id: 'new', label: 'New', icon: 'document_add', tooltip: 'New' },
    { id: 'open', label: 'Open', icon: 'folder_open', tooltip: 'Open' },
    { id: 'save', label: 'Save', icon: 'save', tooltip: 'Save' },
    { id: 'share', label: 'Share', icon: 'share', tooltip: 'Share' },
  ];
}
