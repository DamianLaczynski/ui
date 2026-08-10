import { Component, input, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shape } from '../utils';
import { UiI18nService } from '../../i18n';

@Component({
  selector: 'ui-skeleton',
  templateUrl: './skeleton.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {
  //Service
  private readonly i18n = inject(UiI18nService);

  //Translations
  private readonly loadingAriaLabel = this.i18n.tSignal(
    'skeleton.loadingAriaLabel',
    'Loading content',
  );

  //Inputs
  shape = input<Shape>('rounded');
  animated = input<boolean>(true);
  width = input<string>('100%');
  height = input<string>('20px');
  borderRadius = input<string>('');
  ariaLabel = input<string>('');

  //Computed
  skeletonClasses = computed(() => {
    const classes = ['skeleton', `skeleton--${this.shape()}`];
    if (this.animated()) classes.push('skeleton--animated');
    return classes.join(' ');
  });

  skeletonStyles = computed(() => {
    const styles: Record<string, string> = {
      width: this.width(),
      height: this.height(),
    };

    if (this.borderRadius()) {
      styles['border-radius'] = this.borderRadius();
    } else if (this.shape() === 'circular') {
      styles['border-radius'] = '9999px';
    } else if (this.shape() === 'square') {
      styles['border-radius'] = '0';
    }

    return styles;
  });

  effectiveAriaLabel = computed(() => {
    const explicitLabel = this.ariaLabel().trim();
    if (explicitLabel) {
      return explicitLabel;
    }
    return this.loadingAriaLabel();
  });
}
