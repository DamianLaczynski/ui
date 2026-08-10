import { Component, input, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Variant, Size } from '../utils';
import { UiI18nService } from '../../i18n';

export type ProgressBarType = 'determinate' | 'indeterminate';

@Component({
  selector: 'ui-progress-bar',
  templateUrl: './progress-bar.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  //Services
  private readonly i18n = inject(UiI18nService);

  //Inputs
  variant = input<Variant>('primary');
  size = input<Size>('medium');
  type = input<ProgressBarType>('determinate');
  value = input(0, {
    transform: (value: number | undefined) => (value ? Math.max(0, Math.min(value, 100)) : 0),
  });
  ariaLabel = input<string>('');
  ariaValueText = input<string>();

  //Computed
  progressBarClasses = computed(() =>
    [
      'progress-bar',
      `progress-bar--${this.type()}`,
      `progress-bar--${this.size()}`,
      `progress-bar--${this.variant()}`,
    ].join(' '),
  );
  trackClasses = computed(() =>
    [
      'progress-bar__track',
      this.type() === 'indeterminate' ? 'progress-bar__track--animated' : '',
    ].join(' '),
  );
  progressValue = computed(() => Math.max(0, Math.min(this.value(), 100)));
  trackStyle = computed(() =>
    this.type() === 'determinate' ? { width: `${this.progressValue()}%` } : {},
  );
  ariaValueNow = computed(() => (this.type() === 'determinate' ? this.progressValue() : undefined));
  ariaValueMin = computed(() => (this.type() === 'determinate' ? 0 : undefined));
  ariaValueMax = computed(() => (this.type() === 'determinate' ? 100 : undefined));
  computedAriaLabel = computed(
    () => this.ariaLabel().trim() || this.i18n.t('progressBar.ariaLabel', 'Progress'),
  );
}
