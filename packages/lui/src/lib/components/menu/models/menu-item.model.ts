import { IconName } from '../../icon';
import type { Appearance, Variant } from '../../utils';

export type MenuItemType = 'button' | 'menu' | 'split' | 'header' | 'divider';

export interface MenuItem {
  id: string;
  type?: MenuItemType;
  label: string;
  icon?: IconName;
  variant?: Variant;
  appearance?: Appearance;
  shortcut?: string;
  disabled?: boolean;
  selected?: boolean;
  checked?: boolean;
  hasSubmenu?: boolean;
  submenuItems?: MenuItem[]; // Nested submenu items
  action?: () => void;
  submenuAction?: () => void;
}

export interface MenuSection {
  header?: string;
  items: MenuItem[];
  divider?: boolean;
}
