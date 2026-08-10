import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

export interface UiI18nConfig {
  enabled: boolean;
  prefix: string;
}

export type UiTranslateFn = (key: string, params?: Record<string, unknown>) => string | undefined;

export const UI_I18N_CONFIG = new InjectionToken<UiI18nConfig>('UI_I18N_CONFIG', {
  providedIn: 'root',
  factory: () => ({
    enabled: false,
    prefix: 'ui',
  }),
});

export const UI_TRANSLATE_FN = new InjectionToken<UiTranslateFn | null>('UI_TRANSLATE_FN', {
  providedIn: 'root',
  factory: () => null,
});

export function provideUiI18n(config: Partial<UiI18nConfig> = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: UI_I18N_CONFIG,
      useValue: {
        enabled: true,
        prefix: 'ui',
        ...config,
      } satisfies UiI18nConfig,
    },
  ]);
}
