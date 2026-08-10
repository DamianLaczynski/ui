/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatetimeComponent } from './datetime.component';

describe('DatetimeComponent', () => {
  let fixture: ComponentFixture<DatetimeComponent>;
  let component: DatetimeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatetimeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compose value from selected date and time', () => {
    component.selectedDate.set(new Date('2026-01-20T00:00:00'));
    component.selectedTime.set('14:30');
    fixture.detectChanges();

    expect(component.value).toBe('2026-01-20T14:30');
  });

  it('should parse writeValue datetime-local format', () => {
    component.writeValue('2026-02-01T09:45');

    expect(component.selectedTime()).toBe('09:45');
    expect(component.selectedDate()?.getFullYear()).toBe(2026);
    expect(component.selectedDate()?.getMonth()).toBe(1);
    expect(component.selectedDate()?.getDate()).toBe(1);
  });

  it('should parse ISO with timezone to local user date and time', () => {
    const iso = '2026-02-01T23:30:00.000Z';
    const expected = new Date(iso);

    component.writeValue(iso);

    expect(component.selectedDate()?.getFullYear()).toBe(expected.getFullYear());
    expect(component.selectedDate()?.getMonth()).toBe(expected.getMonth());
    expect(component.selectedDate()?.getDate()).toBe(expected.getDate());
    expect(component.selectedTime()).toBe(
      `${String(expected.getHours()).padStart(2, '0')}:${String(expected.getMinutes()).padStart(2, '0')}`,
    );
  });

  it('should not close panel on time change', () => {
    component.isOpen.set(true);

    component.onTimeChange('10:15');

    expect(component.isOpen()).toBe(true);
    expect(component.selectedTime()).toBe('10:15');
  });
});
