import { IconName } from './icon';

// =============================================================================
// UNIFIED DESIGN SYSTEM TYPES
// =============================================================================

// Variant - semantic color of the component
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

// Appearance - visual style/fill of the component
export type Appearance = 'filled' | 'tint' | 'outline' | 'subtle' | 'transparent';

// Shape - border radius style
export type Shape = 'rounded' | 'circular' | 'square';

// Size - component size
export type Size = 'small' | 'medium' | 'large';

// Extended Size - for components needing more granularity
export type ExtendedSize = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';

// Orientation - layout direction
export type Orientation = 'horizontal' | 'vertical';

// Segment layout - grouped (segmented) vs spaced (separate) buttons
export type SegmentLayout = 'segmented' | 'separate';

// Content Position - position of labels, icons relative to content
export type ContentPosition = 'before' | 'after' | 'above' | 'below' | 'none';

// Anchor Position - corner placement for overlays such as badges on buttons
export type AnchorPosition = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

// Alignment - for dividers, text alignment
export type Alignment = 'start' | 'center' | 'end';

// Chevron Position - position of the chevron icon
export type ChevronPosition = 'before' | 'after';

// Input Variant - variant of the input field
export type InputVariant = 'filled' | 'filled-gray' | 'filled-lighter' | 'underlined';

export type ButtonType = 'button' | 'submit' | 'reset';

// =============================================================================
// INTERFACES
// =============================================================================

export interface QuickAction {
  label: string;
  variant?: Variant;
  appearance?: Appearance;
  size?: Size;
  shape?: Shape;
  icon?: IconName;
  disabled?: boolean;
  action: () => void;
}
