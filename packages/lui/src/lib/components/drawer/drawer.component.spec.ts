/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { Subject } from 'rxjs';
import { DrawerComponent } from './drawer.component';

const flushMicrotasks = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

describe('DrawerComponent', () => {
  let fixture: ComponentFixture<DrawerComponent>;
  let component: DrawerComponent;
  let originalDir: string;
  let directionalityMock: { value: Direction; change: Subject<Direction> };

  beforeEach(async () => {
    originalDir = document.documentElement.dir;
    directionalityMock = {
      value: 'ltr',
      change: new Subject<Direction>(),
    };

    await TestBed.configureTestingModule({
      imports: [DrawerComponent],
      providers: [{ provide: Directionality, useValue: directionalityMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    await flushMicrotasks();
    fixture.detectChanges();
  });

  afterEach(() => {
    document.documentElement.dir = originalDir;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render close button with default aria-label fallback', () => {
    const closeButton: HTMLButtonElement | null = fixture.nativeElement.querySelector(
      '.drawer__close-button button',
    );
    expect(closeButton?.getAttribute('aria-label')).toBe('Close drawer');
  });

  it('should close on backdrop click for dynamic backdrop', () => {
    const closeSpy = vi.fn();
    component.close.subscribe(closeSpy);

    const backdrop: HTMLElement | null = fixture.nativeElement.querySelector('.drawer__backdrop');
    backdrop?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(component.visible()).toBe(false);
  });

  it('should not close on backdrop click when backdrop is static', () => {
    fixture.componentRef.setInput('backdrop', 'static');
    fixture.detectChanges();

    const closeSpy = vi.fn();
    component.close.subscribe(closeSpy);

    const backdrop: HTMLElement | null = fixture.nativeElement.querySelector('.drawer__backdrop');
    backdrop?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(closeSpy).not.toHaveBeenCalled();
    expect(component.visible()).toBe(true);
  });

  it('should close on Escape when closable and not alert', () => {
    const closeSpy = vi.fn();
    component.close.subscribe(closeSpy);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(component.visible()).toBe(false);
  });

  it('should not close on Escape for alert drawer', () => {
    fixture.componentRef.setInput('modalType', 'alert');
    fixture.detectChanges();

    const closeSpy = vi.fn();
    component.close.subscribe(closeSpy);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(closeSpy).not.toHaveBeenCalled();
    expect(component.visible()).toBe(true);
  });

  it('should attach CDK focus trap anchors for modal overlay', async () => {
    await flushMicrotasks();
    fixture.detectChanges();

    const anchors = fixture.nativeElement.querySelectorAll('.cdk-focus-trap-anchor');
    expect(anchors.length).toBe(2);
  });

  it('should keep focus outside for non-modal overlay', async () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();
    await flushMicrotasks();

    const trigger = document.createElement('button');
    trigger.textContent = 'Open drawer';
    document.body.appendChild(trigger);
    trigger.focus();

    fixture.componentRef.setInput('modalType', 'non-modal');
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    await flushMicrotasks();

    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });

  it('should restore previous focus after close', async () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();
    await flushMicrotasks();

    const trigger = document.createElement('button');
    trigger.textContent = 'Open drawer';
    document.body.appendChild(trigger);
    trigger.focus();

    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    await flushMicrotasks();

    component.onCloseClick();
    fixture.detectChanges();
    await flushMicrotasks();

    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });

  it('should keep drawer mounted during closing and unmount after animation end', () => {
    const contentBeforeClose: HTMLElement | null =
      fixture.nativeElement.querySelector('.drawer__content');
    expect(contentBeforeClose).toBeTruthy();

    component.onCloseClick();
    fixture.detectChanges();

    const contentWhileClosing: HTMLElement | null =
      fixture.nativeElement.querySelector('.drawer__content');
    const drawerWhileClosing: HTMLElement | null = fixture.nativeElement.querySelector('.drawer');
    expect(contentWhileClosing).toBeTruthy();
    expect(drawerWhileClosing?.classList.contains('drawer--closing')).toBe(true);

    const animationEndEvent = new Event('animationend', { bubbles: true }) as AnimationEvent;
    Object.defineProperty(animationEndEvent, 'animationName', {
      value: 'slideOutRight',
      configurable: true,
    });
    contentWhileClosing?.dispatchEvent(animationEndEvent);
    fixture.detectChanges();

    const contentAfterClose: HTMLElement | null =
      fixture.nativeElement.querySelector('.drawer__content');
    expect(contentAfterClose).toBeNull();
  });

  it('should mirror left position to right in RTL', () => {
    document.documentElement.dir = 'rtl';
    directionalityMock.value = 'rtl';
    directionalityMock.change.next('rtl');

    const localFixture = TestBed.createComponent(DrawerComponent);
    localFixture.componentRef.setInput('visible', true);
    localFixture.componentRef.setInput('position', 'left');
    localFixture.detectChanges();

    const drawer: HTMLElement | null = localFixture.nativeElement.querySelector('.drawer');
    const content: HTMLElement | null =
      localFixture.nativeElement.querySelector('.drawer__content');

    expect(drawer?.classList.contains('drawer--right')).toBe(true);
    expect(content?.classList.contains('drawer__content--right')).toBe(true);
  });

  it('should mirror right position to left in RTL', () => {
    document.documentElement.dir = 'rtl';
    directionalityMock.value = 'rtl';
    directionalityMock.change.next('rtl');

    const localFixture = TestBed.createComponent(DrawerComponent);
    localFixture.componentRef.setInput('visible', true);
    localFixture.componentRef.setInput('position', 'right');
    localFixture.detectChanges();

    const drawer: HTMLElement | null = localFixture.nativeElement.querySelector('.drawer');
    const content: HTMLElement | null =
      localFixture.nativeElement.querySelector('.drawer__content');

    expect(drawer?.classList.contains('drawer--left')).toBe(true);
    expect(content?.classList.contains('drawer__content--left')).toBe(true);
  });
});
