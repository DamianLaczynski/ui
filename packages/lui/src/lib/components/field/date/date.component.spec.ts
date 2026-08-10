/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateComponent } from './date.component';

describe('DateComponent', () => {
  let fixture: ComponentFixture<DateComponent>;
  let component: DateComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should parse date values without timezone shifting day', () => {
    component.writeValue('2026-02-15');

    const selected = component.selectedDate();
    expect(selected).toBeTruthy();
    expect(selected?.getFullYear()).toBe(2026);
    expect(selected?.getMonth()).toBe(1);
    expect(selected?.getDate()).toBe(15);
  });

  it('should output ISO date format', () => {
    component.writeValue('2026-02-15');
    expect(component.value).toBe('2026-02-15');
  });

  it('should clear value for invalid date input', () => {
    component.writeValue('invalid-date');

    expect(component.selectedDate()).toBeNull();
    expect(component.value).toBe('');
  });
});
