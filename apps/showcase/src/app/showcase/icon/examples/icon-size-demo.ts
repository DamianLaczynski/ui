import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IconComponent, Size } from 'lui';

const sizes: Array<{ size: Size; label: string }> = [
  { size: 'small', label: 'Small' },
  { size: 'medium', label: 'Medium' },
  { size: 'large', label: 'Large' },
];

@Component({
  selector: 'app-icon-size-demo',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));max-width:44rem;"
    >
      @for (item of sizes; track item.size) {
        <div
          style="display:grid;gap:0.75rem;justify-items:center;padding:1rem;border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 60%,transparent);border-radius:12px;background:var(--color-neutral-background-rest);"
        >
          <ui-icon icon="calendar_clock" [size]="item.size" />
          <strong style="font-size:0.875rem;">{{ item.label }}</strong>
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);">
            preset {{ item.size }}
          </span>
        </div>
      }

      <div
        style="display:grid;gap:0.75rem;justify-items:center;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:12px;background:var(--color-neutral-background2-rest);"
      >
        <ui-icon icon="calendar_clock" [sizePx]="32" />
        <strong style="font-size:0.875rem;">Custom</strong>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);">
          sizePx="32"
        </span>
      </div>
    </div>
  `,
})
export class IconSizeDemoComponent {
  protected readonly sizes = sizes;
}
