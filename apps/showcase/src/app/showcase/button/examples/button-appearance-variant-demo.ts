import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from 'lui';

@Component({
  selector: 'app-button-appearance-variant-example',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%">
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button variant="primary" appearance="filled" [fullWidth]="true"
          >Primary filled</ui-button
        >
        <ui-button variant="primary" appearance="tint" [fullWidth]="true">Primary tint</ui-button>
        <ui-button variant="primary" appearance="outline" [fullWidth]="true"
          >Primary outline</ui-button
        >
        <ui-button variant="primary" appearance="subtle" [fullWidth]="true"
          >Primary subtle</ui-button
        >
        <ui-button variant="primary" appearance="transparent" [fullWidth]="true"
          >Primary transparent</ui-button
        >
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button variant="secondary" appearance="filled" [fullWidth]="true"
          >Secondary filled</ui-button
        >
        <ui-button variant="secondary" appearance="tint" [fullWidth]="true"
          >Secondary tint</ui-button
        >
        <ui-button variant="secondary" appearance="outline" [fullWidth]="true"
          >Secondary outline</ui-button
        >
        <ui-button variant="secondary" appearance="subtle" [fullWidth]="true"
          >Secondary subtle</ui-button
        >
        <ui-button variant="secondary" appearance="transparent" [fullWidth]="true"
          >Secondary transparent</ui-button
        >
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button variant="success" appearance="filled" [fullWidth]="true"
          >Success filled</ui-button
        >
        <ui-button variant="success" appearance="tint" [fullWidth]="true">Success tint</ui-button>
        <ui-button variant="success" appearance="outline" [fullWidth]="true"
          >Success outline</ui-button
        >
        <ui-button variant="success" appearance="subtle" [fullWidth]="true"
          >Success subtle</ui-button
        >
        <ui-button variant="success" appearance="transparent" [fullWidth]="true"
          >Success transparent</ui-button
        >
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button variant="warning" appearance="filled" [fullWidth]="true"
          >Warning filled</ui-button
        >
        <ui-button variant="warning" appearance="tint" [fullWidth]="true">Warning tint</ui-button>
        <ui-button variant="warning" appearance="outline" [fullWidth]="true"
          >Warning outline</ui-button
        >
        <ui-button variant="warning" appearance="subtle" [fullWidth]="true"
          >Warning subtle</ui-button
        >
        <ui-button variant="warning" appearance="transparent" [fullWidth]="true"
          >Warning transparent</ui-button
        >
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button variant="danger" appearance="filled" [fullWidth]="true">Danger filled</ui-button>
        <ui-button variant="danger" appearance="tint" [fullWidth]="true">Danger tint</ui-button>
        <ui-button variant="danger" appearance="outline" [fullWidth]="true"
          >Danger outline</ui-button
        >
        <ui-button variant="danger" appearance="subtle" [fullWidth]="true">Danger subtle</ui-button>
        <ui-button variant="danger" appearance="transparent" [fullWidth]="true"
          >Danger transparent</ui-button
        >
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button variant="info" appearance="filled" [fullWidth]="true">Info filled</ui-button>
        <ui-button variant="info" appearance="tint" [fullWidth]="true">Info tint</ui-button>
        <ui-button variant="info" appearance="outline" [fullWidth]="true">Info outline</ui-button>
        <ui-button variant="info" appearance="subtle" [fullWidth]="true">Info subtle</ui-button>
        <ui-button variant="info" appearance="transparent" [fullWidth]="true"
          >Info transparent</ui-button
        >
      </div>
    </div>
  `,
})
export class ButtonAppearanceVariantExampleComponent {}
