/// <reference types="vitest/globals" />
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardAppearance, CardBorderStyle, CardComponent } from './card.component';

@Component({
  standalone: true,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <ui-card focusMode="no-tab" ariaLabel="Focusable no-tab card">
      <button type="button" uiCardFooter id="no-tab-focus-target">Inner action</button>
    </ui-card>
  `,
})
class CardNoTabHostComponent {}

@Component({
  standalone: true,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <ui-card focusMode="tab-only" ariaLabel="Focusable tab-only card">
      <button type="button" uiCardFooter id="tab-only-focus-target">Inner action</button>
    </ui-card>
  `,
})
class CardTabOnlyHostComponent {}

@Component({
  standalone: true,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <ui-card focusMode="no-tab" ariaLabel="Focusable no-tab card with many actions">
      <button type="button" uiCardFooter id="no-tab-first">First action</button>
      <button type="button" uiCardFooter id="no-tab-second">Second action</button>
    </ui-card>
  `,
})
class CardNoTabManyActionsHostComponent {}

@Component({
  standalone: true,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <ui-card focusMode="tab-exit" ariaLabel="Focusable tab-exit card">
      <button type="button" uiCardFooter id="tab-exit-first">First action</button>
      <button type="button" uiCardFooter id="tab-exit-second">Second action</button>
    </ui-card>
  `,
})
class CardTabExitHostComponent {}

describe('CardComponent', () => {
  let fixture: ComponentFixture<CardComponent>;
  let component: CardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getCardElement(currentFixture: ComponentFixture<any>): HTMLElement {
    return currentFixture.debugElement.query(By.css('.card')).nativeElement as HTMLElement;
  }

  describe('initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render default role and base classes', () => {
      const cardElement = getCardElement(fixture);

      expect(cardElement.getAttribute('role')).toBe('group');
      expect(cardElement.classList.contains('card')).toBe(true);
      expect(cardElement.classList.contains('card--filled')).toBe(true);
      expect(cardElement.classList.contains('card--vertical')).toBe(true);
    });

    it('should not be focusable by default', () => {
      const cardElement = getCardElement(fixture);

      expect(cardElement.getAttribute('tabindex')).toBeNull();
    });
  });

  describe('appearance', () => {
    const appearances: CardAppearance[] = ['filled', 'filled-alternative', 'outline', 'subtle'];

    appearances.forEach(appearance => {
      it(`should apply ${appearance} appearance class`, () => {
        fixture.componentRef.setInput('appearance', appearance);
        fixture.detectChanges();

        const cardElement = getCardElement(fixture);
        expect(cardElement.classList.contains(`card--${appearance}`)).toBe(true);
      });
    });
  });

  describe('border styling', () => {
    it('should apply dashed border style class', () => {
      const borderStyle: CardBorderStyle = 'dashed';
      fixture.componentRef.setInput('borderStyle', borderStyle);
      fixture.detectChanges();

      const cardElement = getCardElement(fixture);
      expect(cardElement.classList.contains('card--border-dashed')).toBe(true);
    });
  });

  describe('interactive behavior', () => {
    it('should emit cardClick on click when interactive', () => {
      let emittedEvent: MouseEvent | KeyboardEvent | null = null;
      component.cardClick.subscribe(event => {
        emittedEvent = event;
      });

      fixture.componentRef.setInput('interactive', true);
      fixture.detectChanges();

      const cardElement = getCardElement(fixture);
      cardElement.click();

      expect(emittedEvent).toBeTruthy();
    });

    it('should expose tabindex when interactive', () => {
      fixture.componentRef.setInput('interactive', true);
      fixture.detectChanges();

      const cardElement = getCardElement(fixture);

      expect(cardElement.getAttribute('tabindex')).toBe('0');
      expect(cardElement.classList.contains('card--interactive')).toBe(true);
    });

    it('should toggle selected and emit selection event when selectable', () => {
      let emittedEvent: { data: { selected: boolean } } | null = null;
      component.selectionChange.subscribe(event => {
        emittedEvent = event as unknown as { data: { selected: boolean } };
      });

      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const cardElement = getCardElement(fixture);
      cardElement.click();
      fixture.detectChanges();

      expect(component.selected()).toBe(true);
      if (!emittedEvent) {
        throw new Error('Expected selection event to be emitted');
      }
      const selectionPayload = emittedEvent as unknown as { data: { selected: boolean } };
      expect(selectionPayload.data.selected).toBe(true);
      expect(cardElement.getAttribute('aria-selected')).toBe('true');
    });

    it('should respect defaultSelected on initial render', () => {
      const localFixture = TestBed.createComponent(CardComponent);
      localFixture.componentRef.setInput('defaultSelected', true);
      localFixture.detectChanges();

      expect(localFixture.componentInstance.selected()).toBe(true);
    });

    it('should sync selection from internal checkbox', () => {
      let emittedEvent: { data: { selected: boolean } } | null = null;
      component.selectionChange.subscribe(event => {
        emittedEvent = event as unknown as { data: { selected: boolean } };
      });

      fixture.componentRef.setInput('checkbox', true);
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const checkbox = fixture.debugElement.query(By.css('.card__floating-action .checkbox-input'))
        .nativeElement as HTMLInputElement;

      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      fixture.detectChanges();

      expect(component.selected()).toBe(true);
      if (!emittedEvent) {
        throw new Error('Expected selection event to be emitted');
      }
      const selectionPayload = emittedEvent as unknown as { data: { selected: boolean } };
      expect(selectionPayload.data.selected).toBe(true);
    });

    it('should allow deselecting via internal checkbox', () => {
      fixture.componentRef.setInput('checkbox', true);
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const checkbox = fixture.debugElement.query(By.css('.card__floating-action .checkbox-input'))
        .nativeElement as HTMLInputElement;

      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      fixture.detectChanges();
      expect(component.selected()).toBe(true);

      checkbox.checked = false;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      fixture.detectChanges();
      expect(component.selected()).toBe(false);
    });
  });

  describe('disabled state', () => {
    it('should not emit click or toggle selection when disabled', () => {
      let clickCount = 0;
      let selectionCount = 0;

      component.cardClick.subscribe(() => {
        clickCount++;
      });

      component.selectionChange.subscribe(() => {
        selectionCount++;
      });

      fixture.componentRef.setInput('interactive', true);
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const cardElement = getCardElement(fixture);
      cardElement.click();

      expect(component.selected()).toBe(false);
      expect(clickCount).toBe(0);
      expect(selectionCount).toBe(0);
      expect(cardElement.getAttribute('aria-disabled')).toBe('true');
      expect(cardElement.getAttribute('tabindex')).toBeNull();
    });
  });

  describe('focus mode', () => {
    it('should focus first inner element on Enter in no-tab mode', async () => {
      const hostFixture = TestBed.createComponent(CardNoTabHostComponent);
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      const cardElement = getCardElement(hostFixture);
      const targetButton = hostFixture.debugElement.query(By.css('#no-tab-focus-target'))
        .nativeElement as HTMLButtonElement;

      cardElement.focus();
      cardElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

      expect(document.activeElement).toBe(targetButton);
    });

    it('should move focus to first inner element on Tab in tab-only mode', async () => {
      const hostFixture = TestBed.createComponent(CardTabOnlyHostComponent);
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      const cardElement = getCardElement(hostFixture);
      const targetButton = hostFixture.debugElement.query(By.css('#tab-only-focus-target'))
        .nativeElement as HTMLButtonElement;

      cardElement.focus();
      cardElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));

      expect(document.activeElement).toBe(targetButton);
    });

    it('should cycle focus with Tab/Shift+Tab in no-tab mode', async () => {
      const hostFixture = TestBed.createComponent(CardNoTabManyActionsHostComponent);
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      const cardElement = getCardElement(hostFixture);
      const firstButton = hostFixture.debugElement.query(By.css('#no-tab-first'))
        .nativeElement as HTMLButtonElement;
      const secondButton = hostFixture.debugElement.query(By.css('#no-tab-second'))
        .nativeElement as HTMLButtonElement;

      cardElement.focus();
      cardElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      expect(document.activeElement).toBe(firstButton);

      firstButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
      expect(document.activeElement).toBe(secondButton);

      secondButton.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, shiftKey: true }),
      );
      expect(document.activeElement).toBe(firstButton);
    });

    it('should leave focus trap and focus card root on Escape in no-tab mode', async () => {
      const hostFixture = TestBed.createComponent(CardNoTabHostComponent);
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      const cardElement = getCardElement(hostFixture);
      const targetButton = hostFixture.debugElement.query(By.css('#no-tab-focus-target'))
        .nativeElement as HTMLButtonElement;

      cardElement.focus();
      cardElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      expect(document.activeElement).toBe(targetButton);

      targetButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      expect(document.activeElement).toBe(cardElement);
    });

    it('should activate tab-exit mode on Enter and move focus inside card', async () => {
      const hostFixture = TestBed.createComponent(CardTabExitHostComponent);
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      const cardElement = getCardElement(hostFixture);
      const firstButton = hostFixture.debugElement.query(By.css('#tab-exit-first'))
        .nativeElement as HTMLButtonElement;

      cardElement.focus();
      cardElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

      expect(document.activeElement).toBe(firstButton);
    });
  });
});
