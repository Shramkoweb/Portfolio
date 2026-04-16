import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface ResourceCardProps {
  title: string;
  url?: string;
  description?: string;
}

const cardClasses =
  'flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-shadow duration-200 hover:shadow-md hover:shadow-gray-200/50 dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-black/20';

function CardContent(props: ResourceCardProps) {
  const { title, url, description } = props;

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        {url && isExternalUrl(url) && (
          <ArrowUpRight
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500"
          />
        )}
      </div>
      {description && (
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </>
  );
}

function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

export function ResourceCard(props: ResourceCardProps) {
  const { url } = props;

  if (url && !isExternalUrl(url)) {
    return (
      <li>
        <Link href={url} className={cardClasses}>
          <CardContent {...props} />
        </Link>
      </li>
    );
  }

  return (
    <li>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
      >
        <CardContent {...props} />
      </a>
    </li>
  );
}
