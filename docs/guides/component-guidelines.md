# Component guidelines

> **L3 — Implementation.** Scope: conventions for building components in `packages/ui`.
>
> **Visual design and shared behavior:** [`design-standards.md`](../standards/design-standards.md) and [`component-behaviors.md`](../standards/component-behaviors.md) (L1). This file covers _how_ to implement in Angular.

## Stack summary

Angular 21 standalone components with strict TypeScript, ESLint, and Prettier. Styling uses SCSS with a 7-1 architecture and BEM methodology. Icons come from `@fluentui/svg-icons` via a generated sprite. State uses Angular signals (`input()`, `model()`, `output()`, `computed()`).

For dev server, lint, format, and test commands, see [`AGENTS.md`](../../AGENTS.md).

## Creating a new component

1. Create folder: `packages/ui/src/lib/components/<name>/`
2. Add `<name>.component.ts` with `selector: 'ui-<name>'`, `ChangeDetectionStrategy.OnPush`, standalone `imports`
3. Add template and optional spec
4. Add `index.ts` barrel export
5. Add SCSS block: `packages/ui/src/lib/scss/components/_<name>.scss`, register in `main.scss`
6. Export from `packages/ui/src/public-api.ts`
7. Add showcase documentation (see [showcase-guidelines.md](showcase-guidelines.md))
8. Run `npm run docs:build`

Field inputs go under `packages/ui/src/lib/components/field/<type>/` and follow the same pattern.

## Component rules

### Standalone components

- All components are standalone — declare dependencies in the component `imports` array.
- Use `ChangeDetectionStrategy.OnPush` on every component.
- Prefer `inject()` over constructor injection.

### Signal-based API

- Use `input()` for one-way inputs with defaults.
- Use `model()` for two-way bindings (`disabled`, `selected`, form values).
- Use `output()` for events.
- Use `computed()` for derived state.
- Reuse shared types from `components/utils.ts` (`Variant`, `Appearance`, `Size`, `Shape`) instead of per-component string unions.

### Naming

- Selector: `ui-<kebab-case>` (e.g. `ui-button`, `ui-data-grid`).
- Class: `<Name>Component` (e.g. `ButtonComponent`).
- Files: `<name>.component.ts`, `<name>.component.html`, `<name>.component.spec.ts`.
- Keep identifiers in English.

### Templates

- Keep templates declarative; move logic to the component class or computed signals.
- Use `@if`, `@for`, `@switch` control flow (not `*ngIf` / `*ngFor`).
- Bind host layout via `host: { class: '...' }` metadata when the host element needs classes.

### SCSS

- One BEM block per component file (`_button.scss` → `.ui-button`).
- Use design tokens from `scss/utils/_variables.scss` — do not hardcode colors.
- Register new component SCSS in `main.scss`.
- Do not add component-level `.scss` files alongside `.ts` unless the block is too large for the shared folder (current convention: all styles in `lib/scss/components/`).

## States and accessibility

Every interactive component must support the states defined in [component-behaviors.md](../standards/component-behaviors.md):

- `disabled` — non-interactive, visually muted
- `loading` — spinner replaces or supplements content, control non-interactive
- Focus visible styles via `:focus-visible`
- Icon-only controls require `ariaLabel` input

See [accessibility.md](../quality/accessibility.md) for full expectations.

## Public API

- Export only through `public-api.ts` — internal helpers stay unexported.
- Do not export overlay/panel internals (`overlay/`, `panel/`, `draggable-panel/`) unless they become public API deliberately.
- Breaking API changes require a semver bump and CHANGELOG entry.

## Icons

- Use `IconName` type from the icon component.
- Add new icons via `scripts/generate-icon-sprite.mjs` (`@fluentui/svg-icons` source).
- Run `npm run icons:build` after changing the icon set.

## i18n

- User-visible default strings use translation tokens where the library provides i18n support.
- See [internationalization.md](../quality/internationalization.md).

## Do not

- Add a second UI kit or CSS framework alongside the design system SCSS.
- Use `any` without justification (ESLint warns).
- Hand-edit generated icon files in `icon/generated/`.
- Create global NgModules — the library is fully standalone.
