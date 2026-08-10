/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbComponent, Breadcrumb } from './breadcrumb.component';
import { IconComponent } from '../icon/icon.component';
import { Size } from '../utils';

const TEST_ITEMS: Breadcrumb[] = [
  { id: '1', label: 'Home', icon: 'home' },
  { id: '2', label: 'Products', icon: 'folder' },
  { id: '3', label: 'Electronics', icon: 'device_eq', selected: true },
];

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent<Breadcrumb>;
  let fixture: ComponentFixture<BreadcrumbComponent<Breadcrumb>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent, IconComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent<Breadcrumb>);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', TEST_ITEMS);
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should require items input', () => {
      expect(component.items()).toEqual(TEST_ITEMS);
    });

    it('should have default input values', () => {
      expect(component.size()).toBe('medium');
      expect(component.variant()).toBe('primary');
      expect(component.appearance()).toBe('transparent');
      expect(component.shape()).toBe('rounded');
      expect(component.showIcons()).toBe(true);
      expect(component.ariaLabel()).toBe('Breadcrumb');
      expect(component.focusMode()).toBe('tab');
      expect(component.truncateLength()).toBeNull();
      expect(component.maxDisplayedItems()).toBeNull();
      expect(component.responsiveOverflow()).toBe(true);
    });
  });

  describe('Rendering', () => {
    it('should render nav with aria-label', () => {
      const nav = fixture.debugElement.query(By.css('nav'));
      expect(nav).toBeTruthy();
      expect(nav.nativeElement.getAttribute('aria-label')).toBe('Breadcrumb');
    });

    it('should render custom aria-label when provided', () => {
      fixture.componentRef.setInput('ariaLabel', 'Custom breadcrumb');
      fixture.detectChanges();
      const nav = fixture.debugElement.query(By.css('nav'));
      expect(nav.nativeElement.getAttribute('aria-label')).toBe('Custom breadcrumb');
    });

    it('should render ordered list', () => {
      const ol = fixture.debugElement.query(By.css('ol.breadcrumb__list'));
      expect(ol).toBeTruthy();
    });

    it('should render correct number of items', () => {
      const items = fixture.debugElement.queryAll(By.css('li.breadcrumb__item'));
      expect(items.length).toBe(TEST_ITEMS.length);
    });

    it('should render item labels', () => {
      const labels = fixture.debugElement.queryAll(By.css('.node__label'));
      expect(labels.length).toBe(TEST_ITEMS.length);
      expect(labels[0].nativeElement.textContent?.trim()).toBe('Home');
      expect(labels[1].nativeElement.textContent?.trim()).toBe('Products');
      expect(labels[2].nativeElement.textContent?.trim()).toBe('Electronics');
    });

    it('should not show divider after last item', () => {
      const dividers = fixture.debugElement.queryAll(By.css('.breadcrumb__divider'));
      expect(dividers.length).toBe(TEST_ITEMS.length - 1);
    });

    it('should add aria-hidden to dividers', () => {
      const dividers = fixture.debugElement.queryAll(By.css('.breadcrumb__divider'));
      dividers.forEach(d => {
        expect(d.nativeElement.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('should set aria-current="page" on selected item', () => {
      const span = fixture.debugElement.query(By.css('span[aria-current="page"]'));
      expect(span).toBeTruthy();
      expect(span.nativeElement.textContent?.trim()).toContain('Electronics');
    });
  });

  describe('Size Input', () => {
    const sizes: Size[] = ['small', 'medium', 'large'];

    sizes.forEach(size => {
      it(`should apply ${size} size class`, () => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();
        const nav = fixture.debugElement.query(By.css('nav'));
        expect(nav.nativeElement.classList.contains(`breadcrumb--${size}`)).toBe(true);
      });
    });
  });

  describe('itemClick Event', () => {
    it('should emit itemClick when item is clicked', () => {
      let emitted: Breadcrumb | undefined;
      component.itemClick.subscribe(item => (emitted = item));

      const button = fixture.debugElement.query(By.css('button.breadcrumb__focusable'));
      button?.nativeElement.click();
      fixture.detectChanges();

      expect(emitted).toBeDefined();
      expect(emitted?.id).toBe('1');
      expect(emitted?.label).toBe('Home');
    });

    it('should not emit when selected item is clicked', () => {
      let emitted = false;
      component.itemClick.subscribe(() => (emitted = true));

      const spans = fixture.debugElement.queryAll(By.css('span.breadcrumb__focusable'));
      const selectedSpan = spans.find(s => s.nativeElement.textContent?.includes('Electronics'));
      selectedSpan?.nativeElement.click();
      fixture.detectChanges();

      expect(emitted).toBe(false);
    });
  });

  describe('Truncation', () => {
    it('should truncate long labels when truncateLength is set', () => {
      const longLabel = 'This is a very long breadcrumb label that should be truncated';
      const items: Breadcrumb[] = [{ id: '1', label: longLabel }];
      fixture.componentRef.setInput('items', items);
      fixture.componentRef.setInput('truncateLength', 30);
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.node__label'));
      expect(label.nativeElement.textContent?.trim()).toBe('This is a very long breadcr...');
    });

    it('should not truncate when truncateLength is null', () => {
      const longLabel = 'This is a very long breadcrumb label';
      const items: Breadcrumb[] = [{ id: '1', label: longLabel }];
      fixture.componentRef.setInput('items', items);
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.node__label'));
      expect(label.nativeElement.textContent?.trim()).toBe(longLabel);
    });
  });

  describe('focusMode', () => {
    it('should set data-focus-mode attribute', () => {
      fixture.componentRef.setInput('focusMode', 'arrow');
      fixture.detectChanges();
      const nav = fixture.debugElement.query(By.css('nav'));
      expect(nav.nativeElement.getAttribute('data-focus-mode')).toBe('arrow');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on nav', () => {
      const nav = fixture.debugElement.query(By.css('nav'));
      expect(nav.nativeElement.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have aria-current on current page', () => {
      const current = fixture.debugElement.query(By.css('[aria-current="page"]'));
      expect(current).toBeTruthy();
    });
  });
});
