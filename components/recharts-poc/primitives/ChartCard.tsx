import { type ReactElement, type ReactNode } from 'react';
import { ResponsiveContainer } from 'recharts';

import { useIsMounted } from './useIsMounted';

interface ChartCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  height: number;
  children: ReactElement;
}

export function ChartCard(props: ChartCardProps) {
  const { title, description, icon, actions, height, children } = props;
  const mounted = useIsMounted();

  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {icon ? (
              <span
                className="text-[var(--rcp-text-subtle)]"
                aria-hidden="true"
              >
                {icon}
              </span>
            ) : null}
            <h3 className="text-sm font-semibold text-[var(--rcp-text)]">
              {title}
            </h3>
          </div>
          {description ? (
            <p className="text-xs leading-relaxed text-[var(--rcp-text-muted)]">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </header>
      {mounted ? (
        <ResponsiveContainer width="100%" height={height}>
          {children}
        </ResponsiveContainer>
      ) : (
        <div
          aria-hidden="true"
          className="animate-pulse rounded bg-[var(--rcp-border)]/40"
          style={{ height }}
        />
      )}
    </section>
  );
}
