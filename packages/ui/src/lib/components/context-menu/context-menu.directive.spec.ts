/// <reference types="vitest/globals" />
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { ContextMenuDirective } from './context-menu.directive';
import type { MenuItem } from '../menu/models/menu-item.model';

@Component({
  standalone: true,
  imports: [ContextMenuDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      uiContextMenu
      [uiContextMenuItems]="items()"
      [uiContextMenuDisabled]="disabled()"
      (contextMenuItemClick)="onItemClick($event)"
      data-testid="context-target"
      style="width: 240px; height: 120px;"
    >
      Right-click here
    </div>
  `,
})
class ContextMenuHostComponent {
  items = signal<MenuItem[]>([
    { id: 'open', label: 'Open', icon: 'open' },
    { id: 'rename', label: 'Rename', icon: 'edit' },
  ]);
  disabled = signal(false);
  lastAction = signal('');

  onItemClick(item: MenuItem): void {
    this.lastAction.set(item.label);
  }
}

describe('ContextMenuDirective', () => {
  let fixture: ComponentFixture<ContextMenuHostComponent>;
  let overlayCreateSpy: ReturnType<typeof vi.fn>;
  let overlayDisposeSpy: ReturnType<typeof vi.fn>;
  let itemClick$: Subject<MenuItem>;
  let closed$: Subject<void>;

  beforeEach(async () => {
    itemClick$ = new Subject<MenuItem>();
    closed$ = new Subject<void>();
    overlayDisposeSpy = vi.fn();

    const overlayRefMock = {
      attach: vi.fn(() => ({
        setInput: vi.fn(),
        instance: {
          itemClick: itemClick$,
          closed: closed$,
        },
        location: { nativeElement: document.createElement('div') },
      })),
      updatePosition: vi.fn(),
      outsidePointerEvents: () => new Subject<MouseEvent>(),
      keydownEvents: () => new Subject<KeyboardEvent>(),
      detachments: () => new Subject<void>(),
      dispose: overlayDisposeSpy,
    } as unknown as OverlayRef;

    overlayCreateSpy = vi.fn(() => overlayRefMock);

    await TestBed.configureTestingModule({
      imports: [ContextMenuHostComponent],
      providers: [
        {
          provide: Overlay,
          useValue: {
            create: overlayCreateSpy,
            position: () => ({
              flexibleConnectedTo: () => ({
                withPositions: () => ({
                  withPush: () => ({
                    withFlexibleDimensions: () => ({
                      withViewportMargin: () => ({}),
                    }),
                  }),
                }),
              }),
            }),
            scrollStrategies: { close: () => ({}) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContextMenuHostComponent);
    fixture.detectChanges();
  });

  it('should open the overlay on contextmenu', () => {
    const target = fixture.debugElement.query(By.css('[data-testid="context-target"]'))
      .nativeElement as HTMLDivElement;
    const event = new MouseEvent('contextmenu', { bubbles: true, clientX: 40, clientY: 40 });
    const preventDefault = vi.spyOn(event, 'preventDefault');

    target.dispatchEvent(event);
    fixture.detectChanges();

    expect(preventDefault).toHaveBeenCalled();
    expect(overlayCreateSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit item click and close the overlay', () => {
    const target = fixture.debugElement.query(By.css('[data-testid="context-target"]'))
      .nativeElement as HTMLDivElement;

    target.dispatchEvent(
      new MouseEvent('contextmenu', { bubbles: true, clientX: 40, clientY: 40 }),
    );
    fixture.detectChanges();

    itemClick$.next({ id: 'open', label: 'Open', icon: 'open' });
    fixture.detectChanges();

    expect(fixture.componentInstance.lastAction()).toBe('Open');
    expect(overlayDisposeSpy).toHaveBeenCalled();
  });

  it('should not open when disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    const target = fixture.debugElement.query(By.css('[data-testid="context-target"]'))
      .nativeElement as HTMLDivElement;

    target.dispatchEvent(
      new MouseEvent('contextmenu', { bubbles: true, clientX: 40, clientY: 40 }),
    );
    fixture.detectChanges();

    expect(overlayCreateSpy).not.toHaveBeenCalled();
  });
});
