import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonGroupComponent, type RadioButtonItem } from 'ui';

@Component({
  selector: 'app-radio-button-group-states-demo',
  standalone: true,
  imports: [FormsModule, RadioButtonGroupComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;width:100%;max-width:48rem"
    >
      <ui-radio-button-group
        label="Plan"
        helpText="Per-option disabled state is useful when some choices are unavailable."
        [items]="planItems"
        [(ngModel)]="plan"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-radio-button-group
        label="Readonly decision"
        helpText="Readonly keeps the current value visible without allowing changes."
        [items]="decisionItems"
        [readonly]="true"
        [(ngModel)]="decision"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-radio-button-group
        label="Required approval"
        helpText="Required groups still need a clear visible prompt."
        [items]="approvalItems"
        [required]="true"
        [(ngModel)]="approval"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-radio-button-group
        label="Disabled mode"
        helpText="Disabled removes the whole control from interaction."
        [items]="decisionItems"
        [disabled]="true"
        [(ngModel)]="disabledMode"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class RadioButtonGroupStatesDemoComponent {
  protected plan = 'team';
  protected decision = 'approved';
  protected approval = 'owner';
  protected disabledMode = 'approved';

  protected readonly planItems: RadioButtonItem[] = [
    { id: 'solo', label: 'Solo', value: 'solo' },
    { id: 'team', label: 'Team', value: 'team' },
    { id: 'enterprise', label: 'Enterprise', value: 'enterprise', disabled: true },
  ];

  protected readonly decisionItems: RadioButtonItem[] = [
    { id: 'approved', label: 'Approved', value: 'approved' },
    { id: 'changes', label: 'Needs changes', value: 'changes' },
    { id: 'blocked', label: 'Blocked', value: 'blocked' },
  ];

  protected readonly approvalItems: RadioButtonItem[] = [
    { id: 'owner', label: 'Owner', value: 'owner' },
    { id: 'legal', label: 'Legal', value: 'legal' },
    { id: 'finance', label: 'Finance', value: 'finance' },
  ];
}
