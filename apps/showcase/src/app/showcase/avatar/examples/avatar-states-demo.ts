import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AvatarComponent } from 'ui';

@Component({
  selector: 'app-avatar-states-example',
  standalone: true,
  imports: [AvatarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1.25rem;align-items:flex-end">
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
        <ui-avatar image="https://i.pravatar.cc/150?img=5" name="Available collaborator" />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">default</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
        <ui-avatar name="Seat locked" [disabled]="true" />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">disabled</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
        <ui-avatar
          name="Syncing portrait"
          image="https://i.pravatar.cc/150?img=8"
          [loading]="true"
        />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">loading</span>
      </div>
    </div>
  `,
})
export class AvatarStatesExampleComponent {}
