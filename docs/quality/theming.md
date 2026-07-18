---
id: NFR-THM-001
title: Theming
type: quality
status: active
---

# Theming

## Design language

The library implements the [Fluent 2](https://fluent2.microsoft.design/) design language. Visual tokens are defined in SCSS and exposed as CSS custom properties.

## Theme modes

- **Light** — default theme
- **Dark** — activated via a `data-theme="dark"` attribute or equivalent class on a root element

Both themes must render correctly for every component. Review changes in the showcase theme switcher.

## CSS architecture

| Layer | Location |
| ----- | -------- |
| Variables | `packages/ui/src/lib/scss/utils/_variables.scss` |
| Theme overrides | `packages/ui/src/lib/scss/utils/` (theme-specific files) |
| Component blocks | `packages/ui/src/lib/scss/components/_*.scss` |

Components use BEM modifiers for variants, appearances, sizes, and states:

```scss
.ui-button--primary.ui-button--filled.ui-button--medium { ... }
```

## Rules for contributors

- Add new colors as theme tokens in `_variables.scss` — not as inline hex in component SCSS.
- Test both light and dark themes before merging visual changes.
- Use semantic token names (`--color-brand-primary`) not raw color names (`--blue-500`).
- Fluent icon colors inherit from the component's current color context.

## Consumer setup

Consumers import the library styles:

```scss
@use '@laczynski/ui/scss/main';
```

Theme switching is the consumer's responsibility — the library provides the token system and both theme variants.
