import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DividerComponent } from 'lui';

@Component({
  selector: 'app-divider-orientation-example',
  standalone: true,
  imports: [DividerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1.5rem;width:100%"
    >
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <div style="font-size:0.8125rem;font-weight:600">Horizontal</div>
        <div style="font-size:0.875rem">Title</div>
        <ui-divider text="Details" />
        <div style="font-size:0.875rem">Metadata and notes</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <div style="font-size:0.8125rem;font-weight:600">Vertical</div>
        <div style="display:flex;align-items:center;gap:1rem;height:5rem">
          <span style="font-size:0.875rem">Created</span>
          <ui-divider orientation="vertical" text="Info" />
          <span style="font-size:0.875rem">Updated</span>
        </div>
      </div>
    </div>
  `,
})
export class DividerOrientationExampleComponent {}
