import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from 'lui';

const dashedCardStyle =
  'padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);min-width:10rem';

@Component({
  selector: 'app-slider-basic-example',
  standalone: true,
  imports: [FormsModule, SliderComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:36rem;"
    >
      <div style="flex:1 1 16rem;min-width:14rem">
        <ui-slider
          label="Volume"
          helpText="Adjust the playback volume."
          [(ngModel)]="volume"
          [ngModelOptions]="{ standalone: true }"
          [ariaValueText]="getVolumeAriaValueText"
        />
      </div>
      <div [attr.style]="dashedCardStyle">
        <p style="margin:0 0 0.35rem;font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          Value
        </p>
        <p
          style="margin:0;font-size:1rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
        >
          {{ volume }}%
        </p>
        <p style="margin:0.35rem 0 0;font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ getVolumeAriaValueText(volume) }}
        </p>
      </div>
    </div>
  `,
})
export class SliderBasicExampleComponent {
  readonly dashedCardStyle = dashedCardStyle;

  protected volume = 64;
  protected readonly getVolumeAriaValueText = (value: number) => `${value} percent volume`;
}
