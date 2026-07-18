import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { ContextMenuBasicDemoComponent } from './examples/context-menu-basic-demo';
import { ContextMenuSectionsDemoComponent } from './examples/context-menu-sections-demo';
import { ContextMenuSubmenuDemoComponent } from './examples/context-menu-submenu-demo';
import meta from './context-menu.showcase.meta.json';

const contextMenuMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: ContextMenuBasicDemoComponent,
  sections: ContextMenuSectionsDemoComponent,
  submenu: ContextMenuSubmenuDemoComponent,
} as const;

export const CONTEXT_MENU_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${contextMenuMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(contextMenuMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${contextMenuMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const CONTEXT_MENU_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: contextMenuMeta.title,
  description: contextMenuMeta.description,
  importCode: contextMenuMeta.importCode,
  containerClass: contextMenuMeta.containerClass,
  accessibility: contextMenuMeta.accessibility,
  featureSections: contextMenuMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: contextMenuMeta.apiSections,
};
