# Publishing

> Scope: releasing `@laczynski/ui` to npm.

## Registry

| Package         | Registry                           |
| --------------- | ---------------------------------- |
| `@laczynski/ui` | [npmjs.com](https://www.npmjs.com) and [GitHub Packages](https://github.com/laczynski/Ui/packages) |

Publish on tag push `v*` via [publish.yml](../../.github/workflows/publish.yml). The workflow uses npm trusted publishing / OIDC for npmjs.com and `GITHUB_TOKEN` for GitHub Packages.

## Where the version lives

| Location                    | Field       |
| --------------------------- | ----------- |
| `packages/ui/package.json`  | `"version"` |

## Release checklist

1. Bump `"version"` in `packages/ui/package.json`.
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
   git tag v1.3.0
   git push origin v1.3.0
   ```

   [publish.yml](../../.github/workflows/publish.yml) runs tests, builds the library, publishes to npmjs.com, and creates a GitHub Release (from `CHANGELOG.md`, or `.github/release-notes/vX.Y.Z.md` as fallback).

Prerelease tags (`v*-*`) publish npm with dist-tag `preview`.

## One-time setup

### npm trusted publishing

npmjs.com → `@laczynski/ui` → **Settings** → **Trusted Publisher** → **GitHub Actions**:

| Field                | Value              |
| -------------------- | ------------------ |
| Organization or user | `laczynski` |
| Repository           | `Ui`                |
| Workflow filename    | `publish.yml`      |
| Environment          | *(leave empty)*    |

No `NPM_TOKEN` secret — CI uses OIDC (npm CLI ≥ 11.5.1).

The package manifest explicitly targets `https://registry.npmjs.org/`; the release workflow also publishes the built artifact to `https://npm.pkg.github.com/`. Publishing remains triggered only by a pushed `v*` tag.

### GitHub repository settings

Actions enabled; workflow permissions allow OIDC (`id-token: write` is set in the workflow).

## Build output

- Source: `packages/ui/`
- Build: `npm run build:lib` → `dist/ui/`
- CI publishes from `dist/ui/` after build

## Optional: local publish

Trusted publishing works in CI only:

```bash
npm run build:lib
cd dist/ui && npm publish --access public
```

For preview versions: add `--tag preview`.

## Versioning

Follow [Semantic Versioning](https://semver.org/):

- **Patch** — bug fixes, no API changes
- **Minor** — new features, backward-compatible API additions
- **Major** — breaking API changes
