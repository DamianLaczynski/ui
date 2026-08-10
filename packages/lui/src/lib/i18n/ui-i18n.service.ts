import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { UI_I18N_CONFIG, UI_TRANSLATE_FN } from './ui-i18n.tokens';

@Injectable({ providedIn: 'root' })
export class UiI18nService {
  private readonly config = inject(UI_I18N_CONFIG);
  private readonly translateFn = inject(UI_TRANSLATE_FN);
  private readonly translationVersion = signal(0);

  t(key: string, fallback: string, params?: Record<string, unknown>): string {
    if (!this.config.enabled || !this.translateFn) {
      return fallback;
    }

    const fullKey = this.config.prefix ? `${this.config.prefix}.${key}` : key;
    const translated = this.translateFn(fullKey, params);

    if (!translated || translated === fullKey) {
      return fallback;
    }

    return translated;
  }

  tSignal(
    key: string,
    fallback: string | (() => string),
    params?: Record<string, unknown> | (() => Record<string, unknown> | undefined),
  ): Signal<string> {
    return computed(() => {
      this.translationVersion();
      const resolvedFallback = typeof fallback === 'function' ? fallback() : fallback;
      const resolvedParams = typeof params === 'function' ? params() : params;
      return this.t(key, resolvedFallback, resolvedParams);
    });
  }

  notifyLanguageChanged(): void {
    this.translationVersion.update(value => value + 1);
  }

  languageVersion(): Signal<number> {
    return this.translationVersion;
  }
}
