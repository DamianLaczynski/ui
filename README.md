# @laczynski/lui

Enterprise-grade Angular component library with a **Fluent-inspired** design language.

**Documentation:** [ui.laczynski.dev](https://ui.laczynski.dev/) · **npm:** [`@laczynski/lui`](https://www.npmjs.com/package/@laczynski/lui)

## Overview

This monorepo contains the publishable library (`@laczynski/lui`), a live documentation showcase, and the tooling used to build, test, and ship both. The library provides 60+ standalone Angular components — layout, forms, data display, overlays, and primitives — with light/dark theming, i18n support, and accessibility built in.

Visual styling is inspired by [Fluent 2](https://fluent2.microsoft.design/) design principles. This is an independent project and not an official Microsoft product.

## Repository structure

| Path | Description |
| ---- | ----------- |
| [`packages/lui`](packages/lui) | Publishable component library (`@laczynski/lui`) |
| [`apps/showcase`](apps/showcase) | Documentation site with live examples and API reference |
| [`apps/starter`](apps/starter) | Sample application shell |
| [`public`](public) | Static assets and generated docs copied into the showcase build |
| [`scripts`](scripts) | Build-time generators (docs, icons, sitemap) |
| [`docs`](docs) | Contributor and agent documentation |

## Use the library

```bash
npm install @laczynski/lui
```

Requires Angular `^22.1.0`, Angular CDK `^22.1.0`, and Node.js `22.22.3+` (Node 24 LTS recommended for development).

```typescript
import { ButtonComponent } from '@laczynski/lui';
```

Full setup, styling, and per-component usage: [Getting started](https://ui.laczynski.dev/docs/getting-started).

## Develop locally

```bash
git clone https://github.com/Laczynski/Lui.git
cd Lui
npm install
npm start
```

`npm start` watches the library build and serves the showcase at `http://localhost:4200`.

### Common commands

| Command | Description |
| ------- | ----------- |
| `npm start` | Watch library + serve showcase |
| `npm run build:lib` | Build `@laczynski/lui` to `dist/lui` |
| `npm run build` | Production build of the showcase |
| `npm test` | Run library unit tests |
| `npm run lint` | ESLint across the workspace |
| `npm run docs:build` | Regenerate Markdown docs in `public/docs/` |

## Documentation

| Audience | Where to start |
| -------- | -------------- |
| Library users | [ui.laczynski.dev](https://ui.laczynski.dev/) |
| Contributors & agents | [`AGENTS.md`](AGENTS.md) → [`docs/README.md`](docs/README.md) |
| Release process | [`CHANGELOG.md`](CHANGELOG.md) · [`docs/technical/github-releases.md`](docs/technical/github-releases.md) |
| Legal notice | [`docs/legal-notice.md`](docs/legal-notice.md) |

## What's in the package

**Layout & navigation** — accordion, breadcrumb, carousel, drawer, nav, scroll container, splitter, tabs, toolbar, tree.

**Data & feedback** — badge, card, empty/error/loading states, message bar, pagination, progress bar, rating, skeleton, spinner, tag, timeline, toast, tooltip.

**Forms & input** — checkbox, color, date, datetime, date range, select, email, file, number, password, radio, search, slider, stepper, switch, text, textarea, tel, time, TOTP, URL, week.

**Overlays & commands** — calendar, command palette, context menu, dialog, menu, popover, time picker.

**Primitives** — avatar, button, divider, icon, kbd.

## Disclaimer

@laczynski/lui is not affiliated with, endorsed by, or sponsored by Microsoft Corporation. Fluent, Fluent UI, and Microsoft are trademarks of Microsoft Corporation. See [`docs/legal-notice.md`](docs/legal-notice.md) and [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).

## License

[MIT](LICENSE)
