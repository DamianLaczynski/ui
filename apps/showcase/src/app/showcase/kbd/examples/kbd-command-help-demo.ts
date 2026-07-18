import { Component } from '@angular/core';
import { KbdComponent, MessageBarComponent, TagComponent } from 'ui';

@Component({
  selector: 'app-kbd-command-help-demo',
  standalone: true,
  imports: [KbdComponent, MessageBarComponent, TagComponent],
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));gap:1rem;align-items:start;max-width:48rem"
    >
      <div
        style="display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Editor shortcuts</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            The kbd component is most useful when it appears inside real shortcut help, command
            hints, or training surfaces.
          </div>
        </div>

        <ui-message-bar
          title="Quick tip"
          message="Use keyboard hints only for actions that are actually supported by the current surface."
          variant="info"
          appearance="subtle"
          [dismissible]="false"
        />

        <div style="display:flex;flex-direction:column;gap:0.75rem">
          @for (item of shortcuts; track item.label) {
            <div style="display:flex;justify-content:space-between;gap:1rem;align-items:center">
              <span style="font-size:0.875rem">{{ item.label }}</span>
              <ui-kbd [keys]="item.keys" appearance="filled" />
            </div>
          }
        </div>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
          <ui-tag text="Documentation" appearance="filled" variant="secondary" />
          <ui-tag text="Shortcut hints" appearance="subtle" variant="info" />
          <ui-tag text="Ready to copy" appearance="subtle" variant="success" />
        </div>

        <div
          style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Open command palette with
          </span>
          <ui-kbd [keys]="['Ctrl', 'K']" appearance="filled" />
        </div>
      </div>
    </div>
  `,
})
export class KbdCommandHelpDemoComponent {
  protected readonly shortcuts = [
    { label: 'Save draft', keys: ['Ctrl', 'S'] },
    { label: 'Open search', keys: ['Ctrl', 'F'] },
    { label: 'Duplicate line', keys: ['Shift', 'Alt', '↓'] },
  ];
}
