import { TemplateRef } from '@angular/core';

import { Size, Variant, Appearance } from '../../utils';

export type ToastPosition =
  'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface ToastMessage {
  title: string;
  message: string;
  duration?: number;
  sticky?: boolean;
  id?: string;
  variant?: Variant;
  appearance?: Appearance;
  size?: Size;
  showIcon?: boolean;
  dismissible?: boolean;
  showProgress?: boolean;
  contentTemplate?: TemplateRef<unknown>;
}
