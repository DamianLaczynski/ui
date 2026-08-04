import { Component, computed, inject, input, ChangeDetectionStrategy } from '@angular/core';

import { Size } from '../utils';
import { UiI18nService } from '../../i18n';

@Component({
  selector: 'ui-kbd',
  standalone: true,
  imports: [],
  templateUrl: './kbd.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      :host {
        display: inline-flex;
        vertical-align: middle;
        line-height: 0;
      }
    `,
  ],
})
export class KbdComponent {
  private readonly i18n = inject(UiI18nService);

  text = input<string | undefined>(undefined);
  keys = input<string[]>([]);
  separator = input<string>('+');
  size = input<Size>('medium');
  appearance = input<'default' | 'filled'>('default');
  ariaLabel = input<string | undefined>(undefined);

  isSequence = computed(() => this.keys().length > 0);

  ariaLabelText = computed(() => {
    const customLabel = this.ariaLabel()?.trim();
    if (customLabel) {
      return customLabel;
    }

    if (this.isSequence()) {
      const shortcut = this.keys().join(` ${this.separator()} `);
      return this.i18n.t('kbd.sequenceAriaLabel', `Keyboard shortcut: ${shortcut}`, {
        shortcut,
      });
    }

    return this.i18n.t('kbd.ariaLabel', `Keyboard key: ${this.text() ?? ''}`, {
      text: this.text() ?? '',
    });
  });

  kbdClasses = computed(() =>
    ['kbd', `kbd--${this.size()}`, `kbd--${this.appearance()}`].join(' '),
  );

  sequenceClasses = computed(() => ['kbd-sequence', `kbd-sequence--${this.size()}`].join(' '));
}
