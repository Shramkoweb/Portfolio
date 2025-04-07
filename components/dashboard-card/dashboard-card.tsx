interface DashboardCardProps {
  header: string;
  link?: string;
  metric?: number | string;
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
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
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
