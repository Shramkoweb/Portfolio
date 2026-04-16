import { type ElementType } from 'react';

interface YearSeparatorProps {
  year: number | string;
  as?: ElementType;
}

export function YearSeparator(props: YearSeparatorProps) {
  const { year, as: Heading = 'h3' } = props;

  return (
    <div className="flex items-center gap-4">
      <Heading className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {year}
      </Heading>
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
    </div>
  );
}
