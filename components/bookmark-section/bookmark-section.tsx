import { type ElementType } from 'react';

import { BookmarkItem, BookmarkItemProps } from '@/components/bookmark-item';

export interface BookmarkSectionProps {
  id: string;
  title: string;
  icon: ElementType;
  description?: string;
  items: BookmarkItemProps[];
}

export function BookmarkSection(props: BookmarkSectionProps) {
  const { id, title, icon: Icon, description, items } = props;

  return (
    <section id={id}>
      <hgroup className="mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
            {title}
          </h2>
          <span aria-hidden="true">
            <Icon
              size={24}
              className="text-gray-400 dark:text-gray-500"
              strokeWidth={1.5}
            />
          </span>
        </div>
        {description && (
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </hgroup>

      <ul className="space-y-3">
        {items.map((item) => (
          <BookmarkItem key={item.title} {...item} />
        ))}
      </ul>

      <div className="mt-8 h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />
    </section>
  );
}
