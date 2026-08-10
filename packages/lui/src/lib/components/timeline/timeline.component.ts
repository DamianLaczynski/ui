import { Component, computed, inject, input, ChangeDetectionStrategy } from '@angular/core';

import { UiI18nService } from '../../i18n';
import { Orientation, Size } from '../utils';
import { TimelineItem } from './models/timeline-item.model';
import { TimelineItemComponent } from './timeline-item.component';

@Component({
  selector: 'ui-timeline',
  templateUrl: './timeline.component.html',
  imports: [TimelineItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'timeline-host',
    '[class.timeline-host--reverse]': 'reverse()',
    role: 'list',
    '[attr.aria-label]': 'effectiveAriaLabel()',
  },
})
export class TimelineComponent {
  private readonly i18n = inject(UiI18nService);

  items = input<TimelineItem[]>([]);
  orientation = input<Orientation>('vertical');
  size = input<Size>('medium');
  reverse = input(false);
  ariaLabel = input<string>('');

  private readonly defaultAriaLabel = this.i18n.tSignal('timeline.ariaLabel', 'Timeline');

  effectiveAriaLabel = computed(() => this.ariaLabel() || this.defaultAriaLabel());

  displayItems = computed(() => {
    const items = this.items();
    return this.reverse() ? [...items].reverse() : items;
  });

  useProjectedItems = computed(() => this.items().length === 0);

  timelineClasses = computed(() =>
    [
      'timeline',
      `timeline--${this.orientation()}`,
      `timeline--${this.size()}`,
      this.reverse() ? 'timeline--reverse' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  trackById(_index: number, item: TimelineItem): string {
    return item.id;
  }
}
