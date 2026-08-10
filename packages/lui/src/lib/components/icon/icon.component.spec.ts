import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconComponent } from './icon.component';
import { IconName } from './generated/icon-name.type';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should keep default inputs', () => {
    fixture.detectChanges();
    expect(component.icon()).toBe('');
    expect(component.size()).toBe('medium');
    expect(component.variant()).toBe('regular');
  });

  it('should compute base icon src from requested size and variant', () => {
    fixture.componentRef.setInput('icon', 'star' as IconName);
    fixture.componentRef.setInput('size', 'large');
    fixture.componentRef.setInput('variant', 'filled');
    fixture.detectChanges();

    expect(component.getNumberSize()).toBe(24);
  });

  it('should render sprite use element for icon available in sprite', () => {
    fixture.componentRef.setInput('icon', 'book' as IconName);
    fixture.detectChanges();

    expect(component.isSpriteMode()).toBe(true);
    const svg = fixture.debugElement.query(By.css('svg'));
    const use = fixture.debugElement.query(By.css('use'));
    expect(svg).toBeTruthy();
    expect(use).toBeTruthy();
    expect(use.nativeElement.getAttribute('href')).toContain(
      'assets/icons/sprite.svg#book_20_regular',
    );
  });

  it('should fallback to available sprite size without rendering img requests', () => {
    fixture.componentRef.setInput('icon', 'align_distribute_bottom' as IconName);
    fixture.componentRef.setInput('size', 'medium');
    fixture.componentRef.setInput('variant', 'regular');
    fixture.detectChanges();

    expect(component.isSpriteMode()).toBe(true);
    expect(component.resolvedSpriteHref()).toContain('#align_distribute_bottom_16_regular');
  });

  it('should render empty svg and log error when icon is not in sprite manifest', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    fixture.componentRef.setInput('icon', 'not_existing_icon' as IconName);
    fixture.detectChanges();

    expect(component.isSpriteMode()).toBe(false);
    expect(component.resolvedSpriteHref()).toBe('');
    const svg = fixture.debugElement.query(By.css('svg'));
    const use = fixture.debugElement.query(By.css('use'));
    expect(svg).toBeTruthy();
    expect(use).toBeFalsy();
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should not render icon element when icon is empty', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('svg'))).toBeFalsy();
  });

  it('should apply width and height based on display size in sprite mode', () => {
    fixture.componentRef.setInput('icon', 'book' as IconName);
    fixture.componentRef.setInput('size', 'small');
    fixture.detectChanges();

    const svg = fixture.debugElement.query(By.css('svg')).nativeElement as SVGElement;
    expect(svg.getAttribute('width')).toBe('16px');
    expect(svg.getAttribute('height')).toBe('16px');
  });

  it('should render decorative icon as aria-hidden by default', () => {
    fixture.componentRef.setInput('icon', 'book' as IconName);
    fixture.detectChanges();

    const svg = fixture.debugElement.query(By.css('svg')).nativeElement as SVGElement;
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.getAttribute('role')).toBeNull();
  });

  it('should render semantic icon when ariaLabel is provided', () => {
    fixture.componentRef.setInput('icon', 'book' as IconName);
    fixture.componentRef.setInput('ariaLabel', 'Book icon');
    fixture.detectChanges();

    const svg = fixture.debugElement.query(By.css('svg')).nativeElement as SVGElement;
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('Book icon');
    expect(svg.getAttribute('aria-hidden')).toBeNull();
  });

  it('should apply rotate transform when rotate input is provided', () => {
    fixture.componentRef.setInput('icon', 'book' as IconName);
    fixture.componentRef.setInput('rotate', 90);
    fixture.detectChanges();

    const svg = fixture.debugElement.query(By.css('svg')).nativeElement as SVGElement;
    expect(svg.style.transform).toBe('rotate(90deg)');
  });

  it('should fallback to alternative variant in sprite mode when preferred variant does not exist', () => {
    fixture.componentRef.setInput('icon', 'color_background_accent' as IconName);
    fixture.componentRef.setInput('variant', 'filled');
    fixture.detectChanges();

    expect(component.isSpriteMode()).toBe(true);
    expect(component.resolvedSpriteHref()).toContain('#color_background_accent_20_regular');
  });
});

describe('IconComponent locale variants', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [IconComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  it('should prefer locale-specific icon symbols for matching locale', () => {
    fixture.componentRef.setInput('icon', 'book_question_mark' as IconName);
    fixture.componentRef.setInput('size', 'large');
    fixture.componentRef.setInput('variant', 'regular');
    fixture.detectChanges();

    expect(component.resolvedSpriteHref()).toContain('#locale-ar-book_question_mark_24_regular');
  });

  it('should prefer RTL directional symbols from main icon set when locale direction is RTL', () => {
    fixture.componentRef.setInput('icon', 'text_number_list' as IconName);
    fixture.componentRef.setInput('size', 'medium');
    fixture.componentRef.setInput('variant', 'filled');
    fixture.detectChanges();

    expect(component.resolvedSpriteHref()).toContain('#text_number_list_rtl_20_filled');
  });
});
