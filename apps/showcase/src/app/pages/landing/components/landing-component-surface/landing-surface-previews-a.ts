import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AccordionComponent,
  AvatarComponent,
  BadgeComponent,
  BreadcrumbComponent,
  ButtonComponent,
  CalendarComponent,
  CalendarDay,
  CardComponent,
  CarouselComponent,
  CarouselItem,
  CheckboxComponent,
  ColorComponent,
  CommandPaletteComponent,
  DateComponent,
  DateRange,
  DateRangeComponent,
  DatetimeComponent,
  DialogComponent,
  DividerComponent,
  DrawerComponent,
  DropdownComponent,
  EmailComponent,
  EmptyStateComponent,
  ErrorStateComponent,
  FileComponent,
  IconComponent,
  ALL_ICON_NAMES,
  type IconName,
  KbdComponent,
  LoadingStateComponent,
  MenuComponent,
  MessageBarComponent,
  MonthComponent,
  QuickAction,
  WeekComponent,
  type Breadcrumb,
} from 'ui';
import {
  LSP_BREADCRUMB_FULL,
  LSP_COMMAND_ITEMS_BASE,
  LSP_DROPDOWN_ITEMS,
  LSP_MENU_ITEMS,
} from './landing-surface-previews.shared';

@Component({
  selector: 'app-lsp-accordion',
  standalone: true,
  imports: [AccordionComponent],
  template: `
    <ui-accordion label="Usage alerts & spend caps">
      <p
        style="margin:0 0 0.75rem;font-size:0.875rem;line-height:1.55;color:var(--color-neutral-foreground2-rest)"
      >
        Route anomaly notifications to PagerDuty and throttle duplicate emails within a five-minute
        window. Caps apply per workspace and reset on the first of each month.
      </p>
      <p
        style="margin:0;font-size:0.8125rem;line-height:1.5;color:var(--color-neutral-foreground3-rest)"
      >
        Tip: pair this with webhook signing so finance teams trust every alert payload.
      </p>
    </ui-accordion>
  `,
})
export class LspAccordionPreviewComponent {}

@Component({
  selector: 'app-lsp-avatar',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1.25rem;align-items:flex-end">
      <ui-avatar image="https://i.pravatar.cc/150?img=12" name="River Chen" />
      <ui-avatar initials="MK" ariaLabel="Morgan Kelly" />
      <ui-avatar name="Wei Zhang" variant="secondary" appearance="outline" />
      <ui-avatar icon="building" ariaLabel="Northwind workspace" />
      <ui-avatar [loading]="true" variant="primary" appearance="filled" />
    </div>
  `,
})
export class LspAvatarPreviewComponent {}

@Component({
  selector: 'app-lsp-badge',
  standalone: true,
  imports: [BadgeComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%">
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
        <ui-badge text="SOC 2 Type II" variant="success" appearance="filled" shape="circular" />
        <ui-badge text="Staging" variant="secondary" appearance="tint" size="small" />
        <ui-badge text="Needs review" variant="warning" appearance="outline" />
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
        <ui-badge text="Beta cohort" variant="info" appearance="subtle" />
        <ui-badge text="Payment failed" variant="danger" appearance="filled" />
        <ui-badge text="Featured launch" variant="primary" icon="rocket" appearance="filled" />
      </div>
    </div>
  `,
})
export class LspBadgePreviewComponent {}

@Component({
  selector: 'app-lsp-breadcrumb',
  standalone: true,
  imports: [BreadcrumbComponent],
  template: `
    <ui-breadcrumb
      [items]="path()"
      appearance="subtle"
      [responsiveOverflow]="false"
      (itemClick)="navigate($event)"
    />
  `,
})
export class LspBreadcrumbPreviewComponent {
  protected readonly path = signal<Breadcrumb[]>(LSP_BREADCRUMB_FULL);

  protected navigate(item: Breadcrumb): void {
    const index = LSP_BREADCRUMB_FULL.findIndex(entry => entry.id === item.id);
    this.path.set(
      LSP_BREADCRUMB_FULL.slice(0, index + 1).map((entry, currentIndex, arr) => ({
        ...entry,
        selected: currentIndex === arr.length - 1,
      })),
    );
  }
}

@Component({
  selector: 'app-lsp-button',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;width:100%">
      <ui-button variant="primary" appearance="filled">Publish release</ui-button>
      <ui-button variant="secondary" appearance="outline">Save draft</ui-button>
      <ui-button variant="danger" appearance="filled">Revoke keys</ui-button>
      <ui-button variant="secondary" appearance="subtle" size="small">Copy link</ui-button>
      <ui-button variant="secondary" appearance="filled" size="large">Invite teammate</ui-button>
      <ui-button variant="secondary" appearance="outline" shape="square">···</ui-button>
      <ui-button
        variant="primary"
        appearance="filled"
        shape="circular"
        icon="add"
        ariaLabel="Create item"
      />
      <ui-button variant="secondary" appearance="outline" [disabled]="true">Coming soon</ui-button>
    </div>
  `,
})
export class LspButtonPreviewComponent {}

@Component({
  selector: 'app-lsp-calendar',
  standalone: true,
  imports: [CalendarComponent],
  template: `
    <ui-calendar
      [currentMonth]="currentMonth()"
      [selectedDate]="selectedDate()"
      calendarView="days"
      size="medium"
      [showMonthYearPicker]="true"
      (dateSelect)="onDateSelect($event)"
      (previousMonth)="shiftMonth(-1)"
      (nextMonth)="shiftMonth(1)"
    />
  `,
})
export class LspCalendarPreviewComponent {
  protected readonly currentMonth = signal(new Date(2026, 4, 1));
  protected readonly selectedDate = signal<Date | null>(new Date(2026, 4, 14));

  protected onDateSelect(day: CalendarDay): void {
    this.selectedDate.set(day.date);
  }

  protected shiftMonth(delta: number): void {
    const next = new Date(this.currentMonth());
    next.setMonth(next.getMonth() + delta);
    this.currentMonth.set(next);
  }
}

@Component({
  selector: 'app-lsp-card',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  template: `
    <ui-card appearance="filled" ariaLabel="Release readiness summary">
      <div uiCardHeader style="display:grid;gap:0.35rem">
        <span
          style="font-size:0.6875rem;font-weight:600;color:var(--color-brand-primary);text-transform:uppercase;letter-spacing:0.06em"
          >Ship window</span
        >
        <strong style="font-size:1rem;line-height:1.3;color:var(--color-neutral-foreground-rest)"
          >Billing API · May 16 GA</strong
        >
      </div>
      <div
        uiCardBody
        style="margin:0;font-size:0.875rem;line-height:1.55;color:var(--color-neutral-foreground2-rest)"
      >
        Thirty-eight automated checks passed. Two security approvals outstanding before traffic
        shifts to the blue cluster.
      </div>
      <div uiCardFooter style="display:flex;flex-wrap:wrap;gap:0.5rem">
        <ui-button variant="primary" appearance="filled">Open pipeline</ui-button>
        <ui-button variant="secondary" appearance="outline">Share briefing</ui-button>
      </div>
    </ui-card>
  `,
})
export class LspCardPreviewComponent {}

@Component({
  selector: 'app-lsp-carousel',
  standalone: true,
  imports: [CarouselComponent],
  template: ` <ui-carousel [items]="slides" /> `,
})
export class LspCarouselPreviewComponent {
  protected readonly slides: CarouselItem[] = [
    {
      id: '1',
      image: 'https://picsum.photos/seed/northridge-dashboard/900/480',
      title: 'Operational clarity by default',
      description:
        'Executive-ready dashboards highlight revenue leakage, webhook health, and customer churn without exporting spreadsheets.',
    },
    {
      id: '2',
      image: 'https://picsum.photos/seed/northridge-collab/900/480',
      title: 'Collaborate where finance meets engineering',
      description:
        'Annotate payout runs, attach evidence, and keep auditors in the loop with granular workspace roles.',
    },
    {
      id: '3',
      image: 'https://picsum.photos/seed/northridge-mobile/900/480',
      title: 'Approvals that travel with you',
      description:
        'Resolve exceptions from mobile with biometric re-auth and tamper-evident audit trails baked in.',
    },
  ];
}

@Component({
  selector: 'app-lsp-checkbox',
  standalone: true,
  imports: [FormsModule, CheckboxComponent],
  template: `
    <ui-checkbox
      labelPosition="after"
      label="Email me a weekly digest of disputed charges"
      [(ngModel)]="value"
      [ngModelOptions]="{ standalone: true }"
    />
    <ui-checkbox
      labelPosition="after"
      label="Remember this device for 30 days"
      [(ngModel)]="value2"
      [ngModelOptions]="{ standalone: true }"
    />
    <ui-checkbox
      labelPosition="after"
      label="Enable two-factor authentication"
      [(ngModel)]="value3"
      [ngModelOptions]="{ standalone: true }"
    />
  `,
})
export class LspCheckboxPreviewComponent {
  protected value = false;
  protected value2 = false;
  protected value3 = false;
}

@Component({
  selector: 'app-lsp-color',
  standalone: true,
  imports: [FormsModule, ColorComponent],
  template: `
    <ui-color
      label="Brand accent"
      [(ngModel)]="primary"
      [ngModelOptions]="{ standalone: true }"
      format="hex"
    />
  `,
})
export class LspColorPreviewComponent {
  protected primary = '#0F6CBD';
}

@Component({
  selector: 'app-lsp-command-palette',
  standalone: true,
  imports: [ButtonComponent, CommandPaletteComponent],
  template: `
    <ui-button type="button" variant="secondary" appearance="outline" (click)="visible.set(true)"
      >Command palette</ui-button
    >
    <ui-command-palette
      [(visible)]="visible"
      [items]="items"
      placeholder="Search commands, workspaces, or people…"
      emptyText="No matches — try another keyword"
      [maxResults]="8"
    />
  `,
})
export class LspCommandPalettePreviewComponent {
  protected readonly visible = model(false);
  protected readonly items = LSP_COMMAND_ITEMS_BASE.map(item => ({
    ...item,
    action: (): void => undefined,
  }));
}

@Component({
  selector: 'app-lsp-date',
  standalone: true,
  imports: [FormsModule, DateComponent],
  template: `
    <ui-date label="Go-live date" [(ngModel)]="goLive" [ngModelOptions]="{ standalone: true }" />
  `,
})
export class LspDatePreviewComponent {
  protected goLive = '2026-05-12';
}

@Component({
  selector: 'app-lsp-datetime',
  standalone: true,
  imports: [FormsModule, DatetimeComponent],
  template: `
    <ui-datetime
      label="Incident start"
      [(ngModel)]="value"
      [ngModelOptions]="{ standalone: true }"
    />
  `,
})
export class LspDatetimePreviewComponent {
  protected value = '2026-05-12 14:30';
}

@Component({
  selector: 'app-lsp-month',
  standalone: true,
  imports: [FormsModule, MonthComponent],
  template: `
    <ui-month label="Fiscal period" [(ngModel)]="fiscal" [ngModelOptions]="{ standalone: true }" />
  `,
})
export class LspMonthPreviewComponent {
  protected fiscal = '2026-05';
}

@Component({
  selector: 'app-lsp-week',
  standalone: true,
  imports: [FormsModule, WeekComponent],
  template: `
    <ui-week
      label="Reporting week"
      [(ngModel)]="weekLive"
      [ngModelOptions]="{ standalone: true }"
    />
  `,
})
export class LspWeekPreviewComponent {
  protected weekLive = '2026-W19';
}

@Component({
  selector: 'app-lsp-date-range',
  standalone: true,
  imports: [FormsModule, DateRangeComponent],
  template: `
    <ui-date-range
      label="Invoice export window"
      [(ngModel)]="value"
      [ngModelOptions]="{ standalone: true }"
    />
  `,
})
export class LspDateRangePreviewComponent {
  protected value: DateRange | null = { startDate: '2026-05-12', endDate: '2026-05-18' };
}

@Component({
  selector: 'app-lsp-dialog',
  standalone: true,
  imports: [ButtonComponent, DialogComponent],
  template: `
    <ui-button type="button" variant="secondary" appearance="outline" (click)="visible.set(true)"
      >Rename</ui-button
    >
    <ui-dialog
      title="Rename production API key?"
      [(visible)]="visible"
      [primaryAction]="primaryAction()"
      [secondaryAction]="secondaryAction()"
    >
      <p>
        Partners embed this label in audit logs. Changing it updates documentation links within five
        minutes.
      </p>
    </ui-dialog>
  `,
})
export class LspDialogPreviewComponent {
  protected readonly visible = model(false);

  protected readonly primaryAction = signal<QuickAction>({
    label: 'Rename key',
    variant: 'primary',
    action: () => this.visible.set(false),
  });

  protected readonly secondaryAction = signal<QuickAction>({
    label: 'Keep editing',
    variant: 'secondary',
    action: () => this.visible.set(false),
  });
}

@Component({
  selector: 'app-lsp-divider',
  standalone: true,
  imports: [DividerComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;min-width:0">
      <ui-divider text="Overview section" alignment="start" />
      <ui-divider text="Section break" alignment="center" />
      <ui-divider text="Follow-up section" alignment="end" />
      <div
        style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0.75rem;width:100%"
      >
        @for (align of verticalDemo; track align.label) {
          <div
            style="display:flex;justify-content:center;align-items:stretch;min-height:5rem;padding:0.35rem;border-radius:0.5rem;background:var(--color-neutral-background2-rest)"
          >
            <ui-divider [text]="align.label" orientation="vertical" [alignment]="align.alignment" />
          </div>
        }
      </div>
    </div>
  `,
})
export class LspDividerPreviewComponent {
  protected readonly verticalDemo: ReadonlyArray<{
    label: string;
    alignment: 'start' | 'center' | 'end';
  }> = [
    { label: 'Left rail', alignment: 'start' },
    { label: 'Canvas', alignment: 'center' },
    { label: 'Inspector', alignment: 'end' },
  ];
}

@Component({
  selector: 'app-lsp-dropdown',
  standalone: true,
  imports: [FormsModule, DropdownComponent],
  template: `
    <ui-dropdown
      label="Primary notification route"
      placeholder="Choose environment"
      [items]="items"
      [searchable]="true"
      [(ngModel)]="selected"
      [ngModelOptions]="{ standalone: true }"
    />
  `,
})
export class LspDropdownPreviewComponent {
  protected readonly items = LSP_DROPDOWN_ITEMS;
  protected selected = 'staging';
}

@Component({
  selector: 'app-lsp-drawer',
  standalone: true,
  imports: [ButtonComponent, DrawerComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.5rem;width:100%;min-width:0">
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
        <ui-button
          type="button"
          appearance="outline"
          variant="secondary"
          (click)="overlayVisible.set(true)"
        >
          Escalations inbox
        </ui-button>
        <ui-button
          type="button"
          appearance="outline"
          variant="secondary"
          (click)="inlineVisible.set(true)"
        >
          Routing rules
        </ui-button>
      </div>
      <div
        style="display:flex;min-height:10rem;align-items:stretch;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background2-rest);overflow:hidden"
      >
        <div
          style="flex:1;min-width:0;padding:0.5rem 0.75rem;font-size:0.8125rem;line-height:1.5;color:var(--color-neutral-foreground2-rest)"
        >
          <strong
            style="color:var(--color-neutral-foreground-rest);display:block;margin-bottom:0.35rem"
            >Alert routing workspace</strong
          >
          Inline drawers excel at inspectors beside editors — tweak webhook retries without covering
          your timeline graph.
        </div>
        <ui-drawer
          title="Slack routing"
          type="inline"
          position="right"
          size="small"
          [(visible)]="inlineVisible"
          [primaryAction]="inlineDone()"
        >
          <p
            style="margin:0;font-size:0.875rem;line-height:1.55;color:var(--color-neutral-foreground-rest)"
          >
            Mirror Sev‑1 incidents to #payments-war-room while piping Sev‑2 items into weekly digest
            threads only.
          </p>
        </ui-drawer>
      </div>
    </div>
    <ui-drawer
      title="Discard unpublished playbook edits?"
      type="overlay"
      [(visible)]="overlayVisible"
      [primaryAction]="overlayDone()"
    >
      <p>Four collaborators rely on this draft during rollout rehearsal tomorrow afternoon.</p>
    </ui-drawer>
  `,
})
export class LspDrawerPreviewComponent {
  protected readonly overlayVisible = model(false);
  protected readonly inlineVisible = model(false);

  protected readonly inlineDone = signal<QuickAction>({
    label: 'Save routing',
    variant: 'primary',
    action: () => this.inlineVisible.set(false),
  });

  protected readonly overlayDone = signal<QuickAction>({
    label: 'Keep editing',
    variant: 'primary',
    action: () => this.overlayVisible.set(false),
  });
}

@Component({
  selector: 'app-lsp-email',
  standalone: true,
  imports: [FormsModule, EmailComponent],
  template: `
    <ui-email
      label="Billing notifications"
      placeholder="finance@company.com"
      [(ngModel)]="value"
      [ngModelOptions]="{ standalone: true }"
    />
  `,
})
export class LspEmailPreviewComponent {
  protected value = 'finance-alerts@northridge.io';
}

@Component({
  selector: 'app-lsp-empty-state',
  standalone: true,
  imports: [EmptyStateComponent],
  template: `
    <ui-empty-state
      title="No sandbox deployments yet"
      description="Ship this branch to an isolated stack to replay billing webhooks with anonymized payloads before customers see changes."
      icon="rocket"
      [primaryAction]="primaryAction"
    />
  `,
})
export class LspEmptyStatePreviewComponent {
  protected readonly primaryAction: QuickAction = {
    label: 'Create sandbox deploy',
    variant: 'primary',
    action: (): void => undefined,
  };
}

@Component({
  selector: 'app-lsp-error-state',
  standalone: true,
  imports: [ErrorStateComponent],
  template: `
    <ui-error-state
      title="Balances refused to refresh"
      description="Stripe returned HTTP 503 — correlation ID 8f3c2d91. Finance workflows paused automatically."
      icon="warning"
      size="small"
      [primaryAction]="retryAction"
    />
  `,
})
export class LspErrorStatePreviewComponent {
  protected readonly retryAction: QuickAction = {
    label: 'Retry sync',
    variant: 'primary',
    action: (): void => undefined,
  };
}

@Component({
  selector: 'app-lsp-file',
  standalone: true,
  imports: [FileComponent],
  template: ` <ui-file label="Attach signed invoice (PDF)" accept=".pdf" /> `,
})
export class LspFilePreviewComponent {}

@Component({
  selector: 'app-lsp-icon',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.5rem;width:100%;min-width:0">
      <span
        style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest);align-self:flex-end"
        >{{ icons.length }} / {{ iconsInSprite }} icons</span
      >
      <div
        style="display:grid;grid-template-columns:repeat(auto-fill,minmax(1.875rem,1fr));gap:0.55rem 0.65rem;align-items:center;justify-items:center;color:var(--color-brand-primary);width:100%;min-width:0"
      >
        @for (item of icons; track $index) {
          <ui-icon [icon]="item.icon" size="medium" [variant]="item.variant" />
        }
      </div>
    </div>
  `,
})
export class LspIconPreviewComponent {
  protected readonly iconsInSprite = ALL_ICON_NAMES.length;
  protected readonly icons: readonly {
    readonly icon: IconName;
    readonly variant: 'regular' | 'filled';
  }[] = [
    { icon: 'shield_checkmark', variant: 'regular' },
    { icon: 'data_pie', variant: 'filled' },
    { icon: 'people_community', variant: 'regular' },
    { icon: 'megaphone', variant: 'filled' },
    { icon: 'lightbulb', variant: 'regular' },
    { icon: 'trophy', variant: 'filled' },
    { icon: 'add_circle', variant: 'filled' },
    { icon: 'alert_urgent', variant: 'regular' },
    { icon: 'apps_settings', variant: 'filled' },
    { icon: 'archive_clock', variant: 'regular' },
    { icon: 'arrow_forward', variant: 'filled' },
    { icon: 'bookmark', variant: 'regular' },
    { icon: 'briefcase', variant: 'filled' },
    { icon: 'calendar', variant: 'regular' },
    { icon: 'camera', variant: 'filled' },
    { icon: 'chat', variant: 'regular' },
    { icon: 'clipboard_task', variant: 'filled' },
    { icon: 'cloud_sync', variant: 'regular' },
    { icon: 'code', variant: 'filled' },
    { icon: 'collections', variant: 'regular' },
    { icon: 'desktop', variant: 'filled' },
    { icon: 'document_pdf', variant: 'regular' },
    { icon: 'globe', variant: 'filled' },
    { icon: 'home', variant: 'regular' },
    { icon: 'key', variant: 'filled' },
    { icon: 'lock_closed', variant: 'regular' },
    { icon: 'money', variant: 'filled' },
    { icon: 'note', variant: 'regular' },
    { icon: 'phone', variant: 'filled' },
    { icon: 'pin', variant: 'regular' },
    { icon: 'print', variant: 'filled' },
    { icon: 'puzzle_piece', variant: 'regular' },
    { icon: 'search', variant: 'filled' },
    { icon: 'settings', variant: 'regular' },
    { icon: 'share', variant: 'filled' },
    { icon: 'star', variant: 'regular' },
    { icon: 'tag', variant: 'filled' },
    { icon: 'wifi_off', variant: 'regular' },
    { icon: 'building', variant: 'filled' },
    { icon: 'checkmark_circle', variant: 'regular' },
    { icon: 'clipboard_paste', variant: 'filled' },
    { icon: 'flag', variant: 'regular' },
    { icon: 'sparkle', variant: 'filled' },
    { icon: 'video', variant: 'regular' },
    { icon: 'mail', variant: 'filled' },
    { icon: 'image', variant: 'regular' },
    { icon: 'filter', variant: 'filled' },
    { icon: 'info', variant: 'regular' },
    { icon: 'delete', variant: 'filled' },
    { icon: 'airplane', variant: 'regular' },
    { icon: 'animal_cat', variant: 'filled' },
    { icon: 'approvals_app', variant: 'regular' },
    { icon: 'attach', variant: 'filled' },
    { icon: 'backpack', variant: 'regular' },
    { icon: 'battery_10', variant: 'filled' },
    { icon: 'bookmark_add', variant: 'regular' },
    { icon: 'bookmark_off', variant: 'filled' },
    { icon: 'bubble_multiple', variant: 'regular' },
    { icon: 'certificate', variant: 'filled' },
    { icon: 'clipboard_bullet_list', variant: 'regular' },
    { icon: 'compass_northwest', variant: 'filled' },
    { icon: 'cube', variant: 'regular' },
    { icon: 'cube_add', variant: 'filled' },
    { icon: 'cube_link', variant: 'regular' },
    { icon: 'dentist', variant: 'filled' },
    { icon: 'diagram', variant: 'regular' },
    { icon: 'dock', variant: 'filled' },
    { icon: 'elevator', variant: 'regular' },
    { icon: 'error_circle', variant: 'filled' },
    { icon: 'fluid', variant: 'regular' },
    { icon: 'folder', variant: 'filled' },
    { icon: 'gift', variant: 'regular' },
    { icon: 'grid', variant: 'filled' },
    { icon: 'hand_left', variant: 'regular' },
    { icon: 'immersive_reader', variant: 'filled' },
    { icon: 'add', variant: 'regular' },
    { icon: 'alert', variant: 'filled' },
    { icon: 'apps', variant: 'regular' },
    { icon: 'archive', variant: 'filled' },
    { icon: 'arrow_download', variant: 'regular' },
    { icon: 'arrow_upload', variant: 'filled' },
    { icon: 'book', variant: 'regular' },
    { icon: 'bot', variant: 'filled' },
    { icon: 'caret_down', variant: 'regular' },
    { icon: 'caret_left', variant: 'filled' },
    { icon: 'caret_right', variant: 'regular' },
    { icon: 'cart', variant: 'filled' },
    { icon: 'cast', variant: 'regular' },
    { icon: 'classification', variant: 'filled' },
    { icon: 'clipboard_checkmark', variant: 'regular' },
    { icon: 'battery_saver', variant: 'filled' },
    { icon: 'cookies', variant: 'regular' },
    { icon: 'desk', variant: 'filled' },
    { icon: 'dual_screen', variant: 'regular' },
    { icon: 'earth', variant: 'filled' },
    { icon: 'eyedropper', variant: 'regular' },
    { icon: 'fast_forward', variant: 'filled' },
    { icon: 'fingerprint', variant: 'regular' },
    { icon: 'flip_horizontal', variant: 'filled' },
    { icon: 'gauge', variant: 'regular' },
    { icon: 'gauge_add', variant: 'filled' },
    { icon: 'handshake', variant: 'regular' },
    { icon: 'hdr', variant: 'filled' },
    { icon: 'highlight', variant: 'regular' },
    { icon: 'edit', variant: 'filled' },
    { icon: 'microscope', variant: 'regular' },
    { icon: 'wrench_screwdriver', variant: 'filled' },
    { icon: 'bluetooth_connected', variant: 'regular' },
    { icon: 'rocket', variant: 'filled' },
    { icon: 'bluetooth', variant: 'regular' },
    { icon: 'database_search', variant: 'filled' },
    { icon: 'premium', variant: 'regular' },
    { icon: 'ribbon', variant: 'filled' },
    { icon: 'wrench', variant: 'regular' },
    { icon: 'heart', variant: 'filled' },
    { icon: 'history', variant: 'regular' },
    { icon: 'learning_app', variant: 'filled' },
    { icon: 'library', variant: 'regular' },
    { icon: 'link', variant: 'filled' },
    { icon: 'mailbox', variant: 'regular' },
    { icon: 'meet_now', variant: 'filled' },
    { icon: 'shield_error', variant: 'regular' },
    { icon: 'speaker_2', variant: 'filled' },
    { icon: 'sport_soccer', variant: 'regular' },
    { icon: 'step', variant: 'filled' },
    { icon: 'stop', variant: 'regular' },
    { icon: 'subtract', variant: 'filled' },
    { icon: 'subtract_circle', variant: 'regular' },
    { icon: 'subtract_square', variant: 'filled' },
    { icon: 'subtract_square_multiple', variant: 'regular' },
    { icon: 'subtract_parentheses', variant: 'filled' },
    { icon: 'tablet', variant: 'regular' },
    { icon: 'target', variant: 'filled' },
    { icon: 'temperature', variant: 'regular' },
    { icon: 'text_bullet_list_square', variant: 'filled' },
    { icon: 'umbrella', variant: 'regular' },
    { icon: 'usb_plug', variant: 'filled' },
    { icon: 'wand', variant: 'regular' },
    { icon: 'weather_sunny_high', variant: 'filled' },
  ];
}

@Component({
  selector: 'app-lsp-kbd',
  standalone: true,
  imports: [KbdComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.85rem;width:100%;min-width:0">
      <div style="display:flex;flex-wrap:wrap;gap:0.45rem;align-items:center">
        <ui-kbd [keys]="['⌘', 'K']" size="small" appearance="filled" />
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Open palette</span
        >
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.45rem;align-items:center">
        <ui-kbd [keys]="['Ctrl', 'Shift', 'P']" appearance="filled" />
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Command palette (Win)</span
        >
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.45rem;align-items:center">
        <ui-kbd text="↑" size="large" />
        <ui-kbd text="↓" size="large" appearance="filled" />
        <ui-kbd text="Enter" size="large" />
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >List navigation</span
        >
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.45rem;align-items:center">
        <ui-kbd text="Esc" appearance="filled" />
        <ui-kbd text="/" />
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Close · focus search</span
        >
      </div>
    </div>
  `,
})
export class LspKbdPreviewComponent {}

@Component({
  selector: 'app-lsp-loading-state',
  standalone: true,
  imports: [LoadingStateComponent],
  template: `
    <ui-loading-state
      title="Normalizing ledger entries"
      description="Applying payouts captured since midnight UTC — safe to keep navigating."
    />
  `,
})
export class LspLoadingStatePreviewComponent {}

@Component({
  selector: 'app-lsp-message-bar',
  standalone: true,
  imports: [MessageBarComponent],
  template: `
    <ui-message-bar
      title="Customer billing portal moved"
      message="DNS cutover finished — remind CX teams to share docs.billing.northridge.com starting Monday."
      variant="info"
      appearance="tint"
    />
  `,
})
export class LspMessageBarPreviewComponent {}

@Component({
  selector: 'app-lsp-menu',
  standalone: true,
  imports: [MenuComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
      <ui-menu
        triggerVariant="dropdown"
        text="Workspace"
        icon="apps"
        [menuItems]="items"
        appearance="filled"
        variant="primary"
      />
      <ui-menu
        text="Share"
        icon="share"
        [menuItems]="shareItems"
        appearance="subtle"
        variant="secondary"
      />
      <ui-menu
        triggerVariant="split"
        text="Export"
        icon="save"
        [menuItems]="exportItems"
        appearance="outline"
        variant="secondary"
      />
    </div>
  `,
})
export class LspMenuPreviewComponent {
  protected readonly items = LSP_MENU_ITEMS;
  protected readonly exportItems = [
    { id: 'export-csv', label: 'Export CSV' },
    { id: 'export-pdf', label: 'Export PDF' },
    { id: 'export-xlsx', label: 'Export XLSX' },
  ];
  protected readonly shareItems = [
    { id: 'share-link', label: 'Share link' },
    { id: 'share-email', label: 'Share email' },
    { id: 'share-sms', label: 'Share SMS' },
  ];
}
