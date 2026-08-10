import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoadingStateComponent } from 'lui';

@Component({
  selector: 'app-loading-state-custom-content-demo',
  standalone: true,
  imports: [LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:32rem;padding:1.5rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-loading-state
        title="Initializing workspace"
        description="Setting up everything you need."
      >
        <ng-template #content>
          <div
            style="display:flex;flex-direction:column;gap:0.5rem;align-items:center;text-align:center"
          >
            <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
              Step 2 of 3
            </div>
            <div
              style="width:100%;max-width:14rem;height:0.375rem;border-radius:999px;background:var(--color-neutral-background3-rest);overflow:hidden"
            >
              <div
                style="width:66%;height:100%;border-radius:999px;background:var(--color-brand-background-rest)"
              ></div>
            </div>
          </div>
        </ng-template>
      </ui-loading-state>
    </div>
  `,
})
export class LoadingStateCustomContentDemoComponent {}
