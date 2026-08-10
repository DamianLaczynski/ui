import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, DateComponent } from 'lui';

@Component({
  selector: 'app-date-basic-demo',
  standalone: true,
  imports: [FormsModule, ButtonComponent, DateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;max-width:22rem">
      <ui-date
        label="Start date"
        placeholder="YYYY-MM-DD"
        [(ngModel)]="value"
        [ngModelOptions]="{ standalone: true }"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" appearance="subtle" (click)="value = ''">Clear</ui-button>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ value || 'No date selected.' }}
        </span>
      </div>
    </div>
  `,
})
export class DateBasicDemoComponent {
  protected value = '2026-05-12';
}
