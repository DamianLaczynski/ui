# Technical documentation guide

> **Audience:** contributors adding or changing docs in `docs/technical/`.
> **What `technical/` is for** (vs `guides/` and `standards/`): [README.md — Relationship to other docs](README.md#relationship-to-other-docs).

## Extend vs new file

| Extend an existing `docs/technical/*.md` when… | Add a new file when… |
| ------------------------------------------------ | -------------------- |
| Same operational concern (more config keys, troubleshooting rows) | Different concern and config surface (e.g. CI vs publishing) |
| Added material stays easy to find in the current doc | The target doc would grow hard to navigate (~150+ lines of new content) |
| | The knowledge outlives one PR and helps the next clone or deployment |

**Do not** add a technical doc for one-off PR notes, secrets, visual design rules, or implementation how-to — see [README.md](README.md#relationship-to-other-docs).

**Do not** duplicate content that already has a canonical home. Link instead:

| Principle | Put it in `technical/` | Canonical source (link, do not copy) |
| --------- | ---------------------- | ------------------------------------ |
| Component visual rules | Brief ops impact only | `docs/standards/` |
| How to implement components | Pointers only | `docs/guides/` |
| Per-component API reference | That it exists and where | Showcase site, `public/docs/components/` |
| Machine-readable config (workflows) | Human summary and local reproduction | The committed file itself |

## Conventions

- **Name:** kebab-case (`ci.md`, `docs-generation.md`); suffix `-guide` for large operator manuals.
- **Open** with a one-line `> Scope:` blockquote.
- **Link** to `standards/` and `guides/` instead of copying behavior or code patterns.

## Checklist

1. Extend vs new file (table above).
2. Edit or add under `docs/technical/`.
3. Update [README.md](README.md) (documents table; **Start here by task** if needed).
4. Cross-link from related docs; one line in `AGENTS.md` only when a new major entry point appears.
