describe('browser URL compatibility', () => {
  const original = Object.getOwnPropertyDescriptor(URL, 'canParse');

  afterEach(() => {
    if (original) {
      Object.defineProperty(URL, 'canParse', original);
    } else {
      Reflect.deleteProperty(URL, 'canParse');
    }
  });

  function loadFallback() {
    Object.defineProperty(URL, 'canParse', {
      configurable: true,
      writable: true,
      value: undefined,
    });
    jest.isolateModules(() => require('./browser-polyfills'));
  }

  it('accepts absolute URLs and relative URLs with a base', () => {
    loadFallback();

    expect(URL.canParse('https://shramko.dev/blog')).toBe(true);
    expect(URL.canParse('/blog', 'https://shramko.dev')).toBe(true);
  });

  it('rejects invalid URLs without throwing', () => {
    loadFallback();

    expect(URL.canParse('/blog')).toBe(false);
    expect(URL.canParse('https://')).toBe(false);
    expect(URL.canParse('/blog', 'invalid base')).toBe(false);
  });

  it('preserves the native implementation', () => {
    const native = jest.fn();
    Object.defineProperty(URL, 'canParse', {
      configurable: true,
      value: native,
    });

    jest.isolateModules(() => require('./browser-polyfills'));

    expect(URL.canParse).toBe(native);
  });
});
