import { ExternalLink } from 'lucide-react';

export interface BookmarkItemProps {
  title: string;
  url?: string;
  description: string;
}

export function BookmarkItem(props: BookmarkItemProps) {
  const { title, url, description } = props;

  return (
    <li>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-shadow duration-200 hover:shadow-md hover:shadow-gray-200/50 dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-black/20"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {title}
          </h3>
          {url && (
            <ExternalLink
              aria-hidden="true"
              className="ml-1 h-4 w-4 shrink-0 text-gray-400"
            />
          )}
        </div>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </a>
    </li>
  );
}
