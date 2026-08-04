import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem, SpeedDialComponent } from 'ui';

@Component({
  selector: 'app-speed-dial-behavior-demo',
  standalone: true,
  imports: [SpeedDialComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section
      style="display:grid;gap:1rem;max-width:56rem;padding:1.25rem;border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 70%,transparent);border-radius:1rem;background:color-mix(in srgb,var(--color-neutral-background-rest) 92%,white);"
    >
      <div style="display:grid;gap:0.25rem;">
        <h3 style="margin:0;font-size:1rem;">Mask, idle close, and tooltips</h3>
        <p style="margin:0;font-size:0.875rem;color:var(--color-neutral-foreground2-rest);">
          These options affect how disruptive or discoverable the dial feels in a busy screen.
        </p>
      </div>
      <div
        style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:28px 20px;min-height:260px;padding:28px 24px 32px;border:1px solid var(--color-neutral-stroke1-rest);border-radius:12px;background:var(--color-neutral-background-rest);align-items:end;justify-items:center;"
      >
        <div
          style="min-height:200px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:8px;"
        >
          <span style="font-size:11px;font-weight:600;color:var(--color-neutral-foreground3-rest);"
            >Idle 5s</span
          >
          <ui-speed-dial
            dialType="linear"
            direction="up"
            [autoCloseIdleMs]="5000"
            [itemSizePx]="40"
            [gap]="6"
            [items]="items()"
            [triggerButtonProps]="{ variant: 'primary', appearance: 'filled', shape: 'circular' }"
            ariaLabel="Idle close speed dial"
            (hide)="log('idle: ' + $event.type)"
          />
        </div>
        <div
          style="min-height:200px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:8px;"
        >
          <span style="font-size:11px;font-weight:600;color:var(--color-neutral-foreground3-rest);"
            >Mask</span
          >
          <ui-speed-dial
            dialType="linear"
            direction="up"
            [mask]="true"
            [itemSizePx]="40"
            [gap]="6"
            [items]="items()"
            [triggerButtonProps]="{ variant: 'primary', appearance: 'filled', shape: 'circular' }"
            ariaLabel="Masked speed dial"
          />
        </div>
        <div
          style="min-height:200px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:8px;"
        >
          <span style="font-size:11px;font-weight:600;color:var(--color-neutral-foreground3-rest);"
            >Tooltips</span
          >
          <ui-speed-dial
            dialType="linear"
            direction="up"
            [showTooltips]="true"
            [tooltipOptions]="{ tooltipPosition: 'left' }"
            [itemSizePx]="40"
            [gap]="6"
            [items]="tooltipItems()"
            [triggerButtonProps]="{ variant: 'secondary', appearance: 'filled', shape: 'circular' }"
            ariaLabel="Tooltip speed dial"
          />
        </div>
      </div>
      <div
        style="display:flex;flex-wrap:wrap;gap:12px;padding:12px 14px;border:1px dashed var(--color-neutral-stroke-rest);border-radius:12px;background:var(--color-neutral-background2-rest);"
      >
        <div style="font-weight:600;">Event log</div>
        <div>{{ eventLog().length > 0 ? eventLog()[0] : 'No events yet.' }}</div>
      </div>
    </section>
  `,
})
export class SpeedDialBehaviorDemoComponent {
  protected readonly eventLog = signal<string[]>([]);
  protected readonly items = signal<MenuItem[]>([
    { id: 'edit', label: '', icon: 'edit', action: () => this.log('action: edit') },
    { id: 'refresh', label: '', icon: 'arrow_sync', action: () => this.log('action: refresh') },
    { id: 'delete', label: '', icon: 'delete', action: () => this.log('action: delete') },
  ]);
  protected readonly tooltipItems = signal<MenuItem[]>([
    { id: 'Add', label: '', icon: 'add', action: () => this.log('action: add') },
    { id: 'Update', label: '', icon: 'arrow_sync', action: () => this.log('action: update') },
    { id: 'Remove', label: '', icon: 'delete', action: () => this.log('action: remove') },
  ]);

  protected log(message: string): void {
    this.eventLog.update(entries => [message, ...entries].slice(0, 12));
  }
}
