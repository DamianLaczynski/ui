# Implementation guides

> **L3 — Implementation.** How to write and verify code in this repository — not visual design or consumer-facing API reference.

## Standards layers (read before implementing)

| Layer           | Location | When to read |
| --------------- | -------- | ------------ |
| L1 Standards    | [`docs/standards/`](../standards/) | Any component work — variants, states, feedback |
| L2 Quality      | [`docs/quality/`](../quality/) | Accessibility, i18n, theming when relevant |
| L3 Implementation | `docs/guides/` (this folder) | Code patterns in this repo |

Full layer index: [`docs/README.md`](../README.md). **Per-component showcase docs override L1 defaults; this folder (L3) never defines visual design.**

## Documents

| Document | Read when you need to… |
| -------- | ---------------------- |
| [repo-map.md](repo-map.md) | Find where code lives and which layer owns what |
| [component-guidelines.md](component-guidelines.md) | Build or change a component in `packages/ui` |
| [showcase-guidelines.md](showcase-guidelines.md) | Add or update component documentation in the showcase |
| [testing-guidelines.md](testing-guidelines.md) | Decide what to test and how |

## Start here by task

| Task | Documents |
| ---- | --------- |
| First orientation in the codebase | [repo-map.md](repo-map.md) |
| New component | [design-standards.md](../standards/design-standards.md) + [component-behaviors.md](../standards/component-behaviors.md) + [component-guidelines.md](component-guidelines.md) |
| Update existing component | Target component showcase meta + [component-guidelines.md](component-guidelines.md) |
| Add showcase documentation | [showcase-guidelines.md](showcase-guidelines.md) |
| Verify before PR | [testing-guidelines.md](testing-guidelines.md) + [`AGENTS.md`](../../AGENTS.md) (commands) |

## Relationship to other docs

| Folder | Layer | Use for |
| ------ | ----- | ------- |
| `docs/guides/` (this folder) | L3 | How to _implement_ in this repo |
| `docs/standards/` | L1 | How components _should look and behave_ |
| `docs/quality/` | L2 | Accessibility, i18n, theming expectations |
| `docs/technical/` | — | How to _run and configure_ the toolchain |
| `public/docs/` | — | Generated consumer-facing Markdown (do not hand-edit) |

Commands shared across areas: [`AGENTS.md`](../../AGENTS.md).
