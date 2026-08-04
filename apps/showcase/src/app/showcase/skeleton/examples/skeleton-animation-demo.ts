import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SkeletonComponent } from 'ui';

@Component({
  selector: 'app-skeleton-animation-example',
  standalone: true,
  imports: [SkeletonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;width:100%"
    >
      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
      >
        <div style="font-size:0.8125rem;font-weight:600">Animated shimmer</div>
        <ui-skeleton width="8rem" height="1rem" />
        <ui-skeleton width="100%" height="0.875rem" />
        <ui-skeleton width="88%" height="0.875rem" />
      </div>
      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
      >
        <div style="font-size:0.8125rem;font-weight:600">Static placeholder</div>
        <ui-skeleton width="8rem" height="1rem" [animated]="false" />
        <ui-skeleton width="100%" height="0.875rem" [animated]="false" />
        <ui-skeleton width="88%" height="0.875rem" [animated]="false" />
      </div>
    </div>
  `,
})
export class SkeletonAnimationExampleComponent {}
