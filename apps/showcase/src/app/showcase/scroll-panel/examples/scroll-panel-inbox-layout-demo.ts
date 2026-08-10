import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MessageBarComponent, ScrollPanelComponent, SearchComponent } from 'lui';

@Component({
  selector: 'app-scroll-panel-inbox-layout-demo',
  standalone: true,
  imports: [MessageBarComponent, ScrollPanelComponent, SearchComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div>
        <div style="font-size:0.9375rem;font-weight:600">Inbox layout</div>
        <div
          style="margin-top:0.25rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
        >
          A scroll panel is often just the scroll shell inside a denser composition with search and
          status.
        </div>
      </div>

      <ui-message-bar
        variant="info"
        title="7 unread updates"
        message="Keep the shell compact and let only the list region scroll."
        appearance="subtle"
      />

      <ui-search placeholder="Search messages" style="width:100%" />

      <div
        style="border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest);padding:0.5rem"
      >
        <ui-scroll-panel maxHeight="20rem" ariaLabel="Inbox messages panel">
          <div style="display:flex;flex-direction:column;gap:0.625rem">
            @for (item of items; track item.id) {
              <div
                style="padding:0.875rem 1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
              >
                <div style="font-size:0.875rem;font-weight:600">{{ item.title }}</div>
                <div
                  style="margin-top:0.1875rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
                >
                  {{ item.body }}
                </div>
              </div>
            }
          </div>
        </ui-scroll-panel>
      </div>
    </div>
  `,
})
export class ScrollPanelInboxLayoutDemoComponent {
  protected readonly items = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: index % 2 === 0 ? `Review request ${index + 1}` : `Mention from design ${index + 1}`,
    body: 'This kind of panel usually needs one clearly bounded scroll area inside a bigger shell.',
  }));
}
