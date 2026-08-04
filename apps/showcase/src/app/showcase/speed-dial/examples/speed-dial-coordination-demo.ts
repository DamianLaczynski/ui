import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem, SpeedDialComponent } from 'ui';

@Component({
  selector: 'app-speed-dial-coordination-demo',
  standalone: true,
  imports: [SpeedDialComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section
      style="display:grid;gap:1rem;max-width:48rem;padding:1.25rem;border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 70%,transparent);border-radius:1rem;background:color-mix(in srgb,var(--color-neutral-background-rest) 92%,white);"
    >
      <div style="display:grid;gap:0.25rem;">
        <h3 style="margin:0;font-size:1rem;">Coordination between dials</h3>
        <p style="margin:0;font-size:0.875rem;color:var(--color-neutral-foreground2-rest);">
          Multiple floating triggers should usually coordinate so only one menu stays open at a
          time.
        </p>
      </div>
      <div
        style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem;min-height:280px;padding:1rem;border:1px solid var(--color-neutral-stroke1-rest);border-radius:12px;background:var(--color-neutral-background-rest);"
      >
        <article
          style="position:relative;min-height:220px;padding:1rem;border-radius:12px;background:var(--color-neutral-background2-rest);"
        >
          <div style="display:grid;gap:0.25rem;">
            <strong>Primary actions</strong>
            <span style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest);"
              >Create, assign, and start work.</span
            >
          </div>
          <div style="position:absolute;right:16px;bottom:16px;">
            <ui-speed-dial
              dialType="linear"
              direction="up"
              [items]="primaryItems()"
              [itemSizePx]="40"
              [gap]="6"
              [triggerButtonProps]="{ variant: 'primary', appearance: 'filled', shape: 'circular' }"
              ariaLabel="Primary speed dial"
            />
          </div>
        </article>
        <article
          style="position:relative;min-height:220px;padding:1rem;border-radius:12px;background:var(--color-neutral-background2-rest);"
        >
          <div style="display:grid;gap:0.25rem;">
            <strong>Secondary actions</strong>
            <span style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest);"
              >Share, archive, or open related records.</span
            >
          </div>
          <div style="position:absolute;right:16px;bottom:16px;">
            <ui-speed-dial
              dialType="linear"
              direction="up"
              [items]="secondaryItems()"
              [itemSizePx]="40"
              [gap]="6"
              [triggerButtonProps]="{
                variant: 'secondary',
                appearance: 'filled',
                shape: 'circular',
              }"
              ariaLabel="Secondary speed dial"
            />
          </div>
        </article>
      </div>
    </section>
  `,
})
export class SpeedDialCoordinationDemoComponent {
  protected readonly primaryItems = signal<MenuItem[]>([
    { id: 'create', label: '', icon: 'add' },
    { id: 'assign', label: '', icon: 'person_add' },
    { id: 'start', label: '', icon: 'play' },
  ]);
  protected readonly secondaryItems = signal<MenuItem[]>([
    { id: 'share', label: '', icon: 'share' },
    { id: 'archive', label: '', icon: 'archive' },
    { id: 'open', label: '', icon: 'open' },
  ]);
}
