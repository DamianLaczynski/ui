import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from 'ui';

const dashedCardStyle =
  'padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);min-width:11rem';

@Component({
  selector: 'app-slider-sizes-example',
  standalone: true,
  imports: [FormsModule, SliderComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:42rem;"
    >
      <div
        style="flex:1 1 18rem;display:flex;min-width:16rem;max-width:30rem;flex-direction:column;gap:1rem"
      >
        <ui-slider
          label="Small"
          size="small"
          [(ngModel)]="smallValue"
          [ngModelOptions]="{ standalone: true }"
        />
        <ui-slider
          label="Medium"
          size="medium"
          [(ngModel)]="mediumValue"
          [ngModelOptions]="{ standalone: true }"
        />
        <ui-slider
          label="Large"
          size="large"
          [(ngModel)]="largeValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>
      <div [attr.style]="dashedCardStyle">
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Values
        </p>
        <div style="display:grid;gap:0.4rem;font-size:0.875rem;line-height:1.35">
          <span
            style="display:flex;justify-content:space-between;gap:1rem;color:var(--color-neutral-foreground-rest)"
          >
            <span style="color:var(--color-neutral-foreground2-rest)">Small</span>
            <strong style="font-weight:600">{{ smallValue }}</strong>
          </span>
          <span
            style="display:flex;justify-content:space-between;gap:1rem;color:var(--color-neutral-foreground-rest)"
          >
            <span style="color:var(--color-neutral-foreground2-rest)">Medium</span>
            <strong style="font-weight:600">{{ mediumValue }}</strong>
          </span>
          <span
            style="display:flex;justify-content:space-between;gap:1rem;color:var(--color-neutral-foreground-rest)"
          >
            <span style="color:var(--color-neutral-foreground2-rest)">Large</span>
            <strong style="font-weight:600">{{ largeValue }}</strong>
          </span>
        </div>
      </div>
    </div>
  `,
})
export class SliderSizesExampleComponent {
  readonly dashedCardStyle = dashedCardStyle;

  protected smallValue = 25;
  protected mediumValue = 50;
  protected largeValue = 75;
}
