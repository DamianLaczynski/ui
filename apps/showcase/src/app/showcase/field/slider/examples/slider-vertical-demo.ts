import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from 'lui';

const dashedCardStyle =
  'padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);min-width:12rem';

@Component({
  selector: 'app-slider-vertical-example',
  standalone: true,
  imports: [FormsModule, SliderComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div style="display:flex;flex-wrap:wrap;gap:2rem;align-items:flex-start;flex:1 1 auto">
        <div style="height:14rem">
          <ui-slider
            label="Mic gain"
            [vertical]="true"
            [min]="0"
            [max]="10"
            [step]="1"
            [showStepMarkers]="true"
            [(ngModel)]="gain"
            [ngModelOptions]="{ standalone: true }"
          />
        </div>

        <div
          style="display:flex;flex-direction:column;gap:1rem;flex:1 1 14rem;min-width:14rem;max-width:18rem"
        >
          <ui-slider
            label="Readonly threshold"
            [min]="0"
            [max]="100"
            [readonly]="true"
            [(ngModel)]="readonlyValue"
            [ngModelOptions]="{ standalone: true }"
            helpText="Visible but locked in the current state."
          />
          <ui-slider
            label="Disabled threshold"
            [min]="0"
            [max]="100"
            [disabled]="true"
            [(ngModel)]="disabledValue"
            [ngModelOptions]="{ standalone: true }"
          />
        </div>
      </div>
      <div [attr.style]="dashedCardStyle">
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Values
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.45rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Mic gain</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              gain
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Readonly</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              readonlyValue
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Disabled</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground2-rest)">{{
              disabledValue
            }}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SliderVerticalExampleComponent {
  readonly dashedCardStyle = dashedCardStyle;

  protected gain = 4;
  protected readonlyValue = 68;
  protected disabledValue = 40;
}
