import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, MenuItem, SpeedDialComponent } from 'ui';

@Component({
  selector: 'app-speed-dial-workspace-demo',
  standalone: true,
  imports: [SpeedDialComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section
      style="display:grid;gap:1rem;max-width:56rem;padding:1.25rem;border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 70%,transparent);border-radius:1rem;background:color-mix(in srgb,var(--color-neutral-background-rest) 92%,white);"
    >
      <div style="display:grid;gap:0.25rem;">
        <h3 style="margin:0;font-size:1rem;">Workspace composition</h3>
        <p style="margin:0;font-size:0.875rem;color:var(--color-neutral-foreground2-rest);">
          A realistic speed dial usually complements an existing panel rather than floating alone on
          a blank canvas.
        </p>
      </div>
      <article
        style="position:relative;display:grid;gap:1rem;min-height:320px;padding:1.25rem 1.25rem 5rem;border-radius:14px;background:linear-gradient(180deg,color-mix(in srgb,var(--color-brand-background-2) 52%,white),var(--color-neutral-background-rest));border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 72%,transparent);"
      >
        <header
          style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:1rem;align-items:flex-start;"
        >
          <div style="display:grid;gap:0.35rem;">
            <strong style="font-size:1rem;">Campaign workspace</strong>
            <span
              style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest);max-width:34rem;"
            >
              Draft assets, schedule updates, and launch collaborative actions from one persistent
              floating trigger.
            </span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">
            <ui-button text="Preview" variant="secondary" />
            <ui-button text="Publish" />
          </div>
        </header>
        <div
          style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:0.875rem;"
        >
          <div
            style="padding:1rem;border-radius:12px;background:rgb(255 255 255 / 65%);border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 55%,transparent);"
          >
            <strong style="display:block;margin-bottom:0.5rem;">Assets</strong>
            <span style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest);"
              >12 visuals, 3 pending approvals</span
            >
          </div>
          <div
            style="padding:1rem;border-radius:12px;background:rgb(255 255 255 / 65%);border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 55%,transparent);"
          >
            <strong style="display:block;margin-bottom:0.5rem;">Audience</strong>
            <span style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest);"
              >EMEA, trial cohort, active customers</span
            >
          </div>
          <div
            style="padding:1rem;border-radius:12px;background:rgb(255 255 255 / 65%);border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 55%,transparent);"
          >
            <strong style="display:block;margin-bottom:0.5rem;">Timing</strong>
            <span style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest);"
              >Launch window: next Tuesday at 10:00</span
            >
          </div>
        </div>
        <div style="position:absolute;right:20px;bottom:20px;">
          <ui-speed-dial
            dialType="semi-circle"
            direction="up"
            [radius]="72"
            [itemSizePx]="42"
            [gap]="8"
            [showTooltips]="true"
            [tooltipOptions]="{ tooltipPosition: 'left' }"
            [items]="items()"
            [triggerButtonProps]="{ variant: 'primary', appearance: 'filled', shape: 'circular' }"
            ariaLabel="Workspace speed dial"
          />
        </div>
      </article>
    </section>
  `,
})
export class SpeedDialWorkspaceDemoComponent {
  protected readonly items = signal<MenuItem[]>([
    { id: 'New draft', label: '', icon: 'edit' },
    { id: 'Assign review', label: '', icon: 'person_add' },
    { id: 'Schedule send', label: '', icon: 'calendar_clock' },
    { id: 'Duplicate', label: '', icon: 'copy' },
  ]);
}
