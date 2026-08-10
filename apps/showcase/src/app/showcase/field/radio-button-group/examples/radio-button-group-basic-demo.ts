import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonGroupComponent, type RadioButtonItem } from 'lui';

@Component({
  selector: 'app-radio-button-group-basic-demo',
  standalone: true,
  imports: [FormsModule, RadioButtonGroupComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;width:100%;max-width:44rem"
    >
      <ui-radio-button-group
        label="View mode"
        helpText="A compact single-choice switch for common modes."
        [items]="viewItems"
        [(ngModel)]="viewMode"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-radio-button-group
        label="Delivery speed"
        helpText="Button-like radios work well when there are only a few mutually exclusive choices."
        [items]="deliveryItems"
        [(ngModel)]="delivery"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class RadioButtonGroupBasicDemoComponent {
  protected viewMode = 'board';
  protected delivery = 'standard';

  protected readonly viewItems: RadioButtonItem[] = [
    { id: 'board', label: 'Board', value: 'board' },
    { id: 'list', label: 'List', value: 'list' },
    { id: 'timeline', label: 'Timeline', value: 'timeline' },
  ];

  protected readonly deliveryItems: RadioButtonItem[] = [
    { id: 'standard', label: 'Standard', value: 'standard' },
    { id: 'express', label: 'Express', value: 'express' },
    { id: 'overnight', label: 'Overnight', value: 'overnight' },
  ];
}
