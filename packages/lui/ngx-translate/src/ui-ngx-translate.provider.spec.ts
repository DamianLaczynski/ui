/// <reference types="vitest/globals" />
import { TestBed } from '@angular/core/testing';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { UiI18nService } from '../../src/lib/i18n/ui-i18n.service';
import { UI_TRANSLATE_FN } from '../../src/lib/i18n/ui-i18n.tokens';
import { provideUiI18nWithNgxTranslate } from './ui-ngx-translate.provider';

class MockTranslateService {
  private lang = 'en';
  readonly onLangChange = new Subject<LangChangeEvent>();

  instant(key: string, params?: Record<string, unknown>): string {
    if (key === 'ui.field.file.uploadText') {
      return this.lang === 'pl'
        ? 'Kliknij, aby przeslac lub przeciagnij i upusc'
        : 'Click to upload or drag and drop';
    }

    if (key === 'ui.field.file.filesSelected') {
      return `${params?.['count'] ?? 0} files selected`;
    }

    return key;
  }

  useLang(lang: string): void {
    this.lang = lang;
    this.onLangChange.next({ lang, translations: {} as any });
  }
}

describe('provideUiI18nWithNgxTranslate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useClass: MockTranslateService },
        provideUiI18nWithNgxTranslate({ prefix: 'ui' }),
      ],
    });
  });

  it('should provide UI_TRANSLATE_FN using ngx TranslateService.instant', () => {
    const translateFn = TestBed.inject(UI_TRANSLATE_FN);
    expect(translateFn).toBeTypeOf('function');
    expect(translateFn?.('ui.field.file.uploadText')).toBe('Click to upload or drag and drop');
  });

  it('should update tSignal values after language change', () => {
    const i18n = TestBed.inject(UiI18nService);
    const translate = TestBed.inject(TranslateService) as unknown as MockTranslateService;
    const text = i18n.tSignal('field.file.uploadText', 'fallback');

    expect(text()).toBe('Click to upload or drag and drop');

    translate.useLang('pl');

    expect(text()).toBe('Kliknij, aby przeslac lub przeciagnij i upusc');
  });

  it('should return fallback for missing key', () => {
    const i18n = TestBed.inject(UiI18nService);
    const text = i18n.tSignal('field.file.unknownKey', 'Fallback text');

    expect(text()).toBe('Fallback text');
  });
});
