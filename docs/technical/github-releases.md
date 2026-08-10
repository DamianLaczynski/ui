# GitHub Releases

> Scope: GitHub Release notes for `@laczynski/lui` tags.

Every published version gets a **GitHub Release** when you push a `v*` tag. [publish.yml](../../.github/workflows/publish.yml) creates it after npm publish.

## Release notes source (priority)

1. **`CHANGELOG.md`** — section `## [X.Y.Z]` (preferred; extracted by `scripts/extract-changelog.mjs`)
2. **`.github/release-notes/vX.Y.Z.md`** — fallback if no CHANGELOG section
3. **Auto-generated** — GitHub compares commits if neither exists

When preparing a release:

1. Update `CHANGELOG.md` (`[Unreleased]` → `[X.Y.Z] - YYYY-MM-DD`).
2. Optionally keep `.github/release-notes/vX.Y.Z.md` in sync for backfill tooling.
3. Bump `packages/lui/package.json` version to match the tag.
4. Merge to `main`, push tag: `git tag vX.Y.Z && git push origin vX.Y.Z`.

## Backfill missing releases

Workflow [sync-releases.yml](../../.github/workflows/sync-releases.yml) can be triggered manually from the GitHub Actions tab. It creates releases that have a tag and notes file but no GitHub Release yet.

## Manual release (local)

Requires [GitHub CLI](https://cli.github.com/) (`gh auth login`):

```bash
npm run release:github -- --version=1.2.0
npm run release:github -- --all
```

## Tag naming

Use the `v` prefix: `v1.0.0`, `v1.3.0-preview.1`. Matches the publish workflow trigger.

See [publishing.md](publishing.md) for the full release checklist.
