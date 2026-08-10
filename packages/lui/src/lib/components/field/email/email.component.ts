import { Component, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldComponent } from '../field/field.component';
import { ActionButtonComponent } from '../action-button.component';

@Component({
  selector: 'ui-email',
  imports: [FieldComponent, ActionButtonComponent],
  templateUrl: './email.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class EmailComponent extends FieldComponent {
  override onFocus(event: FocusEvent): void {
    super.onFocus(event);

    const target = event.target;
    if (target instanceof HTMLInputElement && target.type === 'email' && target.value.length > 0) {
      target.select();
    }
  }
}
