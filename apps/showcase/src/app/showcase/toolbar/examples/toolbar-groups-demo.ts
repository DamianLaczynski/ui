import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ToolbarComponent, type ToolbarGroup } from 'ui';

@Component({
  selector: 'app-toolbar-groups-demo',
  standalone: true,
  imports: [ToolbarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-toolbar [groups]="groups" />
    </div>
  `,
})
export class ToolbarGroupsDemoComponent {
  protected readonly groups: ToolbarGroup[] = [
    {
      id: 'clipboard',
      items: [
        { id: 'cut', icon: 'cut', tooltip: 'Cut' },
        { id: 'copy', icon: 'copy', tooltip: 'Copy' },
        { id: 'paste', icon: 'clipboard_paste', tooltip: 'Paste' },
      ],
    },
    {
      id: 'format',
      items: [
        { id: 'bold', icon: 'text_bold', tooltip: 'Bold', type: 'toggle', selected: true },
        { id: 'italic', icon: 'text_italic', tooltip: 'Italic', type: 'toggle' },
        { id: 'underline', icon: 'text_underline', tooltip: 'Underline', type: 'toggle' },
      ],
    },
    {
      id: 'insert',
      items: [
        { id: 'link', icon: 'link', tooltip: 'Insert link' },
        { id: 'image', icon: 'image', tooltip: 'Insert image' },
      ],
    },
  ];
}
