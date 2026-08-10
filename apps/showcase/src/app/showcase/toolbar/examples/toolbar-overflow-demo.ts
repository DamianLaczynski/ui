import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ToolbarComponent, type ToolbarItem } from 'lui';

@Component({
  selector: 'app-toolbar-overflow-demo',
  standalone: true,
  imports: [ToolbarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:52rem"
    >
      <div
        style="flex:0 0 20rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest);resize:horizontal;overflow:auto;min-width:16rem;max-width:32rem"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Resizable overflow toolbar
        </p>
        <ui-toolbar [items]="items" [overflow]="true" />
      </div>

      <div
        style="flex:1 1 16rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <div style="display:grid;gap:0.5rem;font-size:0.875rem;line-height:1.5">
          <div>
            Use overflow when the action count is variable or the toolbar lives in a constrained
            shell.
          </div>
          <div>Resize the card to test how the row wraps and compresses in smaller spaces.</div>
        </div>
      </div>
    </div>
  `,
})
export class ToolbarOverflowDemoComponent {
  protected readonly items: ToolbarItem[] = [
    { id: 'new', label: 'New', icon: 'document_add', tooltip: 'New' },
    { id: 'open', label: 'Open', icon: 'folder_open', tooltip: 'Open' },
    { id: 'save', label: 'Save', icon: 'save', tooltip: 'Save' },
    { id: 'print', label: 'Print', icon: 'print', tooltip: 'Print' },
    { id: 'share', label: 'Share', icon: 'share', tooltip: 'Share' },
    { id: 'comment', label: 'Comment', icon: 'comment', tooltip: 'Comment' },
    { id: 'history', label: 'History', icon: 'history', tooltip: 'History' },
  ];
}
