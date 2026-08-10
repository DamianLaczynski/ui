import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SkeletonComponent } from 'lui';

@Component({
  selector: 'app-skeleton-shapes-example',
  standalone: true,
  imports: [SkeletonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:1rem;width:100%"
    >
      <div style="display:flex;flex-direction:column;gap:0.5rem">
        <div style="font-size:0.8125rem;font-weight:600">Rounded text block</div>
        <ui-skeleton width="100%" height="4.5rem" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.5rem">
        <div style="font-size:0.8125rem;font-weight:600">Circular avatar</div>
        <ui-skeleton shape="circular" width="4rem" height="4rem" ariaLabel="Loading avatar" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.5rem">
        <div style="font-size:0.8125rem;font-weight:600">Square tile</div>
        <ui-skeleton shape="square" width="5rem" height="5rem" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.5rem">
        <div style="font-size:0.8125rem;font-weight:600">Custom radius</div>
        <ui-skeleton width="100%" height="4.5rem" borderRadius="1.25rem" />
      </div>
    </div>
  `,
})
export class SkeletonShapesExampleComponent {}
