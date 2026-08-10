import { ApplicationConfig, LOCALE_ID, inject, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideUiI18nWithNgxTranslate } from 'lui/ngx-translate';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';

registerLocaleData(localeEn);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withXhr()),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
    }),
    provideUiI18nWithNgxTranslate({ prefix: 'ui' }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      return firstValueFrom(translate.use('en'));
    }),
    { provide: LOCALE_ID, useValue: 'en' },
  ],
};
