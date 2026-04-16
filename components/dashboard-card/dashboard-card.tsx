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
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center text-gray-900 dark:text-gray-100">
          {header}
          {link && <ArrowUpRight aria-hidden="true" className="ml-1 h-4 w-4" />}
        </div>
        <span className="mt-2 text-3xl font-bold text-black spacing-sm dark:text-white">
          {metric?.toLocaleString() ?? '---'}
        </span>
      </div>
    </a>
  );
}
