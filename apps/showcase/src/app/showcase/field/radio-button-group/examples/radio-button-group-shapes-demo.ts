import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonGroupComponent, type RadioButtonItem } from 'ui';

@Component({
  selector: 'app-radio-button-group-shapes-demo',
  standalone: true,
  imports: [FormsModule, RadioButtonGroupComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;width:100%;max-width:56rem"
    >
      <ui-radio-button-group
        label="Rounded"
        helpText="Default shape for most segmented choices."
        [items]="viewItems"
        shape="rounded"
        variant="primary"
        appearance="tint"
        [(ngModel)]="roundedValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-radio-button-group
        label="Square"
        helpText="Useful when the surrounding UI uses sharper edges."
        [items]="viewItems"
        shape="square"
        appearance="outline"
        [(ngModel)]="squareValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-radio-button-group
        label="Circular"
        helpText="Works best with short, icon-led choices."
        [items]="toolItems"
        shape="circular"
        appearance="tint"
        [(ngModel)]="circularValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class RadioButtonGroupShapesDemoComponent {
  protected roundedValue = 'board';
  protected squareValue = 'list';
  protected circularValue = 'mail';

  protected readonly viewItems: RadioButtonItem[] = [
    { id: 'board', label: 'Board', value: 'board' },
    { id: 'list', label: 'List', value: 'list' },
    { id: 'timeline', label: 'Timeline', value: 'timeline' },
  ];

  protected readonly toolItems: RadioButtonItem[] = [
    { id: 'mail', label: 'Mail', value: 'mail', icon: 'mail' },
    { id: 'chat', label: 'Chat', value: 'chat', icon: 'chat' },
    { id: 'call', label: 'Call', value: 'call', icon: 'call' },
  ];
}
