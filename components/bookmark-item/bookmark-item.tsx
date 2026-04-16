import { Bookmark } from 'lucide-react';

export interface BookmarkItemProps {
  title: string;
  url?: string;
  description: string;
}

export function BookmarkItem(props: BookmarkItemProps) {
  const { title, url, description } = props;

  const content = (
    <>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          {title}
        </h3>
        {url && (
          <Bookmark
            size={16}
            className="mt-1 shrink-0 text-gray-400 transition-colors group-hover:text-blue-500"
          />
        )}
      </div>
      <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </>
  );

  if (url) {
    return (
      <li>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-400 hover:shadow-sm dark:border-gray-800 dark:hover:border-gray-600"
        >
          {content}
        </a>
      </li>
    );
  }

  return (
    <li>
      <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
        {content}
      </div>
    </li>
  );
}
