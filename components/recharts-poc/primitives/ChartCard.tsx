import { type ReactElement, type ReactNode } from 'react';
import { ResponsiveContainer } from 'recharts';

import { useIsMounted } from './useIsMounted';

interface ChartCardProps {
  title: string;
  actions?: ReactNode;
  height: number;
  children: ReactNode;
}

export function ChartCard(props: ChartCardProps) {
  const { title, actions, height, children } = props;
  const mounted = useIsMounted();

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <header className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        {actions ? (
          <div className="flex items-center gap-2">{actions}</div>
        ) : null}
      </header>
      {mounted ? (
        <ResponsiveContainer width="100%" height={height}>
          {children as ReactElement}
        </ResponsiveContainer>
      ) : (
        <div
          aria-hidden="true"
          className="animate-pulse rounded bg-gray-100 dark:bg-gray-800"
          style={{ height }}
        />
      )}
    </section>
  );
}
