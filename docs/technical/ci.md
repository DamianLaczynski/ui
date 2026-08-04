# CI

> Scope: GitHub Actions workflow, local reproduction, and debugging failed pipeline jobs.

## Workflow

File: `.github/workflows/ci.yml`

Triggers: push and pull request to `main`.

### Jobs

| Job | What it runs | Depends on |
| --- | ------------ | ---------- |
| `lint` | `npm ci` → `npm run lint` | — |
| `test` | `npm ci` → `npm run build:lib` → `ng test ui-showcase --watch=false` | — |
| `test-lib` | `npm ci` → `npm run build:lib` → typecheck specs → `ng test ui --watch=false` | — |
| `build` | `npm ci` → `npm run build:lib` → `npm run build:ui-showcase` | `lint`, `test`, `test-lib` |

All jobs use Node 24 with npm cache.

### Deploy

File: `.github/workflows/deploy-pages.yml`

Triggers: push to `main`.

Builds the showcase with `npm run build:gh-pages` and deploys to GitHub Pages at `https://ui.laczynski.dev/`.

### Publish

File: `.github/workflows/publish.yml`

Triggers: push tags `v*`.

Runs tests, builds the library, publishes `@laczynski/ui` to npmjs.com (OIDC + provenance), and creates a GitHub Release.

Details: [publishing.md](publishing.md).

## Reproduce locally

Before pushing, run the same checks:

```bash
npm run lint
npm run build:lib
npm test
npm run test:ui-showcase
npm run build:ui-showcase
```

Or run the full prebuild chain (includes docs and icons):

```bash
npm run build
```

## Debugging a failed job

| Failed job | Likely cause | Fix |
| ---------- | ------------ | --- |
| `lint` | ESLint or Prettier violation | `npm run lint:fix` and `npm run format` |
| `test` | Showcase unit test failure | Fix spec in `apps/showcase/src/` |
| `test-lib` | Library unit test or typecheck failure | Fix spec in `packages/ui/src/` |
| `build` | Compilation or docs generation error | Check build output; run `npm run docs:build` separately |

## Pre-commit hooks

Husky runs `lint-staged` on commit:

- `*.{ts,html}` → Prettier + ESLint
- `*.{scss,json}` → Prettier

If a commit is rejected, fix formatting/lint issues and commit again.
