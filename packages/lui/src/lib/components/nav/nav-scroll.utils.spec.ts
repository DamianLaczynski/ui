import {
  findScrollableAncestor,
  scrollItemIntoContainer,
  scrollSelectedNavItemIntoView,
} from './nav-scroll.utils';

describe('nav-scroll utils', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('findScrollableAncestor should return nearest scrollable parent', () => {
    const outer = document.createElement('div');
    const inner = document.createElement('div');
    const item = document.createElement('div');

    outer.style.overflowY = 'auto';
    Object.defineProperty(outer, 'scrollHeight', { value: 600, configurable: true });
    Object.defineProperty(outer, 'clientHeight', { value: 200, configurable: true });

    inner.appendChild(item);
    outer.appendChild(inner);
    document.body.appendChild(outer);

    expect(findScrollableAncestor(item)).toBe(outer);
  });

  it('scrollItemIntoContainer should not scroll when item is already visible', () => {
    const item = document.createElement('div');
    const container = document.createElement('div');
    let didScroll = false;
    container.scrollTo = () => {
      didScroll = true;
    };

    item.getBoundingClientRect = () =>
      ({
        top: 20,
        bottom: 60,
        height: 40,
      }) as DOMRect;
    container.getBoundingClientRect = () =>
      ({
        top: 0,
        bottom: 100,
      }) as DOMRect;

    scrollItemIntoContainer(item, container);
    expect(didScroll).toBe(false);
  });

  it('scrollSelectedNavItemIntoView should return false when selected item is missing', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);

    expect(scrollSelectedNavItemIntoView(host)).toBe(false);
  });

  it('scrollSelectedNavItemIntoView should scroll nearest scrollable ancestor', () => {
    const host = document.createElement('div');
    const scrollContainer = document.createElement('div');
    const selected = document.createElement('div');
    selected.className = 'tree-node';
    selected.setAttribute('aria-selected', 'true');

    host.appendChild(scrollContainer);
    scrollContainer.appendChild(selected);
    document.body.appendChild(host);

    scrollContainer.style.overflowY = 'auto';
    Object.defineProperty(scrollContainer, 'scrollHeight', { value: 900, configurable: true });
    Object.defineProperty(scrollContainer, 'clientHeight', { value: 200, configurable: true });
    Object.defineProperty(scrollContainer, 'scrollTop', {
      value: 0,
      writable: true,
      configurable: true,
    });

    selected.getBoundingClientRect = () =>
      ({
        top: 500,
        bottom: 540,
        height: 40,
      }) as DOMRect;
    scrollContainer.getBoundingClientRect = () =>
      ({
        top: 0,
        bottom: 200,
      }) as DOMRect;

    let didScroll = false;
    scrollContainer.scrollTo = () => {
      didScroll = true;
    };
    const result = scrollSelectedNavItemIntoView(host);

    expect(result).toBe(true);
    expect(didScroll).toBe(true);
  });
});
