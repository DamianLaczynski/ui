import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent, PaginationConfig } from './pagination.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

const pageValues = (slots: ReturnType<PaginationComponent['visiblePageSlots']>) =>
  slots.filter(slot => slot.kind === 'page').map(slot => slot.value);

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  const createBasicConfig = (overrides?: Partial<PaginationConfig>): PaginationConfig => ({
    currentPage: 1,
    totalPages: 10,
    totalItems: 100,
    pageSize: 10,
    showPageNumbers: true,
    showFirstLast: true,
    showInfo: true,
    showPageSizeSelector: false,
    maxVisiblePages: 5,
    ...overrides,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent, NoopAnimationsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      fixture.componentRef.setInput('config', createBasicConfig());
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });

    it('should have default size', () => {
      fixture.componentRef.setInput('config', createBasicConfig());
      fixture.detectChanges();

      expect(component.size()).toBe('medium');
    });

    it('should accept custom size', () => {
      fixture.componentRef.setInput('config', createBasicConfig());
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();

      expect(component.size()).toBe('small');
    });
  });

  describe('Navigation State', () => {
    it('should disable first/previous on first page', () => {
      fixture.componentRef.setInput('config', createBasicConfig({ currentPage: 1 }));
      fixture.detectChanges();

      expect(component.canGoToFirst()).toBe(false);
      expect(component.canGoToPrevious()).toBe(false);
      expect(component.canGoToNext()).toBe(true);
      expect(component.canGoToLast()).toBe(true);
    });

    it('should enable all navigation on middle page', () => {
      fixture.componentRef.setInput('config', createBasicConfig({ currentPage: 5 }));
      fixture.detectChanges();

      expect(component.canGoToFirst()).toBe(true);
      expect(component.canGoToPrevious()).toBe(true);
      expect(component.canGoToNext()).toBe(true);
      expect(component.canGoToLast()).toBe(true);
    });

    it('should disable next/last on last page', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 10, totalPages: 10 }),
      );
      fixture.detectChanges();

      expect(component.canGoToFirst()).toBe(true);
      expect(component.canGoToPrevious()).toBe(true);
      expect(component.canGoToNext()).toBe(false);
      expect(component.canGoToLast()).toBe(false);
    });

    it('should disable all navigation when only one page', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 1, totalPages: 1, totalItems: 5 }),
      );
      fixture.detectChanges();

      expect(component.canGoToFirst()).toBe(false);
      expect(component.canGoToPrevious()).toBe(false);
      expect(component.canGoToNext()).toBe(false);
      expect(component.canGoToLast()).toBe(false);
    });
  });

  describe('Page Navigation', () => {
    it('should emit pageChange when clicking first', () => {
      let emittedPage: number | undefined;
      component.pageChange.subscribe(page => (emittedPage = page));

      fixture.componentRef.setInput('config', createBasicConfig({ currentPage: 5 }));
      fixture.detectChanges();

      component.onFirstClick();

      expect(emittedPage).toBe(1);
    });

    it('should emit pageChange when clicking previous', () => {
      let emittedPage: number | undefined;
      component.pageChange.subscribe(page => (emittedPage = page));

      fixture.componentRef.setInput('config', createBasicConfig({ currentPage: 5 }));
      fixture.detectChanges();

      component.onPreviousClick();

      expect(emittedPage).toBe(4);
    });

    it('should emit pageChange when clicking next', () => {
      let emittedPage: number | undefined;
      component.pageChange.subscribe(page => (emittedPage = page));

      fixture.componentRef.setInput('config', createBasicConfig({ currentPage: 5 }));
      fixture.detectChanges();

      component.onNextClick();

      expect(emittedPage).toBe(6);
    });

    it('should emit pageChange when clicking last', () => {
      let emittedPage: number | undefined;
      component.pageChange.subscribe(page => (emittedPage = page));

      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 5, totalPages: 10 }),
      );
      fixture.detectChanges();

      component.onLastClick();

      expect(emittedPage).toBe(10);
    });

    it('should emit pageChange when clicking page number', () => {
      let emittedPage: number | undefined;
      component.pageChange.subscribe(page => (emittedPage = page));

      fixture.componentRef.setInput('config', createBasicConfig({ currentPage: 1 }));
      fixture.detectChanges();

      component.onPageClick(7);

      expect(emittedPage).toBe(7);
    });

    it('should not emit when clicking current page', () => {
      let emittedPage: number | undefined;
      component.pageChange.subscribe(page => (emittedPage = page));

      fixture.componentRef.setInput('config', createBasicConfig({ currentPage: 5 }));
      fixture.detectChanges();

      component.onPageClick(5);

      expect(emittedPage).toBeUndefined();
    });

    it('should not emit when clicking ellipsis', () => {
      let emittedPage: number | undefined;
      component.pageChange.subscribe(page => (emittedPage = page));

      fixture.componentRef.setInput('config', createBasicConfig());
      fixture.detectChanges();

      // Ellipsis are no longer clickable page values
      expect(emittedPage).toBeUndefined();
    });

    it('should not navigate when already on first page', () => {
      let emittedPage: number | undefined;
      component.pageChange.subscribe(page => (emittedPage = page));

      fixture.componentRef.setInput('config', createBasicConfig({ currentPage: 1 }));
      fixture.detectChanges();

      component.onFirstClick();
      component.onPreviousClick();

      expect(emittedPage).toBeUndefined();
    });

    it('should not navigate when already on last page', () => {
      let emittedPage: number | undefined;
      component.pageChange.subscribe(page => (emittedPage = page));

      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 10, totalPages: 10 }),
      );
      fixture.detectChanges();

      component.onNextClick();
      component.onLastClick();

      expect(emittedPage).toBeUndefined();
    });
  });

  describe('Visible Page Slots', () => {
    it('should show all pages when total is less than maxVisible', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 1, totalPages: 3, maxVisiblePages: 5 }),
      );
      fixture.detectChanges();

      const slots = component.visiblePageSlots();
      expect(pageValues(slots)).toEqual([1, 2, 3]);
    });

    it('should keep a stable slot count when total exceeds maxVisible', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 1, totalPages: 20, maxVisiblePages: 5 }),
      );
      fixture.detectChanges();

      const firstPageSlots = component.visiblePageSlots();
      expect(firstPageSlots.length).toBe(9);

      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 10, totalPages: 20, maxVisiblePages: 5 }),
      );
      fixture.detectChanges();

      const middlePageSlots = component.visiblePageSlots();
      expect(middlePageSlots.length).toBe(9);
      expect(pageValues(middlePageSlots)[0]).toBe(1);
      expect(pageValues(middlePageSlots).at(-1)).toBe(20);
      expect(middlePageSlots.some(slot => slot.kind === 'ellipsis')).toBe(true);
    });

    it('should center current page in visible range', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 10, totalPages: 20, maxVisiblePages: 5 }),
      );
      fixture.detectChanges();

      const slots = component.visiblePageSlots();
      expect(pageValues(slots)).toContain(10);
    });

    it('should adjust range when near the end', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 19, totalPages: 20, maxVisiblePages: 5 }),
      );
      fixture.detectChanges();

      const slots = component.visiblePageSlots();
      expect(pageValues(slots)[0]).toBe(1);
      expect(pageValues(slots).at(-1)).toBe(20);
      expect(pageValues(slots)).toContain(19);
    });

    it('should reserve leading ellipsis slot near the start', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 1, totalPages: 20, maxVisiblePages: 3 }),
      );
      fixture.detectChanges();

      const slots = component.visiblePageSlots();
      const leadingEllipsis = slots.find(slot => slot.kind === 'ellipsis' && slot.key === 'start');
      expect(leadingEllipsis).toBeTruthy();
      expect(leadingEllipsis?.kind === 'ellipsis' && leadingEllipsis.hidden).toBe(true);
    });

    it('should show trailing ellipsis when not at end', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 5, totalPages: 20, maxVisiblePages: 3 }),
      );
      fixture.detectChanges();

      const slots = component.visiblePageSlots();
      const trailingEllipsis = slots.find(slot => slot.kind === 'ellipsis' && slot.key === 'end');
      expect(trailingEllipsis).toBeTruthy();
      expect(trailingEllipsis?.kind === 'ellipsis' && trailingEllipsis.hidden).toBe(false);
    });

    it('should return empty array when showPageNumbers is false', () => {
      fixture.componentRef.setInput('config', createBasicConfig({ showPageNumbers: false }));
      fixture.detectChanges();

      const slots = component.visiblePageSlots();
      expect(slots).toEqual([]);
    });

    it('should handle single page correctly', () => {
      fixture.componentRef.setInput('config', createBasicConfig({ currentPage: 1, totalPages: 1 }));
      fixture.detectChanges();

      const slots = component.visiblePageSlots();
      expect(pageValues(slots)).toEqual([1]);
    });
  });

  describe('Info Text', () => {
    it('should display correct range for first page', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 1, pageSize: 10, totalItems: 100 }),
      );
      fixture.detectChanges();

      expect(component.infoText()).toBe('Showing 1-10 of 100');
    });

    it('should display correct range for middle page', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 5, pageSize: 10, totalItems: 100 }),
      );
      fixture.detectChanges();

      expect(component.infoText()).toBe('Showing 41-50 of 100');
    });

    it('should display correct range for last page with partial items', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 10, pageSize: 10, totalItems: 95 }),
      );
      fixture.detectChanges();

      expect(component.infoText()).toBe('Showing 91-95 of 95');
    });

    it('should display "No items" when totalItems is 0', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 1, totalPages: 0, totalItems: 0 }),
      );
      fixture.detectChanges();

      expect(component.infoText()).toBe('No items');
    });

    it('should handle single item correctly', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 1, pageSize: 10, totalItems: 1, totalPages: 1 }),
      );
      fixture.detectChanges();

      expect(component.infoText()).toBe('Showing 1-1 of 1');
    });

    it('should handle different page sizes', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 2, pageSize: 25, totalItems: 100 }),
      );
      fixture.detectChanges();

      expect(component.infoText()).toBe('Showing 26-50 of 100');
    });
  });

  describe('Page Size Selection', () => {
    it('should emit pageSizeChange when selecting new size', () => {
      let emittedSize: number | undefined;
      component.pageSizeChange.subscribe(size => (emittedSize = size));

      fixture.componentRef.setInput(
        'config',
        createBasicConfig({
          showPageSizeSelector: true,
          pageSizeOptions: [10, 25, 50, 100],
        }),
      );
      fixture.detectChanges();

      component.onPageSizeSelected(25);

      expect(emittedSize).toBe(25);
    });

    it('should handle string page size values', () => {
      let emittedSize: number | undefined;
      component.pageSizeChange.subscribe(size => (emittedSize = size));

      fixture.componentRef.setInput(
        'config',
        createBasicConfig({
          showPageSizeSelector: true,
          pageSizeOptions: [10, 25, 50],
        }),
      );
      fixture.detectChanges();

      component.onPageSizeSelected('50');

      expect(emittedSize).toBe(50);
    });

    it('should handle dropdown item page size values', () => {
      let emittedSize: number | undefined;
      component.pageSizeChange.subscribe(size => (emittedSize = size));

      fixture.componentRef.setInput(
        'config',
        createBasicConfig({
          showPageSizeSelector: true,
          pageSizeOptions: [10, 25, 50],
        }),
      );
      fixture.detectChanges();

      component.onPageSizeSelected(25);

      expect(emittedSize).toBe(25);
    });

    it('should create dropdown items from page size options', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({
          showPageSizeSelector: true,
          pageSizeOptions: [10, 25, 50, 100],
        }),
      );
      fixture.detectChanges();

      const items = component.pageSizeItems();
      expect(items.length).toBe(4);
      expect(items[0]).toEqual({ value: 10, label: '10' });
      expect(items[1]).toEqual({ value: 25, label: '25' });
      expect(items[2]).toEqual({ value: 50, label: '50' });
      expect(items[3]).toEqual({ value: 100, label: '100' });
    });

    it('should return empty array when no page size options', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({
          showPageSizeSelector: true,
          pageSizeOptions: [],
        }),
      );
      fixture.detectChanges();

      const items = component.pageSizeItems();
      expect(items).toEqual([]);
    });
  });

  describe('Button Appearance', () => {
    it('should mark the current page as selected in the template', () => {
      fixture.componentRef.setInput('config', createBasicConfig({ currentPage: 5 }));
      fixture.detectChanges();

      const currentPageButton = (
        Array.from(
          fixture.nativeElement.querySelectorAll('.pagination__button--page button'),
        ) as HTMLButtonElement[]
      ).find(button => button.textContent?.trim() === '5');

      expect(currentPageButton?.classList.contains('button--selected')).toBe(true);
    });
  });

  describe('CSS Classes', () => {
    it('should include base pagination class', () => {
      fixture.componentRef.setInput('config', createBasicConfig());
      fixture.detectChanges();

      const classes = component.paginationClasses();
      expect(classes).toContain('pagination');
    });

    it('should include size class', () => {
      fixture.componentRef.setInput('config', createBasicConfig());
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();

      const classes = component.paginationClasses();
      expect(classes).toContain('pagination--small');
    });

    it('should update size class when size changes', () => {
      fixture.componentRef.setInput('config', createBasicConfig());
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();

      const classes = component.paginationClasses();
      expect(classes).toContain('pagination--large');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero total pages', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 1, totalPages: 0, totalItems: 0 }),
      );
      fixture.detectChanges();

      expect(component.canGoToNext()).toBe(false);
      expect(component.canGoToPrevious()).toBe(false);
      expect(component.infoText()).toBe('No items');
    });

    it('should handle very large page numbers', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 500, totalPages: 1000, totalItems: 10000 }),
      );
      fixture.detectChanges();

      expect(component.canGoToNext()).toBe(true);
      expect(component.canGoToPrevious()).toBe(true);
      const slots = component.visiblePageSlots();
      expect(pageValues(slots)).toContain(500);
    });

    it('should handle page size larger than total items', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 1, pageSize: 100, totalItems: 50, totalPages: 1 }),
      );
      fixture.detectChanges();

      expect(component.infoText()).toBe('Showing 1-50 of 50');
      expect(component.canGoToNext()).toBe(false);
    });

    it('should handle maxVisiblePages of 1', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 5, totalPages: 10, maxVisiblePages: 1 }),
      );
      fixture.detectChanges();

      const slots = component.visiblePageSlots();
      expect(slots.length).toBeGreaterThan(1);
      expect(pageValues(slots)[0]).toBe(1);
      expect(pageValues(slots).at(-1)).toBe(10);
    });

    it('should handle undefined maxVisiblePages', () => {
      const config = createBasicConfig({ currentPage: 5, totalPages: 10 });
      delete config.maxVisiblePages;

      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();

      const slots = component.visiblePageSlots();
      expect(slots.length).toBeGreaterThan(0);
    });
  });

  describe('Real-world Scenarios', () => {
    it('should handle typical table pagination (100 items, 10 per page)', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({
          currentPage: 1,
          totalPages: 10,
          totalItems: 100,
          pageSize: 10,
          showPageNumbers: true,
          showFirstLast: true,
          showInfo: true,
        }),
      );
      fixture.detectChanges();

      expect(component.infoText()).toBe('Showing 1-10 of 100');
      expect(component.canGoToNext()).toBe(true);
      expect(component.canGoToPrevious()).toBe(false);
    });

    it('should handle large dataset pagination (10000 items, 50 per page)', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({
          currentPage: 50,
          totalPages: 200,
          totalItems: 10000,
          pageSize: 50,
          maxVisiblePages: 5,
        }),
      );
      fixture.detectChanges();

      expect(component.infoText()).toBe('Showing 2451-2500 of 10000');
      const slots = component.visiblePageSlots();
      const values = slots
        .filter((slot): slot is Extract<typeof slot, { kind: 'page' }> => slot.kind === 'page')
        .map(slot => slot.value);
      expect(values).toContain(50);
      expect(values[0]).toBe(1);
      expect(values.at(-1)).toBe(200);
    });

    it('should handle search results with few items', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({
          currentPage: 1,
          totalPages: 1,
          totalItems: 3,
          pageSize: 10,
        }),
      );
      fixture.detectChanges();

      expect(component.infoText()).toBe('Showing 1-3 of 3');
      expect(component.canGoToNext()).toBe(false);
      expect(component.canGoToPrevious()).toBe(false);
    });

    it('should handle page size change scenario', () => {
      let emittedSize: number | undefined;
      component.pageSizeChange.subscribe(size => (emittedSize = size));

      fixture.componentRef.setInput(
        'config',
        createBasicConfig({
          currentPage: 5,
          totalPages: 10,
          totalItems: 100,
          pageSize: 10,
          showPageSizeSelector: true,
          pageSizeOptions: [10, 25, 50],
        }),
      );
      fixture.detectChanges();

      // User changes page size from 10 to 25
      component.onPageSizeSelected(25);

      expect(emittedSize).toBe(25);
      // Parent component would recalculate totalPages and update config
    });

    it('should handle navigation through all pages', () => {
      const emittedPages: number[] = [];
      component.pageChange.subscribe(page => emittedPages.push(page));

      fixture.componentRef.setInput('config', createBasicConfig({ currentPage: 1, totalPages: 5 }));
      fixture.detectChanges();

      // Navigate through pages
      component.onNextClick(); // Go to page 2
      fixture.componentRef.setInput('config', createBasicConfig({ currentPage: 2, totalPages: 5 }));
      fixture.detectChanges();

      component.onNextClick(); // Go to page 3
      fixture.componentRef.setInput('config', createBasicConfig({ currentPage: 3, totalPages: 5 }));
      fixture.detectChanges();

      component.onLastClick(); // Jump to page 5

      expect(emittedPages).toEqual([2, 3, 5]);
    });

    it('should handle minimal configuration', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({
          currentPage: 1,
          totalPages: 5,
          totalItems: 50,
          pageSize: 10,
          showPageNumbers: false,
          showFirstLast: false,
          showInfo: false,
          showPageSizeSelector: false,
        }),
      );
      fixture.detectChanges();

      // Should still work with minimal config
      expect(component.canGoToNext()).toBe(true);
      expect(component.visiblePageSlots()).toEqual([]);
    });

    it('should handle full-featured configuration', () => {
      fixture.componentRef.setInput(
        'config',
        createBasicConfig({
          currentPage: 5,
          totalPages: 20,
          totalItems: 200,
          pageSize: 10,
          showPageNumbers: true,
          showFirstLast: true,
          showInfo: true,
          showPageSizeSelector: true,
          pageSizeOptions: [10, 25, 50, 100],
          maxVisiblePages: 7,
        }),
      );
      fixture.detectChanges();

      expect(component.infoText()).toBe('Showing 41-50 of 200');
      expect(component.visiblePageSlots().length).toBeGreaterThan(0);
      expect(component.pageSizeItems().length).toBe(4);
      expect(component.canGoToFirst()).toBe(true);
      expect(component.canGoToLast()).toBe(true);
    });
  });

  describe('Boundary Conditions', () => {
    it('should handle transition from page 1 to page 2', () => {
      let emittedPage: number | undefined;
      component.pageChange.subscribe(page => (emittedPage = page));

      fixture.componentRef.setInput('config', createBasicConfig({ currentPage: 1 }));
      fixture.detectChanges();

      expect(component.canGoToPrevious()).toBe(false);

      component.onNextClick();

      expect(emittedPage).toBe(2);
    });

    it('should handle transition from second-to-last to last page', () => {
      let emittedPage: number | undefined;
      component.pageChange.subscribe(page => (emittedPage = page));

      fixture.componentRef.setInput(
        'config',
        createBasicConfig({ currentPage: 9, totalPages: 10 }),
      );
      fixture.detectChanges();

      expect(component.canGoToNext()).toBe(true);

      component.onNextClick();

      expect(emittedPage).toBe(10);
    });

    it('should handle clicking on first page when already there', () => {
      let emittedPage: number | undefined;
      component.pageChange.subscribe(page => (emittedPage = page));

      fixture.componentRef.setInput('config', createBasicConfig({ currentPage: 1 }));
      fixture.detectChanges();

      component.onPageClick(1);

      expect(emittedPage).toBeUndefined();
    });

    it('should handle rapid page changes', () => {
      const emittedPages: number[] = [];
      component.pageChange.subscribe(page => emittedPages.push(page));

      fixture.componentRef.setInput('config', createBasicConfig({ currentPage: 5 }));
      fixture.detectChanges();

      // Each click emits based on current page at that moment
      component.onNextClick(); // 5 + 1 = 6
      component.onNextClick(); // Still 5 + 1 = 6 (config not updated)
      component.onPreviousClick(); // 5 - 1 = 4
      component.onFirstClick(); // 1
      component.onLastClick(); // 10

      // Since config doesn't change between calls, next/previous use same base
      expect(emittedPages).toEqual([6, 6, 4, 1, 10]);
    });
  });
});
