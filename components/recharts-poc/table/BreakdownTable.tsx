import { useMemo, useState } from 'react';

import { DeltaBadge } from '@/components/recharts-poc/kpi/DeltaBadge';
import { IMPROVED_KEYWORDS } from '@/components/recharts-poc/mocks/improvedKeywords';
import { periodOverPeriod } from '@/components/recharts-poc/primitives/periodOverPeriod';

type SortKey = 'keyword' | 'positionNow' | 'positionBefore' | 'delta';
type SortDir = 'asc' | 'desc';

export function BreakdownTable() {
  const [sortKey, setSortKey] = useState<SortKey>('delta');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const rows = useMemo(() => {
    const enriched = IMPROVED_KEYWORDS.map((row) => {
      const result = periodOverPeriod(row.positionBefore, row.positionNow);
      return { ...row, delta: result.absDelta, result };
    });
    enriched.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      if (sortKey === 'keyword')
        return a.keyword.localeCompare(b.keyword) * dir;
      const av = a[sortKey];
      const bv = b[sortKey];
      return (Number(av) - Number(bv)) * dir;
    });
    return enriched;
  }, [sortKey, sortDir]);

  const maxDelta = useMemo(
    () => Math.max(...rows.map((r) => Math.abs(r.delta))),
    [rows],
  );

  const onHeaderClick = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-100">
        Improved Keywords
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400">
              <Th
                onClick={() => onHeaderClick('keyword')}
                active={sortKey === 'keyword'}
                dir={sortDir}
              >
                Keyword
              </Th>
              <Th
                onClick={() => onHeaderClick('positionNow')}
                active={sortKey === 'positionNow'}
                dir={sortDir}
                align="right"
              >
                Position now
              </Th>
              <Th
                onClick={() => onHeaderClick('positionBefore')}
                active={sortKey === 'positionBefore'}
                dir={sortDir}
                align="right"
              >
                Position before
              </Th>
              <Th
                onClick={() => onHeaderClick('delta')}
                active={sortKey === 'delta'}
                dir={sortDir}
                align="right"
              >
                Δ
              </Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const intensity =
                maxDelta === 0 ? 0 : Math.abs(row.delta) / maxDelta;
              const tint = `rgba(74, 144, 226, ${(intensity * 0.25).toFixed(3)})`;
              return (
                <tr
                  key={row.keyword}
                  className="border-t border-gray-100 dark:border-gray-800"
                >
                  <td className="py-2 text-gray-800 dark:text-gray-200">
                    {row.keyword}
                  </td>
                  <td
                    className="py-2 text-right text-gray-800 dark:text-gray-200"
                    style={{ background: tint }}
                  >
                    {row.positionNow}
                  </td>
                  <td className="py-2 text-right text-gray-800 dark:text-gray-200">
                    {row.positionBefore}
                  </td>
                  <td className="py-2 text-right">
                    <DeltaBadge result={row.result} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

interface ThProps {
  onClick: () => void;
  active: boolean;
  dir: SortDir;
  align?: 'left' | 'right';
  children: React.ReactNode;
}

function Th(props: ThProps) {
  const { onClick, active, dir, align = 'left', children } = props;
  const arrow = active ? (dir === 'asc' ? ' ▲' : ' ▼') : '';
  return (
    <th
      className={`py-2 font-medium ${align === 'right' ? 'text-right' : 'text-left'}`}
    >
      <button
        type="button"
        onClick={onClick}
        className="hover:text-gray-900 dark:hover:text-gray-100"
      >
        {children}
        {arrow}
      </button>
    </th>
  );
}
