import { type ElementType } from 'react';

import { BookmarkItem, BookmarkItemProps } from '@/components/bookmark-item';

export interface BookmarkSectionProps {
  id: string;
  title: string;
  icon: ElementType;
  description: string;
  items: BookmarkItemProps[];
}

export function BookmarkSection(props: BookmarkSectionProps) {
  const { id, title, icon: Icon, description, items } = props;

  return (
    <section id={id}>
      <hgroup>
        <h2 className="flex items-start gap-2 text-xl font-bold text-black dark:text-white md:text-2xl md:items-center">
          <Icon size={22} className="mt-2 md:m-0 shrink-0 text-gray-500" />
          {title}
        </h2>
        <p className="mt-1 mb-6 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </hgroup>

      <ul className="space-y-4">
        {items.map((item) => (
          <BookmarkItem key={item.title} {...item} />
        ))}
      </ul>
    </section>
  );
}
