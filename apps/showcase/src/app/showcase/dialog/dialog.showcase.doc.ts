import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { DialogEmphasisExampleComponent } from './examples/dialog-emphasis-demo';
import { DialogActionsExampleComponent } from './examples/dialog-actions-demo';
import { DialogBasicExampleComponent } from './examples/dialog-basic-demo';
import { DialogCustomContentExampleComponent } from './examples/dialog-custom-content-demo';
import { DialogRenameFlowExampleComponent } from './examples/dialog-rename-flow-demo';
import { DialogSizesExampleComponent } from './examples/dialog-sizes-demo';
import { DialogStaticExampleComponent } from './examples/dialog-static-demo';
import meta from './dialog.showcase.meta.json';

const dialogMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: DialogBasicExampleComponent,
  emphasis: DialogEmphasisExampleComponent,
  customContent: DialogCustomContentExampleComponent,
  sizes: DialogSizesExampleComponent,
  static: DialogStaticExampleComponent,
  actions: DialogActionsExampleComponent,
  renameFlow: DialogRenameFlowExampleComponent,
} as const;

export const DIALOG_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${dialogMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(dialogMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${dialogMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const DIALOG_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: dialogMeta.title,
  description: dialogMeta.description,
  importCode: dialogMeta.importCode,
  containerClass: dialogMeta.containerClass,
  accessibility: dialogMeta.accessibility,
  featureSections: dialogMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: dialogMeta.apiSections,
};
