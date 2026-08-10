import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AvatarComponent } from 'lui';

@Component({
  selector: 'app-avatar-basic-example',
  standalone: true,
  imports: [AvatarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1.25rem;align-items:flex-end;justify-content:center;width:100%"
    >
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
        <ui-avatar image="https://i.pravatar.cc/150?img=12" name="River Chen" />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">image</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
        <ui-avatar initials="MK" ariaLabel="Morgan Kelly" />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">initials</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
        <ui-avatar name="Wei Zhang" />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">name</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
        <ui-avatar icon="building" ariaLabel="Northwind workspace" />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">icon</span>
      </div>
    </div>
  `,
})
export class AvatarBasicExampleComponent {}
