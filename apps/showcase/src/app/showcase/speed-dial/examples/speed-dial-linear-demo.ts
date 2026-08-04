import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem, SpeedDialComponent } from 'ui';

@Component({
  selector: 'app-speed-dial-linear-demo',
  standalone: true,
  imports: [SpeedDialComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section
      style="display:grid;gap:1rem;max-width:56rem;padding:1.25rem;border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 70%,transparent);border-radius:1rem;background:color-mix(in srgb,var(--color-neutral-background-rest) 92%,white);"
    >
      <div style="display:grid;gap:0.25rem;">
        <h3 style="margin:0;font-size:1rem;">Linear directions</h3>
        <p style="margin:0;font-size:0.875rem;color:var(--color-neutral-foreground2-rest);">
          Linear is the safest layout for edge-triggered quick actions because the expansion path
          stays predictable.
        </p>
      </div>

      <div
        style="display:grid;grid-template-columns:minmax(88px,1fr) auto minmax(88px,1fr);grid-template-rows:minmax(112px,auto) minmax(160px,1fr) minmax(112px,auto);grid-template-areas:'. top .' 'left hub right' '. bottom .';min-height:420px;padding:12px 28px 20px;align-items:center;justify-items:center;border:1px solid var(--color-neutral-stroke1-rest);border-radius:12px;background:var(--color-neutral-background-rest);box-shadow:0 1px 3px rgb(0 0 0 / 10%), inset 0 0 0 1px var(--color-neutral-stroke2-rest);"
      >
        <div
          style="grid-area:hub;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-neutral-foreground3-rest);user-select:none;"
        >
          Linear
        </div>
        <div
          style="grid-area:bottom;display:flex;flex-direction:column;align-items:center;gap:8px;align-self:end;"
        >
          <span style="font-size:11px;font-weight:600;color:var(--color-neutral-foreground3-rest);"
            >Up</span
          >
          <ui-speed-dial
            dialType="linear"
            direction="up"
            [itemSizePx]="40"
            [gap]="6"
            [items]="items()"
            [triggerButtonProps]="{ variant: 'primary', appearance: 'filled', shape: 'circular' }"
            ariaLabel="Linear up actions"
          />
        </div>
        <div
          style="grid-area:top;display:flex;flex-direction:column;align-items:center;gap:8px;align-self:start;"
        >
          <span style="font-size:11px;font-weight:600;color:var(--color-neutral-foreground3-rest);"
            >Down</span
          >
          <ui-speed-dial
            dialType="linear"
            direction="down"
            [itemSizePx]="40"
            [gap]="6"
            [items]="items()"
            [triggerButtonProps]="{ variant: 'primary', appearance: 'filled', shape: 'circular' }"
            ariaLabel="Linear down actions"
          />
        </div>
        <div
          style="grid-area:left;display:flex;flex-direction:column;align-items:center;gap:8px;justify-self:start;"
        >
          <span style="font-size:11px;font-weight:600;color:var(--color-neutral-foreground3-rest);"
            >Right</span
          >
          <ui-speed-dial
            dialType="linear"
            direction="right"
            [itemSizePx]="40"
            [gap]="6"
            [items]="items()"
            [triggerButtonProps]="{ variant: 'primary', appearance: 'filled', shape: 'circular' }"
            ariaLabel="Linear right actions"
          />
        </div>
        <div
          style="grid-area:right;display:flex;flex-direction:column;align-items:center;gap:8px;justify-self:end;"
        >
          <span style="font-size:11px;font-weight:600;color:var(--color-neutral-foreground3-rest);"
            >Left</span
          >
          <ui-speed-dial
            dialType="linear"
            direction="left"
            [itemSizePx]="40"
            [gap]="6"
            [items]="items()"
            [triggerButtonProps]="{ variant: 'primary', appearance: 'filled', shape: 'circular' }"
            ariaLabel="Linear left actions"
          />
        </div>
      </div>
    </section>
  `,
})
export class SpeedDialLinearDemoComponent {
  protected readonly items = signal<MenuItem[]>([
    { id: 'edit', label: '', icon: 'edit' },
    { id: 'refresh', label: '', icon: 'arrow_sync' },
    { id: 'delete', label: '', icon: 'delete' },
    { id: 'open', label: '', icon: 'open' },
  ]);
}
