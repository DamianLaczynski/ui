import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { delay, of } from 'rxjs';
import {
  ButtonComponent,
  CardComponent,
  NavComponent,
  NavNode,
  NodeComponent,
  Node as UiNode,
  NumberComponent,
  PaginationComponent,
  PaginationConfig,
  PasswordComponent,
  ProgressBarComponent,
  RadioButtonGroupComponent,
  RadioButtonItem,
  RatingComponent,
  RangeComponent,
  NumericRange,
  ScrollContainerComponent,
  ScrollContainerDataSource,
  ScrollPanelComponent,
  SearchComponent,
  SkeletonComponent,
  SliderComponent,
  SpeedDialComponent,
  SpinnerComponent,
  SplitterComponent,
  SplitterPanelDirective,
  SplitterPanel,
  SplitterResizeEvent,
  Step,
  StepperComponent,
  SwitchComponent,
  TableOfContentComponent,
  Tab,
  TabsComponent,
  TagComponent,
  TelComponent,
  TextareaComponent,
  TextComponent,
  TimeComponent,
  TimePickerComponent,
  TimeSpanComponent,
  ToastComponent,
  ToolbarComponent,
  ToolbarItem,
  TooltipDirective,
  TotpComponent,
  TreeComponent,
  TreeNode,
  TreeNodeComponent,
  UrlComponent,
  MenuComponent,
  MenuItem,
  ContextMenuDirective,
  PopoverDirective,
  TimelineComponent,
  type TimelineItem,
} from 'ui';
import { LSP_SPEED_DIAL_ITEMS } from './landing-surface-previews.shared';

interface LspScrollRow {
  id: number;
  label: string;
  icon: UiNode['icon'];
}

@Component({
  selector: 'app-lsp-nav',
  standalone: true,
  imports: [NavComponent],
  template: ` <ui-nav [items]="items" [autoScrollToSelected]="false" /> `,
})
export class LspNavPreviewComponent {
  protected readonly items: NavNode[] = [
    { id: 'main-header', label: 'Main', isSectionHeader: true },
    { id: 'dash', label: 'Overview', icon: 'home' },
    { id: 'projects', label: 'Projects', icon: 'folder', selected: true },
    { id: 'people', label: 'People & access', icon: 'people' },
    { id: 'insights', label: 'Insights', icon: 'data_histogram' },
    { id: 'divider-1', label: 'divider', isDivider: true },
    { id: 'work-header', label: 'Workspaces', isSectionHeader: true },
    { id: 'workspace-1', label: 'Workspace 1', icon: 'folder' },
    { id: 'workspace-2', label: 'Workspace 2', icon: 'folder' },
    { id: 'workspace-3', label: 'Workspace 3', icon: 'folder' },
    { id: 'divider-2', label: 'divider', isDivider: true },
    { id: 'admin-header', label: 'Administration', isSectionHeader: true },
    { id: 'billing', label: 'Billing', icon: 'wallet' },
    { id: 'security', label: 'Security', icon: 'shield', disabled: true },
  ];
}

@Component({
  selector: 'app-lsp-node',
  standalone: true,
  imports: [NodeComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.5rem;width:100%;min-width:0">
      <ui-node [node]="nodes.basic" appearance="subtle" />
      <ui-node
        [node]="nodes.selectedOutline"
        size="small"
        variant="secondary"
        appearance="subtle"
        shape="square"
        [showSelectionIndicator]="true"
        indicatorPosition="horizontal"
      />
      <ui-node
        [node]="nodes.disabledDanger"
        size="large"
        variant="danger"
        appearance="filled"
        shape="rounded"
      />
      <ui-node
        [node]="nodes.closableQuick"
        [asButton]="true"
        variant="primary"
        appearance="tint"
        shape="circular"
      />
    </div>
  `,
})
export class LspNodePreviewComponent {
  protected readonly nodes = {
    basic: {
      id: 'n-basic',
      label: 'Quarterly revenue workbook.xlsx',
      icon: 'document' as const,
    },
    selectedOutline: {
      id: 'n-outline',
      label: 'Pinned inspector route',
      icon: 'pin' as const,
      selected: true,
    },
    disabledDanger: {
      id: 'n-dis',
      label: 'Revoked signing key',
      icon: 'shield_error' as const,
      disabled: true,
    },
    closableQuick: {
      id: 'n-qa',
      label: 'EU rollout',
      icon: 'rocket' as const,
    },
  };
}

@Component({
  selector: 'app-lsp-number',
  standalone: true,
  imports: [FormsModule, NumberComponent],
  template: `
    <ui-number label="Licensed seats" [(ngModel)]="value" [ngModelOptions]="{ standalone: true }" />
  `,
})
export class LspNumberPreviewComponent {
  protected value: number | null = 48;
}

@Component({
  selector: 'app-lsp-pagination',
  standalone: true,
  imports: [PaginationComponent],
  template: `
    <ui-pagination [config]="paginationConfig()" (pageChange)="currentPage.set($event)" />
  `,
})
export class LspPaginationPreviewComponent {
  protected readonly currentPage = signal(3);

  protected readonly base: PaginationConfig = {
    currentPage: 3,
    totalPages: 12,
    totalItems: 234,
    pageSize: 20,
    showPageNumbers: true,
    maxVisiblePages: 7,
    showFirstLast: false,
    showInfo: true,
    showPageSizeSelector: false,
  };

  protected readonly paginationConfig = computed<PaginationConfig>(() => ({
    ...this.base,
    currentPage: this.currentPage(),
  }));
}

@Component({
  selector: 'app-lsp-password',
  standalone: true,
  imports: [FormsModule, PasswordComponent],
  template: `
    <ui-password
      label="Workspace password"
      [(ngModel)]="value"
      [ngModelOptions]="{ standalone: true }"
    />
  `,
})
export class LspPasswordPreviewComponent {
  protected value = '';
}

@Component({
  selector: 'app-lsp-progress-bar',
  standalone: true,
  imports: [ProgressBarComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.35rem;width:100%">
      <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
        >Uploading token bundle · 64%</span
      >
      <ui-progress-bar
        variant="primary"
        size="medium"
        type="determinate"
        [value]="64"
        ariaLabel="Upload progress"
      />
    </div>
  `,
})
export class LspProgressBarPreviewComponent {}

@Component({
  selector: 'app-lsp-radio-button-group',
  standalone: true,
  imports: [FormsModule, RadioButtonGroupComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%">
      <ui-radio-button-group
        label="Billing cadence"
        [items]="outlineItems"
        [(ngModel)]="outlineValue"
        [ngModelOptions]="{ standalone: true }"
        variant="secondary"
        appearance="outline"
      />
      <ui-radio-button-group
        label="Pager routing"
        [items]="filledItems"
        [(ngModel)]="filledValue"
        [ngModelOptions]="{ standalone: true }"
        variant="primary"
        appearance="filled"
      />
    </div>
  `,
})
export class LspRadioButtonGroupPreviewComponent {
  protected outlineValue = 'annual';

  protected filledValue = 'sms';

  protected readonly outlineItems: RadioButtonItem[] = [
    { id: 'monthly', label: 'Monthly', value: 'monthly' },
    { id: 'annual', label: 'Annual · save 18%', value: 'annual' },
    { id: 'enterprise', label: 'Enterprise invoicing', value: 'enterprise' },
  ];

  protected readonly filledItems: RadioButtonItem[] = [
    { id: 'sms', label: 'SMS + voice bridge', value: 'sms' },
    { id: 'email', label: 'Ops distribution list', value: 'email' },
    { id: 'slack', label: '#platform-incidents', value: 'slack' },
  ];
}

@Component({
  selector: 'app-lsp-rating',
  standalone: true,
  imports: [RatingComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.35rem;width:100%">
      <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
        >Pilot customer satisfaction</span
      >
      <ui-rating
        [value]="value()"
        [max]="5"
        [showValue]="false"
        (valueChange)="value.set($event)"
      />
    </div>
  `,
})
export class LspRatingPreviewComponent {
  protected readonly value = signal(3);
}

@Component({
  selector: 'app-lsp-scroll-container',
  standalone: true,
  imports: [ScrollContainerComponent],
  template: `
    <ui-scroll-container
      [dataSource]="dataSource"
      [pageSize]="10"
      maxHeight="22rem"
      nodeSize="medium"
      appearance="subtle"
      shape="rounded"
    />
  `,
})
export class LspScrollContainerPreviewComponent {
  protected readonly dataSource: ScrollContainerDataSource<LspScrollRow> = (page, pageSize) => {
    const start = (page - 1) * pageSize + 1;
    const items = Array.from({ length: pageSize }, (_, index) => {
      const id = start + index;
      const descriptors = [
        { label: `Enterprise rollout · cohort ${id}`, icon: 'building' as const },
        { label: `Partner sandbox invoice #${4200 + id}`, icon: 'receipt' as const },
        {
          label: `Webhook replay job ${id.toString().padStart(4, '0')}`,
          icon: 'arrow_sync' as const,
        },
      ];
      const pick = descriptors[id % descriptors.length];
      return {
        id,
        label: pick.label,
        icon: pick.icon as UiNode['icon'],
      };
    });
    return of({
      items,
      hasNextPage: page < 3,
      hasPreviousPage: page > 1,
      totalCount: 30,
    }).pipe(delay(150));
  };
}

@Component({
  selector: 'app-lsp-scroll-panel',
  standalone: true,
  imports: [ScrollPanelComponent],
  template: `
    <ui-scroll-panel maxHeight="14rem" scrollbarBehavior="always" ariaLabel="Workspace activity">
      <div style="display:flex;flex-direction:column;gap:0.5rem">
        @for (entry of items; track entry.id) {
          <div
            style="padding:0.5rem 0.65rem;border-radius:0.5rem;background:var(--color-neutral-background2-rest);font-size:0.8125rem;line-height:1.45;color:var(--color-neutral-foreground-rest)"
          >
            {{ entry.text }}
          </div>
        }
      </div>
    </ui-scroll-panel>
  `,
})
export class LspScrollPanelPreviewComponent {
  protected readonly items = [
    { id: 1, text: 'Jordan exported disputed charges · 2 min ago' },
    { id: 2, text: 'Webhook latency dipped below 120 ms · 18 min ago' },
    { id: 3, text: 'Finance approved SOC report attachment · 1 hr ago' },
    { id: 4, text: 'Automations paused for Region EU-West · 3 hr ago' },
    { id: 5, text: 'Playwright smoke suite succeeded · Today · 06:42 UTC' },
    { id: 6, text: 'Design QA signed off hero illustrations · Yesterday' },
    { id: 7, text: 'Stripe payout reconciliation finished · 09:18 UTC' },
    { id: 8, text: 'Incident #4821 marked resolved · monitoring extended 24h' },
    { id: 9, text: 'Policy bundle v2026.05 published to staging · draft review' },
    { id: 10, text: 'Calendar sync repaired for 14 affected tenants · rollout 40%' },
    { id: 11, text: 'Backup verification job completed · all regions green' },
    { id: 12, text: 'Rate limit tuning deployed to edge POPs · Asia-Pacific' },
  ];
}

@Component({
  selector: 'app-lsp-search',
  standalone: true,
  imports: [FormsModule, SearchComponent],
  template: `
    <ui-search
      [(ngModel)]="query"
      [ngModelOptions]="{ standalone: true }"
      placeholder="Search components, APIs, or guidance…"
    />
  `,
})
export class LspSearchPreviewComponent {
  protected query = '';
}

@Component({
  selector: 'app-lsp-skeleton',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <div
      style="width:100%;max-width:20rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem;padding:0.85rem;background:var(--color-neutral-background-rest);display:flex;flex-direction:column;gap:0.75rem"
    >
      <div style="display:flex;gap:0.65rem;align-items:flex-start">
        <ui-skeleton shape="circular" width="2.5rem" height="2.5rem" />
        <div style="flex:1;display:flex;flex-direction:column;gap:0.35rem;min-width:0">
          <ui-skeleton width="52%" height="0.75rem" />
          <ui-skeleton width="72%" height="0.65rem" />
          <ui-skeleton width="38%" height="0.65rem" />
        </div>
      </div>
      <ui-skeleton width="100%" height="4.25rem" shape="rounded" />
      <div style="display:flex;gap:0.5rem;margin-top:0.15rem">
        <ui-skeleton width="4.5rem" height="1.85rem" shape="rounded" />
        <ui-skeleton width="5rem" height="1.85rem" shape="rounded" />
      </div>
    </div>
  `,
})
export class LspSkeletonPreviewComponent {}

@Component({
  selector: 'app-lsp-slider',
  standalone: true,
  imports: [FormsModule, SliderComponent],
  template: `
    <ui-slider
      label="Canary rollout"
      [min]="0"
      [max]="100"
      [(ngModel)]="value"
      [ngModelOptions]="{ standalone: true }"
    />
  `,
})
export class LspSliderPreviewComponent {
  protected value = 35;
}

@Component({
  selector: 'app-lsp-speed-dial',
  standalone: true,
  imports: [SpeedDialComponent],
  template: `
    <div style="display:flex;justify-content:center;padding:0.5rem">
      <ui-speed-dial
        dialType="circle"
        [itemSizePx]="40"
        [gap]="6"
        [items]="items"
        [triggerButtonProps]="{ variant: 'primary', appearance: 'filled', shape: 'circular' }"
        ariaLabel="Capture task or refresh metrics"
      />
    </div>
  `,
})
export class LspSpeedDialPreviewComponent {
  protected readonly items = LSP_SPEED_DIAL_ITEMS;
}

@Component({
  selector: 'app-lsp-range',
  standalone: true,
  imports: [FormsModule, RangeComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1.25rem;width:100%">
      <ui-range
        label="Support desk hours"
        [min]="0"
        [max]="24"
        [step]="1"
        [showMinMax]="true"
        [formatValue]="formatHour"
        [(ngModel)]="quietHours"
        [ngModelOptions]="{ standalone: true }"
        [ariaValueText]="getAriaValueText"
      />
      <ui-range
        label="Latency budget (p95)"
        [min]="0"
        [max]="400"
        [step]="50"
        [showStepMarkers]="true"
        [showMinMax]="true"
        [formatValue]="formatMs"
        [(ngModel)]="latency"
        [ngModelOptions]="{ standalone: true }"
        [ariaValueText]="getAriaLatencyText"
      />
    </div>
  `,
})
export class LspRangePreviewComponent {
  protected quietHours: NumericRange = { min: 8, max: 18 };
  protected latency: NumericRange = { min: 50, max: 200 };

  protected readonly formatHour = (value: number) => `${String(value).padStart(2, '0')}:00`;

  protected readonly formatMs = (value: number) => `${value} ms`;

  protected readonly getAriaValueText = (value: NumericRange) =>
    `From ${this.formatHour(value.min)} to ${this.formatHour(value.max)}`;

  protected readonly getAriaLatencyText = (value: NumericRange) =>
    `Between ${this.formatMs(value.min)} and ${this.formatMs(value.max)}`;
}

@Component({
  selector: 'app-lsp-spinner',
  standalone: true,
  imports: [SpinnerComponent],
  template: `
    <div
      style="display:grid;width:100%;grid-template-columns:repeat(3,minmax(0,1fr));gap:0.85rem 1rem;align-items:start;box-sizing:border-box"
    >
      <div
        style="display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:0.45rem;min-width:0;width:100%;text-align:center;padding:0.35rem 0"
      >
        <ui-spinner
          variant="primary"
          size="medium"
          labelPosition="below"
          label="Syncing ledger rows…"
        />
      </div>
      <div
        style="display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:0.45rem;min-width:0;width:100%;text-align:center;padding:0.35rem 0"
      >
        <ui-spinner
          variant="success"
          size="large"
          labelPosition="above"
          label="Healthy pipelines"
        />
      </div>
      <div
        style="display:flex;align-items:center;justify-content:center;min-width:0;width:100%;padding:0.35rem 0"
      >
        <div style="display:flex;justify-content:center;max-width:100%">
          <ui-spinner
            variant="secondary"
            size="extra-small"
            labelPosition="after"
            label="Queued export jobs"
          />
        </div>
      </div>
    </div>
  `,
})
export class LspSpinnerPreviewComponent {}

@Component({
  selector: 'app-lsp-splitter',
  standalone: true,
  imports: [SplitterComponent, SplitterPanelDirective],
  template: `
    <div
      style="height:14rem;border-radius:0.75rem;overflow:hidden;border:1px solid var(--color-neutral-stroke-rest)"
    >
      <ui-splitter
        [panels]="panels()"
        orientation="horizontal"
        [gutterSize]="8"
        (panelResize)="onResize($event)"
      >
        <ng-template uiSplitterPanel="sidebar">
          <div
            style="height:100%;padding:0.75rem;font-size:0.8125rem;line-height:1.45;color:var(--color-neutral-foreground2-rest)"
          >
            <strong
              style="color:var(--color-neutral-foreground-rest);display:block;margin-bottom:0.35rem"
              >Collections</strong
            >
            Saved cohorts, tags, and pinned dashboards surface here for analysts.
          </div>
        </ng-template>
        <ng-template uiSplitterPanel="canvas">
          <div
            style="height:100%;padding:0.75rem;font-size:0.8125rem;line-height:1.45;color:var(--color-neutral-foreground2-rest)"
          >
            <strong
              style="color:var(--color-neutral-foreground-rest);display:block;margin-bottom:0.35rem"
              >Workspace canvas</strong
            >
            Drag charts, annotate anomalies, and invite reviewers inline.
          </div>
        </ng-template>
        <ng-template uiSplitterPanel="inspector">
          <div
            style="height:100%;padding:0.75rem;font-size:0.8125rem;line-height:1.45;color:var(--color-neutral-foreground2-rest)"
          >
            <strong
              style="color:var(--color-neutral-foreground-rest);display:block;margin-bottom:0.35rem"
              >Signal inspector</strong
            >
            Contextual metrics, lineage, and ownership details stay docked beside selections.
          </div>
        </ng-template>
      </ui-splitter>
    </div>
  `,
})
export class LspSplitterPreviewComponent {
  protected readonly panels = signal<SplitterPanel[]>([
    { id: 'sidebar', size: 28, minSize: 96, maxSize: 280 },
    { id: 'canvas', size: 50, minSize: 160 },
    { id: 'inspector', size: 22, minSize: 96, maxSize: 320 },
  ]);

  protected onResize(_event: SplitterResizeEvent): void {}
}

interface LspStepperWizardStep extends Step {
  eyebrow: string;
  body: string;
}

@Component({
  selector: 'app-lsp-stepper',
  standalone: true,
  imports: [StepperComponent, CardComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;min-width:0">
      <ui-stepper
        [steps]="steps"
        [activeStepIndex]="active()"
        [clickable]="true"
        (stepChange)="active.set($event.index)"
      />
      @if (wizardSteps[active()]; as panel) {
        <ui-card
          appearance="outline"
          [ariaLabel]="'Step content: ' + panel.label"
          [style.flexShrink]="0"
          [style.minWidth]="0"
        >
          <div uiCardHeader style="display:flex;flex-direction:column;gap:0.35rem">
            <span
              style="font-size:0.6875rem;font-weight:600;color:var(--color-brand-primary);text-transform:uppercase;letter-spacing:0.06em"
              >{{ panel.eyebrow }}</span
            >
            <strong
              style="font-size:0.875rem;line-height:1.35;color:var(--color-neutral-foreground-rest)"
              >{{ panel.label }}</strong
            >
          </div>
          <div
            uiCardBody
            style="margin:0;font-size:0.875rem;line-height:1.55;color:var(--color-neutral-foreground2-rest)"
          >
            {{ panel.body }}
          </div>
        </ui-card>
      }
    </div>
  `,
})
export class LspStepperPreviewComponent {
  protected readonly wizardSteps: readonly LspStepperWizardStep[] = [
    {
      id: 'repo',
      label: 'Connect repository',
      eyebrow: 'Source control',
      body: 'OAuth to GitHub Enterprise, pick northridge-platform, and authorize the webhook worker app with Contents + Metadata read-only scopes.',
    },
    {
      id: 'build',
      label: 'Configure build',
      eyebrow: 'CI pipeline',
      body: 'Select Node 22, enable deterministic installs, attach the preview URL artifact, and keep source maps scoped to staging symbols only.',
    },
    {
      id: 'deploy',
      label: 'Deploy to staging',
      eyebrow: 'PCI cluster',
      body: 'Blue/green on the audited pool: keep canary traffic at ten percent until six hours of soak without failed health probes.',
    },
    {
      id: 'verify',
      label: 'Run smoke checks',
      eyebrow: 'Quality gates',
      body: 'Replay saved fixtures—sign-in flows, Stripe invoice PDF snapshots, and NACHA callback receipts—against the staged origin.',
    },
  ];

  protected readonly steps: Step[] = this.wizardSteps.map(({ id, label }) => ({ id, label }));

  protected readonly active = signal(0);
}

@Component({
  selector: 'app-lsp-switch',
  standalone: true,
  imports: [FormsModule, SwitchComponent],
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.75rem;width:100%;align-items:start"
    >
      <ui-switch
        label="Pager shadows ops channels"
        labelPosition="after"
        [(ngModel)]="pagerEcho"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-switch
        label="Auto-file SOC evidence packs"
        labelPosition="after"
        [(ngModel)]="socPacks"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class LspSwitchPreviewComponent {
  protected pagerEcho = true;
  protected socPacks = false;
}

@Component({
  selector: 'app-lsp-table-of-content',
  standalone: true,
  imports: [TableOfContentComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;width:100%">
      <div style="flex:0 0 11rem">
        <ui-table-of-content containerSelector=".lsp-toc-body" [minLevel]="2" [maxLevel]="3" />
      </div>
      <div class="lsp-toc-body" style="flex:1 1 12rem;color:var(--color-neutral-foreground-rest)">
        <h2
          id="lsp-x"
          style="
            margin: 0 0 0.5rem;
            font-size: 0.875rem;
            font-weight: 600;
            line-height: 1.45;
            color: inherit;
            font-family: inherit;
          "
        >
          Documentation map
        </h2>
        <p
          style="
            margin: 0 0 1rem;
            font-size: 0.875rem;
            line-height: 1.55;
            color: var(--color-neutral-foreground2-rest);
            font-family: inherit;
          "
        >
          Scroll-linked navigation mirrors how customers skim lengthy compliance guides.
        </p>
        <h3
          id="lsp-y"
          style="
            margin: 1rem 0 0.5rem;
            font-size: 0.75rem;
            font-weight: 600;
            line-height: 1.45;
            color: inherit;
            font-family: inherit;
          "
        >
          Developer onboarding
        </h3>
        <p
          style="
            margin: 0;
            font-size: 0.875rem;
            line-height: 1.55;
            color: var(--color-neutral-foreground2-rest);
            font-family: inherit;
          "
        >
          Tokens, theming, and accessibility expectations appear inline without leaving the design
          system surface.
        </p>
      </div>
    </div>
  `,
})
export class LspTableOfContentPreviewComponent {}

@Component({
  selector: 'app-lsp-tabs',
  standalone: true,
  imports: [TabsComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%">
      <ui-tabs
        [tabs]="tabsPrimary"
        [(selectedTabId)]="selectedPrimary"
        appearance="subtle"
        variant="primary"
      />
      <ui-tabs
        [tabs]="tabsSecondary"
        [(selectedTabId)]="selectedSecondary"
        appearance="transparent"
        variant="secondary"
      />
    </div>
  `,
})
export class LspTabsPreviewComponent {
  protected readonly tabsPrimary: Tab[] = [
    { id: 'a', label: 'Mission control', icon: 'home' },
    { id: 'b', label: 'Automations', icon: 'bot' },
    { id: 'c', label: 'Guardrails', icon: 'shield_task' },
  ];
  protected readonly tabsSecondary: Tab[] = [
    { id: 'x', label: 'Compose API', icon: 'code' },
    { id: 'y', label: 'Webhooks', icon: 'link' },
    { id: 'z', label: 'Analytics', icon: 'data_trending' },
  ];
  protected selectedPrimary: string | number = 'a';
  protected selectedSecondary: string | number = 'x';
}

@Component({
  selector: 'app-lsp-tag',
  standalone: true,
  imports: [TagComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
      <ui-tag text="Angular 21" />
      <ui-tag text="Fluent-inspired" variant="primary" />
      <ui-tag text="WCAG 2.2 AA" variant="success" />
    </div>
  `,
})
export class LspTagPreviewComponent {}

@Component({
  selector: 'app-lsp-tel',
  standalone: true,
  imports: [FormsModule, TelComponent],
  template: `
    <ui-tel
      label="Escalation hotline"
      placeholder="+1 (415) 555-0199"
      [(ngModel)]="value"
      [ngModelOptions]="{ standalone: true }"
    />
  `,
})
export class LspTelPreviewComponent {
  protected value = '+14155550199';
}

@Component({
  selector: 'app-lsp-text',
  standalone: true,
  imports: [FormsModule, TextComponent],
  template: `
    <ui-text
      label="Workspace display name"
      [(ngModel)]="value"
      [ngModelOptions]="{ standalone: true }"
    />
  `,
})
export class LspTextPreviewComponent {
  protected value = 'Northridge Finance Cloud';
}

@Component({
  selector: 'app-lsp-textarea',
  standalone: true,
  imports: [FormsModule, TextareaComponent],
  template: `
    <ui-textarea
      label="Release notes · customer-facing"
      [(ngModel)]="value"
      [ngModelOptions]="{ standalone: true }"
      [rows]="4"
    />
  `,
})
export class LspTextareaPreviewComponent {
  protected value =
    'Adds webhook replay safeguards, improves payout latency charts, and fixes VAT rounding for EU carts.';
}

@Component({
  selector: 'app-lsp-time',
  standalone: true,
  imports: [FormsModule, TimeComponent],
  template: `
    <ui-time
      label="Maintenance starts"
      [(ngModel)]="starts"
      [ngModelOptions]="{ standalone: true }"
    />
  `,
})
export class LspTimePreviewComponent {
  protected starts = '02:30';
}

@Component({
  selector: 'app-lsp-time-picker',
  standalone: true,
  imports: [TimePickerComponent],
  template: `
    <ui-time-picker
      [value]="selectedTime"
      [showLabel]="true"
      label="Stand-up kickoff"
      [step]="900"
      [use24HourFormat]="true"
      (timeChange)="selectedTime = $event"
    />
  `,
})
export class LspTimePickerPreviewComponent {
  protected selectedTime = '09:30';
}

@Component({
  selector: 'app-lsp-time-span',
  standalone: true,
  imports: [FormsModule, TimeSpanComponent],
  template: `
    <ui-time-span
      label="Rollback SLA"
      [showHours]="true"
      [showMinutes]="true"
      [(ngModel)]="rollback"
      [ngModelOptions]="{ standalone: true }"
    />
  `,
})
export class LspTimeSpanPreviewComponent {
  protected rollback = '';
}

@Component({
  selector: 'app-lsp-toast',
  standalone: true,
  imports: [ToastComponent],
  template: `
    <ui-toast
      variant="success"
      appearance="filled"
      title="Invoice archived"
      message="INF-41882 moved to cold storage per your 7-year retention policy."
      [(visible)]="visible"
    />
  `,
})
export class LspToastPreviewComponent {
  visible = true;
}

@Component({
  selector: 'app-lsp-toolbar',
  standalone: true,
  imports: [ToolbarComponent, MenuComponent],
  template: `
    <ui-toolbar [items]="toolbarItems" size="medium">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.35rem;min-width:0">
        <ui-menu
          triggerVariant="dropdown"
          text="Calibri"
          icon="text_font"
          variant="secondary"
          appearance="subtle"
          size="medium"
          ariaLabel="Font family"
          [menuItems]="fontMenuItems"
        />
        <ui-menu
          triggerVariant="dropdown"
          text="11 pt"
          icon="text_font_size"
          variant="secondary"
          appearance="subtle"
          size="medium"
          ariaLabel="Font size"
          [menuItems]="sizeMenuItems"
        />
      </div>
    </ui-toolbar>
  `,
})
export class LspToolbarPreviewComponent {
  protected readonly fontMenuItems: MenuItem[] = [
    {
      id: 'cal',
      label: 'Calibri',
      icon: 'text_font',
      selected: true,
      action: (): void => undefined,
    },
    {
      id: 'segoe',
      label: 'Segoe UI',
      action: (): void => undefined,
    },
    {
      id: 'mono',
      label: 'Cascadia Mono',
      action: (): void => undefined,
    },
    {
      id: 'georgia',
      label: 'Georgia',
      action: (): void => undefined,
    },
  ];

  protected readonly sizeMenuItems: MenuItem[] = [
    { id: 's8', label: '8 pt', action: (): void => undefined },
    { id: 's9', label: '9 pt', action: (): void => undefined },
    { id: 's10', label: '10 pt', action: (): void => undefined },
    {
      id: 's11',
      label: '11 pt',
      selected: true,
      action: (): void => undefined,
    },
    { id: 's12', label: '12 pt', action: (): void => undefined },
    { id: 's14', label: '14 pt', action: (): void => undefined },
    { id: 's18', label: '18 pt', action: (): void => undefined },
  ];

  protected readonly toolbarItems: ToolbarItem[] = [
    {
      id: 'undo',
      icon: 'arrow_undo',
      tooltip: 'Undo',
      ariaLabel: 'Undo',
      action: (): void => undefined,
    },
    {
      id: 'redo',
      icon: 'arrow_redo',
      tooltip: 'Redo',
      ariaLabel: 'Redo',
      action: (): void => undefined,
    },
    { id: 'div-history', type: 'divider' },
    {
      id: 'cut',
      icon: 'cut',
      tooltip: 'Cut',
      ariaLabel: 'Cut',
      action: (): void => undefined,
    },
    {
      id: 'copy',
      icon: 'copy',
      tooltip: 'Copy',
      ariaLabel: 'Copy',
      action: (): void => undefined,
    },
    {
      id: 'paste',
      icon: 'clipboard_paste',
      tooltip: 'Paste',
      ariaLabel: 'Paste',
      action: (): void => undefined,
    },
    { id: 'div-font', type: 'divider' },
    { id: 'custom-font-row', type: 'custom' },
    { id: 'div-format', type: 'divider' },
    {
      id: 'bold',
      type: 'toggle',
      icon: 'text_bold',
      tooltip: 'Bold',
      ariaLabel: 'Bold',
      selected: true,
      action: (): void => undefined,
    },
    {
      id: 'italic',
      type: 'toggle',
      icon: 'text_italic',
      tooltip: 'Italic',
      ariaLabel: 'Italic',
      action: (): void => undefined,
    },
    {
      id: 'underline',
      type: 'toggle',
      icon: 'text_underline',
      tooltip: 'Underline',
      ariaLabel: 'Underline',
      action: (): void => undefined,
    },
    { id: 'div-align', type: 'divider' },
    {
      id: 'align-left',
      type: 'toggle',
      icon: 'text_align_left',
      tooltip: 'Align left',
      ariaLabel: 'Align left',
      selected: true,
      action: (): void => undefined,
    },
    {
      id: 'align-center',
      type: 'toggle',
      icon: 'text_align_center',
      tooltip: 'Align center',
      ariaLabel: 'Align center',
      action: (): void => undefined,
    },
    {
      id: 'align-right',
      type: 'toggle',
      icon: 'text_align_right',
      tooltip: 'Align right',
      ariaLabel: 'Align right',
      action: (): void => undefined,
    },
    { id: 'div-lists', type: 'divider' },
    {
      id: 'bullet',
      type: 'toggle',
      icon: 'text_bullet_list',
      tooltip: 'Bulleted list',
      ariaLabel: 'Bulleted list',
      action: (): void => undefined,
    },
    {
      id: 'numbered',
      type: 'toggle',
      icon: 'text_number_list',
      tooltip: 'Numbered list',
      ariaLabel: 'Numbered list',
      action: (): void => undefined,
    },
    { id: 'div-insert', type: 'divider' },
    {
      id: 'link',
      icon: 'link',
      tooltip: 'Insert link',
      ariaLabel: 'Insert link',
      action: (): void => undefined,
    },
    {
      id: 'image',
      icon: 'image_add',
      tooltip: 'Insert image',
      ariaLabel: 'Insert image',
      action: (): void => undefined,
    },
    {
      id: 'color',
      icon: 'text_color',
      tooltip: 'Font color',
      ariaLabel: 'Font color',
      action: (): void => undefined,
    },
    { id: 'div-clear', type: 'divider' },
    {
      id: 'clear-format',
      icon: 'text_clear_formatting',
      tooltip: 'Clear formatting',
      ariaLabel: 'Clear formatting',
      action: (): void => undefined,
    },
  ];
}

@Component({
  selector: 'app-lsp-tooltip',
  standalone: true,
  imports: [ButtonComponent, TooltipDirective],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;width:100%">
      <ui-button
        type="button"
        variant="secondary"
        appearance="outline"
        uiTooltip="Opens invite modal — reviewers inherit edit scopes."
        uiTooltipPosition="top"
        uiTooltipSize="medium"
        >Top · medium</ui-button
      >
      <ui-button
        type="button"
        variant="secondary"
        appearance="outline"
        uiTooltip="Latency spikes trigger paging after three breaches."
        uiTooltipPosition="left"
        uiTooltipSize="small"
        [uiTooltipDelay]="450"
        >Left · small · slower</ui-button
      >
      <ui-button
        type="button"
        variant="primary"
        appearance="filled"
        uiTooltip="Billing portal DNS rotated — share updated vanity URL."
        uiTooltipPosition="bottom"
        uiTooltipSize="large"
        [uiTooltipWithArrow]="false"
        >Bottom · large · flat</ui-button
      >
    </div>
  `,
})
export class LspTooltipPreviewComponent {}

@Component({
  selector: 'app-lsp-totp',
  standalone: true,
  imports: [TotpComponent],
  template: ` <ui-totp label="Authenticator code" /> `,
})
export class LspTotpPreviewComponent {}

@Component({
  selector: 'app-lsp-tree',
  standalone: true,
  imports: [TreeComponent],
  template: ` <ui-tree [nodes]="nodes" [showSelectionIndicator]="true" /> `,
})
export class LspTreePreviewComponent {
  protected readonly nodes: TreeNode[] = [
    {
      id: 'product',
      label: 'Product hub',
      icon: 'folder',
      hasChildren: true,
      expanded: true,
      children: [
        {
          id: 'prd',
          label: 'PRD · Billing exports parity.md',
          icon: 'document',
          hasChildren: false,
          selected: true,
        },
        {
          id: 'deck',
          label: 'Board narrative · Q2 deck',
          icon: 'slide_layout',
          hasChildren: false,
        },
      ],
    },
    {
      id: 'docs',
      label: 'Documents',
      icon: 'document',
      hasChildren: true,
      expanded: true,
      children: [
        {
          id: 'billing',
          label: 'Billing',
          icon: 'wallet',
          hasChildren: true,
          expanded: true,
          children: [
            { id: 'billing-1', label: 'Billing 1', icon: 'wallet' },
            { id: 'billing-2', label: 'Billing 2', icon: 'wallet' },
            { id: 'billing-3', label: 'Billing 3', icon: 'wallet' },
          ],
        },
        {
          id: 'assets',
          label: 'Assets',
          icon: 'image',
          hasChildren: true,
          children: [{ id: 'hero', label: 'Hero banner.png', icon: 'image' }],
        },
        { id: 'archive', label: 'Archive', icon: 'archive' },
      ],
    },
  ];
}

@Component({
  selector: 'app-lsp-tree-node',
  standalone: true,
  imports: [TreeNodeComponent],
  template: `
    <ui-tree-node [node]="node" [expandOnClick]="true" [showSelectionIndicator]="true" />
  `,
})
export class LspTreeNodePreviewComponent {
  protected readonly node: TreeNode = {
    id: 'platform-docs',
    label: 'Platform docs',
    icon: 'folder',
    hasChildren: true,
    expanded: true,
    children: [
      {
        id: 'adr-webhooks',
        label: 'ADR-014 · webhook retries.md',
        icon: 'document',
        hasChildren: false,
      },
      {
        id: 'svc-ingress',
        label: 'Ingress services',
        icon: 'cube',
        hasChildren: true,
        expanded: true,
        children: [
          { id: 'api-gw', label: 'api-gateway', icon: 'router', hasChildren: false },
          {
            id: 'auth',
            label: 'auth-service',
            icon: 'lock_closed',
            hasChildren: false,
            selected: true,
          },
        ],
      },
      { id: 'runbooks', label: 'Runbooks · outages', icon: 'book', hasChildren: false },
    ],
  };
}

@Component({
  selector: 'app-lsp-url',
  standalone: true,
  imports: [FormsModule, UrlComponent],
  template: `
    <ui-url label="Public docs URL" [(ngModel)]="value" [ngModelOptions]="{ standalone: true }" />
  `,
})
export class LspUrlPreviewComponent {
  protected value = 'https://northridge.io/docs/billing/webhooks';
}

@Component({
  selector: 'app-lsp-context-menu',
  standalone: true,
  imports: [ContextMenuDirective],
  template: `
    <div
      uiContextMenu
      [uiContextMenuItems]="menuItems"
      uiContextMenuAriaLabel="Canvas actions"
      style="display:flex;flex-direction:column;gap:0.35rem;justify-content:center;min-height:6.5rem;padding:0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background2-rest);cursor:context-menu"
    >
      <div style="font-size:0.8125rem;font-weight:600">Design canvas</div>
      <div style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
        Right-click to open actions
      </div>
    </div>
  `,
})
export class LspContextMenuPreviewComponent {
  protected readonly menuItems: MenuItem[] = [
    { id: 'open', label: 'Open', icon: 'open' },
    { id: 'duplicate', label: 'Duplicate', icon: 'document_copy' },
    { id: 'rename', label: 'Rename', icon: 'edit' },
  ];
}

@Component({
  selector: 'app-lsp-popover',
  standalone: true,
  imports: [ButtonComponent, PopoverDirective],
  template: `
    <div
      style="display:flex;align-items:center;justify-content:center;min-height:6.5rem;width:100%"
    >
      <ui-button
        type="button"
        variant="secondary"
        appearance="outline"
        icon="panel_top_expand"
        [uiPopover]="panelTpl"
        uiPopoverAriaLabel="Assignee preview"
        uiPopoverPosition="bottom"
        uiPopoverSize="small"
      >
        Assign reviewer
      </ui-button>
    </div>
    <ng-template #panelTpl>
      <div class="popover-panel">
        <div class="popover-panel__header">
          <div class="popover-panel__title">Assign reviewer</div>
          <div class="popover-panel__description">Route this draft to legal before launch.</div>
        </div>
      </div>
    </ng-template>
  `,
})
export class LspPopoverPreviewComponent {}

@Component({
  selector: 'app-lsp-timeline',
  standalone: true,
  imports: [TimelineComponent],
  template: ` <ui-timeline [items]="items" ariaLabel="Release activity" size="small" /> `,
})
export class LspTimelinePreviewComponent {
  protected readonly items: TimelineItem[] = [
    {
      id: 'draft',
      title: 'Draft saved',
      timestamp: '09:12',
      description: 'Campaign brief updated.',
    },
    {
      id: 'approved',
      title: 'Approved',
      timestamp: '14:05',
      variant: 'success',
      icon: 'checkmark_circle',
    },
  ];
}
