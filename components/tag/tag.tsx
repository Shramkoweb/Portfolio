import Link from 'next/link';

interface TagProps {
  label: string;
  href: string;
}

const tagClasses =
  'inline-block rounded-lg border-2 border-gray-200 px-3 py-2 transition-all hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800';

export function Tag(props: TagProps) {
  const { label, href } = props;

  if (href.startsWith('#')) {
    return (
      <a href={href} className={tagClasses}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={tagClasses}>
      {label}
    </Link>
  );
}
