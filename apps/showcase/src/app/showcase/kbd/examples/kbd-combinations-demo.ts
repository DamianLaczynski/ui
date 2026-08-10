import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KbdComponent } from 'lui';

@Component({
  selector: 'app-kbd-combinations-demo',
  standalone: true,
  imports: [KbdComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem;max-width:32rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-kbd [keys]="['Ctrl', 'K']" appearance="filled" />
        <ui-kbd [keys]="['Ctrl', 'Shift', 'P']" appearance="filled" />
        <ui-kbd [keys]="['⌘', 'S']" appearance="filled" />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        @for (shortcut of shortcuts; track shortcut.label) {
          <div style="display:flex;justify-content:space-between;gap:1rem;align-items:center">
            <span style="font-size:0.875rem">{{ shortcut.label }}</span>
            <ui-kbd [keys]="shortcut.keys" appearance="filled" />
          </div>
        }
      </div>
    </div>
  `,
})
export class KbdCombinationsDemoComponent {
  protected readonly shortcuts = [
    { label: 'Copy selection', keys: ['Ctrl', 'C'] },
    { label: 'Paste clipboard', keys: ['Ctrl', 'V'] },
    { label: 'Duplicate line', keys: ['Shift', 'Alt', '↓'] },
    { label: 'Open command palette', keys: ['Ctrl', 'K'] },
  ];
}
