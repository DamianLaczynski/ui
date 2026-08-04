import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, TooltipDirective } from 'ui';

@Component({
  selector: 'app-tooltip-basic-example',
  standalone: true,
  imports: [ButtonComponent, TooltipDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;width:100%;max-width:32rem"
    >
      <ui-button
        type="button"
        variant="primary"
        uiTooltip="Creates a draft issue and opens it in the editor."
      >
        New issue
      </ui-button>

      <ui-button
        type="button"
        variant="secondary"
        appearance="outline"
        uiTooltip="Exports only the currently filtered rows."
      >
        Export filtered
      </ui-button>
    </div>
  `,
})
export class TooltipBasicExampleComponent {}
