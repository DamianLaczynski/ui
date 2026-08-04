import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

import { TabsComponent } from '../tabs/tabs.component';
import { Node } from '../node/node.component';

@Component({
  selector: 'ui-panel',

  imports: [TabsComponent],
  template: `
    <div class="panel">
      @if (tabs().length > 0) {
        <div class="panel__tabs">
          <ui-tabs
            [tabs]="tabs()"
            [selectedTabId]="selectedTabId()"
            [appearance]="'subtle'"
            shape="circular"
            (tabChange)="onTabChange($event)"
            (tabClose)="onTabClose($event)"
          />
        </div>
      }
      <div class="panel__content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent {
  tabs = input<Node[]>([]);
  selectedTabId = input<string>();
  tabChange = output<Node>();
  tabClose = output<Node>();

  onTabChange(tab: Node): void {
    this.tabChange.emit(tab);
  }

  onTabClose(tab: Node): void {
    this.tabClose.emit(tab);
  }
}
