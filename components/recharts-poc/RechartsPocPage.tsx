import { useRouter } from 'next/router';

import { theme } from './primitives/theme';
import { EngagementSection } from './sections/EngagementSection';
import { TrendsSection } from './sections/TrendsSection';

const CSS_VARS: Record<string, string> = {
  '--rcp-background': theme.background,
  '--rcp-surface': theme.surface,
  '--rcp-border': theme.border,
  '--rcp-border-strong': theme.borderStrong,
  '--rcp-text': theme.text,
  '--rcp-text-muted': theme.textMuted,
  '--rcp-text-subtle': theme.textSubtle,
  '--rcp-tooltip-bg': theme.tooltipBackground,
  '--rcp-tooltip-text': theme.tooltipText,
};

export function RechartsPocPage() {
  const router = useRouter();
  const perfMode = router.query.perf === '1';

  return (
    <div
      style={CSS_VARS as React.CSSProperties}
      className="bg-[var(--rcp-background)] text-[var(--rcp-text)]"
    >
      <section className="mx-auto mb-16 flex w-full max-w-5xl flex-col gap-6 px-4 py-8">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--rcp-text)]">
            Engagement Dashboard
          </h1>
          <p className="text-sm text-[var(--rcp-text-muted)]">
            Recharts POC — engagement layout.{' '}
            <code className="rounded bg-[var(--rcp-surface)] px-1 text-xs">
              ?perf=1
            </code>{' '}
            disables animations.
            {perfMode ? (
              <span className="ml-2 rounded bg-[var(--rcp-tooltip-bg)] px-1.5 py-0.5 text-xs text-[var(--rcp-tooltip-text)]">
                perf mode
              </span>
            ) : null}
          </p>
        </header>

        <EngagementSection perfMode={perfMode} />
        <TrendsSection perfMode={perfMode} />
      </section>
    </div>
  );
}
