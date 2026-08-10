/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthComponent } from './month.component';

describe('MonthComponent', () => {
  let fixture: ComponentFixture<MonthComponent>;
  let component: MonthComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse month values as first day of month', () => {
    component.writeValue('2026-02');

    const selected = component.selectedDate();
    expect(selected).toBeTruthy();
    expect(selected?.getFullYear()).toBe(2026);
    expect(selected?.getMonth()).toBe(1);
    expect(selected?.getDate()).toBe(1);
  });

  it('should output ISO month format', () => {
    component.writeValue('2026-02');
    expect(component.value).toBe('2026-02');
  });
});
