import { Tag } from '@/components/tag';
import { PostCategory } from '@/lib/types';
import { formatCategoryName } from '@/lib/utils';

interface CategoriesProps {
  categories: PostCategory[];
}

export function Categories(props: CategoriesProps) {
  const { categories } = props;

  return (
    <nav aria-label="Post categories">
      <ul className="flex flex-wrap gap-2 text-gray-600 dark:text-gray-400">
        <li>
          <Tag label="All" href="/blog" />
        </li>
        {categories.map((item) => (
          <li key={item}>
            <Tag
              label={formatCategoryName(item)}
              href={`/blog/category/${item.toLowerCase()}`}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
