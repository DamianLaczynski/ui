---
id: STD-BHV
title: Component Behaviors
type: standards
status: active
---

# Component behaviors

> **Layer L1 — Standards.** Default behavioral rules shared across components. Per-component showcase docs override when they document an explicit difference.

---

## STD-BHV-001 — Interactive states

Every interactive component supports these states consistently:

| State | Behavior | Visual |
| ----- | -------- | ------ |
| **Default** | Fully interactive | Standard presentation |
| **Hover** | Pointer feedback | Subtle background/border change |
| **Focus** | Keyboard reachable | Visible `:focus-visible` ring |
| **Active/pressed** | Click/tap feedback | Brief pressed appearance |
| **Disabled** | Non-interactive, no events | Muted colors, `cursor: not-allowed` |
| **Loading** | Non-interactive during async work | Spinner visible; icon hidden if applicable |
| **Selected** | Toggle/selection state (when applicable) | Distinct selected appearance |

**Rules:**

- `disabled` and `loading` are mutually exclusive with user interaction — no click events fire.
- `loading` shows a spinner; when an icon is present, hide it during loading so the spinner is visible.
- `selected` applies to toggleable components (`selectable` input on buttons, checkboxes, tabs).
- Focus styles must be visible in both light and dark themes.

---

## STD-BHV-002 — Feedback channels

Use the correct component for each feedback type:

| Channel | Component | When to use |
| ------- | --------- | ----------- |
| **Inline field validation** | Field helper/error text | Field-level rule failures on forms |
| **Message bar** | `ui-message-bar` | Screen-level info, warning, error, success |
| **Toast** | `ui-toast` | Transient success/error after actions |
| **Dialog** | `ui-dialog` | Confirmations, short input flows |
| **Empty state** | `ui-empty-state` | No data in a section or page |
| **Error state** | `ui-error-state` | Load failure with retry option |
| **Loading state** | `ui-loading-state` / `ui-spinner` / `ui-skeleton` | Content loading |

**Rules:**

- Do not use toast for field validation errors.
- Do not use message bar for transient success after a save — use toast.
- Destructive actions require dialog confirmation before execution.
- Empty, error, and loading states are mutually exclusive for the same content area.

---

## STD-BHV-003 — Form fields

All field components under `components/field/` share these conventions:

| Concern | Convention |
| ------- | ---------- |
| Label | Visible label above or beside the input |
| Required | Marked visually when `required` is true |
| Helper text | Below the input, muted color |
| Error text | Below the input, danger color; replaces helper when invalid |
| Disabled | Muted, non-interactive, value preserved |
| Input variants | `filled`, `filled-gray`, `filled-lighter`, `underlined` via `InputVariant` |

**Rules:**

- Validation errors appear inline — not in toasts or message bars.
- Error text appears after the field is touched or after submit attempt.
- `ControlValueAccessor` components propagate `disabled` state from the parent form.
- Field components use consistent sizing (`Size`) aligned with buttons on the same form.

---

## STD-BHV-004 — Overlays

| Component | Behavior |
| --------- | -------- |
| **Dialog** | Modal — blocks background interaction; Escape closes; focus trapped |
| **Drawer** | Side panel — slides in from edge; Escape closes |
| **Popover** | Anchored floating content — click outside or Escape dismisses |
| **Tooltip** | Hover/focus triggered — no modal behavior |
| **Dropdown** | Select/menu panel — keyboard navigable list |
| **Context menu** | Right-click triggered menu |

**Rules:**

- Escape closes all overlay types without navigating away.
- Focus moves into opened dialogs and returns to the trigger on close.
- Dialogs used for destructive confirmations show `danger` variant on the confirm action.
- Overlays position relative to their trigger using the overlay system (`overlay/`, `panel/`).

---

## STD-BHV-005 — Data display

| Component | When to use |
| --------- | ----------- |
| `ui-empty-state` | Section has no items and no error |
| `ui-error-state` | Data load failed — include retry action |
| `ui-loading-state` | Initial content load in progress |
| `ui-skeleton` | Placeholder shapes during load (known layout) |
| `ui-spinner` | Inline loading indicator (button, table cell) |

**Rules:**

- Show exactly one state at a time for a given content area.
- Empty state includes a title and optional action button.
- Error state includes a retry mechanism when the failure is recoverable.
- Skeleton dimensions should approximate the loaded content layout.

---

## STD-BHV-006 — Lists and grids

| Component | When to use |
| --------- | ----------- |
| `ui-pagination` | Standalone page navigation |
| `ui-scroll-container` | Virtualized or paginated lists with server-driven loading |
| `ui-tree` / `ui-tree-node` | Hierarchical data |
| `ui-timeline` | Chronological events |

**Rules:**

- Server-driven tabular data: use [@query-grid/ui](https://github.com/damianlaczynski/QueryGrid) (`<qg-ui-data-grid>`) — not part of this library.
- Pagination defaults to page size options consistent with the design system.
- Loading indicator appears in the data area, not over the entire page chrome.

---

## Implementation review checklist

When reviewing a new or changed component against behavioral standards:

- [ ] Disabled and loading states prevent interaction
- [ ] Focus-visible styles present and theme-aware
- [ ] Correct feedback channel used (not toast for validation, etc.)
- [ ] Form fields show inline errors, preserve values on failure
- [ ] Overlays close on Escape and manage focus correctly
- [ ] Empty/error/loading states are mutually exclusive
- [ ] Icon-only controls have accessible names
