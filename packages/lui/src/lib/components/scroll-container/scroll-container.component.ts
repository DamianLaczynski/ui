import {
  Component,
  input,
  output,
  signal,
  TemplateRef,
  ElementRef,
  viewChild,
  contentChild,
  ChangeDetectionStrategy,
  effect,
  computed,
  afterNextRender,
  inject,
  DestroyRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QueryResult } from '../../api';
import {
  ScrollPanelComponent,
  ScrollPanelOrientation,
  ScrollPanelBehavior,
} from '../scroll-panel/scroll-panel.component';
import { NodeComponent, Node } from '../node/node.component';
import { LoadingStateComponent } from '../loading-state/loading-state.component';
import { Size, Shape, Appearance } from '../utils';
import { UiI18nService } from '../../i18n';

export type ScrollContainerDataSource<T = any> = (
  page: number,
  pageSize: number,
) => Observable<QueryResult<T>>;

@Component({
  selector: 'ui-scroll-container',
  templateUrl: './scroll-container.component.html',
  imports: [CommonModule, ScrollPanelComponent, NodeComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollContainerComponent<T = any> {
  //Service
  private readonly i18n = inject(UiI18nService);
  private readonly destroyRef = inject(DestroyRef);

  //Translations
  private readonly scrollAriaLabel = this.i18n.tSignal(
    'scrollContainer.ariaLabel',
    'Scrollable container with items',
  );
  private readonly emptyText = this.i18n.tSignal(
    'scrollContainer.emptyText',
    'No items to display',
  );
  private readonly loadDataErrorText = this.i18n.tSignal(
    'scrollContainer.loadDataError',
    'Failed to load data',
  );
  private readonly loadMoreErrorText = this.i18n.tSignal(
    'scrollContainer.loadMoreError',
    'Failed to load more data',
  );

  //Inputs
  // Data source configuration
  dataSource = input.required<ScrollContainerDataSource<T>>();
  pageSize = input<number>(20);
  initialPage = input<number>(1);

  // Display configuration
  itemTemplate = input<TemplateRef<unknown> | null>(null);
  emptyTemplate = input<TemplateRef<unknown> | null>(null);
  useNodeComponent = input<boolean>(true);
  nodeMapper = input<((item: T) => Node | null) | null>(null);

  // Scroll panel configuration
  orientation = input<ScrollPanelOrientation>('vertical');
  scrollbarBehavior = input<ScrollPanelBehavior>('auto');
  maxHeight = input<string>('100%');
  maxWidth = input<string>('100%');
  ariaLabel = input<string>('');

  // Node component configuration
  nodeSize = input<Size>('medium');
  showSelectionIndicator = input<boolean>(false);
  indicatorPosition = input<'horizontal' | 'vertical'>('horizontal');
  appearance = input<Appearance>('subtle');
  shape = input<Shape>('rounded');
  asButton = input<boolean>(false);
  selectOnClick = input<boolean>(true);

  // Outputs
  itemClick = output<{ item: T; node: Node | null }>();
  itemSelect = output<{ item: T; node: Node | null }>();
  loadMore = output<{ page: number; items: T[] }>();
  loadComplete = output<void>();

  // View children
  scrollPanel = viewChild<ScrollPanelComponent>('scrollPanel');
  scrollContainer = viewChild<ElementRef<HTMLDivElement>>('scrollContainer');
  itemTemplateRef = contentChild<TemplateRef<any>>('itemTemplate');

  private scrollListener?: () => void;

  // State
  items = signal<T[]>([]);
  currentPage = signal<number>(1);
  isLoading = signal<boolean>(false);
  hasNextPage = signal<boolean>(true);
  hasPreviousPage = signal<boolean>(false);
  totalCount = signal<number | undefined>(undefined);
  error = signal<string | null>(null);
  selectedItemId = signal<string | number | null>(null);

  // Computed
  effectiveItemTemplate = computed(() => this.itemTemplate() || this.itemTemplateRef() || null);
  shouldUseNodeComponent = computed(() => this.useNodeComponent() && !this.effectiveItemTemplate());

  emptyTextComputed = computed(() => this.emptyText());
  effectiveAriaLabel = computed(() => this.ariaLabel().trim() || this.scrollAriaLabel());

  constructor() {
    effect(() => {
      this.dataSource();
      this.loadInitialData();
    });

    afterNextRender(() => {
      this.setupScrollListener();
    });
  }

  private loadInitialData(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.currentPage.set(this.initialPage());

    this.dataSource()(this.initialPage(), this.pageSize())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: result => {
          this.items.set(result.items);
          this.hasNextPage.set(result.hasNextPage ?? false);
          this.hasPreviousPage.set(result.hasPreviousPage ?? false);
          this.totalCount.set(result.totalCount ?? result.items.length);
          this.isLoading.set(false);
          this.loadMore.emit({ page: this.initialPage(), items: result.items });
        },
        error: err => {
          this.error.set(err instanceof Error ? err.message : this.loadDataErrorText());
          this.items.set([]);
          this.isLoading.set(false);
        },
      });
  }

  private loadMoreData(): void {
    if (!this.hasNextPage() || this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    const nextPage = this.currentPage() + 1;

    this.dataSource()(nextPage, this.pageSize())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: result => {
          const currentItems = this.items();
          this.items.set([...currentItems, ...result.items]);
          this.hasNextPage.set(result.hasNextPage ?? false);
          this.hasPreviousPage.set(result.hasPreviousPage ?? true);
          this.currentPage.set(nextPage);
          this.totalCount.set(result.totalCount ?? this.items().length);
          this.isLoading.set(false);

          this.loadMore.emit({ page: nextPage, items: result.items });

          if (!(result.hasNextPage ?? false)) {
            this.loadComplete.emit();
          }
        },
        error: err => {
          this.error.set(err instanceof Error ? err.message : this.loadMoreErrorText());
          this.isLoading.set(false);
        },
      });
  }

  private setupScrollListener(): void {
    const panel = this.scrollPanel();
    if (!panel) return;

    const container = panel.scrollContainer()?.nativeElement;
    if (!container) return;

    this.scrollListener = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      const threshold = 100;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      if (distanceFromBottom < threshold && this.hasNextPage() && !this.isLoading()) {
        this.loadMoreData();
      }
    };

    container.addEventListener('scroll', this.scrollListener);
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    const threshold = 100;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

    if (distanceFromBottom < threshold && this.hasNextPage() && !this.isLoading()) {
      this.loadMoreData();
    }
  }

  onNodeClick(node: Node): void {
    const item = this.items().find((item, index) => {
      const mappedNode = this.mapItemToNode(item, index);
      return mappedNode?.id === node.id;
    });

    if (item) {
      this.itemClick.emit({ item, node });
    }
  }

  onNodeSelect(node: Node): void {
    const item = this.items().find((item, index) => {
      const mappedNode = this.mapItemToNode(item, index);
      return mappedNode?.id === node.id;
    });

    if (item) {
      this.selectedItemId.set(node.id);
      this.itemSelect.emit({ item, node });
    }
  }

  mapItemToNode(item: T, index: number): Node | null {
    const mapper = this.nodeMapper();
    if (mapper !== null && mapper !== undefined) {
      return mapper(item);
    }

    if (typeof item === 'object' && item !== null) {
      const itemObj = item as any;
      return {
        id: itemObj.id ?? index,
        label: itemObj.label ?? itemObj.name ?? String(item),
        icon: itemObj.icon,
        disabled: itemObj.disabled,
        selected: this.selectedItemId() === (itemObj.id ?? index),
        data: item,
      };
    }

    return {
      id: index,
      label: String(item),
      data: item,
    };
  }

  scrollToTop(): void {
    this.scrollPanel()?.scrollToTop();
  }

  scrollToBottom(): void {
    this.scrollPanel()?.scrollToBottom();
  }

  refresh(): void {
    this.items.set([]);
    this.currentPage.set(this.initialPage());
    this.hasNextPage.set(true);
    this.hasPreviousPage.set(false);
    this.selectedItemId.set(null);
    this.loadInitialData();
  }
}
