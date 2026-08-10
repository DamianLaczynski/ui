import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent, SelectItem } from './select.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  const createMockItems = (): SelectItem[] => [
    { value: 1, label: 'Option 1', icon: 'folder' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3', disabled: true },
    { value: 4, label: 'Apple' },
    { value: 5, label: 'Banana' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent, NoopAnimationsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    fixture.detectChanges();

    expect(component.items()).toEqual([]);
    expect(component.mode()).toBe('single');
    expect(component.searchable()).toBe(false);
    expect(component.clearable()).toBe(false);
    expect(component.maxHeight()).toBe('300px');
  });

  it('should display placeholder when no selection', () => {
    fixture.componentRef.setInput('items', createMockItems());
    fixture.componentRef.setInput('placeholder', 'Choose an option');
    fixture.detectChanges();

    expect(component.displayText()).toBe('Choose an option');
  });

  it('should select single item', () => {
    fixture.componentRef.setInput('items', createMockItems());
    fixture.componentRef.setInput('mode', 'single');
    fixture.detectChanges();

    const item = createMockItems()[0];
    component.selectItem(item);
    fixture.detectChanges();

    expect(component.selectedValues().has(1)).toBe(true);
    expect(component.displayText()).toBe('Option 1');
  });

  it('should not select disabled item', () => {
    fixture.componentRef.setInput('items', createMockItems());
    fixture.detectChanges();

    component.selectItem(createMockItems()[2]);
    fixture.detectChanges();

    expect(component.selectedValues().size).toBe(0);
  });

  it('should toggle items in multi mode', () => {
    fixture.componentRef.setInput('items', createMockItems());
    fixture.componentRef.setInput('mode', 'multi');
    fixture.detectChanges();

    const items = createMockItems();
    component.selectItem(items[0]);
    component.selectItem(items[1]);
    expect(component.selectedValues().size).toBe(2);

    component.selectItem(items[0]);
    expect(component.selectedValues().has(1)).toBe(false);
  });

  it('should display comma-separated labels in multi mode', () => {
    fixture.componentRef.setInput('items', createMockItems());
    fixture.componentRef.setInput('mode', 'multi');
    fixture.detectChanges();

    component.selectItem(createMockItems()[3]);
    component.selectItem(createMockItems()[4]);
    fixture.detectChanges();

    expect(component.displayText()).toBe('Apple, Banana');
  });

  it('should filter items when searchable', () => {
    fixture.componentRef.setInput('items', createMockItems());
    fixture.componentRef.setInput('searchable', true);
    fixture.detectChanges();

    component.onSearchInput({ target: { value: 'app' } } as unknown as Event);
    fixture.detectChanges();

    expect(component.availableItems().map(item => item.label)).toEqual(['Apple']);
  });

  it('should clear selection', () => {
    fixture.componentRef.setInput('items', createMockItems());
    fixture.detectChanges();

    component.selectItem(createMockItems()[0]);
    component.clearSelection();
    fixture.detectChanges();

    expect(component.selectedValues().size).toBe(0);
  });

  it('should write single value through CVA', () => {
    fixture.componentRef.setInput('items', createMockItems());
    fixture.componentRef.setInput('mode', 'single');
    fixture.detectChanges();

    component.writeValue(2);
    fixture.detectChanges();

    expect(component.selectedValues().has(2)).toBe(true);
    expect(component.displayText()).toBe('Option 2');
  });

  it('should write multi value through CVA', () => {
    fixture.componentRef.setInput('items', createMockItems());
    fixture.componentRef.setInput('mode', 'multi');
    fixture.detectChanges();

    component.writeValue([1, 4]);
    fixture.detectChanges();

    expect(component.selectedValues().has(1)).toBe(true);
    expect(component.selectedValues().has(4)).toBe(true);
    expect(component.displayText()).toBe('Option 1, Apple');
  });

  it('should highlight items with arrow keys without auto-selecting in single mode', () => {
    fixture.componentRef.setInput('items', createMockItems());
    fixture.componentRef.setInput('mode', 'single');
    fixture.detectChanges();

    component.openDropdown(true);
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();

    expect(component.activeDescendant()).toContain('select-option');
    expect(component.selectedValues().size).toBe(0);
  });

  it('should select highlighted item on Enter', () => {
    fixture.componentRef.setInput('items', createMockItems());
    fixture.detectChanges();

    component.openDropdown(true);
    const firstItem = createMockItems()[0];
    component.activeDescendant.set(component.getItemId(firstItem));
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(component.selectedValues().has(1)).toBe(true);
  });
});
