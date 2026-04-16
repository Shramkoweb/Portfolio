import Link from 'next/link';

interface TagProps {
  label: string;
  href: string;
}

const tagClasses =
  'inline-block rounded-lg border border-gray-200 px-3 py-2 transition-[color,background-color,transform] duration-200 ease-out-expo hover:bg-gray-200 active:scale-[0.97] dark:border-gray-800 dark:hover:bg-gray-800';

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
