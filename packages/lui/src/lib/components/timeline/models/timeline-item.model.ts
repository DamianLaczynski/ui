import { IconName } from '../../icon';
import type { Variant } from '../../utils';

export interface TimelineItem {
  id: string;
  title: string;
  timestamp?: string;
  description?: string;
  meta?: string;
  icon?: IconName;
  variant?: Variant;
  pending?: boolean;
}
