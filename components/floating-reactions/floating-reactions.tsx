import useSWR, { mutate } from 'swr';

import { fetcher } from '@/lib/fetcher';

type ReactionType = 'heart' | 'beer' | 'trophy';

type ReactionsResponse = {
  reactions: Record<ReactionType, number>;
};

const REACTIONS: { type: ReactionType; emoji: string; label: string }[] = [
  { type: 'heart', emoji: '❤️', label: 'Love it' },
  { type: 'beer', emoji: '🍺', label: 'Cheers' },
  { type: 'trophy', emoji: '🏆', label: 'Champion' },
];

interface FloatingReactionsProps {
  slug: string;
}

export function FloatingReactions({ slug }: FloatingReactionsProps) {
  const cacheKey = `/api/reactions/${slug}`;
  const { data } = useSWR<ReactionsResponse>(cacheKey, fetcher);

  const handleReaction = async (type: ReactionType) => {
    mutate(
      cacheKey,
      (current: ReactionsResponse | undefined) => {
        if (!current) return current;
        return {
          reactions: {
            ...current.reactions,
            [type]: (current.reactions[type] ?? 0) + 1,
          },
        };
      },
      false,
    );

    try {
      const response = await fetch(cacheKey, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });

      if (response.ok) {
        const newData = await response.json();
        mutate(cacheKey, newData, false);
      }
    } catch {
      mutate(cacheKey);
    }
  };

  return (
    <>
      {REACTIONS.map(({ type, emoji, label }) => {
        const count = data?.reactions[type] ?? 0;

        return (
          <li key={type}>
            <button
              type="button"
              onClick={() => handleReaction(type)}
              className="flex items-center justify-center w-[44px] h-[44px] relative group"
              aria-label={label}
            >
              <span className="text-xl transition-transform group-hover:scale-125 group-active:scale-95">
                {emoji}
              </span>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[10px] font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </>
  );
}
