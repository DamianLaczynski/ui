import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RatingComponent, Size } from 'lui';

@Component({
  selector: 'app-rating-sizes-states-example',
  standalone: true,
  imports: [RatingComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1.25rem">
      <div style="display:flex;flex-wrap:wrap;gap:1.25rem;align-items:flex-end">
        @for (size of sizes; track size) {
          <div style="display:flex;flex-direction:column;gap:0.35rem;min-width:7rem">
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">{{
              size
            }}</span>
            <ui-rating [value]="3" [size]="size" [readOnly]="true" [showValue]="false" />
          </div>
        }
      </div>

      <div
        style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:1rem;padding-top:0.75rem;border-top:1px solid var(--color-neutral-stroke-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.5rem">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
            >Editable</span
          >
          <ui-rating [value]="editable()" [showValue]="true" (valueChange)="editable.set($event)" />
        </div>
        <div style="display:flex;flex-direction:column;gap:0.5rem">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
            >Read-only</span
          >
          <ui-rating [value]="4" [readOnly]="true" [showValue]="true" />
        </div>
        <div style="display:flex;flex-direction:column;gap:0.5rem">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
            >Disabled</span
          >
          <ui-rating [value]="3" [disabled]="true" [showValue]="true" />
        </div>
      </div>
    </div>
  `,
})
export class RatingSizesStatesExampleComponent {
  protected readonly sizes: Size[] = ['small', 'medium', 'large'];

  protected readonly editable = signal(2);
}
