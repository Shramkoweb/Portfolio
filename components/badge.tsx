interface BadgeProps {
  label: string;
  tone?: 'accent' | 'neutral';
}

const baseClasses =
  'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium tracking-wide ring-1';

const accentClasses =
  'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20';

const neutralClasses =
  'bg-gray-500/10 text-gray-700 ring-gray-500/20 dark:bg-gray-400/10 dark:text-gray-300 dark:ring-gray-400/20';

export function Badge(props: BadgeProps) {
  const { label, tone = 'accent' } = props;
  const toneClasses = tone === 'accent' ? accentClasses : neutralClasses;

  return <span className={`${baseClasses} ${toneClasses}`}>{label}</span>;
}
