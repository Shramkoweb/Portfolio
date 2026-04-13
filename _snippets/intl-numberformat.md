---
title: "Intl.NumberFormat: Format Currency & Units in JavaScript"
heading: Intl.NumberFormat
description: Format currency, percentages, units, and compact numbers in JavaScript with Intl.NumberFormat — one native API, zero dependencies, full locale support.
createDate: 2026-04-13
keywords: [
  Intl.NumberFormat JavaScript,
  format currency JavaScript,
  format number TypeScript,
  compact number format,
  format units JavaScript,
  format percentage JavaScript,
  locale number formatting,
  i18n number format,
  JavaScript currency formatter,
  Intl API,
  ECMAScript Internationalization,
  format kilograms miles liters,
]
---

You reach for a library to format `1234.5` as `$1,234.50`. You don't need one. `Intl.NumberFormat` ships in every
browser and Node, handles currencies, units, percentages, and compact notation — and respects the user's locale for
free.

## Intl.NumberFormat helpers

```typescript
type FormatOptions = Intl.NumberFormatOptions;

const format = (value: number, options: FormatOptions, locale = 'en-US') =>
  new Intl.NumberFormat(locale, options).format(value);

// Currency — respects locale-specific symbol placement and decimals
export const formatCurrency = (value: number, currency = 'USD', locale?: string) =>
  format(value, { style: 'currency', currency }, locale);

// Units — kilograms, miles, liters, bytes, and dozens more
export const formatUnit = (value: number, unit: string, locale?: string) =>
  format(value, { style: 'unit', unit, unitDisplay: 'short' }, locale);

// Percent — expects 0.15, not 15
export const formatPercent = (value: number, fractionDigits = 0, locale?: string) =>
  format(
    value,
    {
      style: 'percent',
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    },
    locale,
  );

// Compact — "1.2K", "3.4M", "1.2B"
export const formatCompact = (value: number, locale?: string) =>
  format(value, { notation: 'compact', maximumFractionDigits: 1 }, locale);
```

## Usage

```typescript
formatCurrency(1234.5);              // "$1,234.50"
formatCurrency(1234.5, 'EUR', 'de'); // "1.234,50 €"
formatCurrency(1234.5, 'JPY', 'ja'); // "￥1,235"

formatUnit(72, 'kilogram');          // "72 kg"
formatUnit(150, 'mile-per-hour');    // "150 mph"
formatUnit(1_500_000, 'byte', 'en'); // "1,500,000 byte"

formatPercent(0.1523, 1);            // "15.2%"
formatPercent(0.5);                  // "50%"

formatCompact(1234);                 // "1.2K"
formatCompact(3_400_000);            // "3.4M"
formatCompact(9_800_000_000, 'de');  // "9,8 Mrd."
```

## When to use Intl.NumberFormat

**One API, four jobs.** Every number formatting task in most apps — prices, stats, dashboards, charts — collapses into
`Intl.NumberFormat` options. For most UI formatting, you can skip [numbro](https://numbrojs.com/),
[currency.js](https://currency.js.org/), or [d3-format](https://d3js.org/d3-format) entirely. Reach for them only when
you need their specific extras: arithmetic on money ([dinero.js](https://dinerojs.com/)), arbitrary precision
([big.js](https://mikemcl.github.io/big.js/)), or parsing user input back into numbers.

**Locale-aware by default.** Pass `"de"` and commas become periods, currency symbols move, decimal conventions flip. A
library would need a separate plugin for each locale; the browser already has them.

**`style: "unit"` is the hidden gem.** It supports 40+ simple units — `kilogram`, `mile-per-hour`, `liter`, `byte`,
`celsius` — plus `X-per-Y` compounds like `meter-per-second`. Unit names must come from the
[sanctioned list](https://tc39.es/ecma402/#table-sanctioned-simple-unit-identifiers); arbitrary strings throw.

**Reuse the formatter in hot paths.** `new Intl.NumberFormat(...)` isn't free. If you format thousands of values (table
cells, chart ticks), hoist one instance and call `.format()` in the loop — skip the helper.

```typescript
const priceFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
rows.forEach((r) => (r.display = priceFmt.format(r.amount)));
```

## Gotchas

- **Percent expects a ratio.** `formatPercent(15)` gives `"1,500%"`. Divide by 100 first if your input is already a
  percent.
- **Currency code is required** with `style: 'currency'`. Omitting it throws `TypeError`.
- **Unit names are case-sensitive** and must match the sanctioned list exactly. `"Kilogram"` throws `RangeError`.

Use `Intl.NumberFormat` whenever you format numbers for humans — prices, metrics, durations, file sizes. Reach for a
library only when you need parsing (Intl parses nothing) or exotic formats it doesn't cover. For everything else, the
browser already did the work.

> Pair with [Group Array by Key](/snippets/group-by) when building tables, or
> [Copy to Clipboard](/snippets/copy-to-clipboard) to let users copy formatted values.
