# Publishing

> Scope: releasing `@laczynski/lui` to npm.

## Registry

| Package         | Primary registry                   | Secondary              |
| --------------- | ---------------------------------- | ---------------------- |
| `@laczynski/lui` | [npmjs.com](https://www.npmjs.com) | GitHub Packages (npm)  |

Publish on tag push `v*` via [publish.yml](../../.github/workflows/publish.yml). The workflow uses npm trusted publishing / OIDC for npmjs.com and `GITHUB_TOKEN` for GitHub Packages.

`repository` in `packages/lui/package.json` links the package to this repo on GitHub Packages.

## Where the version lives

| Location                    | Field       |
| --------------------------- | ----------- |
| `packages/lui/package.json`  | `"version"` |

## Release checklist

1. Bump `"version"` in `packages/lui/package.json`.
2. Update `CHANGELOG.md` (`## [x.y.z]` section).
3. Verify locally:

   ```bash
   npm run lint
   npm run build:lib
   npm test
   npm run test:ui-showcase
   ```

4. Merge to `main`, then tag and push:

   ```bash
   git tag v2.0.0-preview.7
   git push origin v2.0.0-preview.7
   ```

   [publish.yml](../../.github/workflows/publish.yml) runs tests, builds the library, publishes to npmjs.com and GitHub Packages, and creates a GitHub Release (from `CHANGELOG.md`, or `.github/release-notes/vX.Y.Z.md` as fallback).

Prerelease tags (`v*-*`) publish npm with dist-tag `preview`.

## One-time setup

### npm trusted publishing

npmjs.com → `@laczynski/lui` → **Settings** → **Trusted Publisher** → **GitHub Actions**:

| Field                | Value              |
| -------------------- | ------------------ |
| Organization or user | `laczynski`        |
| Repository           | `Lui`              |
| Workflow filename    | `publish.yml`      |
| Environment          | *(leave empty)*    |

No `NPM_TOKEN` secret — CI uses OIDC (npm CLI ≥ 11.5.1).

The package manifest explicitly targets `https://registry.npmjs.org/`; the release workflow also publishes the built artifact to `https://npm.pkg.github.com/`. Publishing remains triggered only by a pushed `v*` tag.

### GitHub repository settings

Actions enabled; workflow permissions allow `packages: write` and OIDC (`id-token: write` is set in the workflow).

## Build output

- Source: `packages/lui/`
- Build: `npm run build:lib` → `dist/lui/`
- CI publishes from `dist/lui/` after build

## Consumer setup

### npm (npmjs.com)

```bash
npm install @laczynski/lui
```

### npm (GitHub Packages)

In `.npmrc`:

```
@laczynski:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=TOKEN
```

Token (classic) needs `read:packages` scope. In GitHub Actions on a consuming repo, use `GITHUB_TOKEN` with read access to the package.

```bash
npm install @laczynski/lui
```

## Optional: local publish

Trusted publishing works in CI only:

```bash
npm run build:lib
cd dist/lui && npm publish --access public
```

For preview versions: add `--tag preview`.

## Versioning

Follow [Semantic Versioning](https://semver.org/):

- **Patch** — bug fixes, no API changes
- **Minor** — new features, backward-compatible API additions
- **Major** — breaking API changes
