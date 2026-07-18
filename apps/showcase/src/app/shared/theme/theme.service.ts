import { Injectable, signal } from '@angular/core';

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

export enum ThemeVariant {
  Fluent = 'fluent',
  Ocean = 'ocean',
  Forest = 'forest',
  Sunset = 'sunset',
  Aurora = 'aurora',
  Royal = 'royal',
  Graphite = 'graphite',
  Bootstrap = 'bootstrap',
  Material = 'material',
  Ant = 'ant',
}

export interface ThemeVariantOption {
  id: ThemeVariant;
  label: string;
  previewPrimary: string;
  previewSecondary: string;
}

const THEME_KEY = 'theme';
const THEME_VARIANT_KEY = 'theme-variant';
const THEME_VARIANTS: ThemeVariantOption[] = [
  {
    id: ThemeVariant.Fluent,
    label: 'Core',
    previewPrimary: '#0078d4',
    previewSecondary: '#106ebe',
  },
  {
    id: ThemeVariant.Ocean,
    label: 'Ocean',
    previewPrimary: '#0a84ff',
    previewSecondary: '#18b4c7',
  },
  {
    id: ThemeVariant.Forest,
    label: 'Forest',
    previewPrimary: '#2f855a',
    previewSecondary: '#86efac',
  },
  {
    id: ThemeVariant.Sunset,
    label: 'Sunset',
    previewPrimary: '#f97316',
    previewSecondary: '#ef4444',
  },
  {
    id: ThemeVariant.Aurora,
    label: 'Aurora',
    previewPrimary: '#0ea5e9',
    previewSecondary: '#ec4899',
  },
  {
    id: ThemeVariant.Royal,
    label: 'Royal',
    previewPrimary: '#4f46e5',
    previewSecondary: '#38bdf8',
  },
  {
    id: ThemeVariant.Graphite,
    label: 'Graphite',
    previewPrimary: '#525252',
    previewSecondary: '#a3e635',
  },
  {
    id: ThemeVariant.Bootstrap,
    label: 'Bootstrap',
    previewPrimary: '#0d6efd',
    previewSecondary: '#6f42c1',
  },
  {
    id: ThemeVariant.Material,
    label: 'Material',
    previewPrimary: '#6750a4',
    previewSecondary: '#03dac6',
  },
  {
    id: ThemeVariant.Ant,
    label: 'Ant Design',
    previewPrimary: '#1677ff',
    previewSecondary: '#13c2c2',
  },
];

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  /**
   * Signal that tracks the current theme mode
   * @private
   */
  private _themeMode = signal<ThemeMode>(this.getInitialThemeMode());
  private _themeVariant = signal<ThemeVariant>(this.getInitialThemeVariant());

  /**
   * Signal accessor for the current theme
   */
  $themeMode = this._themeMode.asReadonly();
  $themeVariant = this._themeVariant.asReadonly();

  readonly themeVariants: ThemeVariantOption[] = THEME_VARIANTS;

  /**
   * Initializes the layout service and applies the initial theme
   */
  constructor() {
    this.applyTheme(this._themeMode());
    this.applyThemeVariant(this._themeVariant());
  }

  /**
   * Toggles between light and dark theme
   */
  toggleTheme(): void {
    const newTheme = this._themeMode() === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
    this._themeMode.set(newTheme);
    this.saveThemePreference(newTheme);
    this.applyTheme(newTheme);
  }

  setThemeVariant(variant: ThemeVariant): void {
    this._themeVariant.set(variant);
    if (variant === ThemeVariant.Fluent) {
      localStorage.removeItem(THEME_VARIANT_KEY);
    } else {
      localStorage.setItem(THEME_VARIANT_KEY, variant);
    }
    this.applyThemeVariant(variant);
  }

  /**
   * Determines the initial theme mode based on saved preference or system preference
   * @returns The initial theme mode to use
   * @private
   */
  private getInitialThemeMode(): ThemeMode {
    const savedTheme = localStorage.getItem(THEME_KEY) as ThemeMode;
    if (savedTheme) {
      return savedTheme;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return ThemeMode.Dark;
    }

    return ThemeMode.Light;
  }

  private getInitialThemeVariant(): ThemeVariant {
    const savedVariant = localStorage.getItem(THEME_VARIANT_KEY) as ThemeVariant | null;
    const isSavedVariantSupported = THEME_VARIANTS.some(variant => variant.id === savedVariant);

    if (savedVariant && isSavedVariantSupported) {
      return savedVariant;
    }

    return ThemeVariant.Fluent;
  }

  /**
   * Saves the theme preference to localStorage
   * @param mode The theme mode to save
   * @private
   */
  private saveThemePreference(mode: ThemeMode): void {
    localStorage.setItem(THEME_KEY, mode);
  }

  /**
   * Applies the theme to the document by setting CSS classes and attributes
   * @param mode The theme mode to apply
   * @private
   */
  private applyTheme(mode: ThemeMode): void {
    document.documentElement.setAttribute('data-theme', mode);

    if (mode === ThemeMode.Dark) {
      document.documentElement.classList.add(ThemeMode.Dark);
    } else {
      document.documentElement.classList.remove(ThemeMode.Dark);
    }
  }

  private applyThemeVariant(variant: ThemeVariant): void {
    if (variant === ThemeVariant.Fluent) {
      document.documentElement.removeAttribute('data-theme-variant');
      return;
    }

    document.documentElement.setAttribute('data-theme-variant', variant);
  }
}
