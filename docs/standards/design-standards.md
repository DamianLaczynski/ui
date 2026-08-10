---
id: STD-VIS
title: Design Standards
type: standards
status: active
---

# Design standards

> **Layer L1 — Standards.** Default visual rules for components. Showcase docs and component APIs define overrides.

Inspired by the visual principles of Microsoft's [Fluent 2](https://fluent2.microsoft.design/) design language. This library is not an official Microsoft product. Shared types live in `packages/lui/src/lib/components/utils.ts`.

---

## STD-VIS-001 — Variants and appearances

Components that support semantic color use `Variant`:

| Variant | Use for |
| ------- | ------- |
| `primary` | Main call to action, highest emphasis |
| `secondary` | Default actions, neutral emphasis |
| `success` | Positive confirmation, completed state |
| `warning` | Caution, reversible risk |
| `danger` | Destructive or irreversible actions |
| `info` | Informational emphasis |

Components that support surface style use `Appearance`:

| Appearance | Use for |
| ---------- | ------- |
| `filled` | Default — solid background, highest contrast |
| `tint` | Soft tinted background, medium emphasis |
| `outline` | Border only, lower emphasis |
| `subtle` | Minimal background, lowest emphasis within a group |
| `transparent` | No background, blends with surface |

**Rules:**

- Default to `variant: 'secondary'` and `appearance: 'filled'` unless the component role demands otherwise.
- Use `primary` + `filled` for the single most important action on a surface.
- Use at most one `primary` action per visible surface (card, dialog, toolbar section).
- Pair `danger` variant with confirmation patterns for destructive actions (see STD-BHV-004).
- Do not mix custom hex colors — use theme tokens from SCSS variables.

---

## STD-VIS-002 — Sizes and shapes

### Sizes

| Size | Use for |
| ---- | ------- |
| `small` | Dense layouts — tables, toolbars, inline actions |
| `medium` | Default — most UI surfaces |
| `large` | Hero actions, empty states, prominent CTAs |

Some components support `ExtendedSize` (`extra-small` through `extra-large`) when finer granularity is needed.

**Rules:**

- Default to `medium`.
- Keep size consistent within a group of related controls (button row, form field set).
- Do not mix sizes arbitrarily on the same horizontal row.

### Shapes

| Shape | Use for |
| ----- | ------- |
| `rounded` | Default — standard corner radius |
| `circular` | Icon-only buttons, avatars, circular badges |
| `square` | Tile-like actions, grid cells |

**Rules:**

- Default to `rounded`.
- Use `circular` only for equal-width icon buttons and avatar-like elements.
- `square` is for specialized layouts — not the default.

---

## STD-VIS-003 — Spacing and layout

- Components use design-system spacing tokens — do not hardcode pixel values in component SCSS.
- Form fields stack vertically with consistent gap between label, input, and helper/error text.
- Button groups use `SegmentLayout`: `segmented` for connected toggle groups, `separate` for independent actions with gap.
- Toolbar and action bars align actions to the end (trailing edge) unless the layout requires start alignment.
- Full-width components (`fullWidth` input) stretch to container width — use in forms and mobile layouts.

---

## Implementation review checklist

When reviewing a new or changed component against visual standards:

- [ ] Uses `Variant`, `Appearance`, `Size`, `Shape` from `utils.ts` (not ad-hoc strings)
- [ ] Defaults match STD-VIS-001 and STD-VIS-002 tables
- [ ] At most one `primary` action per surface
- [ ] Colors come from SCSS theme tokens, not hardcoded values
- [ ] Spacing uses design-system tokens
- [ ] Showcase examples demonstrate the standard variant/size combinations
