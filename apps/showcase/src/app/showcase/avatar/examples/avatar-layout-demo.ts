import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AvatarComponent, Shape, Size } from 'ui';

@Component({
  selector: 'app-avatar-layout-example',
  standalone: true,
  imports: [AvatarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1.25rem;width:100%;align-items:center">
      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-end;justify-content:center;width:100%"
      >
        @for (size of sizes; track size) {
          <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
            <ui-avatar [size]="size" name="Sam Rowe" />
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">{{
              size
            }}</span>
          </div>
        }
      </div>
      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-end;justify-content:center;width:100%;padding-top:0.75rem;border-top:1px solid var(--color-neutral-stroke-rest)"
      >
        @for (shape of shapes; track shape) {
          <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
            <ui-avatar [shape]="shape" name="Jamie P." />
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">{{
              shape
            }}</span>
          </div>
        }
      </div>
    </div>
  `,
})
export class AvatarLayoutExampleComponent {
  protected readonly sizes: Size[] = ['small', 'medium', 'large'];

  protected readonly shapes: Shape[] = ['rounded', 'circular', 'square'];
}
