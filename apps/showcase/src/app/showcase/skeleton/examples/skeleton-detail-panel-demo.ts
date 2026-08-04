import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, SkeletonComponent } from 'ui';

@Component({
  selector: 'app-skeleton-detail-panel-example',
  standalone: true,
  imports: [ButtonComponent, SkeletonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem">
      <div
        style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Customer detail panel</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Toggle between the shell and the resolved content.
          </div>
        </div>
        <ui-button
          type="button"
          variant="secondary"
          appearance="outline"
          (click)="loading.set(!loading())"
        >
          {{ loading() ? 'Show loaded state' : 'Show loading state' }}
        </ui-button>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:1rem;padding:1rem 1.125rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        @if (loading()) {
          <div style="display:flex;gap:1rem;align-items:flex-start;flex-wrap:wrap">
            <ui-skeleton
              shape="circular"
              width="4.5rem"
              height="4.5rem"
              ariaLabel="Loading customer avatar"
            />
            <div style="display:flex;flex:1;flex-direction:column;gap:0.55rem;min-width:14rem">
              <ui-skeleton width="10rem" height="1.15rem" ariaLabel="Loading customer name" />
              <ui-skeleton width="14rem" height="0.85rem" ariaLabel="Loading customer role" />
              <ui-skeleton width="8rem" height="0.85rem" ariaLabel="Loading customer status" />
            </div>
          </div>
          <div
            style="display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:0.75rem"
          >
            @for (metric of [1, 2, 3]; track metric) {
              <div
                style="display:flex;flex-direction:column;gap:0.45rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
              >
                <ui-skeleton width="4.5rem" height="0.75rem" [animated]="false" />
                <ui-skeleton width="6.25rem" height="1.25rem" />
              </div>
            }
          </div>
          <div style="display:flex;flex-direction:column;gap:0.5rem">
            <ui-skeleton width="100%" height="0.875rem" ariaLabel="Loading activity line 1" />
            <ui-skeleton width="94%" height="0.875rem" ariaLabel="Loading activity line 2" />
            <ui-skeleton width="76%" height="0.875rem" ariaLabel="Loading activity line 3" />
          </div>
        } @else {
          <div style="display:flex;gap:1rem;align-items:flex-start;flex-wrap:wrap">
            <div
              style="display:grid;place-items:center;width:4.5rem;height:4.5rem;border-radius:9999px;background:color-mix(in srgb, var(--color-brand-primary) 14%, transparent);font-size:1.125rem;font-weight:700;color:var(--color-brand-primary)"
            >
              AC
            </div>
            <div style="display:flex;flex:1;flex-direction:column;gap:0.35rem;min-width:14rem">
              <div style="font-size:1rem;font-weight:600">Alicia Carter</div>
              <div style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest)">
                Enterprise Customer Success Lead
              </div>
              <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
                Last activity 12 minutes ago
              </div>
            </div>
          </div>
          <div
            style="display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:0.75rem"
          >
            <div
              style="display:flex;flex-direction:column;gap:0.35rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              <div style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
                Open renewals
              </div>
              <div style="font-size:1.125rem;font-weight:600">3</div>
            </div>
            <div
              style="display:flex;flex-direction:column;gap:0.35rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              <div style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
                Health score
              </div>
              <div style="font-size:1.125rem;font-weight:600">82 / 100</div>
            </div>
            <div
              style="display:flex;flex-direction:column;gap:0.35rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              <div style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">ARR</div>
              <div style="font-size:1.125rem;font-weight:600">$148,000</div>
            </div>
          </div>
          <div
            style="display:flex;flex-direction:column;gap:0.5rem;font-size:0.875rem;line-height:1.55"
          >
            <div>Customer requested a rollout timeline for the Q3 permissions update.</div>
            <div style="color:var(--color-neutral-foreground2-rest)">
              Next recommended step: schedule a migration review with IT and procurement this week.
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class SkeletonDetailPanelExampleComponent {
  protected readonly loading = signal(true);
}
