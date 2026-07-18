# GitHub Releases

> Scope: how to create GitHub Release notes for `@laczynski/ui` tags.

Every version published to npm must also have a **GitHub Release** with human-readable notes. Tags alone are not enough — releases appear on the repository Releases page and notify subscribers.

## Release notes source

Notes live in `.github/release-notes/<tag>.md` (e.g. `v1.2.0.md`). Content is derived from `CHANGELOG.md` but formatted for GitHub (no duplicate headers).

When preparing a new version:

1. Update `CHANGELOG.md` under `[Unreleased]` → move to `[X.Y.Z] - YYYY-MM-DD`.
2. Create or update `.github/release-notes/vX.Y.Z.md` with the same content (minus the version heading).
3. Commit both files in the release branch.

## Automatic release (recommended)

### On new tag push

Workflow `.github/workflows/release.yml` runs when a `v*` tag is pushed. It creates a GitHub Release using the matching file from `.github/release-notes/`.

```bash
git tag -a v1.3.0 -m "Release @laczynski/ui 1.3.0"
git push origin v1.3.0
```

The workflow creates the GitHub Release automatically after the tag lands on `main`.

### Backfill missing releases

Workflow `.github/workflows/sync-releases.yml` can be triggered manually from the GitHub Actions tab (**Sync GitHub Releases**). It creates any release that has a tag and a notes file but no GitHub Release yet.

## Manual release (local)

Requires [GitHub CLI](https://cli.github.com/) authenticated (`gh auth login`).

```bash
# Single version
npm run release:github -- --version=1.2.0

# All missing releases
npm run release:github -- --all
```

## Release checklist

Include this in every release — see also [publishing.md](publishing.md):

1. Update `CHANGELOG.md`
2. Write `.github/release-notes/vX.Y.Z.md`
3. Bump version in `packages/ui/package.json`
4. Merge release PR to `main`
5. Create and push git tag: `git tag -a vX.Y.Z -m "Release @laczynski/ui X.Y.Z"` → `git push origin vX.Y.Z`
6. Verify GitHub Release was created (workflow or manual)
7. Publish to npm: `npm run publish:lib`
8. Verify docs site updated (GitHub Pages deploy on `main` push)

## Tag naming

Always use the `v` prefix: `v1.0.0`, `v1.2.0`. This matches existing tags and the release workflow trigger.
