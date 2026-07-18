import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { ButtonAppearanceVariantExampleComponent } from './examples/button-appearance-variant-demo';
import { ButtonBasicExampleComponent } from './examples/button-basic-demo';
import { ButtonIconOnlyExampleComponent } from './examples/button-icon-only-demo';
import { ButtonIconsExampleComponent } from './examples/button-icons-demo';
import { ButtonBadgeDemoComponent } from './examples/button-badge-demo';
import { ButtonOtherExampleComponent } from './examples/button-other-demo';
import { ButtonShapesExampleComponent } from './examples/button-shapes-demo';
import { ButtonSizesExampleComponent } from './examples/button-sizes-demo';
import { ButtonStatesExampleComponent } from './examples/button-states-demo';
import meta from './button.showcase.meta.json';

const buttonMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: ButtonBasicExampleComponent,
  appearanceVariant: ButtonAppearanceVariantExampleComponent,
  shapes: ButtonShapesExampleComponent,
  icons: ButtonIconsExampleComponent,
  iconOnly: ButtonIconOnlyExampleComponent,
  sizes: ButtonSizesExampleComponent,
  states: ButtonStatesExampleComponent,
  other: ButtonOtherExampleComponent,
  badge: ButtonBadgeDemoComponent,
} as const;

export const BUTTON_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${buttonMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(buttonMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${buttonMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const BUTTON_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: buttonMeta.title,
  description: buttonMeta.description,
  importCode: buttonMeta.importCode,
  containerClass: buttonMeta.containerClass,
  accessibility: buttonMeta.accessibility,
  featureSections: buttonMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: buttonMeta.apiSections,
};
