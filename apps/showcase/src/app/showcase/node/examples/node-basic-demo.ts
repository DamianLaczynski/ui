import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NodeComponent, type Node } from 'lui';

@Component({
  selector: 'app-node-basic-demo',
  standalone: true,
  imports: [NodeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:34rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-node [node]="folderNode" appearance="subtle" />
      <ui-node [node]="fileNode" appearance="subtle" />
      <ui-node
        [node]="selectedNode"
        appearance="filled"
        variant="secondary"
        [showSelectionIndicator]="true"
      />
    </div>
  `,
})
export class NodeBasicDemoComponent {
  protected readonly folderNode: Node = {
    id: 'folder',
    label: 'Design system',
    icon: 'folder',
  };

  protected readonly fileNode: Node = {
    id: 'file',
    label: 'Release-notes.md',
    icon: 'document',
  };

  protected readonly selectedNode: Node = {
    id: 'selected',
    label: 'Current sprint board',
    icon: 'apps',
    selected: true,
  };
}
