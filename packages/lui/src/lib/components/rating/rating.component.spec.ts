/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let fixture: ComponentFixture<RatingComponent>;
  let component: RatingComponent;
  let originalDir: string;

  beforeEach(async () => {
    originalDir = document.documentElement.dir;

    await TestBed.configureTestingModule({
      imports: [RatingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.documentElement.dir = originalDir;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render stars based on max input', () => {
    fixture.componentRef.setInput('max', 7);
    fixture.detectChanges();

    const stars = fixture.nativeElement.querySelectorAll('.rating__star');
    expect(stars.length).toBe(7);
  });

  it('should emit valueChange on star click when interactive', () => {
    let emitted: number | null = null;
    component.valueChange.subscribe(value => (emitted = value));

    const star: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.rating__star[data-star="4"]',
    );
    star.click();

    expect(emitted).toBe(4);
  });

  it('should not emit valueChange when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    let emitted = false;
    component.valueChange.subscribe(() => (emitted = true));

    const star: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.rating__star[data-star="2"]',
    );
    star.click();

    expect(emitted).toBe(false);
  });

  it('should set only selected star as tab stop', () => {
    fixture.componentRef.setInput('value', 3);
    fixture.detectChanges();

    const thirdStar: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.rating__star[data-star="3"]',
    );
    const secondStar: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.rating__star[data-star="2"]',
    );
    expect(thirdStar.getAttribute('tabindex')).toBe('0');
    expect(secondStar.getAttribute('tabindex')).toBe('-1');
  });

  it('should emit next value on ArrowRight in LTR', () => {
    let emitted: number | null = null;
    component.valueChange.subscribe(value => (emitted = value));

    const thirdStar: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.rating__star[data-star="3"]',
    );
    thirdStar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(emitted).toBe(4);
  });

  it('should emit next value on ArrowRight in RTL', () => {
    document.documentElement.dir = 'rtl';
    fixture.detectChanges();

    let emitted: number | null = null;
    component.valueChange.subscribe(value => (emitted = value));

    const thirdStar: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.rating__star[data-star="3"]',
    );
    thirdStar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(emitted).toBe(4);
  });

  it('should increase from first star on ArrowRight in RTL', () => {
    document.documentElement.dir = 'rtl';
    fixture.detectChanges();

    let emitted: number | null = null;
    component.valueChange.subscribe(value => (emitted = value));

    const firstStar: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.rating__star[data-star="1"]',
    );
    firstStar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(emitted).toBe(2);
  });
});
