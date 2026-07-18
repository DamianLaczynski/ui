# Repository map

> Scope: where things live and which layer owns what. This is the quickest orientation document after `AGENTS.md`.

## Top level

- `packages/ui` — publishable Angular component library (`@laczynski/ui`).
- `apps/showcase` — documentation site (`ui-showcase` in `angular.json`).
- `apps/starter` — sample app shell (not registered in `angular.json`).
- `scripts/` — build-time generators.
- `public/` — static assets and generated docs copied into the showcase build.
- `docs/` — contributor documentation (this folder tree).

Root `package.json` defines npm scripts for build, test, lint, docs generation, and publish. See [`AGENTS.md`](../../AGENTS.md) for the full command list.

## Library map (`packages/ui`)

### Entry points

- `packages/ui/src/public-api.ts` — every symbol consumers import from `@laczynski/ui`.
- `packages/ui/src/lib/scss/main.scss` — design system styles (import in consumer apps).
- `packages/ui/ng-package.json` — ng-packagr configuration.

### `lib/` layout

| Folder | Purpose |
| ------ | ------- |
| `components/` | UI components — one folder per component |
| `components/field/` | Form field inputs and shared field utilities |
| `components/icon/` | Icon component and generated Fluent sprite |
| `scss/` | 7-1 SCSS architecture (variables, mixins, component blocks) |
| `api/` | Shared API utilities |
| `i18n/` | Translation helpers and tokens |
| `state/` | Lightweight state helpers |

### Component folder pattern

Each component under `components/<name>/`:

- `<name>.component.ts` — standalone Angular component with `ChangeDetectionStrategy.OnPush`
- `<name>.component.html` — template
- `index.ts` — barrel export
- `<name>.component.spec.ts` — Vitest unit tests (when warranted)

Selector prefix: `ui-<name>` (enforced by ESLint).

Field inputs follow the same pattern under `components/field/<type>/`.

### Shared design types

`packages/ui/src/lib/components/utils.ts` defines cross-component types:

- `Variant` — semantic color (`primary`, `secondary`, `success`, `warning`, `danger`, `info`)
- `Appearance` — surface style (`filled`, `tint`, `outline`, `subtle`, `transparent`)
- `Size` — `small`, `medium`, `large`
- `Shape` — `rounded`, `circular`, `square`

Use these types instead of inventing per-component enums.

### SCSS

- One BEM block per component: `packages/ui/src/lib/scss/components/_<name>.scss`
- Registered in `packages/ui/src/lib/scss/main.scss`
- Theme tokens in `packages/ui/src/lib/scss/utils/_variables.scss`

## Showcase map (`apps/showcase`)

### App structure

| Path | Purpose |
| ---- | ------- |
| `src/app/pages/` | Landing and guide pages (getting started, installation, i18n, roadmap) |
| `src/app/layout/ds/` | Docs shell and `ds.routes.ts` (component doc routes) |
| `src/app/showcase/` | Per-component documentation folders |
| `src/app/shared/` | Doc rendering components (`showcase-doc-page`, `guide-doc-page`) |

### Per-component showcase files

| File | Role |
| ---- | ---- |
| `<slug>.showcase.meta.json` | Source of truth: title, sections, API tables, snippet map |
| `<slug>.showcase.doc.ts` | Wires meta → `ShowcaseDocPageConfig` + example components |
| `examples/*-demo.ts` | Live demos and code-snippet source |
| Optional: `<slug>.showcase.config.ts`, `<slug>.interactive.ts` | Extra config / interactive demos |

### Doc generation output

Scripts write to `public/docs/`:

- `components/<slug>.md` — per-component Markdown (from `generate-showcase-llms.mjs`)
- `getting-started.md`, `installation.md`, etc. — guide pages (from `generate-docs-metadata.ts`)
- `llms.txt`, `llms-full.txt` — LLM discovery index

Do not hand-edit generated files — change the showcase source and run `npm run docs:build`.

## Test map

| Layer | Location | Tooling |
| ----- | -------- | ------- |
| Library unit | `packages/ui/src/**/*.spec.ts` | Vitest via `ng test ui` |
| Showcase unit | `apps/showcase/src/**/*.spec.ts` | Vitest via `ng test ui-showcase` |

## CI map

See [`docs/technical/ci.md`](../technical/ci.md). Workflow file: `.github/workflows/ci.yml`.

Jobs: `lint`, `test` (showcase), `test-lib` (library), `build` (depends on all three).

Deploy: `.github/workflows/deploy-pages.yml` → GitHub Pages at `https://ui.laczynski.dev/`.
