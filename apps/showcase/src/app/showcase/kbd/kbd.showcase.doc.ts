import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { KbdBasicDemoComponent } from './examples/kbd-basic-demo';
import { KbdCombinationsDemoComponent } from './examples/kbd-combinations-demo';
import { KbdCommandHelpDemoComponent } from './examples/kbd-command-help-demo';
import { KbdCommonShortcutsDemoComponent } from './examples/kbd-common-shortcuts-demo';
import { KbdNavigationDemoComponent } from './examples/kbd-navigation-demo';
import { KbdSizeAppearanceDemoComponent } from './examples/kbd-size-appearance-demo';
import meta from './kbd.showcase.meta.json';

const kbdMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: KbdBasicDemoComponent,
  sizeAppearance: KbdSizeAppearanceDemoComponent,
  commonShortcuts: KbdCommonShortcutsDemoComponent,
  navigation: KbdNavigationDemoComponent,
  commandHelp: KbdCommandHelpDemoComponent,
  combinations: KbdCombinationsDemoComponent,
} as const;

export const KBD_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${kbdMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(kbdMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${kbdMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const KBD_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: kbdMeta.title,
  description: kbdMeta.description,
  importCode: kbdMeta.importCode,
  containerClass: kbdMeta.containerClass,
  accessibility: kbdMeta.accessibility,
  featureSections: kbdMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: kbdMeta.apiSections,
};
