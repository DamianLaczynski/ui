import { Component, computed, forwardRef, signal, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldComponent } from '../field/field.component';
import { ActionButtonComponent } from '../action-button.component';

@Component({
  selector: 'ui-password',
  imports: [FieldComponent, ActionButtonComponent],
  templateUrl: './password.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
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
export class PasswordComponent extends FieldComponent {
  protected showPassword = signal<boolean>(false);
  protected inputType = computed(() => (this.showPassword() ? 'text' : 'password'));

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }
}
