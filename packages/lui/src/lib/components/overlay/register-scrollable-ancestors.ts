import { ElementRef, NgZone } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Subject } from 'rxjs';

function isScrollable(el: HTMLElement): boolean {
  const { overflowY, overflow } = getComputedStyle(el);
  const canScrollY = el.scrollHeight > el.clientHeight;
  const canScrollX = el.scrollWidth > el.clientWidth;
  const overflowScroll =
    overflowY === 'auto' || overflowY === 'scroll' || overflow === 'auto' || overflow === 'scroll';
  return (canScrollY || canScrollX) && overflowScroll;
}

function getScrollableAncestors(origin: HTMLElement): HTMLElement[] {
  const ancestors: HTMLElement[] = [];
  let el: HTMLElement | null = origin.parentElement;
  while (el && el !== document.body) {
    if (isScrollable(el)) ancestors.push(el);
    el = el.parentElement;
  }
  return ancestors;
}

interface ScrollAdapter {
  getElementRef: () => ElementRef<HTMLElement>;
  elementScrolled: () => Subject<unknown>;
}

export function registerScrollableAncestors(
  origin: HTMLElement,
  scrollDispatcher: ScrollDispatcher,
  ngZone: NgZone,
): () => void {
  const elements = getScrollableAncestors(origin);
  const entries: { adapter: ScrollAdapter; removeListener: () => void }[] = [];

  for (const el of elements) {
    const elementRef = new ElementRef(el);
    const subject = new Subject<unknown>();
    const adapter: ScrollAdapter = {
      getElementRef: () => elementRef,
      elementScrolled: () => subject,
    };
    const listener = (): void => subject.next(null);
    ngZone.runOutsideAngular(() => el.addEventListener('scroll', listener));
    scrollDispatcher.register(adapter as unknown as Parameters<ScrollDispatcher['register']>[0]);
    entries.push({
      adapter,
      removeListener: () => {
        el.removeEventListener('scroll', listener);
        subject.complete();
        scrollDispatcher.deregister(
          adapter as unknown as Parameters<ScrollDispatcher['deregister']>[0],
        );
      },
    });
  }

  return () => {
    entries.forEach(e => e.removeListener());
  };
}
