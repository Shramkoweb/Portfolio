# Recharts — POC Report

**Date:** 2026-06-09
**Author:** Serhii Shramko
**Demo route:** `/labs/recharts` (animations on) / `/labs/recharts?perf=1` (animations off)
**Source:** `components/recharts-poc/`
**Plan:** `docs/superpowers/plans/2026-06-09-recharts-poc-plan.md` (local-only)
**Design spec:** `docs/superpowers/specs/2026-06-09-recharts-poc-design.md` (local-only)

## Verdict

**Ship — conditional on perf finding on Marta's Lenovo.** Recharts cleanly satisfies every functional acceptance criterion attempted in this POC: bar/line/dual-axis/histogram/donut charts, a sortable breakdown table, period-over-period deltas, label position control, label toggling, legend-driven series visibility, and tooltips. The library is actively maintained, fully typed, well-documented, and the API surface for our use cases is small. The only open question is rendering performance on low-spec hardware, captured in the "Weak-laptop test" section below; the `?perf=1` opt-out gives Marta a clean A/B test on her Lenovo.

## Functional acceptance criteria

| #   | Criterion                                                  | Status | Evidence                                                                | Notes                                                                                                                                                                                                                                                                      |
| --- | ---------------------------------------------------------- | :----: | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Bar chart w/ rounded corners + custom colors               |   ✅   | `components/recharts-poc/charts/BarChartCard.tsx`                       | `radius={[8,8,0,0]}` on `<Bar>`; per-bar `<Cell fill>`; colors driven by `usePalette()` so the palette adapts to theme.                                                                                                                                                    |
| 2   | Line chart w/ splines                                      |   ✅   | `components/recharts-poc/charts/LineChartCard.tsx`                      | `<Line type="monotone">` + `<Area>` fill overlay for the long-tail series.                                                                                                                                                                                                 |
| 3   | Dual-axis different scales                                 |   ✅   | `components/recharts-poc/charts/DualAxisChartCard.tsx`                  | `<ComposedChart>` + two `<YAxis yAxisId="left" \| "right">` with independent orientations, tick formatters, and colours.                                                                                                                                                   |
| 4   | Histogram comparing 2 metrics                              |   ⚠️   | `components/recharts-poc/charts/HistogramCard.tsx`                      | Recharts has no native histogram primitive — we pre-bucket data in `mocks/keywordLength.ts` and render two `<Bar>` series side-by-side. Standard, idiomatic Recharts approach.                                                                                             |
| 5   | Pie/donut chart with %-labels                              |   ✅   | `components/recharts-poc/charts/DonutCard.tsx`                          | `<Pie innerRadius={60} outerRadius={110}>` + custom percent-label renderer positioned outside the slice. Hover-grow via `activeShape={{ outerRadius: 120 }}` (note: Recharts 3.x drives this through internal Redux tooltip state, not the deprecated `activeIndex` prop). |
| 6   | Table with metric breakdown                                |   ✅   | `components/recharts-poc/table/BreakdownTable.tsx`                      | Plain HTML table; sortable column headers; heat-tinted "position now" cell scaled by `\|delta\|/maxDelta`; Δ column rendered via shared `DeltaBadge`.                                                                                                                      |
| 7   | Data labels with position control + format hooks           |   ✅   | `<LabelList>` children across charts; position picker on `BarChartCard` | The bar chart exposes a `top / inside / center / insideTop` picker so a reviewer can see position control without reading source. Formatter hook used on bar + histogram (`Intl.NumberFormat('en-US')`).                                                                   |
| 8   | Toggle data labels on/off                                  |   ✅   | `primitives/LabelsToggle.tsx` per chart                                 | Bar, line, histogram each have an independent toggle. Donut renders labels always (it's unreadable without them).                                                                                                                                                          |
| 9   | Period-over-period delta                                   |   ✅   | `primitives/periodOverPeriod.ts` + `kpi/DeltaBadge.tsx`                 | Pure helper, fully tested (positive, negative, flat, zero-prev, zero-curr, both-zero). Renders `▲ +N%` / `▼ -N%` / `— 0%` and gracefully degrades to absolute delta when there's no prior-period baseline.                                                                 |
| 10  | Tooltips, legend visible, series toggle, responsive layout |   ✅   | `<ResponsiveContainer>` + `<Legend onClick>` + `hide` prop              | Legend click toggles a local `Set<string>` of hidden series; the corresponding `<Bar hide>` / `<Line hide>` reads from it. Applied to line, histogram, dual-axis (bar and donut don't need it — single effective series).                                                  |

## Non-functional

| Criterion               | Status | Evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------- | :----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Last release ≤ 6 months |   ✅   | `recharts@3.8.1` released **2026-03-25** (npm registry). Today is 2026-06-09 — about 2.5 months ago. Well within the window.                                                                                                                                                                                                                                                                                                                                                          |
| TypeScript types        |   ✅   | Recharts ships its own types — no `@types/recharts` needed. The POC's `pnpm typecheck` is clean across 21 new files. Two type widenings were needed in v3 strict types: `Tooltip.formatter` / `LabelList.formatter` accept `(v: unknown) => ...`, and `Pie.activeShape` needs a cast to attach a plain object — both documented inline in the chart files.                                                                                                                            |
| Documentation quality   |   ✅   | recharts.org + Storybook stories were sufficient for every chart attempted. The only "discoverability" pain point is the v3 API rewrite around `Pie` hover behaviour, which has migrated from props to internal state — but the new behaviour is correct and the types make the right shape obvious.                                                                                                                                                                                  |
| Bundle impact           |   ⚠️   | Measured from `next build` output via `.next/build-manifest.json`. **First Load JS (gzipped) — `/labs/recharts`: 315.0 kB vs homepage `/`: 206.0 kB → Δ ≈ 109 kB.** Raw uncompressed delta: ~393 kB (Recharts + d3-\* family + Redux Toolkit + react-redux + immer, all from Recharts' transitive graph). Pages Router code-splits per route, so this is **route-local — the homepage and other pages are unaffected**. Reasonable for an analytics page; heavy for a marketing page. |

## Weak-laptop test (Marta's Lenovo)

To be filled in after running on the target hardware. Test instructions:

1. Open `http://shramko.dev/labs/recharts` (or local dev URL).
2. Note cold-load time, scroll smoothness, tooltip lag, series-toggle responsiveness.
3. Re-open `http://shramko.dev/labs/recharts?perf=1` (animations off) and repeat.
4. Fill in the scores below (1 = unusable, 5 = smooth).

| Scenario                     | Animations on | Animations off |
| ---------------------------- | ------------- | -------------- |
| Cold load to interactive     | \_ s          | \_ s           |
| Scroll smoothness (1–5)      | \_            | \_             |
| Tooltip lag (1–5)            | \_            | \_             |
| Series toggle response (1–5) | \_            | \_             |
| Subjective verdict           | \_            | \_             |

## Known limitations / workarounds

- **No native histogram primitive.** Recharts has no `HistogramChart` — we pre-bucket data and render with `<BarChart>` and two `<Bar>` series. This is the library-idiomatic approach.
- **Legend `onClick` not wired by default.** We attach a small handler that toggles a local `Set<string>` of hidden series; each series reads `hide={hiddenSet.has(key)}`. ~6 lines per chart.
- **`ResponsiveContainer` + SSR.** Under Pages Router SSR, `ResponsiveContainer` measures DOM dimensions before they exist and would render at 0×0 on first paint. Mitigated by a `useIsMounted()` guard in `ChartCard` that renders a same-height skeleton until the component mounts. No hydration warnings observed.
- **`next-themes` flash on first render.** `resolvedTheme` is `undefined` on first render. `usePalette()` defaults to the light palette until mounted, then switches once `resolvedTheme` is available. Combined with the `ChartCard` mount guard, charts only paint once the theme is resolved.
- **`Pie.activeIndex` removed in v3.** Hover-grow now flows through the chart's internal Redux tooltip state; the consumer just declares `activeShape={...}` and the active sector renders with those props automatically. Documented inline in `DonutCard.tsx`.
- **Bundle size.** ~109 kB gzipped per route is real. Pages Router code-splits per route, so this is contained to `/labs/recharts` and any future chart pages; the rest of the site is unaffected.

## Extraction notes

To lift this POC into a separate app:

1. Copy `pages/labs/recharts.tsx` and the entire `components/recharts-poc/` folder.
2. Install: `recharts`, `next-themes`, `clsx`, `lucide-react`, plus the new app's normal Next.js + Tailwind setup.
3. The POC has zero imports reaching outside its own folder. Only the page file imports from the barrel `@/components/recharts-poc`. Verified by `grep -rn "recharts-poc" pages/ components/`.
