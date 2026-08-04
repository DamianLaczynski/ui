import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SkeletonComponent } from 'ui';

@Component({
  selector: 'app-skeleton-card-shell-example',
  standalone: true,
  imports: [SkeletonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:22rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-skeleton
        width="100%"
        height="11rem"
        borderRadius="0.75rem"
        ariaLabel="Loading card image"
      />
      <div style="display:flex;flex-direction:column;gap:0.625rem">
        <ui-skeleton width="65%" height="1.25rem" ariaLabel="Loading card title" />
        <ui-skeleton width="100%" height="0.875rem" ariaLabel="Loading card summary line 1" />
        <ui-skeleton width="84%" height="0.875rem" ariaLabel="Loading card summary line 2" />
      </div>
      <div style="display:flex;gap:0.75rem">
        <ui-skeleton
          width="7rem"
          height="2rem"
          borderRadius="9999px"
          ariaLabel="Loading primary action"
        />
        <ui-skeleton
          width="5.5rem"
          height="2rem"
          borderRadius="9999px"
          ariaLabel="Loading secondary action"
        />
      </div>
    </div>
  `,
})
export class SkeletonCardShellExampleComponent {}
