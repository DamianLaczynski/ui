import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, ColorComponent } from 'ui';

@Component({
  selector: 'app-color-theme-panel-example',
  standalone: true,
  imports: [FormsModule, ButtonComponent, ColorComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:36rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Dashboard theme</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Configure a compact theme set for cards, charts, and callout surfaces.
        </div>
      </div>

      <ui-color
        label="Header accent"
        [(ngModel)]="headerAccent"
        [ngModelOptions]="{ standalone: true }"
        format="hex"
      />

      <ui-color
        label="Data highlight"
        [(ngModel)]="dataHighlight"
        [ngModelOptions]="{ standalone: true }"
        format="rgb"
      />

      <ui-color
        label="Overlay tint"
        [(ngModel)]="overlayTint"
        [ngModelOptions]="{ standalone: true }"
        format="hex"
        [showAlpha]="true"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;gap:0.5rem;align-items:center">
          <span
            style="width:0.875rem;height:0.875rem;border-radius:999px"
            [style.background]="headerAccent"
          ></span>
          <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
            >Header</span
          >
        </div>
        <div style="display:flex;gap:0.5rem;align-items:center">
          <span
            style="width:0.875rem;height:0.875rem;border-radius:999px"
            [style.background]="dataHighlight"
          ></span>
          <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">Data</span>
        </div>
        <div style="display:flex;gap:0.5rem;align-items:center">
          <span
            style="width:0.875rem;height:0.875rem;border-radius:999px"
            [style.background]="overlayTint"
          ></span>
          <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
            >Overlay</span
          >
        </div>
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary">Save theme</ui-button>
        <ui-button type="button" variant="secondary" appearance="outline"
          >Reset to defaults</ui-button
        >
      </div>
    </div>
  `,
})
export class ColorThemePanelExampleComponent {
  protected headerAccent = '#0F6CBD';
  protected dataHighlight = 'rgb(216, 59, 1)';
  protected overlayTint = '#00000066';
}
