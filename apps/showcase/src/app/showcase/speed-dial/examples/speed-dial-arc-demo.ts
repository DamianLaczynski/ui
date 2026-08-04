import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem, SpeedDialComponent } from 'ui';

@Component({
  selector: 'app-speed-dial-arc-demo',
  standalone: true,
  imports: [SpeedDialComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section
      style="display:grid;gap:1rem;max-width:56rem;padding:1.25rem;border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 70%,transparent);border-radius:1rem;background:color-mix(in srgb,var(--color-neutral-background-rest) 92%,white);"
    >
      <div style="display:grid;gap:0.25rem;">
        <h3 style="margin:0;font-size:1rem;">Semi and quarter arcs</h3>
        <p style="margin:0;font-size:0.875rem;color:var(--color-neutral-foreground2-rest);">
          Arc layouts are useful when the trigger sits on an edge or in a corner and the actions
          should expand inward.
        </p>
      </div>
      <div style="display:grid;gap:1rem;">
        <div
          style="display:grid;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke1-rest);border-radius:12px;background:var(--color-neutral-background-rest);"
        >
          <strong style="font-size:0.875rem;">Semi-circle</strong>
          <div
            style="display:grid;grid-template-columns:minmax(112px,1fr) auto minmax(112px,1fr);grid-template-rows:minmax(112px,auto) minmax(176px,1fr) minmax(112px,auto);grid-template-areas:'. top .' 'left hub right' '. bottom .';min-height:360px;padding:20px 28px 24px;align-items:center;justify-items:center;border:1px dashed color-mix(in srgb,var(--color-neutral-stroke-rest) 65%,transparent);border-radius:12px;background:color-mix(in srgb,var(--color-neutral-background2-rest) 70%,white);"
          >
            <div
              style="grid-area:hub;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-neutral-foreground3-rest);user-select:none;"
            >
              Semi
            </div>
            <div
              style="grid-area:bottom;display:flex;flex-direction:column;align-items:center;gap:8px;align-self:end;"
            >
              <span
                style="font-size:11px;font-weight:600;color:var(--color-neutral-foreground3-rest);"
                >Up</span
              >
              <ui-speed-dial
                dialType="semi-circle"
                direction="up"
                [radius]="60"
                [itemSizePx]="40"
                [gap]="6"
                [items]="items()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Semi circle up actions"
              />
            </div>
            <div
              style="grid-area:right;display:flex;flex-direction:column;align-items:center;gap:8px;justify-self:end;"
            >
              <span
                style="font-size:11px;font-weight:600;color:var(--color-neutral-foreground3-rest);"
                >Left</span
              >
              <ui-speed-dial
                dialType="semi-circle"
                direction="left"
                [radius]="60"
                [itemSizePx]="40"
                [gap]="6"
                [items]="items()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Semi circle left actions"
              />
            </div>
          </div>
        </div>

        <div
          style="display:grid;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke1-rest);border-radius:12px;background:var(--color-neutral-background-rest);"
        >
          <strong style="font-size:0.875rem;">Quarter-circle</strong>
          <div
            style="position:relative;min-height:360px;padding:32px;border:1px dashed color-mix(in srgb,var(--color-neutral-stroke-rest) 65%,transparent);border-radius:12px;background:color-mix(in srgb,var(--color-neutral-background2-rest) 70%,white);"
          >
            <div
              style="position:absolute;top:32px;left:32px;display:flex;flex-direction:column;align-items:flex-start;gap:8px;"
            >
              <span
                style="font-size:11px;font-weight:600;color:var(--color-neutral-foreground3-rest);"
                >Down right</span
              >
              <ui-speed-dial
                dialType="quarter-circle"
                direction="down-right"
                [radius]="72"
                [itemSizePx]="40"
                [gap]="6"
                [items]="items()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Quarter circle down right actions"
              />
            </div>
            <div
              style="position:absolute;bottom:32px;right:32px;display:flex;flex-direction:column;align-items:flex-end;gap:8px;"
            >
              <span
                style="font-size:11px;font-weight:600;color:var(--color-neutral-foreground3-rest);"
                >Up left</span
              >
              <ui-speed-dial
                dialType="quarter-circle"
                direction="up-left"
                [radius]="72"
                [itemSizePx]="40"
                [gap]="6"
                [items]="items()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Quarter circle up left actions"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SpeedDialArcDemoComponent {
  protected readonly items = signal<MenuItem[]>([
    { id: 'add', label: '', icon: 'add' },
    { id: 'duplicate', label: '', icon: 'copy' },
    { id: 'move', label: '', icon: 'arrow_move' },
    { id: 'remove', label: '', icon: 'delete' },
  ]);
}
