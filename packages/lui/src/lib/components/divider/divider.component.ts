import { Component, input, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { Alignment, Orientation } from '../utils';
import { UiI18nService } from '../../i18n';

@Component({
  selector: 'ui-divider',
  templateUrl: './divider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
  //Services
  private readonly i18n = inject(UiI18nService);

  //Inputs
  orientation = input<Orientation>('horizontal');
  alignment = input<Alignment>('center');
  text = input<string>('');
  ariaLabel = input<string>('');

  //Computed
  dividerClasses = computed(() =>
    [
      'divider',
      `divider--${this.orientation()}`,
      `divider--${this.alignment()}`,
      this.hasText() ? 'divider--with-text' : '',
    ].join(' '),
  );
  hasText = computed(() => this.text() !== '');
  ariaLabelComputed = computed(
    () =>
      this.ariaLabel() ||
      (this.hasText() ? this.text() : this.i18n.t('divider.ariaLabel', 'Divider')),
  );
}
