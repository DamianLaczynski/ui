# Documentation index

> Start with [`AGENTS.md`](../AGENTS.md) for commands, repo layout, and task-based reading order.

This repository has two documentation surfaces:

| Surface | Audience | Location |
| ------- | -------- | -------- |
| **Contributor docs** | Agents and library maintainers | `docs/` (this folder) |
| **Consumer docs** | Library users | Showcase site at [ui.laczynski.dev](https://ui.laczynski.dev/) and generated Markdown in `public/docs/` |

## Standards (`standards/`)

Shared visual and behavioral rules for components. Start with [standards/README.md](standards/README.md).

| Document | Description |
| -------- | ----------- |
| [README.md](standards/README.md) | Entry point — when to read each standard |
| [design-standards.md](standards/design-standards.md) | Variants, appearances, sizes, shapes, and visual tokens |
| [component-behaviors.md](standards/component-behaviors.md) | States, feedback, forms, overlays, and list patterns |

## Quality (`quality/`)

Cross-cutting quality expectations. Start with [quality/README.md](quality/README.md).

| Document | Description |
| -------- | ----------- |
| [README.md](quality/README.md) | Entry point — when to read each quality doc |
| [accessibility.md](quality/accessibility.md) | Keyboard, focus, labels, ARIA |
| [internationalization.md](quality/internationalization.md) | Translation tokens and copy conventions |
| [theming.md](quality/theming.md) | Light/dark themes, CSS variables, Fluent 2 alignment |

## Guides (`guides/`)

Implementation conventions and recipes. Start with [guides/README.md](guides/README.md).

| Document | Description |
| -------- | ----------- |
| [README.md](guides/README.md) | Entry point — when to read each guide |
| [repo-map.md](guides/repo-map.md) | Where code lives and which layer owns what |
| [component-guidelines.md](guides/component-guidelines.md) | How to build components in `packages/ui` |
| [showcase-guidelines.md](guides/showcase-guidelines.md) | How to document components in the showcase |
| [testing-guidelines.md](guides/testing-guidelines.md) | Test layer ownership and conventions |

## Technical (`technical/`)

Run, configure, and troubleshoot the toolchain. Start with [technical/README.md](technical/README.md).

| Document | Description |
| -------- | ----------- |
| [README.md](technical/README.md) | Entry point — when to read each technical doc |
| [technical-documentation-guide.md](technical/technical-documentation-guide.md) | When to add or extend technical docs |
| [ci.md](technical/ci.md) | GitHub Actions workflow and local reproduction |
| [docs-generation.md](technical/docs-generation.md) | How showcase docs are generated into `public/docs/` |
| [publishing.md](technical/publishing.md) | npm publish workflow for `@laczynski/ui` |
| [github-releases.md](technical/github-releases.md) | GitHub Release notes for each version |

## Documentation layers

| Layer | Path | Question |
| ----- | ---- | -------- |
| **L1 Standards** | `standards/` | _How should components look and behave?_ |
| **L2 Quality** | `quality/` | _How good must they be?_ |
| **L3 Implementation** | `guides/` | _How do we build them in this repo?_ |

**Override rule:** per-component showcase docs and API tables define component-specific behavior; L1 standards define shared defaults; L3 never defines visual design.
