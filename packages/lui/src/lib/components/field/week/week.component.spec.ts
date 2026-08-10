/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeekComponent } from './week.component';

describe('WeekComponent', () => {
  let fixture: ComponentFixture<WeekComponent>;
  let component: WeekComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse ISO week values and set selectedWeek/selectedYear', () => {
    component.writeValue('2026-W01');

    const selected = component.selectedDate();
    expect(selected).toBeTruthy();
    expect(component.selectedWeek()).toBe(1);
    expect(component.selectedYear()).toBe(2026);
  });

  it('should output ISO week format', () => {
    component.writeValue('2026-W01');
    expect(component.value).toBe('2026-W01');
  });

  it('should clear value for invalid week input', () => {
    component.writeValue('2026-W99');

    expect(component.selectedDate()).toBeNull();
    expect(component.selectedWeek()).toBeNull();
    expect(component.selectedYear()).toBeNull();
    expect(component.value).toBe('');
  });

  it('should default to date-range display format', () => {
    expect(component.displayFormat()).toBe('date-range');
  });
});
