import React from 'react';
import Link from 'next/link';

interface CategoriesProps {
  categories: string[];
}

export function Categories(props: CategoriesProps) {
  const { categories } = props;

  return (
    <ul className="flex flex-wrap gap-2 text-gray-600 dark:text-gray-400">
      <li key="all">
        <Link href="/blog">
          <a className="border-2 border-gray-200 dark:border-gray-700 hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all">
            <span className="capsize">All</span>
          </a>
        </Link>
      </li>
      {categories.map((item) => (
        <li key={item}>
          <Link href={`/blog/category/${item.toLowerCase()}`}>
            <a className="border-2 border-gray-200 dark:border-gray-700 hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all">
              <span className="capsize">{item}</span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
