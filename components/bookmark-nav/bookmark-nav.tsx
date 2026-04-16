import { BookmarkNavProps } from './bookmark-nav.types';

export function BookmarkNav(props: BookmarkNavProps) {
  const { sections } = props;

  return (
    <nav aria-label="Bookmark sections" className="mb-10 w-full">
      <ul className="flex flex-wrap gap-2 text-gray-600 dark:text-gray-400">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="inline-block rounded-lg border-2 border-gray-200 px-3 py-2 transition-all hover:scale-105 dark:border-gray-700"
            >
              {section.navLabel}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
