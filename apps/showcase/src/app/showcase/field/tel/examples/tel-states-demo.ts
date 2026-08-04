import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TelComponent } from 'ui';

@Component({
  selector: 'app-tel-states-demo',
  standalone: true,
  imports: [FormsModule, TelComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-tel
          label="Readonly emergency contact"
          [readonly]="true"
          [(ngModel)]="readonlyNumber"
          [ngModelOptions]="{ standalone: true }"
          helpText="Useful when the user can see the number but not edit it here."
        />
      </div>

      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-tel
          label="Disabled hotline"
          [disabled]="true"
          placeholder="+1 (555) 000-0000"
          helpText="Disabled removes interaction entirely."
        />
      </div>

      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-tel
          label="Inline format check"
          [(ngModel)]="draftNumber"
          [ngModelOptions]="{ standalone: true }"
          [errorText]="draftError"
          helpText="Example: +48 600 700 800"
        />
      </div>
    </div>
  `,
})
export class TelStatesDemoComponent {
  protected readonlyNumber = '+1 (555) 830-2040';
  protected draftNumber = '12';

  protected get draftError(): string {
    const normalized = this.draftNumber.replace(/[^\d+]/g, '');
    if (!normalized.length) {
      return '';
    }
    return normalized.length < 7 ? 'Enter a longer phone number.' : '';
  }
}
