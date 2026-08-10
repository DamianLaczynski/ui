import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MessageBarComponent } from 'lui';

@Component({
  selector: 'app-message-bar-appearance-example',
  standalone: true,
  imports: [MessageBarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:44rem">
      <ui-message-bar
        title="Tint"
        message="Balanced default for most inline notices."
        variant="info"
        appearance="tint"
        [dismissible]="false"
      />
      <ui-message-bar
        title="Filled"
        message="Use when the notice needs stronger visual priority."
        variant="info"
        appearance="filled"
        [dismissible]="false"
      />
      <ui-message-bar
        title="Outline"
        message="Useful on visually busy surfaces where you still need separation."
        variant="info"
        appearance="outline"
        [dismissible]="false"
      />
      <ui-message-bar
        title="Subtle"
        message="Calmer presentation for embedded panels and secondary guidance."
        variant="info"
        appearance="subtle"
        [dismissible]="false"
      />
      <ui-message-bar
        title="Transparent"
        message="Minimal chrome when surrounding layout already provides structure."
        variant="info"
        appearance="transparent"
        [dismissible]="false"
      />
    </div>
  `,
})
export class MessageBarAppearanceExampleComponent {}
