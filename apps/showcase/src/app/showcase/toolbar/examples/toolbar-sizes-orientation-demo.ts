import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ToolbarComponent, type ToolbarItem } from 'lui';

@Component({
  selector: 'app-toolbar-sizes-orientation-demo',
  standalone: true,
  imports: [ToolbarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:52rem"
    >
      <div
        style="flex:1 1 18rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Small horizontal
        </p>
        <ui-toolbar [items]="items" size="small" />
      </div>

      <div
        style="flex:0 0 auto;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Large vertical
        </p>
        <ui-toolbar [items]="items" size="large" orientation="vertical" />
      </div>
    </div>
  `,
})
export class ToolbarSizesOrientationDemoComponent {
  protected readonly items: ToolbarItem[] = [
    { id: 'undo', icon: 'arrow_undo', tooltip: 'Undo' },
    { id: 'redo', icon: 'arrow_redo', tooltip: 'Redo' },
    { id: 'comments', icon: 'comment', tooltip: 'Comments' },
    { id: 'history', icon: 'history', tooltip: 'History' },
  ];
}
