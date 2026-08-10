/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MenuItem } from '../menu/models/menu-item.model';
import { SpeedDialComponent } from './speed-dial.component';

const sampleItems: MenuItem[] = [
  { id: 'a', label: 'One', icon: 'star' },
  { id: 'b', label: 'Two', icon: 'heart' },
];

function getTriggerNativeButton(fixture: ComponentFixture<unknown>): HTMLButtonElement {
  return fixture.nativeElement.querySelector('.speed-dial__trigger button') as HTMLButtonElement;
}

function getTriggerHost(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement.querySelector('.speed-dial__trigger ui-button') as HTMLElement;
}

describe('SpeedDialComponent', () => {
  let fixture: ComponentFixture<SpeedDialComponent>;
  let component: SpeedDialComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeedDialComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeedDialComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', sampleItems);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start closed with aria-expanded false', () => {
    expect(getTriggerHost(fixture).getAttribute('aria-expanded')).toBe('false');
    expect(component.visible()).toBe(false);
  });

  it('should open on trigger click and emit show', () => {
    const showSpy = vi.fn();
    component.show.subscribe(showSpy);

    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();

    expect(component.visible()).toBe(true);
    expect(showSpy).toHaveBeenCalledTimes(1);
    expect(getTriggerHost(fixture).getAttribute('aria-expanded')).toBe('true');
  });

  it('should emit click on trigger click', () => {
    const clickSpy = vi.fn();
    component.click.subscribe(clickSpy);
    getTriggerNativeButton(fixture).click();
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('should close on second trigger click and emit hide', () => {
    const hideSpy = vi.fn();
    component.hide.subscribe(hideSpy);

    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();
    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
    expect(hideSpy).toHaveBeenCalledTimes(1);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const showSpy = vi.fn();
    component.show.subscribe(showSpy);
    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
    expect(showSpy).not.toHaveBeenCalled();
  });

  it('should render menu with role and menuitems', () => {
    const menu = fixture.debugElement.query(By.css('[role="menu"]'));
    expect(menu).toBeTruthy();
    expect(menu.nativeElement.getAttribute('aria-hidden')).toBe('true');

    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();

    expect(menu.nativeElement.getAttribute('aria-hidden')).toBe('false');
    const list = fixture.debugElement.query(By.css('.speed-dial__list'));
    const rows = list.queryAll(By.css('li.speed-dial__item'));
    expect(rows.length).toBe(2);
    const firstBtn = rows[0].query(By.css('button'));
    expect(firstBtn.nativeElement.getAttribute('role')).toBe('menuitem');
  });

  it('should set menu item buttons tabindex -1 when dial is closed', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.speed-dial__list button');
    expect(buttons.length).toBe(sampleItems.length);
    for (const btn of buttons) {
      expect((btn as HTMLButtonElement).tabIndex).toBe(-1);
    }
  });

  it('should clear tabindex on menu item buttons when dial opens so they are tabbable', () => {
    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('.speed-dial__list button');
    expect(buttons.length).toBe(sampleItems.length);
    for (const btn of buttons) {
      const el = btn as HTMLButtonElement;
      expect(el.hasAttribute('tabindex')).toBe(false);
      expect(el.tabIndex).toBe(0);
    }
  });

  it('should apply transform styles for linear layout', () => {
    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();

    const offsets = fixture.nativeElement.querySelectorAll('.speed-dial__item-offset');
    expect(offsets.length).toBe(2);
    const t0 = (offsets[0] as HTMLElement).style.transform;
    expect(t0).toContain('translate');
    expect(t0).toContain('-56');
  });

  it('should call item action and close on item click', () => {
    const action = vi.fn();
    fixture.componentRef.setInput('items', [{ id: 'x', label: 'Act', action }]);
    fixture.detectChanges();

    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();

    fixture.debugElement.query(By.css('.speed-dial__list li button')).nativeElement.click();
    fixture.detectChanges();

    expect(action).toHaveBeenCalledTimes(1);
    expect(component.visible()).toBe(false);
  });

  it('should not run action when item is disabled', () => {
    const action = vi.fn();
    fixture.componentRef.setInput('items', [{ id: 'x', label: 'Act', disabled: true, action }]);
    fixture.detectChanges();

    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.speed-dial__list li button')).nativeElement.click();
    fixture.detectChanges();

    expect(action).not.toHaveBeenCalled();
    expect(component.visible()).toBe(true);
  });

  it('should close on mask click when mask is enabled', () => {
    fixture.componentRef.setInput('mask', true);
    fixture.detectChanges();

    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();

    const mask = fixture.nativeElement.querySelector('.speed-dial__mask') as HTMLElement;
    expect(mask).toBeTruthy();
    mask.click();
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
  });

  it('should close on document click outside', () => {
    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();
    expect(component.visible()).toBe(true);

    const outside = document.createElement('button');
    document.body.appendChild(outside);
    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
    outside.remove();
  });

  it('should not close on outside click when hideOnClickOutside is false', () => {
    fixture.componentRef.setInput('hideOnClickOutside', false);
    fixture.detectChanges();

    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();

    const outside = document.createElement('button');
    document.body.appendChild(outside);
    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(component.visible()).toBe(true);
    outside.remove();
  });

  it('should close on Escape', () => {
    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
  });

  it('should stagger transition delay when open vs closed', () => {
    fixture.componentRef.setInput('transitionDelay', 10);
    fixture.detectChanges();

    expect(component.itemTransitionDelayMs(0)).toBe(10);
    expect(component.itemTransitionDelayMs(1)).toBe(0);

    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();

    expect(component.itemTransitionDelayMs(0)).toBe(0);
    expect(component.itemTransitionDelayMs(1)).toBe(10);
  });

  it('should auto-close after idle when autoCloseIdleMs is set', () => {
    vi.useFakeTimers();
    fixture.componentRef.setInput('autoCloseIdleMs', 1000);
    fixture.detectChanges();

    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();
    expect(component.visible()).toBe(true);

    vi.advanceTimersByTime(1000);
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
    vi.useRealTimers();
  });

  it('should use itemAriaLabel from label or id', () => {
    expect(component.itemAriaLabel({ id: 'id1', label: 'Hello' })).toBe('Hello');
    expect(component.itemAriaLabel({ id: 'id2', label: '   ' })).toBe('id2');
  });

  it('should close other dial when coordinateWithOthers and second opens', () => {
    const otherFixture = TestBed.createComponent(SpeedDialComponent);
    const other = otherFixture.componentInstance;
    otherFixture.componentRef.setInput('items', [{ id: 'o', label: 'Other' }]);
    otherFixture.detectChanges();

    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();
    expect(component.visible()).toBe(true);

    getTriggerNativeButton(otherFixture).click();
    otherFixture.detectChanges();
    fixture.detectChanges();
    otherFixture.detectChanges();

    expect(other.visible()).toBe(true);
    expect(component.visible()).toBe(false);

    otherFixture.destroy();
  });

  it('should not close other dial when coordinateWithOthers is false', () => {
    fixture.componentRef.setInput('coordinateWithOthers', false);
    fixture.componentRef.setInput('hideOnClickOutside', false);
    fixture.detectChanges();

    const otherFixture = TestBed.createComponent(SpeedDialComponent);
    otherFixture.componentRef.setInput('items', [{ id: 'o', label: 'Other' }]);
    otherFixture.componentRef.setInput('coordinateWithOthers', false);
    otherFixture.componentRef.setInput('hideOnClickOutside', false);
    otherFixture.detectChanges();

    getTriggerNativeButton(fixture).click();
    fixture.detectChanges();
    getTriggerNativeButton(otherFixture).click();
    otherFixture.detectChanges();
    fixture.detectChanges();
    otherFixture.detectChanges();

    expect(component.visible()).toBe(true);
    expect(otherFixture.componentInstance.visible()).toBe(true);

    otherFixture.destroy();
  });
});
