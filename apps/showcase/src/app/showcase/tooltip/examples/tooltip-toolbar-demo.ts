import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, TooltipDirective } from 'ui';

@Component({
  selector: 'app-tooltip-toolbar-example',
  standalone: true,
  imports: [ButtonComponent, TooltipDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:34rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="font-size:0.875rem;font-weight:600">Compact editor toolbar</div>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center">
        <ui-button
          type="button"
          icon="text_bold"
          shape="square"
          appearance="subtle"
          uiTooltip="Bold"
          uiTooltipRelationship="label"
        ></ui-button>
        <ui-button
          type="button"
          icon="text_italic"
          shape="square"
          appearance="subtle"
          uiTooltip="Italic"
          uiTooltipRelationship="label"
        ></ui-button>
        <ui-button
          type="button"
          icon="link"
          shape="square"
          appearance="subtle"
          uiTooltip="Insert link"
          uiTooltipRelationship="label"
        ></ui-button>
        <ui-button
          type="button"
          icon="image"
          shape="square"
          appearance="subtle"
          uiTooltip="Insert image"
          uiTooltipRelationship="label"
        ></ui-button>
        <ui-button
          type="button"
          icon="code"
          shape="square"
          appearance="subtle"
          uiTooltip="Code block"
          uiTooltipRelationship="label"
        ></ui-button>
      </div>
    </div>
  `,
})
export class TooltipToolbarExampleComponent {}
