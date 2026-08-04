import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonGroupComponent, type RadioButtonItem } from 'ui';

@Component({
  selector: 'app-radio-button-group-icons-demo',
  standalone: true,
  imports: [FormsModule, RadioButtonGroupComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;width:100%;max-width:48rem"
    >
      <ui-radio-button-group
        label="Channel"
        helpText="Icons help when the choices are recognizable and only a few."
        [items]="channelItems"
        variant="primary"
        appearance="tint"
        [(ngModel)]="channel"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-radio-button-group
        label="Theme preset"
        helpText="Shape and size can reinforce a more prominent segmented control."
        [items]="themeItems"
        size="large"
        shape="rounded"
        appearance="outline"
        [(ngModel)]="theme"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class RadioButtonGroupIconsDemoComponent {
  protected channel = 'email';
  protected theme = 'balanced';

  protected readonly channelItems: RadioButtonItem[] = [
    { id: 'email', label: 'Email', value: 'email', icon: 'mail' },
    { id: 'chat', label: 'Chat', value: 'chat', icon: 'chat' },
    { id: 'teams', label: 'Call', value: 'call', icon: 'call' },
  ];

  protected readonly themeItems: RadioButtonItem[] = [
    { id: 'balanced', label: 'Balanced', value: 'balanced', icon: 'apps' },
    { id: 'focus', label: 'Focus', value: 'focus', icon: 'panel_left' },
    { id: 'review', label: 'Review', value: 'review', icon: 'comment' },
  ];
}
