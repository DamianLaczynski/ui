import { Routes } from '@angular/router';
import {
  ACCORDION_DOC_ASSET_PATHS,
  ACCORDION_DOC_PAGE_CONFIG,
} from '@showcase/accordion/accordion.showcase.doc';
import {
  AVATAR_DOC_ASSET_PATHS,
  AVATAR_DOC_PAGE_CONFIG,
} from '@showcase/avatar/avatar.showcase.doc';
import { BADGE_DOC_ASSET_PATHS, BADGE_DOC_PAGE_CONFIG } from '@showcase/badge/badge.showcase.doc';
import {
  BUTTON_DOC_ASSET_PATHS,
  BUTTON_DOC_PAGE_CONFIG,
} from '@showcase/button/button.showcase.doc';
import {
  CALENDAR_DOC_ASSET_PATHS,
  CALENDAR_DOC_PAGE_CONFIG,
} from '@showcase/calendar/calendar.showcase.doc';
import { CARD_DOC_ASSET_PATHS, CARD_DOC_PAGE_CONFIG } from '@showcase/card/card.showcase.doc';
import {
  COMMAND_PALETTE_DOC_ASSET_PATHS,
  COMMAND_PALETTE_DOC_PAGE_CONFIG,
} from '@showcase/command-palette/command-palette.showcase.doc';
import { TIME_DOC_ASSET_PATHS, TIME_DOC_PAGE_CONFIG } from '@showcase/time/time.showcase.doc';
import {
  TIME_PICKER_DOC_ASSET_PATHS,
  TIME_PICKER_DOC_PAGE_CONFIG,
} from '@showcase/time-picker/time-picker.showcase.doc';
import { DATE_DOC_ASSET_PATHS, DATE_DOC_PAGE_CONFIG } from '@showcase/field/date/date.showcase.doc';
import {
  DATETIME_DOC_ASSET_PATHS,
  DATETIME_DOC_PAGE_CONFIG,
} from '@showcase/field/datetime/datetime.showcase.doc';
import {
  MONTH_DOC_ASSET_PATHS,
  MONTH_DOC_PAGE_CONFIG,
} from '@showcase/field/month/month.showcase.doc';
import {
  TIME_SPAN_DOC_ASSET_PATHS,
  TIME_SPAN_DOC_PAGE_CONFIG,
} from '@showcase/field/time-span/time-span.showcase.doc';
import { WEEK_DOC_ASSET_PATHS, WEEK_DOC_PAGE_CONFIG } from '@showcase/field/week/week.showcase.doc';
import {
  DATE_RANGE_DOC_ASSET_PATHS,
  DATE_RANGE_DOC_PAGE_CONFIG,
} from '@showcase/field/date-range/date-range.showcase.doc';
import {
  DROPDOWN_DOC_ASSET_PATHS,
  DROPDOWN_DOC_PAGE_CONFIG,
} from '@showcase/field/dropdown/dropdown.showcase.doc';
import {
  NUMBER_DOC_ASSET_PATHS,
  NUMBER_DOC_PAGE_CONFIG,
} from '@showcase/field/number/number.showcase.doc';
import {
  PASSWORD_DOC_ASSET_PATHS,
  PASSWORD_DOC_PAGE_CONFIG,
} from '@showcase/field/password/password.showcase.doc';
import { TEXT_DOC_ASSET_PATHS, TEXT_DOC_PAGE_CONFIG } from '@showcase/field/text/text.showcase.doc';
import {
  EMAIL_DOC_ASSET_PATHS,
  EMAIL_DOC_PAGE_CONFIG,
} from '@showcase/field/email/email.showcase.doc';
import { FILE_DOC_ASSET_PATHS, FILE_DOC_PAGE_CONFIG } from '@showcase/field/file/file.showcase.doc';
import {
  SEARCH_DOC_ASSET_PATHS,
  SEARCH_DOC_PAGE_CONFIG,
} from '@showcase/field/search/search.showcase.doc';
import { TEL_DOC_ASSET_PATHS, TEL_DOC_PAGE_CONFIG } from '@showcase/field/tel/tel.showcase.doc';
import {
  TEXTAREA_DOC_ASSET_PATHS,
  TEXTAREA_DOC_PAGE_CONFIG,
} from '@showcase/field/textarea/textarea.showcase.doc';
import { URL_DOC_ASSET_PATHS, URL_DOC_PAGE_CONFIG } from '@showcase/field/url/url.showcase.doc';
import {
  SWITCH_DOC_ASSET_PATHS,
  SWITCH_DOC_PAGE_CONFIG,
} from '@showcase/field/switch/switch.showcase.doc';
import { TABS_DOC_ASSET_PATHS, TABS_DOC_PAGE_CONFIG } from '@showcase/tabs/tabs.showcase.doc';
import {
  SKELETON_DOC_ASSET_PATHS,
  SKELETON_DOC_PAGE_CONFIG,
} from '@showcase/skeleton/skeleton.showcase.doc';
import {
  SPEED_DIAL_DOC_ASSET_PATHS,
  SPEED_DIAL_DOC_PAGE_CONFIG,
} from '@showcase/speed-dial/speed-dial.showcase.doc';
import {
  DIALOG_DOC_ASSET_PATHS,
  DIALOG_DOC_PAGE_CONFIG,
} from '@showcase/dialog/dialog.showcase.doc';
import {
  EMPTY_STATE_DOC_ASSET_PATHS,
  EMPTY_STATE_DOC_PAGE_CONFIG,
} from '@showcase/empty-state/empty-state.showcase.doc';
import {
  ERROR_STATE_DOC_ASSET_PATHS,
  ERROR_STATE_DOC_PAGE_CONFIG,
} from '@showcase/error-state/error-state.showcase.doc';
import {
  LOADING_STATE_DOC_ASSET_PATHS,
  LOADING_STATE_DOC_PAGE_CONFIG,
} from '@showcase/loading-state/loading-state.showcase.doc';
import {
  MESSAGE_BAR_DOC_ASSET_PATHS,
  MESSAGE_BAR_DOC_PAGE_CONFIG,
} from '@showcase/message-bar/message-bar.showcase.doc';
import { MENU_DOC_ASSET_PATHS, MENU_DOC_PAGE_CONFIG } from '@showcase/menu/menu.showcase.doc';
import { NAV_DOC_ASSET_PATHS, NAV_DOC_PAGE_CONFIG } from '@showcase/nav/nav.showcase.doc';
import { NODE_DOC_ASSET_PATHS, NODE_DOC_PAGE_CONFIG } from '@showcase/node/node.showcase.doc';
import { TAG_DOC_ASSET_PATHS, TAG_DOC_PAGE_CONFIG } from '@showcase/tag/tag.showcase.doc';
import {
  PROGRESS_BAR_DOC_ASSET_PATHS,
  PROGRESS_BAR_DOC_PAGE_CONFIG,
} from '@showcase/progress-bar/progress-bar.showcase.doc';
import {
  STATE_CONTAINER_DOC_ASSET_PATHS,
  STATE_CONTAINER_DOC_PAGE_CONFIG,
} from '@showcase/state-container/state-container.showcase.doc';
import {
  SLIDER_DOC_ASSET_PATHS,
  SLIDER_DOC_PAGE_CONFIG,
} from '@showcase/field/slider/slider.showcase.doc';
import {
  DIVIDER_DOC_ASSET_PATHS,
  DIVIDER_DOC_PAGE_CONFIG,
} from '@showcase/divider/divider.showcase.doc';
import {
  CHECKBOX_DOC_ASSET_PATHS,
  CHECKBOX_DOC_PAGE_CONFIG,
} from '@showcase/field/checkbox/checkbox.showcase.doc';
import {
  COLOR_DOC_ASSET_PATHS,
  COLOR_DOC_PAGE_CONFIG,
} from '@showcase/field/color/color.showcase.doc';
import {
  RADIO_BUTTON_GROUP_DOC_ASSET_PATHS,
  RADIO_BUTTON_GROUP_DOC_PAGE_CONFIG,
} from '@showcase/field/radio-button-group/radio-button-group.showcase.doc';
import {
  RANGE_DOC_ASSET_PATHS,
  RANGE_DOC_PAGE_CONFIG,
} from '@showcase/field/range/range.showcase.doc';
import {
  SPLITTER_DOC_ASSET_PATHS,
  SPLITTER_DOC_PAGE_CONFIG,
} from '@showcase/splitter/splitter.showcase.doc';
import {
  SCROLL_PANEL_DOC_ASSET_PATHS,
  SCROLL_PANEL_DOC_PAGE_CONFIG,
} from '@showcase/scroll-panel/scroll-panel.showcase.doc';
import {
  SCROLL_CONTAINER_DOC_ASSET_PATHS,
  SCROLL_CONTAINER_DOC_PAGE_CONFIG,
} from '@showcase/scroll-container/scroll-container.showcase.doc';
import {
  SPINNER_DOC_ASSET_PATHS,
  SPINNER_DOC_PAGE_CONFIG,
} from '@showcase/spinner/spinner.showcase.doc';
import {
  STEPPER_DOC_ASSET_PATHS,
  STEPPER_DOC_PAGE_CONFIG,
} from '@showcase/field/stepper/stepper.showcase.doc';
import {
  TIMELINE_DOC_ASSET_PATHS,
  TIMELINE_DOC_PAGE_CONFIG,
} from '@showcase/timeline/timeline.showcase.doc';
import { TOAST_DOC_ASSET_PATHS, TOAST_DOC_PAGE_CONFIG } from '@showcase/toast/toast.showcase.doc';
import { TOTP_DOC_ASSET_PATHS, TOTP_DOC_PAGE_CONFIG } from '@showcase/field/totp/totp.showcase.doc';
import { TREE_DOC_ASSET_PATHS, TREE_DOC_PAGE_CONFIG } from '@showcase/tree/tree.showcase.doc';
import {
  TREE_NODE_DOC_ASSET_PATHS,
  TREE_NODE_DOC_PAGE_CONFIG,
} from '@showcase/tree-node/tree-node.showcase.doc';
import {
  PAGINATION_DOC_ASSET_PATHS,
  PAGINATION_DOC_PAGE_CONFIG,
} from '@showcase/pagination/pagination.showcase.doc';
import {
  TOOLBAR_DOC_ASSET_PATHS,
  TOOLBAR_DOC_PAGE_CONFIG,
} from '@showcase/toolbar/toolbar.showcase.doc';
import { ICON_DOC_ASSET_PATHS, ICON_DOC_PAGE_CONFIG } from '@showcase/icon/icon.showcase.doc';
import {
  TABLE_OF_CONTENT_DOC_ASSET_PATHS,
  TABLE_OF_CONTENT_DOC_PAGE_CONFIG,
} from '@showcase/table-of-content/table-of-content.showcase.doc';
import {
  BREADCRUMB_DOC_ASSET_PATHS,
  BREADCRUMB_DOC_PAGE_CONFIG,
} from '@showcase/breadcrumb/breadcrumb.showcase.doc';
import {
  CAROUSEL_DOC_ASSET_PATHS,
  CAROUSEL_DOC_PAGE_CONFIG,
} from '@showcase/carousel/carousel.showcase.doc';
import {
  DRAWER_DOC_ASSET_PATHS,
  DRAWER_DOC_PAGE_CONFIG,
} from '@showcase/drawer/drawer.showcase.doc';
import { KBD_DOC_ASSET_PATHS, KBD_DOC_PAGE_CONFIG } from '@showcase/kbd/kbd.showcase.doc';
import {
  CONTEXT_MENU_DOC_ASSET_PATHS,
  CONTEXT_MENU_DOC_PAGE_CONFIG,
} from '@showcase/context-menu/context-menu.showcase.doc';
import {
  POPOVER_DOC_ASSET_PATHS,
  POPOVER_DOC_PAGE_CONFIG,
} from '@showcase/popover/popover.showcase.doc';
import {
  TOOLTIP_DOC_ASSET_PATHS,
  TOOLTIP_DOC_PAGE_CONFIG,
} from '@showcase/tooltip/tooltip.showcase.doc';
import {
  RATING_DOC_ASSET_PATHS,
  RATING_DOC_PAGE_CONFIG,
} from '@showcase/rating/rating.showcase.doc';
import { GuideDocPageComponent } from '@shared/components/guide-doc-page/guide-doc-page.component';
import { ShowcaseDocPageComponent } from '@shared/components/showcase-doc-page/showcase-doc-page.component';
import { GETTING_STARTED_PAGE_CONFIG } from '../../pages/docs/getting-started/getting-started.page';
import { INSTALLATION_PAGE_CONFIG } from '../../pages/docs/installation/installation.page';
import { I18N_PAGE_CONFIG } from '../../pages/docs/i18n/i18n.page';
import { ROADMAP_PAGE_CONFIG } from '../../pages/docs/roadmap/roadmap.page';
import { LLMS_PAGE_CONFIG } from '../../pages/docs/llms/llms.page';

export const dsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'getting-started',
  },
  {
    path: 'getting-started',
    component: GuideDocPageComponent,
    data: {
      config: GETTING_STARTED_PAGE_CONFIG,
    },
  },
  {
    path: 'installation',
    component: GuideDocPageComponent,
    data: {
      config: INSTALLATION_PAGE_CONFIG,
    },
  },
  {
    path: 'i18n',
    component: GuideDocPageComponent,
    data: {
      config: I18N_PAGE_CONFIG,
    },
  },
  {
    path: 'roadmap',
    component: GuideDocPageComponent,
    data: {
      config: ROADMAP_PAGE_CONFIG,
    },
  },
  {
    path: 'llms',
    component: GuideDocPageComponent,
    data: {
      config: LLMS_PAGE_CONFIG,
    },
  },
  {
    path: 'accordion',
    component: ShowcaseDocPageComponent,
    data: {
      config: ACCORDION_DOC_PAGE_CONFIG,
      assetPaths: ACCORDION_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'avatar',
    component: ShowcaseDocPageComponent,
    data: {
      config: AVATAR_DOC_PAGE_CONFIG,
      assetPaths: AVATAR_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'badge',
    component: ShowcaseDocPageComponent,
    data: {
      config: BADGE_DOC_PAGE_CONFIG,
      assetPaths: BADGE_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'breadcrumb',
    component: ShowcaseDocPageComponent,
    data: {
      config: BREADCRUMB_DOC_PAGE_CONFIG,
      assetPaths: BREADCRUMB_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'button',
    component: ShowcaseDocPageComponent,
    data: {
      config: BUTTON_DOC_PAGE_CONFIG,
      assetPaths: BUTTON_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'calendar',
    component: ShowcaseDocPageComponent,
    data: {
      config: CALENDAR_DOC_PAGE_CONFIG,
      assetPaths: CALENDAR_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'card',
    component: ShowcaseDocPageComponent,
    data: {
      config: CARD_DOC_PAGE_CONFIG,
      assetPaths: CARD_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'command-palette',
    component: ShowcaseDocPageComponent,
    data: {
      config: COMMAND_PALETTE_DOC_PAGE_CONFIG,
      assetPaths: COMMAND_PALETTE_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'context-menu',
    component: ShowcaseDocPageComponent,
    data: {
      config: CONTEXT_MENU_DOC_PAGE_CONFIG,
      assetPaths: CONTEXT_MENU_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'dialog',
    component: ShowcaseDocPageComponent,
    data: {
      config: DIALOG_DOC_PAGE_CONFIG,
      assetPaths: DIALOG_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'pagination',
    component: ShowcaseDocPageComponent,
    data: {
      config: PAGINATION_DOC_PAGE_CONFIG,
      assetPaths: PAGINATION_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'popover',
    component: ShowcaseDocPageComponent,
    data: {
      config: POPOVER_DOC_PAGE_CONFIG,
      assetPaths: POPOVER_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'divider',
    component: ShowcaseDocPageComponent,
    data: {
      config: DIVIDER_DOC_PAGE_CONFIG,
      assetPaths: DIVIDER_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'empty-state',
    component: ShowcaseDocPageComponent,
    data: {
      config: EMPTY_STATE_DOC_PAGE_CONFIG,
      assetPaths: EMPTY_STATE_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'error-state',
    component: ShowcaseDocPageComponent,
    data: {
      config: ERROR_STATE_DOC_PAGE_CONFIG,
      assetPaths: ERROR_STATE_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'loading-state',
    component: ShowcaseDocPageComponent,
    data: {
      config: LOADING_STATE_DOC_PAGE_CONFIG,
      assetPaths: LOADING_STATE_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'message-bar',
    component: ShowcaseDocPageComponent,
    data: {
      config: MESSAGE_BAR_DOC_PAGE_CONFIG,
      assetPaths: MESSAGE_BAR_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'state-container',
    component: ShowcaseDocPageComponent,
    data: {
      config: STATE_CONTAINER_DOC_PAGE_CONFIG,
      assetPaths: STATE_CONTAINER_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'checkbox',
    component: ShowcaseDocPageComponent,
    data: {
      config: CHECKBOX_DOC_PAGE_CONFIG,
      assetPaths: CHECKBOX_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'color',
    component: ShowcaseDocPageComponent,
    data: {
      config: COLOR_DOC_PAGE_CONFIG,
      assetPaths: COLOR_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'date',
    component: ShowcaseDocPageComponent,
    data: {
      config: DATE_DOC_PAGE_CONFIG,
      assetPaths: DATE_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'datetime',
    component: ShowcaseDocPageComponent,
    data: {
      config: DATETIME_DOC_PAGE_CONFIG,
      assetPaths: DATETIME_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'month',
    component: ShowcaseDocPageComponent,
    data: {
      config: MONTH_DOC_PAGE_CONFIG,
      assetPaths: MONTH_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'date-range',
    component: ShowcaseDocPageComponent,
    data: {
      config: DATE_RANGE_DOC_PAGE_CONFIG,
      assetPaths: DATE_RANGE_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'dropdown',
    component: ShowcaseDocPageComponent,
    data: {
      config: DROPDOWN_DOC_PAGE_CONFIG,
      assetPaths: DROPDOWN_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'number',
    component: ShowcaseDocPageComponent,
    data: {
      config: NUMBER_DOC_PAGE_CONFIG,
      assetPaths: NUMBER_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'password',
    component: ShowcaseDocPageComponent,
    data: {
      config: PASSWORD_DOC_PAGE_CONFIG,
      assetPaths: PASSWORD_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'radio-button-group',
    component: ShowcaseDocPageComponent,
    data: {
      config: RADIO_BUTTON_GROUP_DOC_PAGE_CONFIG,
      assetPaths: RADIO_BUTTON_GROUP_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'range',
    component: ShowcaseDocPageComponent,
    data: {
      config: RANGE_DOC_PAGE_CONFIG,
      assetPaths: RANGE_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'slider',
    component: ShowcaseDocPageComponent,
    data: {
      config: SLIDER_DOC_PAGE_CONFIG,
      assetPaths: SLIDER_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'switch',
    component: ShowcaseDocPageComponent,
    data: {
      config: SWITCH_DOC_PAGE_CONFIG,
      assetPaths: SWITCH_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'text',
    component: ShowcaseDocPageComponent,
    data: {
      config: TEXT_DOC_PAGE_CONFIG,
      assetPaths: TEXT_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'email',
    component: ShowcaseDocPageComponent,
    data: {
      config: EMAIL_DOC_PAGE_CONFIG,
      assetPaths: EMAIL_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'search',
    component: ShowcaseDocPageComponent,
    data: {
      config: SEARCH_DOC_PAGE_CONFIG,
      assetPaths: SEARCH_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'tel',
    component: ShowcaseDocPageComponent,
    data: {
      config: TEL_DOC_PAGE_CONFIG,
      assetPaths: TEL_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'textarea',
    component: ShowcaseDocPageComponent,
    data: {
      config: TEXTAREA_DOC_PAGE_CONFIG,
      assetPaths: TEXTAREA_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'toolbar',
    component: ShowcaseDocPageComponent,
    data: {
      config: TOOLBAR_DOC_PAGE_CONFIG,
      assetPaths: TOOLBAR_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'url',
    component: ShowcaseDocPageComponent,
    data: {
      config: URL_DOC_PAGE_CONFIG,
      assetPaths: URL_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'tabs',
    component: ShowcaseDocPageComponent,
    data: {
      config: TABS_DOC_PAGE_CONFIG,
      assetPaths: TABS_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'menu',
    component: ShowcaseDocPageComponent,
    data: {
      config: MENU_DOC_PAGE_CONFIG,
      assetPaths: MENU_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'nav',
    component: ShowcaseDocPageComponent,
    data: {
      config: NAV_DOC_PAGE_CONFIG,
      assetPaths: NAV_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'node',
    component: ShowcaseDocPageComponent,
    data: {
      config: NODE_DOC_PAGE_CONFIG,
      assetPaths: NODE_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'tree',
    component: ShowcaseDocPageComponent,
    data: {
      config: TREE_DOC_PAGE_CONFIG,
      assetPaths: TREE_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'tree-node',
    component: ShowcaseDocPageComponent,
    data: {
      config: TREE_NODE_DOC_PAGE_CONFIG,
      assetPaths: TREE_NODE_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'progress-bar',
    component: ShowcaseDocPageComponent,
    data: {
      config: PROGRESS_BAR_DOC_PAGE_CONFIG,
      assetPaths: PROGRESS_BAR_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'scroll-panel',
    component: ShowcaseDocPageComponent,
    data: {
      config: SCROLL_PANEL_DOC_PAGE_CONFIG,
      assetPaths: SCROLL_PANEL_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'scroll-container',
    component: ShowcaseDocPageComponent,
    data: {
      config: SCROLL_CONTAINER_DOC_PAGE_CONFIG,
      assetPaths: SCROLL_CONTAINER_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'splitter',
    component: ShowcaseDocPageComponent,
    data: {
      config: SPLITTER_DOC_PAGE_CONFIG,
      assetPaths: SPLITTER_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'spinner',
    component: ShowcaseDocPageComponent,
    data: {
      config: SPINNER_DOC_PAGE_CONFIG,
      assetPaths: SPINNER_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'stepper',
    component: ShowcaseDocPageComponent,
    data: {
      config: STEPPER_DOC_PAGE_CONFIG,
      assetPaths: STEPPER_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'skeleton',
    component: ShowcaseDocPageComponent,
    data: {
      config: SKELETON_DOC_PAGE_CONFIG,
      assetPaths: SKELETON_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'speed-dial',
    component: ShowcaseDocPageComponent,
    data: {
      config: SPEED_DIAL_DOC_PAGE_CONFIG,
      assetPaths: SPEED_DIAL_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'tag',
    component: ShowcaseDocPageComponent,
    data: {
      config: TAG_DOC_PAGE_CONFIG,
      assetPaths: TAG_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'time',
    component: ShowcaseDocPageComponent,
    data: {
      config: TIME_DOC_PAGE_CONFIG,
      assetPaths: TIME_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'time-picker',
    component: ShowcaseDocPageComponent,
    data: {
      config: TIME_PICKER_DOC_PAGE_CONFIG,
      assetPaths: TIME_PICKER_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'time-span',
    component: ShowcaseDocPageComponent,
    data: {
      config: TIME_SPAN_DOC_PAGE_CONFIG,
      assetPaths: TIME_SPAN_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'week',
    component: ShowcaseDocPageComponent,
    data: {
      config: WEEK_DOC_PAGE_CONFIG,
      assetPaths: WEEK_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'timeline',
    component: ShowcaseDocPageComponent,
    data: {
      config: TIMELINE_DOC_PAGE_CONFIG,
      assetPaths: TIMELINE_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'toast',
    component: ShowcaseDocPageComponent,
    data: {
      config: TOAST_DOC_PAGE_CONFIG,
      assetPaths: TOAST_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'file',
    component: ShowcaseDocPageComponent,
    data: {
      config: FILE_DOC_PAGE_CONFIG,
      assetPaths: FILE_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'totp',
    component: ShowcaseDocPageComponent,
    data: {
      config: TOTP_DOC_PAGE_CONFIG,
      assetPaths: TOTP_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'icon',
    component: ShowcaseDocPageComponent,
    data: {
      config: ICON_DOC_PAGE_CONFIG,
      assetPaths: ICON_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'table-of-content',
    component: ShowcaseDocPageComponent,
    data: {
      config: TABLE_OF_CONTENT_DOC_PAGE_CONFIG,
      assetPaths: TABLE_OF_CONTENT_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'carousel',
    component: ShowcaseDocPageComponent,
    data: {
      config: CAROUSEL_DOC_PAGE_CONFIG,
      assetPaths: CAROUSEL_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'drawer',
    component: ShowcaseDocPageComponent,
    data: {
      config: DRAWER_DOC_PAGE_CONFIG,
      assetPaths: DRAWER_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'kbd',
    component: ShowcaseDocPageComponent,
    data: {
      config: KBD_DOC_PAGE_CONFIG,
      assetPaths: KBD_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'tooltip',
    component: ShowcaseDocPageComponent,
    data: {
      config: TOOLTIP_DOC_PAGE_CONFIG,
      assetPaths: TOOLTIP_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'rating',
    component: ShowcaseDocPageComponent,
    data: {
      config: RATING_DOC_PAGE_CONFIG,
      assetPaths: RATING_DOC_ASSET_PATHS,
    },
  },
  {
    path: '**',
    redirectTo: 'getting-started',
  },
];
