import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { SelectBasicExampleComponent } from './examples/select-basic-demo';
import { SelectCustomTemplateExampleComponent } from './examples/select-custom-template-demo';
import { SelectFormPatternExampleComponent } from './examples/select-form-pattern-demo';
import { SelectMultiExampleComponent } from './examples/select-multi-demo';
import { SelectSearchClearExampleComponent } from './examples/select-search-clear-demo';
import { SelectVariantsStatesExampleComponent } from './examples/select-variants-states-demo';
import meta from './select.showcase.meta.json';

const selectMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: SelectBasicExampleComponent,
  variantsStates: SelectVariantsStatesExampleComponent,
  multi: SelectMultiExampleComponent,
  searchClear: SelectSearchClearExampleComponent,
  customTemplate: SelectCustomTemplateExampleComponent,
  formPattern: SelectFormPatternExampleComponent,
} as const;

export const SELECT_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${selectMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(selectMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${selectMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const SELECT_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: selectMeta.title,
  description: selectMeta.description,
  importCode: selectMeta.importCode,
  containerClass: selectMeta.containerClass,
  accessibility: selectMeta.accessibility,
  featureSections: selectMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: selectMeta.apiSections,
};
