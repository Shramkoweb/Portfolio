import Link from 'next/link';
import { Rss } from 'lucide-react';

export function RssLink() {
  return (
    <Link
      href="/feed.xml"
      className="flex items-center justify-center w-11 h-11 text-gray-600 dark:text-gray-400 hover:scale-110 hover:text-gray-900 dark:hover:text-gray-100 active:scale-[0.97] transition-[color,transform] duration-200 ease-out-expo"
      aria-label="Subscribe via RSS"
    >
      <Rss size={24} aria-hidden="true" />
    </Link>
  );
}
