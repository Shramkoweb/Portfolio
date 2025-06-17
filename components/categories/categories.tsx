import Link from 'next/link';
import { PostCategory } from '@/lib/types';
import { formatCategoryName } from '@/lib/utils';

interface CategoriesProps {
  categories: PostCategory[];
}

export function Categories(props: CategoriesProps) {
  const { categories } = props;

  const linkClasses = 'inline-block rounded-lg border-2 border-gray-200 p-1 px-3 py-2 transition-all hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800';

  return (
    <nav aria-label="Post categories">
      <ul className="flex flex-wrap gap-2 text-gray-600 dark:text-gray-400">
        <li key="all">
          <Link href="/blog" className={linkClasses}>
            <span>All</span>
          </Link>
        </li>
        {categories.map((item) => {
          const displayCategory = formatCategoryName(item);

          return (
            <li key={item}>
              <Link
                href={`/blog/category/${item.toLowerCase()}`}
                className={linkClasses}
              >
                {displayCategory}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
