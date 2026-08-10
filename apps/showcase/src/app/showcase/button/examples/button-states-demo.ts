import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from 'lui';

@Component({
  selector: 'app-button-states-example',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem">
      <ui-button variant="primary" icon="save" (click)="save()" [loading]="loading()"
        >Save changes</ui-button
      >
      <ui-button variant="secondary" [loading]="true">Saving...</ui-button>
      <ui-button variant="secondary" [disabled]="true">Disabled</ui-button>
    </div>
  `,
})
export class ButtonStatesExampleComponent {
  loading = signal(false);

  save(): void {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
    }, 1000);
  }
}
