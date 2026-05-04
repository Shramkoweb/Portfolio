type ArticleDatesProps = {
  createDate: number;
  updateDate: number | null;
};

const formatDate = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString('en-us', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  });

export function ArticleDates(props: ArticleDatesProps) {
  const { createDate, updateDate } = props;

  return (
    <div className="text-xs text-gray-700 dark:text-gray-300">
      <p>
        Published on{' '}
        <time dateTime={new Date(createDate).toISOString()}>
          {formatDate(createDate)}
        </time>
      </p>
      {updateDate && (
        <p>
          Last updated on{' '}
          <strong className="font-medium">
            <time dateTime={new Date(updateDate).toISOString()}>
              {formatDate(updateDate)}
            </time>
          </strong>
        </p>
      )}
    </div>
  );
}
