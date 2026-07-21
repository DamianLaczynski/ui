import { Component, ElementRef, computed, effect, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ALL_ICON_NAMES,
  SelectComponent,
  SelectItem,
  IconComponent,
  IconName,
  SearchComponent,
  Size,
} from 'ui';

const ICON_BROWSER_BATCH_SIZE = 120;
const variants = ['regular', 'filled'] as const;
const sizes: Size[] = ['small', 'medium', 'large'];
const sizeItems: SelectItem[] = sizes.map(size => ({
  value: size,
  label: size[0].toUpperCase() + size.slice(1),
}));
const variantItems: SelectItem[] = variants.map(variant => ({
  value: variant,
  label: variant[0].toUpperCase() + variant.slice(1),
}));

@Component({
  selector: 'app-icon-browser-demo',
  standalone: true,
  imports: [FormsModule, SelectComponent, IconComponent, SearchComponent],
  host: {
    style: 'display:block;width:100%;',
  },
  template: `
    <section style="display:grid;gap:1rem;width:100%;max-width:56rem;margin-inline:auto;">
      <div
        style="display:grid;gap:0.875rem;justify-items:center;width:100%;max-width:40rem;margin-inline:auto;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:12px;background:var(--color-neutral-background2-rest);"
      >
        <div
          style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));align-items:end;gap:0.75rem;width:100%;"
        >
          <div style="min-width:0;">
            <ui-search
              label="Search icons"
              style="display:block;width:100%;"
              placeholder="Search icons..."
              [(ngModel)]="searchQueryValue"
              [ngModelOptions]="{ standalone: true }"
            />
          </div>

          <div style="min-width:0;">
            <ui-select
              label="Size"
              placeholder="Choose size"
              [items]="sizeItems"
              [ngModel]="browserSize()"
              (ngModelChange)="browserSize.set(asSize($event))"
              [ngModelOptions]="{ standalone: true }"
            />
          </div>

          <div style="min-width:0;">
            <ui-select
              label="Variant"
              placeholder="Choose variant"
              [items]="variantItems"
              [ngModel]="browserVariant()"
              (ngModelChange)="browserVariant.set(asVariant($event))"
              [ngModelOptions]="{ standalone: true }"
            />
          </div>
        </div>
      </div>

      <div style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest);">
        Showing <strong>{{ visibleIcons().length }}</strong> of {{ filteredIcons().length }}
        matching icons
        @if (filteredIcons().length < iconNames.length) {
          <span> from {{ iconNames.length }} available icons</span>
        }
      </div>

      @if (copiedIcon()) {
        <div
          style="padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:12px;background:var(--color-neutral-background2-rest);font-size:0.875rem;"
        >
          Copied icon name: <strong>{{ copiedIcon() }}</strong>
        </div>
      }

      @if (filteredIcons().length > 0) {
        <div
          #scrollContainer
          (scroll)="onGridScroll($event)"
          style="display:grid;grid-template-columns:repeat(auto-fill,minmax(6.75rem,1fr));gap:0.75rem;max-height:34rem;overflow:auto;padding:0.25rem;"
        >
          @for (iconName of visibleIcons(); track iconName) {
            <button
              type="button"
              (click)="copyIconName(iconName)"
              [title]="iconName"
              style="display:grid;gap:0.625rem;justify-items:center;padding:0.875rem 0.75rem;border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 78%,transparent);border-radius:12px;background:var(--color-neutral-background-rest);box-shadow:0 1px 2px color-mix(in srgb,#000 6%,transparent);cursor:pointer;text-align:center;"
            >
              <ui-icon [icon]="iconName" [size]="browserSize()" [variant]="browserVariant()" />
              <span
                style="font-size:0.75rem;line-height:1.25;color:var(--color-neutral-foreground2-rest);word-break:break-word;"
              >
                {{ iconName }}
              </span>
            </button>
          }
        </div>
      } @else {
        <div
          style="padding:1.25rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:12px;background:var(--color-neutral-background2-rest);font-size:0.875rem;"
        >
          No icons found matching "{{ searchQueryValue }}".
        </div>
      }
    </section>
  `,
})
export class IconBrowserDemoComponent {
  protected readonly iconNames = ALL_ICON_NAMES as IconName[];
  protected readonly sizes = sizes;
  protected readonly variants = variants;
  protected readonly sizeItems = sizeItems;
  protected readonly variantItems = variantItems;

  private readonly searchQuery = signal('');
  private readonly visibleIconsCount = signal(ICON_BROWSER_BATCH_SIZE);
  protected readonly browserSize = signal<Size>('medium');
  protected readonly browserVariant = signal<(typeof variants)[number]>('regular');
  protected readonly copiedIcon = signal<IconName | null>(null);

  private readonly scrollContainer = viewChild<ElementRef<HTMLDivElement>>('scrollContainer');

  get searchQueryValue(): string {
    return this.searchQuery();
  }

  set searchQueryValue(value: string) {
    this.searchQuery.set(value);
  }

  protected readonly filteredIcons = computed<IconName[]>(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) {
      return this.iconNames;
    }
    return this.iconNames.filter(iconName => iconName.toLowerCase().includes(query)) as IconName[];
  });

  protected readonly visibleIcons = computed<IconName[]>(() =>
    this.filteredIcons().slice(0, this.visibleIconsCount()),
  );

  private readonly hasMoreVisibleIcons = computed<boolean>(
    () => this.visibleIcons().length < this.filteredIcons().length,
  );

  constructor() {
    effect(() => {
      this.searchQuery();
      this.visibleIconsCount.set(ICON_BROWSER_BATCH_SIZE);

      queueMicrotask(() => {
        const container = this.scrollContainer()?.nativeElement;
        if (container) {
          container.scrollTop = 0;
        }
      });
    });
  }

  protected onGridScroll(event: Event): void {
    const container = event.target as HTMLDivElement | null;
    if (!container || !this.hasMoreVisibleIcons()) {
      return;
    }

    const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    if (distanceToBottom <= 320) {
      this.visibleIconsCount.update(count => count + ICON_BROWSER_BATCH_SIZE);
    }
  }

  protected async copyIconName(iconName: IconName): Promise<void> {
    try {
      await navigator.clipboard.writeText(iconName);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = iconName;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    this.copiedIcon.set(iconName);
  }

  protected asSize(value: string | number | null | undefined): Size {
    return value === 'small' || value === 'large' ? value : 'medium';
  }

  protected asVariant(value: string | number | null | undefined): (typeof variants)[number] {
    return value === 'filled' ? 'filled' : 'regular';
  }
}
