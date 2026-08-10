import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, TimeSpanComponent } from 'lui';

@Component({
  selector: 'app-time-span-basic-demo',
  standalone: true,
  imports: [FormsModule, ButtonComponent, TimeSpanComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;max-width:24rem">
      <ui-time-span
        label="Reminder delay"
        placeholder="1h 30m"
        [showHours]="true"
        [showMinutes]="true"
        [(ngModel)]="value"
        [ngModelOptions]="{ standalone: true }"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" appearance="subtle" (click)="value = ''">Clear</ui-button>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ value || 'No duration selected.' }}
        </span>
      </div>
    </div>
  `,
})
export class TimeSpanBasicDemoComponent {
  protected value = 'PT1H30M';
}
