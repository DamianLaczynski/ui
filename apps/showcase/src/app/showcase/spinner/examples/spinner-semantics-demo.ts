import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ExtendedSize, SpinnerComponent, Variant } from 'lui';

@Component({
  selector: 'app-spinner-semantics-example',
  standalone: true,
  imports: [SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1.25rem">
      <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center">
        @for (variant of variants; track variant) {
          <ui-spinner [variant]="variant" size="medium" ariaLabel="Loading" />
        }
      </div>
      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-end;padding-top:0.75rem;border-top:1px solid var(--color-neutral-stroke-rest)"
      >
        @for (size of sizes; track size) {
          <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
            <ui-spinner variant="primary" [size]="size" ariaLabel="Loading" />
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">{{
              size
            }}</span>
          </div>
        }
      </div>
    </div>
  `,
})
export class SpinnerSemanticsExampleComponent {
  protected readonly variants: Variant[] = [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
  ];

  protected readonly sizes: ExtendedSize[] = ['extra-small', 'medium', 'extra-large'];
}
