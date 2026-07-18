---
id: NFR-A11Y-001
title: Accessibility
type: quality
status: active
---

# Accessibility

Unless a component doc states otherwise, all components must meet these minimum expectations.

## Keyboard and focus

- Every interactive control is reachable and operable with **keyboard only** (Tab, Shift+Tab, Enter, Space, Escape, Arrow keys where applicable).
- **Escape** closes dropdown panels, dialogs, drawers, and popovers.
- Focus moves into opened dialogs and returns to the triggering control on close.
- No keyboard trap outside intentional modal flows.
- `:focus-visible` ring is visible in both light and dark themes.

## Labels and semantics

- Form fields have visible **labels** or `aria-label` / `aria-labelledby`.
- Icon-only buttons require `ariaLabel` input — never ship without an accessible name.
- Toggle components expose `aria-checked` or equivalent state.
- Data tables use `<th>` column headers with scope.
- Status indicators convey meaning through text, not color alone.

## ARIA patterns

| Component type | Pattern |
| -------------- | ------- |
| Button | Native `<button>` or `role="button"` with keyboard support |
| Dialog | `role="dialog"`, `aria-modal="true"`, labelled by title |
| Tabs | `role="tablist"` / `role="tab"` / `role="tabpanel"` |
| Tree | `role="tree"` / `role="treeitem"` with expand/collapse |
| Toast | `role="status"` or `role="alert"` depending on severity |
| Menu | `role="menu"` / `role="menuitem"` with arrow key navigation |

## Visual and motion

- The library supports **light** and **dark** themes — contrast must meet WCAG AA for text and interactive elements.
- Respect `prefers-reduced-motion` for non-essential animations.
- Loading spinners and required state indicators are never suppressed by reduced-motion preferences.

## Component author checklist

- [ ] Icon-only controls have `ariaLabel` or visible tooltip text
- [ ] Custom keyboard shortcuts are documented in the showcase accessibility section
- [ ] Color is not the sole indicator of state or meaning
- [ ] Focus order follows visual order
- [ ] Screen reader announcements for dynamic content (toasts, live regions)
