import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, TooltipDirective } from 'ui';

@Component({
  selector: 'app-tooltip-positions-example',
  standalone: true,
  imports: [ButtonComponent, TooltipDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:1rem;width:100%;max-width:36rem"
    >
      <ui-button
        type="button"
        appearance="outline"
        uiTooltip="Appears above the trigger."
        uiTooltipPosition="top"
      >
        Top
      </ui-button>

      <ui-button
        type="button"
        appearance="outline"
        uiTooltip="Appears below the trigger."
        uiTooltipPosition="bottom"
      >
        Bottom
      </ui-button>

      <ui-button
        type="button"
        appearance="outline"
        uiTooltip="Appears to the left when space allows."
        uiTooltipPosition="left"
      >
        Left
      </ui-button>

      <ui-button
        type="button"
        appearance="outline"
        uiTooltip="Appears to the right when space allows."
        uiTooltipPosition="right"
      >
        Right
      </ui-button>
    </div>
  `,
})
export class TooltipPositionsExampleComponent {}
