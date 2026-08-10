import { GuideDocPageConfig } from '@shared/components/guide-doc-page/guide-doc-page.models';

const appConfigCode = `import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideUiI18nWithNgxTranslate } from 'lui/ngx-translate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
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
  ],
};`;

const translationJsonCode = `{
  "ui": {
    "field": {
      "file": {
        "uploadText": "Click to upload or drag and drop",
        "singleFileHint": "Single file only",
        "multipleFilesHint": "Multiple files allowed",
        "filesSelected": "{{count}} files selected",
        "clearFilesAriaLabel": "Clear files",
        "removeFileAriaLabel": "Remove {{name}}"
      }
    }
  }
}`;

const customAdapterCode = `import { makeEnvironmentProviders } from '@angular/core';
import { provideUiI18n, UI_TRANSLATE_FN } from 'lui';
import { MyTranslationService } from './my-translation.service';

export function provideUiI18nWithCustomService() {
  return makeEnvironmentProviders([
    provideUiI18n({ prefix: 'ui' }),
    {
      provide: UI_TRANSLATE_FN,
      deps: [MyTranslationService],
      useFactory: (service: MyTranslationService) => {
        return (key: string, params?: Record<string, unknown>) =>
          service.translateInstant(key, params);
      },
    },
  ]);
}`;

export const I18N_PAGE_CONFIG: GuideDocPageConfig = {
  title: 'i18n Integration',
  description:
    'How to configure translations for `ui` with the dedicated `ui/ngx-translate` adapter and how to wire your own translation runtime.',
  containerClass: 'i18n-doc',
  markdownAssetPath: '/docs/i18n.md',
  sections: [
    {
      id: 'setup-with-ngx-translate',
      title: 'Setup with ngx-translate',
      blocks: [
        {
          type: 'note',
          content:
            'This is the recommended setup when your host app already uses `@ngx-translate/core`.',
        },
        {
          type: 'code',
          code: appConfigCode,
        },
      ],
    },
    {
      id: 'translation-keys-structure',
      title: 'Translation keys structure',
      blocks: [
        {
          type: 'note',
          content:
            'Keep keys under `ui.*` (or your configured prefix), so components can resolve defaults consistently.',
        },
        {
          type: 'code',
          code: translationJsonCode,
        },
      ],
    },
    {
      id: 'use-without-ngx-translate',
      title: 'Use without ngx-translate',
      blocks: [
        {
          type: 'note',
          content:
            'The library core is translation-runtime agnostic. You can plug your own service via `UI_TRANSLATE_FN`.',
        },
        {
          type: 'code',
          code: customAdapterCode,
        },
      ],
    },
    {
      id: 'production-checklist',
      title: 'Production checklist',
      blocks: [
        {
          type: 'list',
          items: [
            "Use 'ui/ngx-translate' import for ngx adapter.",
            "Keep your keys under the configured prefix (default: 'ui').",
            'Provide explicit label/ariaLabel for business-specific wording.',
            'Use component inputs like uploadText/uploadHint when you want local override.',
            'Verify language switch in runtime (EN <-> PL) on at least one form page.',
          ],
        },
      ],
    },
    {
      id: 'related-pages',
      title: 'Related pages',
      blocks: [
        {
          type: 'links',
          links: [
            {
              id: 'getting-started',
              title: 'Getting Started',
              description: 'Project bootstrap and first component setup.',
              routerLink: '/docs/getting-started',
            },
            {
              id: 'installation',
              title: 'Installation',
              description: 'Environment requirements and package setup.',
              routerLink: '/docs/installation',
            },
          ],
        },
      ],
    },
  ],
};
