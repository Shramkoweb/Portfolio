import Link from 'next/link';

interface TagProps {
  label: string;
  href: string;
  variant?: 'pill' | 'inline';
}

const pillClasses =
  'inline-block rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-700 dark:text-gray-300 transition-[color,background-color,transform] duration-200 ease-out-expo hover:bg-gray-200 active:scale-[0.97] dark:border-gray-800 dark:hover:bg-gray-800';

const inlineClasses =
  'inline-block text-sm text-gray-800 dark:text-gray-300 underline decoration-gray-300 dark:decoration-gray-600 decoration-1 underline-offset-[3px] transition-[text-decoration-color] duration-200 hover:decoration-gray-500 dark:hover:decoration-gray-400';

export function Tag(props: TagProps) {
  const { label, href, variant = 'pill' } = props;
  const classes = variant === 'pill' ? pillClasses : inlineClasses;

  if (href.startsWith('#')) {
    return (
      <a href={href} className={classes}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}
