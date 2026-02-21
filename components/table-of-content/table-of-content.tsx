import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentProps {
  headings: Heading[];
}

export function TableOfContent({ headings }: TableOfContentProps) {
  const [isOpen, setIsOpen] = useState(false);
  if (!headings.length) return null;

  return (
    <nav aria-label="Table of contents">
      <button
        type="button"
        className="flex items-center gap-2 font-bold text-base focus:outline-none text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls="toc-list"
      >
        <span>Table of Contents</span>
        <ChevronRight
          aria-hidden="true"
          className={`transition-transform duration-200 w-4 h-4 ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>
      <ul
        id="toc-list"
        className={`pl-0 transition-all duration-200 ${isOpen ? 'max-h-[60vh] overflow-y-auto' : 'max-h-0 overflow-hidden'}`}
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 1.25}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className="block py-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors text-sm"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
