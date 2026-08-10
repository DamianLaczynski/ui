import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ContentPosition, SpinnerComponent } from 'lui';

@Component({
  selector: 'app-spinner-label-positions-example',
  standalone: true,
  imports: [SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:1.25rem;align-items:center"
    >
      @for (position of positions; track position) {
        <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:flex-start">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">{{
            position
          }}</span>
          <ui-spinner
            size="small"
            variant="secondary"
            [labelPosition]="position"
            label="Syncing"
            ariaLabel="Syncing changes"
          />
        </div>
      }
    </div>
  `,
})
export class SpinnerLabelPositionsExampleComponent {
  protected readonly positions: Exclude<ContentPosition, 'none'>[] = [
    'before',
    'after',
    'above',
    'below',
  ];
}
