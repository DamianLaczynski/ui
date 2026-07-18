/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { KbdComponent } from './kbd.component';

describe('KbdComponent', () => {
  let fixture: ComponentFixture<KbdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KbdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KbdComponent);
  });

  it('should render a single keycap', () => {
    fixture.componentRef.setInput('text', 'Enter');
    fixture.detectChanges();

    const keycap = fixture.debugElement.query(By.css('kbd'));
    expect(keycap).toBeTruthy();
    expect(keycap.nativeElement.textContent).toContain('Enter');
    expect(fixture.debugElement.query(By.css('.kbd-sequence'))).toBeNull();
  });

  it('should render a key combination with separators', () => {
    fixture.componentRef.setInput('keys', ['Ctrl', 'K']);
    fixture.detectChanges();

    const sequence = fixture.debugElement.query(By.css('.kbd-sequence'));
    expect(sequence).toBeTruthy();
    expect(sequence.attributes['aria-label']).toContain('Ctrl');
    expect(fixture.debugElement.queryAll(By.css('kbd')).length).toBe(2);
    expect(
      fixture.debugElement.query(By.css('.kbd-sequence__separator')).nativeElement.textContent,
    ).toBe('+');
  });

  it('should support a custom separator', () => {
    fixture.componentRef.setInput('keys', ['Ctrl', 'K']);
    fixture.componentRef.setInput('separator', 'then');
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.kbd-sequence__separator')).nativeElement.textContent,
    ).toBe('then');
  });
});
