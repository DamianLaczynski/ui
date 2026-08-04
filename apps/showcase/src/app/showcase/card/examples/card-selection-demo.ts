import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, CardComponent, CardOnSelectionChangeEvent, CheckboxComponent } from 'ui';

@Component({
  selector: 'app-card-selection-demo',
  standalone: true,
  imports: [FormsModule, ButtonComponent, CardComponent, CheckboxComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem;width:100%;">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;">
        <ui-card
          [selectable]="true"
          [interactive]="true"
          [selected]="surfaceSelected()"
          borderStyle="dashed"
          ariaLabel="Selectable card surface"
          (selectionChange)="onSurfaceSelectionChange($event)"
        >
          <div uiCardHeader style="display:grid;gap:0.25rem;">
            <strong style="font-size:0.9375rem;">Click-anywhere selection</strong>
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest);"
              >Useful for galleries or bulk management where the whole tile represents one
              choice</span
            >
          </div>
        </ui-card>

        <ui-card
          [selectable]="true"
          [selected]="checkboxSelected()"
          ariaLabel="Selectable card with projected checkbox"
          (selectionChange)="onCheckboxSelectionChange($event)"
        >
          <ui-checkbox
            uiCardCheckbox
            [label]="''"
            [ariaLabel]="'Select card'"
            [ngModel]="checkboxSelected()"
            [ngModelOptions]="{ standalone: true }"
            (click)="$event.stopPropagation()"
            (change)="onProjectedCheckboxChange($event)"
          />

          <div uiCardHeader style="display:grid;gap:0.25rem;">
            <strong style="font-size:0.9375rem;">Projected checkbox</strong>
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest);"
              >Better when users expect an explicit selection affordance instead of a surface
              click</span
            >
          </div>
        </ui-card>
      </div>

      <ui-card appearance="outline" borderStyle="dashed" ariaLabel="Selection status panel">
        <div
          uiCardBody
          style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;justify-content:space-between;"
        >
          <div style="display:flex;flex-wrap:wrap;gap:1rem 1.5rem;align-items:center;">
            <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest);">
              Surface card:
              <strong style="color:var(--color-neutral-foreground-rest);">{{
                surfaceSelected() ? 'selected' : 'not selected'
              }}</strong>
            </span>
            <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest);">
              Checkbox card:
              <strong style="color:var(--color-neutral-foreground-rest);">{{
                checkboxSelected() ? 'selected' : 'not selected'
              }}</strong>
            </span>
          </div>

          <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
        </div>
      </ui-card>
    </div>
  `,
})
export class CardSelectionDemoComponent {
  protected readonly surfaceSelected = signal(true);
  protected readonly checkboxSelected = signal(false);

  protected onSurfaceSelectionChange(event: CardOnSelectionChangeEvent): void {
    this.surfaceSelected.set(event.data.selected);
  }

  protected onCheckboxSelectionChange(event: CardOnSelectionChangeEvent): void {
    this.checkboxSelected.set(event.data.selected);
  }

  protected onProjectedCheckboxChange(value: boolean): void {
    this.checkboxSelected.set(!!value);
  }

  protected reset(): void {
    this.surfaceSelected.set(true);
    this.checkboxSelected.set(false);
  }
}
