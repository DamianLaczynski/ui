import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, TooltipDirective } from 'ui';

@Component({
  selector: 'app-tooltip-sizes-example',
  standalone: true,
  imports: [ButtonComponent, TooltipDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;width:100%;max-width:40rem"
    >
      <ui-button type="button" appearance="outline" uiTooltip="Compact hint" uiTooltipSize="small">
        Small
      </ui-button>

      <ui-button
        type="button"
        appearance="outline"
        uiTooltip="Balanced default tooltip for most interface hints."
        uiTooltipSize="medium"
      >
        Medium
      </ui-button>

      <ui-button
        type="button"
        appearance="outline"
        uiTooltip="Longer tooltip text can wrap to multiple lines when the message still stays short, supporting, and easy to scan."
        uiTooltipSize="large"
        [uiTooltipDelay]="600"
        [uiTooltipWithArrow]="false"
      >
        Large, delayed, no arrow
      </ui-button>
    </div>
  `,
})
export class TooltipSizesExampleComponent {}
