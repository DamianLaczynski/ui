import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { TimelineAuditDemoComponent } from './examples/timeline-audit-demo';
import { TimelineBasicDemoComponent } from './examples/timeline-basic-demo';
import { TimelineCompositionDemoComponent } from './examples/timeline-composition-demo';
import { TimelineVariantsDemoComponent } from './examples/timeline-variants-demo';
import meta from './timeline.showcase.meta.json';

const timelineMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: TimelineBasicDemoComponent,
  variants: TimelineVariantsDemoComponent,
  audit: TimelineAuditDemoComponent,
  composition: TimelineCompositionDemoComponent,
} as const;

export const TIMELINE_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${timelineMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(timelineMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${timelineMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const TIMELINE_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: timelineMeta.title,
  description: timelineMeta.description,
  importCode: timelineMeta.importCode,
  containerClass: timelineMeta.containerClass,
  accessibility: timelineMeta.accessibility,
  featureSections: timelineMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: timelineMeta.apiSections,
};
