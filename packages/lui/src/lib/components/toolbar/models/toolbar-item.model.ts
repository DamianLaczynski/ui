import { IconName } from '../../icon';
import { Appearance, Variant } from '../../utils';
import { MenuItem } from '../../menu';

export interface ToolbarItem {
  id: string;
  label?: string;
  icon?: IconName;
  iconTheme?: 'regular' | 'filled';
  disabled?: boolean;
  selected?: boolean;
  type?: 'button' | 'divider' | 'toggle' | 'custom' | 'split';
  variant?: Variant;
  appearance?: Appearance;
  action?: () => void;
  tooltip?: string;
  ariaLabel?: string;
  menuItems?: MenuItem[]; // For split button type
}

export interface ToolbarGroup {
  id: string;
  items: ToolbarItem[];
}
