import { formatPostDate } from '@/lib/posts/utils';

interface ArticleDatesProps {
  createDate: number;
  updateDate: number | null;
}

export function ArticleDates(props: ArticleDatesProps) {
  const { createDate, updateDate } = props;

  return (
    <div className="text-xs text-gray-700 dark:text-gray-300">
      <p>
        Published on{' '}
        <time dateTime={new Date(createDate).toISOString()}>
          {formatPostDate(createDate)}
        </time>
      </p>
      {updateDate && (
        <p>
          Last updated on{' '}
          <strong className="font-medium">
            <time dateTime={new Date(updateDate).toISOString()}>
              {formatPostDate(updateDate)}
            </time>
          </strong>
        </p>
      )}
    </div>
  );
}
