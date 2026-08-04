import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from 'ui';

@Component({
  selector: 'app-button-icons-example',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem">
      <ui-button variant="primary" icon="save">Save</ui-button>
      <ui-button variant="secondary" appearance="outline" icon="edit">Edit</ui-button>
      <ui-button variant="secondary" appearance="subtle" icon="share">Share</ui-button>
      <ui-button variant="success" icon="checkmark">Done</ui-button>
      <ui-button variant="danger" appearance="outline" icon="delete">Delete</ui-button>
    </div>
  `,
})
export class ButtonIconsExampleComponent {}
