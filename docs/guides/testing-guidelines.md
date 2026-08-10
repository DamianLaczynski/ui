# Testing guidelines

> Scope: which layer owns what, anti-patterns, and what to run before a PR.
>
> Commands and CI: [`AGENTS.md`](../../AGENTS.md) and [`docs/technical/ci.md`](../technical/ci.md).

## Core rule

**Default: do not add a test** unless you can name a failure class that **no lower layer already covers**.

When you add one: ground it in the component API or inherited standards — not ad-hoc acceptance tables.

## Layer ownership

| Layer | Owns | Does not own |
| ----- | ---- | ------------ |
| Library unit (`packages/lui`) | Component logic, signal computations, state transitions, ARIA attribute binding | Showcase layout, routing, doc rendering |
| Showcase unit (`apps/showcase`) | Doc page wiring, demo component behavior | Library internals already tested in `packages/lui` |

Colocate specs as `*.spec.ts` next to the source file.

## What to test in library components

| Concern | Test when… | Typical assertion |
| ------- | ---------- | ----------------- |
| Signal defaults | Inputs have non-obvious defaults | Default `variant`, `size`, `disabled` values |
| State transitions | `loading` / `disabled` affect interaction | Button not clickable when `loading` is true |
| Computed classes | CSS class logic is non-trivial | Host classes match variant + appearance + size |
| ARIA attributes | Icon-only or custom roles | `aria-label` present when no visible text |
| Event emission | `output()` fires on user action | `clicked` emits on click when not disabled |
| Form integration | Component implements `ControlValueAccessor` | Value propagates on write, disabled state respected |

## Anti-patterns

**Do not** add or extend tests when:

| Layer | Skip |
| ----- | ---- |
| Any | A lower layer already covers the failure |
| Library unit | Markup or styling only (visual regression is manual/showcase) |
| Library unit | Smoke with no real assertion (`should create` only) |
| Library unit | Full-template snapshots |
| Showcase unit | Duplicating library tests for the same component behavior |

## Before a PR

Run locally:

```bash
npm run lint
npm run build:lib
npm test
npm run test:ui-showcase
npm run build:ui-showcase
```

CI runs the same checks in parallel jobs — see [`ci.md`](../technical/ci.md).

## Mapping standards to tests

When a component implements a shared standard from [component-behaviors.md](../standards/component-behaviors.md):

| Standard topic | What to prove | Layer |
| -------------- | ------------- | ----- |
| Loading state | Control non-interactive while loading | Library unit |
| Disabled state | No event emission, muted presentation | Library unit |
| Icon-only a11y | `ariaLabel` required / bound | Library unit |
| Variant classes | Correct BEM modifiers per variant | Library unit |

Full visual and behavioral criteria: [design-standards.md](../standards/design-standards.md) and [accessibility.md](../quality/accessibility.md). Visual review happens in the showcase, not in unit tests.
