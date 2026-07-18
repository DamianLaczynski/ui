# L2 — Quality

> How good components must be — accessibility, internationalization, theming.

| ID | Document | Scope |
| -- | -------- | ----- |
| NFR-A11Y-001 | [accessibility.md](accessibility.md) | Keyboard, focus, labels, ARIA |
| NFR-I18N-001 | [internationalization.md](internationalization.md) | Translation tokens and copy |
| NFR-THM-001 | [theming.md](theming.md) | Light/dark themes, CSS variables |

## Agent load order

1. Relevant `docs/standards/` doc (L1) for the component being changed
2. This folder (L2) when accessibility, i18n, or theming applies
3. `docs/guides/` (L3) for implementation patterns
