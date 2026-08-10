import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, DividerComponent } from 'lui';

@Component({
  selector: 'app-divider-toolbar-grouping-example',
  standalone: true,
  imports: [ButtonComponent, DividerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem;width:100%;max-width:40rem;padding:0.875rem 1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem"
    >
      <ui-button appearance="outline">Undo</ui-button>
      <ui-button appearance="outline">Redo</ui-button>
      <div style="height:1.75rem">
        <ui-divider orientation="vertical" ariaLabel="Editing actions divider" />
      </div>
      <ui-button appearance="outline">Assign owner</ui-button>
      <ui-button appearance="outline">Add tag</ui-button>
      <div style="height:1.75rem">
        <ui-divider orientation="vertical" ariaLabel="Metadata actions divider" />
      </div>
      <ui-button variant="primary">Publish</ui-button>
    </div>
  `,
})
export class DividerToolbarGroupingExampleComponent {}
