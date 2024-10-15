interface DashboardCardProps {
  header: string;
  link?: string;
  metric?: number;
}

export function DashboardCard(props: DashboardCardProps) {
  const { header, link, metric } = props;

  return (
    <a className="flex max-w-72" target="_blank" rel="noopener" href={link} aria-label={header}>
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center text-gray-900 dark:text-gray-100">
          {header}
          {link && (
          <svg
            className="ml-1 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          )}
        </div>
        <span className="mt-2 text-3xl font-bold text-black spacing-sm dark:text-white">
          {metric?.toLocaleString() ?? '---'}
        </span>
      </div>
    </a>
  );
}
