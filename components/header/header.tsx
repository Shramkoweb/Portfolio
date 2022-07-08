import { Link } from '@/components/link';

export function Header() {
  return (
    <div className="flex flex-col justify-center px-8">
      <nav
        className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100"
      >
        <a href="#skip" className="skip-nav">
          Skip to content
        </a>
        <div className="ml-[-0.60rem]">
          <Link href="/" text="Home" />
          <Link href="/about" text="About" />
          <Link href="/dashboard" text="Dashboard" />
          <Link href="/blog" text="Blog" />
        </div>
      </nav>
    </div>
  );
}
