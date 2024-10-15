import Link from 'next/link';

interface CategoriesProps {
  categories: string[];
}

export function Categories(props: CategoriesProps) {
  const { categories } = props;

  return (
    <ul className="flex flex-wrap gap-2 text-gray-600 dark:text-gray-400">
      <li key="all">
        <Link
          href="/blog"
          className="inline-block rounded-lg border-2 border-gray-200 p-1 px-3 py-2 transition-all hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <span>All</span>
        </Link>
      </li>
      {categories.map((item) => {
        const formattedCategory = item.split('-').join(' ').trim();

        return (
          <li key={item}>
            <Link
              href={`/blog/category/${item.toLowerCase()}`}
              className="inline-block rounded-lg border-2 border-gray-200 p-1 px-3 py-2 transition-all hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <span>{formattedCategory}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
