import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FileComponent } from 'ui';

@Component({
  selector: 'app-file-filters-limits-demo',
  standalone: true,
  imports: [FileComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-file
          label="Brand images"
          accept="image/*"
          [maxSize]="5 * 1024 * 1024"
          uploadText="Drop images here"
          uploadHint="PNG or JPG up to 5 MB each"
        />
      </div>

      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-file
          label="Signed agreement"
          mode="inline"
          accept=".pdf"
          placeholder="Select signed PDF"
          helpText="One PDF only."
        />
      </div>

      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-file
          label="Evidence bundle"
          [multiple]="true"
          [maxFiles]="3"
          [maxSize]="10 * 1024 * 1024"
          accept=".pdf,.png,.jpg"
          uploadText="Upload up to 3 supporting files"
          uploadHint="PDF, PNG, JPG up to 10 MB each"
        />
      </div>
    </div>
  `,
})
export class FileFiltersLimitsDemoComponent {}
