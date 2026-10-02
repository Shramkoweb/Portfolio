import { pinSslMode } from './database-url';

const base = 'postgresql://user:p%40ss@ep-x.neon.tech/db';

describe('pinSslMode', () => {
  it.each(['prefer', 'require', 'verify-ca'])(
    'pins sslmode=%s to verify-full',
    (mode) => {
      expect(
        pinSslMode(`${base}?sslmode=${mode}&channel_binding=require`),
      ).toBe(`${base}?sslmode=verify-full&channel_binding=require`);
    },
  );

  it('pins sslmode when it is not the first parameter', () => {
    expect(pinSslMode(`${base}?channel_binding=require&sslmode=require`)).toBe(
      `${base}?channel_binding=require&sslmode=verify-full`,
    );
  });

  it('pins every sslmode so pg never sees an aliased one', () => {
    expect(pinSslMode(`${base}?sslmode=require&sslmode=prefer`)).toBe(
      `${base}?sslmode=verify-full&sslmode=verify-full`,
    );
  });

  it.each([undefined, ''])(
    'passes %p through so pg falls back to PG* env vars',
    (url) => {
      expect(pinSslMode(url)).toBe(url);
    },
  );

  it.each([
    base,
    `${base}?sslmode=verify-full`,
    `${base}?sslmode=disable`,
    `${base}?sslmode=no-verify`,
    `${base}?sslmode=required`,
    `${base}?uselibpqcompat=true&sslmode=require`,
    `${base}?sslmode=require&uselibpqcompat=true`,
  ])('leaves %s unchanged', (url) => {
    expect(pinSslMode(url)).toBe(url);
  });
});
