# Changelog

All notable changes to **@laczynski/ui** and this monorepo are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Contributor documentation structure under `docs/` (guides, standards, quality, technical).
- `AGENTS.md` — AI agent and contributor fast-start guide.

## [1.2.1] - 2026-07-19

### Changed

- CI: tag `v*` triggers npm publish to npmjs.com via trusted publishing (OIDC) and creates GitHub Release

## [1.2.0] - 2026-07-18

### Added

- **Popover** component with showcase documentation.
- **Timeline** component with showcase documentation.
- **Context Menu** directive with showcase documentation.
- **Button** badge overlay support (`badge`, `badgeVariant`, `badgeAppearance` inputs).
- **Kbd** key combination support for multi-key shortcuts.
- Showcase crawl discovery, `sitemap.xml`, and SEO assets for documentation indexing.
- Documentation generation step in the GitHub Pages deployment workflow.

### Changed

- **Radio Button Group** — refined segmented and separate layout modes.
- **Menu** — improved focus behavior and icon-only trigger support.
- **Command Palette** — improved scrolling and keyboard navigation.
- **Badge** — refined styles to work as button overlay.

### Fixed

- **Menu** — resolved circular import in `MenuList` that broke context menu tests.
- Showcase demos updated for current Kbd and Button badge APIs.

## [1.1.0] - 2026-05-12

### Added

- **Range** field component with `NumericRange` type and showcase.
- **Speed Dial** component with showcase.
- Markdown asset paths in showcase documentation page configurations.
- `ignoreWithinSelector` on **Table of Content** for finer heading filtering.
- Fade-in animation on **Tooltip**.
- Toast exit animation and improved stack behavior.

### Changed

- **Card** — border style options; removed `size` property.
- **Badge** — default shape changed from `rounded` to `circular`; restyled structure.
- **Data Grid** — improved structure, scrolling, and styling.
- **Tree** / **Tree Node** — drag-and-drop improvements and drop indicator styling.
- **Toast** — restructured with exit animation and improved stacking.
- **Splitter** — updated gutter size and SCSS for better usability.
- **Kbd**, **Color**, **State Base** SCSS — styling and typography consistency.
- **Time** and date panel components — consistent styling across pickers.
- **Menu** — removed box-shadow for cleaner appearance.
- **Carousel** — removed `min-height` constraints for better responsiveness.
- Showcase theme drawer and sidebar refactored; installation docs and table-of-content selectors updated.

### Removed

- **Video** component and showcase (removed from public API and showcase app).
- **Speed Dial** entry removed from showcase sidebar navigation.

### Fixed

- Background color consistency in **Time Picker**, **Time Span**, and **Radio Button Group** SCSS.

## [1.0.2] - 2026-05-08

### Added

- Overlay surface animations and keyframes for dialogs, menus, and popovers.
- **Dropdown** empty state support.
- **State Container** delegate scroll functionality.
- **Time Picker** 12-hour format support.
- **Scroll Container** custom empty template support.
- **Menu** `variant` and `appearance` properties.
- Exported time formatting utility from **Time Picker**.

### Changed

- **Dialog** — improved rendering and animation handling.
- **Drawer** — improved animation handling and responsive design.
- **Command Palette** — accessibility and class handling improvements.
- **Tree** / **Tree Node** — improved styling and accessibility.
- **Splitter** — improved ARIA attributes and styling.
- **Accordion**, **Breadcrumb**, **Pagination** — accessibility and responsiveness improvements.
- **Data Grid** — improved scrolling and layout.
- **Time** component — enhanced display and input normalization.
- **Toast** — restructured for improved accessibility.
- **Carousel** — removed `size` property.
- **Week** component — scroll-to-selected-week behavior and accessibility.
- **Slider** — refined step notch edge calculation.
- **Card** styles refactored for layout consistency.
- Component animations refactored for performance and accessibility.
- **Input** component padding adjustments.
- Showcase sidebar — removed view mode functionality.

### Fixed

- **Dropdown** cleanup and scheduling logic.
- **Radio Button Group** — removed layout support in favor of cleaner accessibility model.
- Repository URL casing corrected in `package.json`.

## [1.0.1] - 2026-04-06

### Added

- Icon sprite support for npm consumers (`scripts/generate-icon-sprite.mjs`).
- Installation documentation for icon assets and library setup.

### Changed

- Updated package documentation and styles for `@laczynski/ui` branding.

## [1.0.0] - 2026-04-02

### Added

- Initial public release of **@laczynski/ui** — enterprise-grade Angular component library based on Fluent 2.
- **60+ components** across layout, data display, forms, overlays, and primitives.
- **Showcase** documentation site with interactive examples, API reference, and guide pages.
- **i18n** support via `@ngx-translate/core` integration and translation helpers.
- **Theme builder** with light/dark mode and Fluent theme variants.
- **Icon** component with Fluent SVG sprite generation.
- **Radio Button Group** component.
- **Message Bar** component with accessibility improvements.
- GitHub Pages deployment workflow and CI pipeline.
- Husky pre-commit hooks with lint-staged.
- MIT License.

### Changed

- Renamed monorepo from `angular-ui` to `laczynski-ui`; package published as `@laczynski/ui`.
- **Button** — `toggle` input renamed to `selectable`.
- **Tag** — `readonly` replaced with `selectable`; improved accessibility.
- Field inputs — `variant` renamed to `inputVariant` for consistency.
- Showcase refactored with `SectionWithDrawer`, `ShowcaseHeader`, interactive demos, and landing page.
- ESLint consolidated into flat `eslint.config.js`; Prettier configured for Angular HTML.
