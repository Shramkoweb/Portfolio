import { ArrowUpRight } from 'lucide-react';

interface DashboardCardProps {
  header: string;
  link?: string;
  metric?: number | string;
}

export function DashboardCard(props: DashboardCardProps) {
  const { header, link, metric } = props;

  return (
    <a
      className="flex w-full rounded-lg"
      target="_blank"
      rel="noopener"
      href={link}
      aria-label={header}
    >
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 transition-[border-color,transform] duration-150 ease-out-expo hover:border-gray-300 active:scale-[0.97] dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
        <div className="flex items-start justify-between gap-3">
          <span className="text-gray-900 dark:text-gray-100">{header}</span>
          {link && (
            <ArrowUpRight
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500"
            />
          )}
        </div>
        <span className="mt-2 block text-3xl font-bold text-black dark:text-white">
          {metric?.toLocaleString() ?? '---'}
        </span>
      </div>
    </a>
  );
}
