import { useRouter } from 'next/router';

import { BarChartCard } from './charts/BarChartCard';
import { DonutCard } from './charts/DonutCard';
import { DualAxisChartCard } from './charts/DualAxisChartCard';
import { HistogramCard } from './charts/HistogramCard';
import { LineChartCard } from './charts/LineChartCard';
import { KpiCard } from './kpi/KpiCard';
import { KPIS } from './mocks/kpis';
import { BreakdownTable } from './table/BreakdownTable';

export function RechartsPocPage() {
  const router = useRouter();
  const perfMode = router.query.perf === '1';

  return (
    <section className="mx-auto mb-16 flex w-full max-w-6xl flex-col gap-6 px-4">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          Recharts POC
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Single-page validation of Recharts against our acceptance criteria.
          Add{' '}
          <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
            ?perf=1
          </code>{' '}
          to disable animations.
          {perfMode ? (
            <span className="ml-2 rounded bg-amber-100 px-1 text-amber-900 dark:bg-amber-900 dark:text-amber-100">
              perf mode
            </span>
          ) : null}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BarChartCard perfMode={perfMode} />
        <LineChartCard perfMode={perfMode} />
        <DualAxisChartCard perfMode={perfMode} />
        <HistogramCard perfMode={perfMode} />
        <DonutCard perfMode={perfMode} />
      </div>

      <BreakdownTable />
    </section>
  );
}
