import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavComponent, type NavNode } from 'lui';

@Component({
  selector: 'app-nav-basic-demo',
  standalone: true,
  imports: [NavComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:18rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-nav [items]="items" />
    </div>
  `,
})
export class NavBasicDemoComponent {
  protected readonly items: NavNode[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'activity', label: 'Activity', icon: 'history', selected: true },
    { id: 'files', label: 'Files', icon: 'folder' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];
}
