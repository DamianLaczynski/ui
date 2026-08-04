import { Component, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldComponent } from '../field/field.component';
import { ActionButtonComponent } from '../action-button.component';

@Component({
  selector: 'ui-search',
  imports: [FieldComponent, ActionButtonComponent],
  templateUrl: './search.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
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
export class SearchComponent extends FieldComponent {}
