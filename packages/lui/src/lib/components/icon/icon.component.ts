import {
  ChangeDetectionStrategy,
  Component,
  LOCALE_ID,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { DOCUMENT, getLocaleDirection } from '@angular/common';
import { Size } from '../utils';
import { IconName } from './generated/icon-name.type';
import { UiI18nService } from '../../i18n';
import {
  ICON_SPRITE_AVAILABLE_SIZES,
  ICON_SPRITE_DIRECTIONAL_ICON_NAMES,
  ICON_SPRITE_ICON_NAMES,
  ICON_SPRITE_LOCALE_FOLDERS,
  ICON_SPRITE_SYMBOLS,
  ICON_SPRITE_URL,
} from './generated/icon-sprite-manifest';

@Component({
  selector: 'ui-icon',
  template: `
    @if (icon()) {
      <svg
        [attr.width]="displaySize() + 'px'"
        [attr.height]="displaySize() + 'px'"
        [attr.fill]="'currentColor'"
        [attr.role]="ariaLabel() ? 'img' : null"
        [attr.aria-label]="ariaLabel() || null"
        [attr.aria-hidden]="ariaLabel() ? null : 'true'"
        [style.transform]="rotationTransform()"
        [style.transform-origin]="'center'"
        [style.transform-box]="'fill-box'"
      >
        @if (resolvedSpriteHref()) {
          <use
            [attr.href]="resolvedSpriteHref()"
            [attr.xlink:href]="resolvedSpriteHref()"
            [attr.fill]="'currentColor'"
          ></use>
        }
      </svg>
    }
  `,
  styles: [
    `
      :host {
        width: min-content;
        height: min-content;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  private readonly rtlLanguageCodes = new Set([
    'ar',
    'dv',
    'fa',
    'ha',
    'he',
    'iw',
    'ji',
    'ps',
    'sd',
    'ug',
    'ur',
    'yi',
  ]);

  icon = input<IconName, IconName | undefined>('' as IconName, {
    transform: (value: IconName | undefined) => value ?? ('' as IconName),
  });
  size = input<Size, Size | undefined>('medium', {
    transform: (value: Size | undefined) => value ?? 'medium',
  });
  sizePx = input<number | undefined>(undefined);
  variant = input<'regular' | 'filled'>('regular');
  rotate = input<number | undefined>(undefined);
  ariaLabel = input<string | undefined>(undefined);
  direction = input<'ltr' | 'rtl' | undefined>(undefined);
  locale = input<string | undefined>(undefined);

  private readonly document = inject(DOCUMENT);
  private readonly i18n = inject(UiI18nService);
  private readonly localeId = inject(LOCALE_ID, { optional: true }) ?? 'en-US';
  private readonly resolvedSpriteUrl = new URL(ICON_SPRITE_URL, this.document.baseURI).toString();
  private lastMissingIconLogKey = '';

  displaySize = computed(() => this.sizePx() ?? this.getNumberSize());
  rotationTransform = computed(() => {
    const raw = this.rotate();
    if (raw === undefined || raw === null) {
      return null;
    }
    const degrees = Number(raw);
    if (!Number.isFinite(degrees)) {
      return null;
    }
    return `rotate(${degrees}deg)`;
  });
  private resolvedLocaleId = computed(() => this.locale()?.trim() || this.localeId);

  private localeDirection = computed<'ltr' | 'rtl'>(() => {
    const forcedDirection = this.direction();
    if (forcedDirection === 'ltr' || forcedDirection === 'rtl') {
      return forcedDirection;
    }

    const documentDirection = this.document.documentElement
      .getAttribute('dir')
      ?.toLowerCase()
      .trim();
    if (documentDirection === 'ltr' || documentDirection === 'rtl') {
      return documentDirection;
    }

    const resolvedLocale = this.resolvedLocaleId();
    const languageCode = resolvedLocale.toLowerCase().split(/[-_]/)[0] ?? '';
    try {
      const direction = getLocaleDirection(resolvedLocale);
      if (direction === 'rtl' || this.rtlLanguageCodes.has(languageCode)) {
        return 'rtl';
      }
      return 'ltr';
    } catch {
      return this.rtlLanguageCodes.has(languageCode) ? 'rtl' : 'ltr';
    }
  });

  private localeFolders = computed(() => {
    const normalized = this.resolvedLocaleId().toLowerCase().replaceAll('_', '-');
    if (!normalized) {
      return [] as string[];
    }

    const rawParts = normalized.split('-').filter(Boolean);
    const candidates = [
      normalized,
      rawParts.length >= 2 ? `${rawParts[0]}-${rawParts[1]}` : '',
      rawParts[0] ?? '',
    ].filter(Boolean);

    const uniqueCandidates = Array.from(new Set(candidates));
    return uniqueCandidates.filter(locale => ICON_SPRITE_LOCALE_FOLDERS[locale]);
  });

  private directionalIconName = computed(() => {
    const rawIcon = this.icon();
    if (!rawIcon) {
      return '';
    }

    if (rawIcon.endsWith('_ltr') || rawIcon.endsWith('_rtl')) {
      return '';
    }

    const direction = this.localeDirection();
    if (!ICON_SPRITE_DIRECTIONAL_ICON_NAMES[rawIcon]) {
      return '';
    }

    return `${rawIcon}_${direction}` as IconName;
  });

  private resolvedSymbolId = computed(() => {
    const icon = this.icon();
    if (!icon) return '';

    const requestedSize = this.sizePx() ?? this.getNumberSize();
    const sizeOrder = this.getSizeFallbackOrder(requestedSize);
    const variantOrder: Array<'regular' | 'filled'> =
      this.variant() === 'filled' ? ['filled', 'regular'] : ['regular', 'filled'];

    const localeFolders = this.localeFolders();
    const directionalIcon = this.directionalIconName();
    const iconNameVariants = directionalIcon ? [directionalIcon, icon] : [icon];

    if (!ICON_SPRITE_ICON_NAMES[icon]) {
      return '';
    }

    const hasSpriteSymbol = (symbolId: string): boolean => {
      if (!ICON_SPRITE_SYMBOLS[symbolId]) {
        return false;
      }
      return true;
    };

    for (const size of sizeOrder) {
      for (const variant of variantOrder) {
        const baseFileName = `${icon}_${size}_${variant}`;

        for (const locale of localeFolders) {
          const localeSymbolId = `locale-${locale}-${baseFileName}`;
          if (hasSpriteSymbol(localeSymbolId)) {
            return localeSymbolId;
          }
        }

        for (const iconVariantName of iconNameVariants) {
          const fileName = `${iconVariantName}_${size}_${variant}`;
          if (hasSpriteSymbol(fileName)) {
            return fileName;
          }
        }
      }
    }

    return '';
  });

  isSpriteMode = computed(() => !!this.resolvedSymbolId());

  resolvedSpriteHref = computed(() => {
    const symbolId = this.resolvedSymbolId();
    if (!symbolId) return '';
    return `${this.resolvedSpriteUrl}#${symbolId}`;
  });

  constructor() {
    effect(() => {
      const icon = this.icon();
      const symbolId = this.resolvedSymbolId();
      const missingKey = `${icon}|${this.variant()}|${this.size()}|${this.sizePx() ?? ''}|${this.direction() ?? ''}|${this.locale() ?? ''}`;

      if (!icon || symbolId || this.lastMissingIconLogKey === missingKey) {
        return;
      }

      this.lastMissingIconLogKey = missingKey;
      console.error(
        this.i18n.t(
          'icon.missingSpriteError',
          `[ui-icon] Missing symbol in sprite for icon "${icon}" (size="${this.size()}", sizePx="${this.sizePx() ?? ''}", variant="${this.variant()}", direction="${this.direction() ?? 'auto'}", locale="${this.locale() ?? 'auto'}").`,
          {
            icon,
            size: this.size(),
            sizePx: this.sizePx() ?? '',
            variant: this.variant(),
            direction: this.direction() ?? 'auto',
            locale: this.locale() ?? 'auto',
          },
        ),
      );
    });
  }

  private getSizeFallbackOrder(requestedSize: number): number[] {
    const availableSizes = ICON_SPRITE_AVAILABLE_SIZES.length
      ? ICON_SPRITE_AVAILABLE_SIZES
      : [16, 20, 24];
    const uniqueSizes = Array.from(new Set([requestedSize, ...availableSizes]));
    uniqueSizes.sort((a, b) => Math.abs(a - requestedSize) - Math.abs(b - requestedSize));
    return uniqueSizes;
  }

  getNumberSize(): number {
    switch (this.size()) {
      case 'small':
        return 16;
      case 'medium':
        return 20;
      case 'large':
        return 24;
      default:
        return 20; // Default to medium size
    }
  }
}
