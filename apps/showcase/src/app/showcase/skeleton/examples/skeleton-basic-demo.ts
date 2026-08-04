import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SkeletonComponent } from 'ui';

@Component({
  selector: 'app-skeleton-basic-example',
  standalone: true,
  imports: [SkeletonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:34rem">
      <ui-skeleton width="11rem" height="1.5rem" ariaLabel="Loading section title" />
      <div style="display:flex;flex-direction:column;gap:0.5rem">
        <ui-skeleton width="100%" height="0.875rem" ariaLabel="Loading paragraph line 1" />
        <ui-skeleton width="92%" height="0.875rem" ariaLabel="Loading paragraph line 2" />
        <ui-skeleton width="74%" height="0.875rem" ariaLabel="Loading paragraph line 3" />
      </div>
    </div>
  `,
})
export class SkeletonBasicExampleComponent {}
