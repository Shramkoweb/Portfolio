import { BookmarkNavProps } from './bookmark-nav.types';

export function BookmarkNav(props: BookmarkNavProps) {
  const { sections } = props;

  return (
    <nav aria-label="Bookmark sections" className="mb-8 w-full">
      <ul className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-gray-400 hover:text-black dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white"
            >
              <section.icon size={14} />
              {section.navLabel}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
