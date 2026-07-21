import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { TextareaBasicDemoComponent } from './examples/textarea-basic-demo';
import { TextareaFeedbackPanelDemoComponent } from './examples/textarea-feedback-panel-demo';
import { TextareaFormDemoComponent } from './examples/textarea-form-demo';
import { TextareaLayoutDemoComponent } from './examples/textarea-layout-demo';
import { TextareaResizeDemoComponent } from './examples/textarea-resize-demo';
import { TextareaStatesDemoComponent } from './examples/textarea-states-demo';
import { TextareaValidationDemoComponent } from './examples/textarea-validation-demo';
import meta from './textarea.showcase.meta.json';

const textareaMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: TextareaBasicDemoComponent,
  layout: TextareaLayoutDemoComponent,
  resize: TextareaResizeDemoComponent,
  states: TextareaStatesDemoComponent,
  validation: TextareaValidationDemoComponent,
  form: TextareaFormDemoComponent,
  feedbackPanel: TextareaFeedbackPanelDemoComponent,
} as const;

export const TEXTAREA_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${textareaMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(textareaMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${textareaMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const TEXTAREA_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: textareaMeta.title,
  description: textareaMeta.description,
  importCode: textareaMeta.importCode,
  containerClass: textareaMeta.containerClass,
  accessibility: textareaMeta.accessibility,
  featureSections: textareaMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: textareaMeta.apiSections,
};
