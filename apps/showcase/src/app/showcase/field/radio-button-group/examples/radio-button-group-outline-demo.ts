import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonGroupComponent, type RadioButtonItem, type Variant } from 'lui';

@Component({
  selector: 'app-radio-button-group-outline-demo',
  standalone: true,
  imports: [FormsModule, RadioButtonGroupComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;align-items:flex-start;gap:0.75rem;width:100%">
      @for (variant of variants; track variant) {
        <ui-radio-button-group
          [label]="getLabel(variant)"
          [items]="items"
          [variant]="variant"
          appearance="outline"
          [(ngModel)]="selection[variant]"
          [ngModelOptions]="{ standalone: true }"
        />
      }
    </div>
  `,
})
export class RadioButtonGroupOutlineDemoComponent {
  protected readonly variants: Variant[] = [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
  ];

  protected readonly selection: Record<Variant, string> = {
    primary: 'comfortable',
    secondary: 'comfortable',
    success: 'comfortable',
    warning: 'comfortable',
    danger: 'comfortable',
    info: 'comfortable',
  };

  protected readonly items: RadioButtonItem[] = [
    { id: 'compact', label: 'Compact', value: 'compact' },
    { id: 'comfortable', label: 'Comfortable', value: 'comfortable' },
    { id: 'spacious', label: 'Spacious', value: 'spacious' },
  ];

  protected getLabel(variant: Variant): string {
    return `${variant[0].toUpperCase()}${variant.slice(1)} outline`;
  }
}
