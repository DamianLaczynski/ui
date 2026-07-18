import { Component, computed, input, ChangeDetectionStrategy } from '@angular/core';

import { IconComponent, IconName } from '../icon';
import { Size, Variant } from '../utils';

@Component({
  selector: 'ui-timeline-item',
  templateUrl: './timeline-item.component.html',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'timeline-item-host',
    '[class.timeline-item-host--pending]': 'pending()',
    role: 'listitem',
  },
})
export class TimelineItemComponent {
  title = input.required<string>();
  timestamp = input<string>('');
  description = input<string>('');
  meta = input<string>('');
  icon = input<IconName | undefined>(undefined);
  variant = input<Variant>('secondary');
  pending = input(false);
  size = input<Size>('medium');

  itemClasses = computed(() => {
    const classes = [
      'timeline-item',
      `timeline-item--${this.variant()}`,
      `timeline-item--${this.size()}`,
    ];

    if (this.pending()) {
      classes.push('timeline-item--pending');
    }

    if (this.icon()) {
      classes.push('timeline-item--with-icon');
    }

    return classes.join(' ');
  });
}
