import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IconComponent, IconName } from 'lui';

type IconVariant = 'regular' | 'filled';
type IconSize = 'small' | 'medium' | 'large';

const overviewIcons: IconName[] = ['home', 'search', 'settings', 'info', 'checkmark', 'delete'];
const sizes: IconSize[] = ['small', 'medium', 'large'];
const variants: { label: string; value: IconVariant }[] = [
  { label: 'Regular', value: 'regular' },
  { label: 'Filled', value: 'filled' },
];

@Component({
  selector: 'app-icon-overview-demo',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem;max-width:56rem;">
      @for (variant of variants; track variant.value) {
        <section style="display:grid;gap:0.75rem;">
          <strong style="font-size:0.875rem;">{{ variant.label }}</strong>
          <div style="display:grid;gap:0.75rem;">
            @for (iconName of icons; track iconName) {
              <div
                style="display:flex;flex-wrap:wrap;align-items:center;gap:0.875rem 1rem;padding:0.875rem 1rem;border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 60%,transparent);border-radius:12px;background:var(--color-neutral-background-rest);"
              >
                <strong style="min-width:6rem;font-size:0.875rem;">{{ iconName }}</strong>
                @for (size of sizes; track size) {
                  <div
                    style="display:grid;justify-items:center;gap:0.375rem;min-width:4.5rem;padding:0.5rem 0.625rem;border-radius:10px;background:var(--color-neutral-background2-rest);"
                  >
                    <ui-icon [icon]="iconName" [size]="size" [variant]="variant.value" />
                    <span
                      style="font-size:0.75rem;line-height:1.2;color:var(--color-neutral-foreground2-rest);text-transform:capitalize;"
                    >
                      {{ size }}
                    </span>
                  </div>
                }
              </div>
            }
          </div>
        </section>
      }
    </div>
  `,
})
export class IconOverviewDemoComponent {
  protected readonly icons = overviewIcons;
  protected readonly sizes = sizes;
  protected readonly variants = variants;
}
