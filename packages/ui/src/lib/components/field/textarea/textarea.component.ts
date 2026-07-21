import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldComponent } from '../field/field.component';

export type TextareaResize = 'none' | 'both' | 'horizontal' | 'vertical';

@Component({
  selector: 'ui-textarea',
  imports: [FieldComponent],
  templateUrl: './textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  host: {
    class: 'ui-textarea',
    '[class.ui-textarea--resizable-inline]': 'resize() === "horizontal" || resize() === "both"',
  },
  styles: [
    `
      :host {
        width: 100%;
      }

      :host(.ui-textarea--resizable-inline) {
        width: fit-content;
        max-width: 100%;
      }
    `,
  ],
})
export class TextareaComponent extends FieldComponent {
  rows = input<number>(4);
  cols = input<number | null>(null);
  resize = input<TextareaResize>('none');

  get textareaWrapperClasses(): string {
    const resize = this.resize();
    const resizeClass =
      resize === 'none' ? 'input-wrapper--resize-none' : `input-wrapper--resize-${resize}`;

    return `input-wrapper--textarea ${this.wrapperClasses} ${resizeClass}`;
  }
}
