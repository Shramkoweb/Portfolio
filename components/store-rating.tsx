import type { StoreRating as StoreRatingData } from '@/lib/constants';

interface StoreRatingProps {
  rating: StoreRatingData;
}

// Styled like the read-time line under blog post headings. `not-prose` keeps
// prose link colours off it, and -mt-6 offsets the prose h1's 40px bottom
// margin so it sits as close to the heading as the blog's line does.
export function StoreRating(props: StoreRatingProps) {
  const { ratingValue, ratingCount, users, storeUrl } = props.rating;

  return (
    <p className="not-prose -mt-6 mb-4 text-xs text-gray-600 dark:text-gray-400">
      <span aria-hidden="true">★</span> {ratingValue.toFixed(1)}
      <span className="sr-only"> out of 5 stars</span> ({ratingCount} ratings) •{' '}
      {/* Dropped on phones so the line fits one row without a dangling bullet. */}
      <span className="hidden sm:inline">{users} users • </span>
      <a
        className="whitespace-nowrap underline underline-offset-2 transition-colors duration-200 ease-out-expo hover:text-gray-900 dark:hover:text-white"
        target="_blank"
        rel="noopener noreferrer"
        href={storeUrl}
      >
        Chrome Web Store
      </a>
    </p>
  );
}
