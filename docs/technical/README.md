# Technical documentation

> **Scope:** run, configure, and troubleshoot the toolchain — not how to write component code.
>
> For implementation conventions, see [`docs/guides/`](../guides/). For visual and behavioral standards, see [`docs/standards/`](../standards/).
>
> **Adding or changing technical docs:** [technical-documentation-guide.md](technical-documentation-guide.md).

## Documents

| Document | Read when you need to… |
| -------- | ---------------------- |
| [technical-documentation-guide.md](technical-documentation-guide.md) | Rules for when to add or extend docs in this folder |
| [ci.md](ci.md) | Understand GitHub Actions, reproduce CI locally, or debug a failing pipeline job |
| [docs-generation.md](docs-generation.md) | How showcase docs are generated into `public/docs/` |
| [publishing.md](publishing.md) | Publish `@laczynski/lui` to npm |
| [github-releases.md](github-releases.md) | Create GitHub Release notes for each version |

## Start here by task

| Task | Document |
| ---- | -------- |
| PR failed on GitHub | [ci.md](ci.md) |
| Docs not updating after showcase changes | [docs-generation.md](docs-generation.md) |
| Publish a new library version | [publishing.md](publishing.md) + [github-releases.md](github-releases.md) |
| Backfill missing GitHub Releases | [github-releases.md](github-releases.md) → **Sync GitHub Releases** workflow |
| First clone — run locally | [`AGENTS.md`](../../AGENTS.md) → `npm install` → `npm start` |

## Relationship to other docs

| Folder | Use for |
| ------ | ------- |
| `docs/guides/` | How to _implement_ (code, tests, recipes) |
| `docs/standards/` | How components _should look and behave_ |
| `docs/quality/` | Accessibility, i18n, theming expectations |
| `docs/technical/` | How to _run and configure_ the toolchain (this folder) |

Commands shared across areas: [`AGENTS.md`](../../AGENTS.md).
