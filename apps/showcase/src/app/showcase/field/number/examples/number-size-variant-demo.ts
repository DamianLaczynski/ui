import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumberComponent } from 'lui';

@Component({
  selector: 'app-number-size-variant-demo',
  standalone: true,
  imports: [FormsModule, NumberComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;width:100%;max-width:48rem"
    >
      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Sizes</div>
        <ui-number label="Small value" [size]="'small'" placeholder="0" />
        <ui-number label="Medium value" [size]="'medium'" placeholder="0" />
        <ui-number label="Large value" [size]="'large'" placeholder="0" />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Input variants</div>
        <ui-number label="Filled" inputVariant="filled" placeholder="0" />
        <ui-number label="Filled gray" inputVariant="filled-gray" placeholder="0" />
        <ui-number label="Underlined" inputVariant="underlined" placeholder="0" />
      </div>
    </div>
  `,
})
export class NumberSizeVariantDemoComponent {}
