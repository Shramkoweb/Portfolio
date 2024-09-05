import Link from 'next/link';

interface CategoriesProps {
  categories: string[];
}

export function Categories(props: CategoriesProps) {
  const { categories } = props;
  const aaaa = 1111;

  return (
    <ul className="flex flex-wrap gap-2 text-gray-600 dark:text-gray-400">
      <li>
        {aaaa}
      </li>
      <li key="all">
        <Link
          href="/blog"
          className="border-2 border-gray-200 dark:border-gray-700 inline-block p-1 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
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
              className="border-2 border-gray-200 dark:border-gray-700 inline-block p-1 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
            >
              <span>{formattedCategory}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
