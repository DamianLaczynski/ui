# Docs generation

> Scope: how showcase documentation is generated into static Markdown and discovery files.

## Pipeline

`npm run docs:build` runs two scripts in sequence:

### 1. Component Markdown — `scripts/generate-showcase-llms.mjs`

Reads every `*.showcase.meta.json` under `apps/showcase/src/app/showcase/` and:

- Extracts code from `examples/*-demo.ts` files
- Writes `public/docs/components/<slug>.md`
- Writes snippet files to `public/docs/components/snippets/<slug>/`

### 2. Guide pages and LLM index — `scripts/generate-docs-metadata.ts`

Exports guide page configs to Markdown:

- `public/docs/getting-started.md`
- `public/docs/installation.md`
- `public/docs/i18n.md`
- `public/docs/roadmap.md`
- `public/docs/llms.md`

Also writes:

- `public/llms.txt` — short discovery index
- `public/llms-full.txt` — full content index for LLM consumption

### 3. Crawl discovery — `scripts/generate-showcase-crawl-discovery.mjs`

Separate script (`npm run showcase:crawl-discovery`), runs via prebuild hooks:

- `public/sitemap.xml`
- `public/crawl-links.html`

## When docs regenerate

Automatically via npm lifecycle hooks:

- `prestart`, `prebuild`, `prebuild:ui-showcase`, `prebuild:gh-pages`, `prewatch`

Manual:

```bash
npm run docs:build
npm run showcase:crawl-discovery
```

## Source of truth

| Output | Source |
| ------ | ------ |
| Component docs | `<slug>.showcase.meta.json` + `examples/` |
| Guide docs | `apps/showcase/src/app/pages/docs/*/ ` page configs |
| LLM index | Generated from all of the above |

**Do not hand-edit** `public/docs/components/*.md` — change the showcase source and regenerate.

## Adding a new guide page

1. Create page config in `apps/showcase/src/app/pages/docs/<slug>/`
2. Register in `scripts/generate-docs-metadata.ts` (`GUIDE_PAGES` array)
3. Add route in showcase app routes
4. Run `npm run docs:build`

## Adding a new component doc

See [showcase-guidelines.md](../guides/showcase-guidelines.md).
