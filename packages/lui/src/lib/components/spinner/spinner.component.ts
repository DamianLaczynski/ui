import { Component, input, computed, ChangeDetectionStrategy, inject } from '@angular/core';

import { Variant, ExtendedSize, ContentPosition } from '../utils';
import { UiI18nService } from '../../i18n';

@Component({
  selector: 'ui-spinner',
  templateUrl: './spinner.component.html',
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  //Service
  private readonly i18n = inject(UiI18nService);

  //Translations
  private readonly loadingAriaLabel = this.i18n.tSignal('spinner.loadingAriaLabel', 'Loading');

  //Inputs
  variant = input<Variant>('primary');
  size = input<ExtendedSize>('medium');
  labelPosition = input<ContentPosition>('none');
  label = input<string>('');
  ariaLabel = input<string>('');

  //Computed
  spinnerClasses = computed(() => {
    const classes = [];

    classes.push('spinner');
    classes.push(`spinner--${this.variant()}`);
    classes.push(`spinner--${this.size()}`);

    if (this.labelPosition() !== 'none') {
      classes.push(`spinner--label-${this.labelPosition()}`);
    }
    return classes.join(' ');
  });

  labelClasses = computed(() => {
    const sizeClass = ['extra-small', 'small'].includes(this.size()) ? 'small' : 'medium';
    return `spinner__label spinner__label--${sizeClass}`;
  });

  hasLabel = computed(() => this.labelPosition() !== 'none' && this.label().length > 0);

  effectiveAriaLabel = computed(() => {
    const explicitLabel = this.ariaLabel().trim();
    if (explicitLabel) {
      return explicitLabel;
    }
    return this.loadingAriaLabel();
  });
}
