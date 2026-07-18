---
id: NFR-I18N-001
title: Internationalization
type: quality
status: active
---

# Internationalization

## Library i18n support

The library provides translation helpers and tokens under `packages/ui/src/lib/i18n/`. Consumer applications load translations via `@ngx-translate/core`.

Showcase guide: [i18n page](https://ui.laczynski.dev/docs/i18n) (source: `apps/showcase/src/app/pages/docs/i18n/`).

## Default strings

- Components that ship default user-visible strings use i18n tokens, not hardcoded English in templates.
- Token keys follow the pattern `ui.<component>.<key>` (e.g. `ui.button.loading`).
- English is the canonical language for default translations.

## Writing rules for contributors

- When adding a new default string, add the corresponding translation token.
- Update showcase i18n examples if the integration pattern changes.
- Do not use locale placeholders in component APIs — expose the final English default or a token key.

## Consumer responsibility

Applications using `@laczynski/ui` are responsible for:

- Loading translation files for their supported locales
- Providing overrides for library default strings when needed
- RTL layout support (not currently provided by the library)

## Showcase translations

The showcase app demonstrates i18n with `public/i18n/en.json` and `public/i18n/pl.json`.
