# AI Working Guide

> Scope: fast-start context for AI agents and contributors in **this repository**. Load this file first, then open the focused docs under `docs/` for the area you are changing.

## Repository shape

- `packages/ui` — publishable Angular component library (`@laczynski/ui`), Fluent 2 design language.
- `apps/showcase` — documentation site and live component examples (`ui-showcase`).
- `apps/starter` — sample application shell (not registered in `angular.json`).
- `scripts/` — build-time generators (docs Markdown, icon sprite, sitemap).
- `public/` — static assets copied into the showcase build; generated docs land in `public/docs/`.
- `docs/` — contributor and agent documentation (`docs/README.md` for the full index).

## Start here by task

- New or changed component: read `docs/guides/README.md`, then `component-guidelines.md` and `docs/standards/README.md`.
- Showcase documentation: read `docs/guides/showcase-guidelines.md`.
- Visual or behavioral consistency: read `docs/standards/design-standards.md` and `docs/standards/component-behaviors.md`.
- Accessibility or i18n: read `docs/quality/README.md`.
- CI, docs generation, npm publish, or GitHub Releases: read `docs/technical/README.md`.

## Commands

### Development

- Install dependencies: `npm install`
- Start showcase (watch lib + serve): `npm start`
- Build library: `npm run build:lib`
- Build showcase: `npm run build:ui-showcase`
- Generate docs assets: `npm run docs:build`
- Generate icon sprite: `npm run icons:build`

### Quality

- Lint: `npm run lint` / `npm run lint:fix`
- Format: `npm run format` / `npm run format:check`
- Test library: `npm test`
- Test showcase: `npm run test:ui-showcase`
- Library coverage: `npm run test:coverage`

### Publish

- Publish to npm: `npm run publish:lib` (after `npm run build:lib`)
- Version bump + publish: `npm run publish:lib:patch` / `minor` / `major`

`docs:build`, `icons:build`, and `showcase:crawl-discovery` run automatically via `prestart` / `prebuild` hooks.

## Repo navigation rules

### Library (`packages/ui`)

- Public API: `packages/ui/src/public-api.ts` — every exported symbol must be listed here.
- Components: `packages/ui/src/lib/components/<name>/` with `*.component.ts`, template, optional spec, and `index.ts`.
- Styles: `packages/ui/src/lib/scss/` — 7-1 SCSS architecture; one `_<component>.scss` per component block.
- Shared types: `packages/ui/src/lib/components/utils.ts` (`Variant`, `Appearance`, `Size`, `Shape`, etc.).
- Field inputs: `packages/ui/src/lib/components/field/<type>/`.
- Selector prefix: `ui-*` for components, `ui*` camelCase for directives.

### Showcase (`apps/showcase`)

- Component docs: `apps/showcase/src/app/showcase/<slug>/`.
- Guide pages: `apps/showcase/src/app/pages/docs/`.
- Doc routes: `apps/showcase/src/app/layout/ds/ds.routes.ts`.
- Per-component source of truth: `<slug>.showcase.meta.json`.

### Generated output (do not hand-edit)

- `public/docs/components/*.md` — generated from showcase meta files.
- `public/llms.txt`, `public/llms-full.txt` — LLM discovery index.
- `packages/ui/src/lib/components/icon/generated/` — generated icon sprite and types.

## Documentation layers

Three layers — see `docs/README.md`:

| Layer             | Path               | When to read                                      |
| ----------------- | ------------------ | ------------------------------------------------- |
| L1 Standards      | `docs/standards/`  | How components look and behave across the library |
| L2 Quality        | `docs/quality/`    | Accessibility, i18n, theming expectations         |
| L3 Implementation | `docs/guides/`     | How to build and document in this repo            |

**Override rule:** component-specific showcase docs and API define the component; L1 standards define shared defaults; L3 never defines visual design.

## Change coupling checklist

- If you prepare a release, update `CHANGELOG.md`, `.github/release-notes/vX.Y.Z.md`, push the tag, and verify the GitHub Release — see `docs/technical/github-releases.md`.
- If you add or change a public component API, update `public-api.ts`, showcase meta, examples, and run `npm run docs:build`.
- If you change shared types (`Variant`, `Appearance`, etc.), check all components that consume them.
- If you change SCSS tokens or theme variables, check light/dark rendering in showcase.
- If you add icons, update the Fluent icon set usage and run `npm run icons:build`.

## Working agreements

- Follow the current code structure instead of inventing a new layer or folder layout.
- Prefer extending an existing component pattern over creating a parallel one.
- Keep docs current when introducing a new enforced convention.
- Do not hand-edit generated files in `public/docs/components/` — change the showcase meta or generator instead.
