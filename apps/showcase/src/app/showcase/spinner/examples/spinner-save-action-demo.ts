import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, SpinnerComponent } from 'lui';

@Component({
  selector: 'app-spinner-save-action-example',
  standalone: true,
  imports: [ButtonComponent, SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem">
      <ui-button type="button" variant="primary" [disabled]="saving()" (click)="runSave()">
        Save draft
      </ui-button>
      @if (saving()) {
        <ui-spinner
          size="small"
          variant="secondary"
          labelPosition="after"
          label="Saving…"
          ariaLabel="Saving draft"
        />
      }
    </div>
  `,
})
export class SpinnerSaveActionExampleComponent {
  protected readonly saving = signal(false);

  protected runSave(): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    window.setTimeout(() => this.saving.set(false), 2000);
  }
}
