import { PropsWithChildren } from 'react';

import { Badge } from '@/components/badge';
import { formatPostDate, parsePostDate } from '@/lib/posts/utils';

type ArticleUpdateProps = PropsWithChildren<{
  date?: string;
}>;

const noteClasses =
  'my-8 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800';

// Not a `p`: prose margins on `p` outrank `m-0` on a specificity tie.
const headerClasses = 'flex flex-wrap items-center gap-2';

// gray-400, the usual dark secondary, drops to 4.3:1 on gray-800 — below AA.
const dateClasses = 'text-xs text-gray-500 dark:text-gray-300';

// Outer margins only: `not-prose` here would strip links, lists and code too.
const bodyClasses = 'mt-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0';

export function ArticleUpdate(props: ArticleUpdateProps) {
  const { date, children } = props;
  const updateDate = parsePostDate(date);

  return (
    <div role="note" className={noteClasses}>
      <div className={headerClasses}>
        <Badge label="Update" />
        {updateDate !== null && (
          <time
            className={dateClasses}
            dateTime={new Date(updateDate).toISOString()}
          >
            {formatPostDate(updateDate)}
          </time>
        )}
      </div>
      <div className={bodyClasses}>{children}</div>
    </div>
  );
}
