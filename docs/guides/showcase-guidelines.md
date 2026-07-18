# Showcase guidelines

> **L3 — Implementation.** Scope: how to add and maintain component documentation in `apps/showcase`.

Consumer-facing docs are rendered live in the showcase and exported as Markdown to `public/docs/`. The showcase meta file is the source of truth.

## Per-component file set

Create a folder `apps/showcase/src/app/showcase/<slug>/` with:

| File | Required | Purpose |
| ---- | -------- | ------- |
| `<slug>.showcase.meta.json` | Yes | Title, description, sections, API tables, snippet map |
| `<slug>.showcase.doc.ts` | Yes | Wires meta → `ShowcaseDocPageConfig` + example component map |
| `examples/*-demo.ts` | Yes | One demo per feature section |
| `<slug>.showcase.ts` | Yes | Route component shell |
| `<slug>.showcase.component.ts` | If interactive | Interactive playground wrapper |
| `<slug>.showcase.config.ts` | Optional | Extra configuration |
| `<slug>.interactive.ts` | Optional | Interactive demo controls |

Use `button/` as the reference implementation:

- `apps/showcase/src/app/showcase/button/button.showcase.meta.json`
- `apps/showcase/src/app/showcase/button/button.showcase.doc.ts`

## Meta file structure

The `.showcase.meta.json` file drives everything:

- `slug` — URL segment and generated Markdown filename
- `title`, `description`, `intro` — page header copy
- `importCode` — import statement shown on the doc page
- `snippets` — maps code keys to example filenames
- `featureSections` — demo sections (id, title, description, codeKey, componentKey)
- `apiSections` — input/output tables for the API reference
- `accessibility` — a11y notes shown on the doc page

Keep descriptions concise and action-oriented. Each feature section should demonstrate one capability.

## Example components

Each `examples/<name>-demo.ts` file:

- Is a standalone Angular component imported in the `.showcase.doc.ts` component map
- Contains the minimal working example for that section
- Serves as the source for generated code snippets

Name demos consistently: `<slug>-<feature>-demo.ts` (e.g. `button-basic-demo.ts`).

## Routing

1. Add the component route in `apps/showcase/src/app/layout/ds/ds.routes.ts`
2. Register the doc page in the navigation if applicable

## Generated output

After changing showcase files, run:

```bash
npm run docs:build
```

This generates:

- `public/docs/components/<slug>.md` — full component Markdown
- `public/docs/components/snippets/<slug>/` — extracted code snippets
- Updated `public/llms.txt` and `public/llms-full.txt`

Also run `npm run showcase:crawl-discovery` (included in prebuild hooks) to update `sitemap.xml`.

## Writing good documentation

- Lead with what the component does, not how it is built internally.
- Show the most common usage first (basic section).
- Progress from simple to advanced (variants → states → composition).
- Document every public input and output in `apiSections`.
- Include accessibility notes for icon-only controls, keyboard interaction, and ARIA attributes.
- Align examples with [design-standards.md](../standards/design-standards.md) — use standard variants, sizes, and appearances.

## Do not

- Hand-edit `public/docs/components/*.md` — always change the meta file and regenerate.
- Duplicate L1 standards prose in every component doc — link to standards for shared rules, document only what is unique to the component.
- Add feature sections without a corresponding example component.
