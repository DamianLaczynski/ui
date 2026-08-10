import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem, SpeedDialComponent } from 'lui';

@Component({
  selector: 'app-speed-dial-circle-demo',
  standalone: true,
  imports: [SpeedDialComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section
      style="display:grid;gap:1rem;max-width:42rem;padding:1.25rem;border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 70%,transparent);border-radius:1rem;background:color-mix(in srgb,var(--color-neutral-background-rest) 92%,white);"
    >
      <div style="display:grid;gap:0.25rem;">
        <h3 style="margin:0;font-size:1rem;">Circle layout</h3>
        <p style="margin:0;font-size:0.875rem;color:var(--color-neutral-foreground2-rest);">
          Full radial layout works best when the trigger owns enough surrounding space and the dial
          is itself a focal interaction.
        </p>
      </div>
      <div
        style="display:flex;align-items:center;justify-content:center;min-height:380px;padding:48px 32px;border:1px solid var(--color-neutral-stroke1-rest);border-radius:12px;background:var(--color-neutral-background-rest);box-shadow:0 1px 3px rgb(0 0 0 / 10%), inset 0 0 0 1px var(--color-neutral-stroke2-rest);"
      >
        <ui-speed-dial
          dialType="circle"
          [radius]="72"
          [itemSizePx]="40"
          [gap]="6"
          [items]="items()"
          [triggerButtonProps]="{ variant: 'primary', appearance: 'filled', shape: 'circular' }"
          ariaLabel="Circle speed dial"
        />
      </div>
    </section>
  `,
})
export class SpeedDialCircleDemoComponent {
  protected readonly items = signal<MenuItem[]>([
    { id: 'comment', label: '', icon: 'chat' },
    { id: 'share', label: '', icon: 'share' },
    { id: 'archive', label: '', icon: 'archive' },
    { id: 'pin', label: '', icon: 'pin' },
    { id: 'copy', label: '', icon: 'copy' },
    { id: 'star', label: '', icon: 'star' },
  ]);
}
