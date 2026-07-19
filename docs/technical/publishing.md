# Publishing

> Scope: how to publish `@laczynski/ui` to npm.

## Package

- Name: `@laczynski/ui`
- Source: `packages/ui/`
- Build output: `dist/ui/`
- Public API: `packages/ui/src/public-api.ts`

## Build before publish

```bash
npm run build:lib
```

This runs `ng build ui` via ng-packagr, producing the distributable package in `dist/ui/`.

Icon sprite is built automatically via the `prebuild:lib` hook.

## Publish commands

| Command | What it does |
| ------- | ------------ |
| `npm run publish:lib` | Publishes `dist/ui/` to npm (requires login) |
| `npm run publish:lib:patch` | Bumps patch version in `packages/ui/package.json`, builds, publishes |
| `npm run publish:lib:minor` | Bumps minor version, builds, publishes |
| `npm run publish:lib:major` | Bumps major version, builds, publishes |

## Versioning

Follow [Semantic Versioning](https://semver.org/):

- **Patch** — bug fixes, no API changes
- **Minor** — new features, backward-compatible API additions
- **Major** — breaking API changes

Update `CHANGELOG.md` and `.github/release-notes/vX.Y.Z.md` before every publish. See [github-releases.md](github-releases.md) for the full GitHub Release workflow.

## Checklist

1. All CI checks pass locally (`npm run lint`, `npm test`, `npm run build`)
2. `CHANGELOG.md` updated with the release notes
3. `.github/release-notes/vX.Y.Z.md` created or updated (GitHub Release body)
4. `npm run build:lib` succeeds
5. Version bumped (manually or via `publish:lib:*` script)
6. Merge release PR to `main`
7. Create and push git tag: `git tag -a vX.Y.Z -m "Release @laczynski/ui X.Y.Z"` → `git push origin vX.Y.Z`
8. Verify GitHub Release was created (`.github/workflows/release.yml` or `npm run release:github`)
9. `npm run publish:lib`

## npm authentication

Requires `npm login` with publish access to the `@laczynski` scope. CI does not auto-publish — publishing is a manual step.
