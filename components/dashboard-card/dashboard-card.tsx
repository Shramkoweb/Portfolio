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
      className="flex w-full"
      target="_blank"
      rel="noopener"
      href={link}
      aria-label={header}
    >
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 transition-[shadow,transform] duration-200 ease-out-expo hover:shadow-md hover:shadow-gray-200/50 hover:-translate-y-0.5 active:scale-[0.98] dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-black/20">
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
