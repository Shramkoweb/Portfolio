import { type ElementType } from 'react';

export interface BookmarkNavSection {
  id: string;
  navLabel: string;
  icon: ElementType;
}

export interface BookmarkNavProps {
  sections: BookmarkNavSection[];
}
