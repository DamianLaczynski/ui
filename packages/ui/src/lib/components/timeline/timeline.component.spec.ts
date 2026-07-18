/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineComponent } from './timeline.component';

describe('TimelineComponent', () => {
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
    fixture.componentRef.setInput('items', [
      { id: '1', title: 'Created project', timestamp: '10:24' },
      { id: '2', title: 'Shared with team', timestamp: '11:02', variant: 'success' },
    ]);
    fixture.detectChanges();
  });

  it('should render timeline items from the items input', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('.timeline-item').length).toBe(2);
    expect(element.textContent).toContain('Created project');
    expect(element.textContent).toContain('Shared with team');
  });

  it('should expose list semantics', () => {
    expect(fixture.nativeElement.getAttribute('role')).toBe('list');
    expect(fixture.nativeElement.querySelectorAll('[role="listitem"]').length).toBe(2);
  });
});
