import Link from 'next/link';

interface TagProps {
  label: string;
  href: string;
  variant?: 'pill' | 'inline';
}

const pillClasses =
  'group -my-[5px] flex min-h-11 items-center rounded-md active:scale-[0.97] transition-transform duration-200 ease-out-expo';

const pillLabelClasses =
  'rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-700 dark:text-gray-300 transition-[color,background-color] duration-200 ease-out-expo group-hover:bg-gray-200 dark:border-gray-800 dark:group-hover:bg-gray-800';

const inlineClasses =
  '-my-2.5 flex min-h-11 items-center text-sm text-gray-800 dark:text-gray-300 underline decoration-gray-300 dark:decoration-gray-600 decoration-1 underline-offset-[3px] transition-[text-decoration-color] duration-150 ease-out-expo hover:decoration-gray-500 dark:hover:decoration-gray-400';

export function Tag(props: TagProps) {
  const { label, href, variant = 'pill' } = props;
  const isPill = variant === 'pill';
  const classes = isPill ? pillClasses : inlineClasses;
  const content = isPill ? (
    <span className={pillLabelClasses}>{label}</span>
  ) : (
    label
  );

  if (href.startsWith('#')) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
