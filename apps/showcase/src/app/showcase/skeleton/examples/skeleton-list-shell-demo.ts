import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SkeletonComponent } from 'ui';

@Component({
  selector: 'app-skeleton-list-shell-example',
  standalone: true,
  imports: [SkeletonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:36rem">
      @for (row of [1, 2, 3, 4]; track row) {
        <div
          style="display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:0.875rem;padding:0.875rem 1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <ui-skeleton
            shape="circular"
            width="2.75rem"
            height="2.75rem"
            ariaLabel="Loading list avatar"
          />
          <div style="display:flex;flex-direction:column;gap:0.45rem;min-width:0">
            <ui-skeleton width="42%" height="0.9rem" ariaLabel="Loading row title" />
            <ui-skeleton width="78%" height="0.75rem" ariaLabel="Loading row metadata" />
          </div>
          <div style="display:flex;flex-direction:column;gap:0.45rem;align-items:flex-end">
            <ui-skeleton width="3.25rem" height="0.75rem" [animated]="false" />
            <ui-skeleton
              width="1.25rem"
              height="1.25rem"
              borderRadius="9999px"
              [animated]="false"
            />
          </div>
        </div>
      }
    </div>
  `,
})
export class SkeletonListShellExampleComponent {}
