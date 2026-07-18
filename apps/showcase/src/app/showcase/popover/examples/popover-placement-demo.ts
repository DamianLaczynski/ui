import { Component, TemplateRef, model, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ButtonComponent,
  PopoverDirective,
  RadioButtonGroupComponent,
  type PopoverPosition,
  type RadioButtonItem,
} from 'ui';

@Component({
  selector: 'app-popover-placement-demo',
  standalone: true,
  imports: [FormsModule, ButtonComponent, PopoverDirective, RadioButtonGroupComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1.25rem;width:100%;min-height:22rem;padding:1.5rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
    >
      <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest);max-width:32rem">
        Use one trigger and switch placement from the control below. The panel keeps the arrow
        aligned with the side that actually fits in the viewport.
      </div>

      <div style="flex:1;display:flex;align-items:center;justify-content:center;min-height:12rem">
        <ui-button
          type="button"
          variant="primary"
          icon="panel_top_expand"
          [uiPopover]="placementTpl"
          [(uiPopoverOpen)]="open"
          [uiPopoverPosition]="selectedPosition"
          uiPopoverAriaLabel="Placement preview"
          uiPopoverSize="medium"
        >
          Open panel
        </ui-button>
      </div>

      <ui-radio-button-group
        label="Preferred placement"
        [items]="placementItems"
        [(ngModel)]="selectedPosition"
        [ngModelOptions]="{ standalone: true }"
        layout="separate"
        appearance="outline"
        variant="secondary"
      />
    </div>

    <ng-template #placementTpl>
      <div class="popover-panel" style="min-width:14rem">
        <div class="popover-panel__header">
          <div class="popover-panel__title">Placement preview</div>
          <div class="popover-panel__description">
            Anchored to the trigger on the {{ selectedPosition }} side when space allows.
          </div>
        </div>
        <div class="popover-panel__body">
          <div
            style="font-size:0.8125rem;line-height:1.5;color:var(--color-neutral-foreground2-rest)"
          >
            Popovers are meant for compact panels such as filters, pickers, and quick actions—not
            one-line hints.
          </div>
        </div>
      </div>
    </ng-template>
  `,
})
export class PopoverPlacementDemoComponent {
  protected placementTpl = viewChild.required<TemplateRef<unknown>>('placementTpl');
  protected open = model(false);
  protected selectedPosition: PopoverPosition = 'bottom';

  protected readonly placementItems: RadioButtonItem[] = [
    { id: 'top', label: 'Top', value: 'top' },
    { id: 'bottom', label: 'Bottom', value: 'bottom' },
    { id: 'left', label: 'Left', value: 'left' },
    { id: 'right', label: 'Right', value: 'right' },
  ];
}
