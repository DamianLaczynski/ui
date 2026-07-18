import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { PopoverAssigneeDemoComponent } from './examples/popover-assignee-demo';
import { PopoverColumnPickerDemoComponent } from './examples/popover-column-picker-demo';
import { PopoverFiltersDemoComponent } from './examples/popover-filters-demo';
import { PopoverPlacementDemoComponent } from './examples/popover-placement-demo';
import { PopoverShareDemoComponent } from './examples/popover-share-demo';
import meta from './popover.showcase.meta.json';

const popoverMeta = meta as ShowcaseDocMeta;

const componentMap = {
  filters: PopoverFiltersDemoComponent,
  placement: PopoverPlacementDemoComponent,
  assignee: PopoverAssigneeDemoComponent,
  columnPicker: PopoverColumnPickerDemoComponent,
  share: PopoverShareDemoComponent,
} as const;

export const POPOVER_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${popoverMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(popoverMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${popoverMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const POPOVER_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: popoverMeta.title,
  description: popoverMeta.description,
  importCode: popoverMeta.importCode,
  containerClass: popoverMeta.containerClass,
  accessibility: popoverMeta.accessibility,
  featureSections: popoverMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: popoverMeta.apiSections,
};
