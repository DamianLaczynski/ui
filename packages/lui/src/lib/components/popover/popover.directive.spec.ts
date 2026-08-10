/// <reference types="vitest/globals" />
import { Component, TemplateRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { PopoverDirective } from './popover.directive';

@Component({
  standalone: true,
  imports: [PopoverDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <button type="button" [uiPopover]="contentTpl" [(uiPopoverOpen)]="open">Toggle</button>
    <ng-template #contentTpl>
      <div class="popover-test-content">Popover body</div>
    </ng-template>
  `,
})
class PopoverHostComponent {
  open = false;

  @ViewChild('contentTpl', { static: true })
  contentTpl!: TemplateRef<unknown>;
}

describe('PopoverDirective', () => {
  let fixture: ComponentFixture<PopoverHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverHostComponent, OverlayModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverHostComponent);
    fixture.detectChanges();
  });

  it('should toggle open state on trigger click', () => {
    const trigger = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

    trigger.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(true);
    expect(document.querySelector('.popover-overlay')).toBeTruthy();

    trigger.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.open).toBe(false);
    expect(document.querySelector('.popover-overlay')).toBeNull();
  });

  it('should expose dialog semantics on the trigger', () => {
    const trigger = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('should render projected popover content when open', async () => {
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.querySelector('.popover-test-content')?.textContent).toContain('Popover body');
  });
});
