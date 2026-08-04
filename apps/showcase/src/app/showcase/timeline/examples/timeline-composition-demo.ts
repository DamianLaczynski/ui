import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, TagComponent, TimelineComponent, TimelineItemComponent } from 'ui';

@Component({
  selector: 'app-timeline-composition-demo',
  standalone: true,
  imports: [TimelineComponent, TimelineItemComponent, TagComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:38rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-timeline ariaLabel="Workspace activity with custom content">
        <ui-timeline-item
          title="Design review scheduled"
          timestamp="Today 09:30"
          meta="Product design"
          description="Review board for navigation refresh and command surfaces."
          icon="calendar"
          variant="primary"
        >
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;padding-top:0.25rem">
            <ui-tag text="Navigation" appearance="tint" variant="info" />
            <ui-tag text="High priority" appearance="outline" variant="warning" />
          </div>
        </ui-timeline-item>

        <ui-timeline-item
          title="Comments resolved"
          timestamp="Today 11:12"
          meta="Ava Lopez"
          description="All blocking feedback on the sidebar density pass is closed."
          icon="comment_checkmark"
          variant="success"
        />

        <ui-timeline-item
          title="Publish checklist"
          timestamp="Pending"
          meta="Release ops"
          description="Waiting for final screenshot diff and docs export."
          variant="warning"
          [pending]="true"
        >
          <ui-button type="button" variant="secondary" appearance="outline" size="small">
            Open checklist
          </ui-button>
        </ui-timeline-item>
      </ui-timeline>
    </div>
  `,
})
export class TimelineCompositionDemoComponent {}
