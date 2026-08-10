import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { provideUiI18n, UI_TRANSLATE_FN, UiI18nConfig } from '../../src/lib/i18n/ui-i18n.tokens';
import { UiI18nService } from '../../src/lib/i18n/ui-i18n.service';

export function provideUiI18nWithNgxTranslate(
  config: Partial<UiI18nConfig> = {},
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideUiI18n(config),
    {
      provide: UI_TRANSLATE_FN,
      deps: [TranslateService],
      useFactory: (translate: TranslateService) => {
        return (key: string, params?: Record<string, unknown>) => {
          return translate.instant(key, params);
        };
      },
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
        const translate = inject(TranslateService);
        const uiI18n = inject(UiI18nService);
        translate.onLangChange.subscribe(() => uiI18n.notifyLanguageChanged());
      },
    },
  ]);
}
