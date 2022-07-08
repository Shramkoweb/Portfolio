import Link from 'next/link';

import { FooterLink } from '@/components/footer-link';

export function Footer() {
  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className="text-gray-500 hover:text-gray-600 transition">Home</a>
          </Link>
          <Link href="/about">
            <a className="text-gray-500 hover:text-gray-600 transition">
              About
            </a>
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <FooterLink href="https://github.com/shramkoweb">GitHub</FooterLink>
        </div>
        <div className="flex flex-col space-y-4">
          <Link href="/gear">
            <a className="text-gray-500 hover:text-gray-600 transition">My Gear</a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
