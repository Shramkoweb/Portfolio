interface NoResultsProps {
  searchValue: string;
}

export function NoResults({ searchValue }: NoResultsProps) {
  return (
    <div className="w-full py-12 text-center">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        No articles found
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {searchValue ? (
          <>
            We couldn&apos;t find any articles matching{' '}
            <span className="font-semibold">&quot;{searchValue}&quot;</span>.
            Try searching with different keywords.
          </>
        ) : (
          'No articles available at the moment.'
        )}
      </p>
    </div>
  );
}
