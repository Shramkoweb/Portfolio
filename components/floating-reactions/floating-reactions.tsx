import { Beer, Heart, Trophy } from 'lucide-react';
import useSWR, { mutate } from 'swr';

import { fetcher } from '@/lib/fetcher';
import { ReactionsResponse, ReactionType } from '@/lib/types';

const REACTIONS = [
  { type: 'heart' as const, icon: Heart, label: 'Love it' },
  { type: 'beer' as const, icon: Beer, label: 'Cheers' },
  { type: 'trophy' as const, icon: Trophy, label: 'Champion' },
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
      } else {
        mutate(cacheKey);
      }
    } catch {
      mutate(cacheKey);
    }
  };

  return (
    <>
      {REACTIONS.map(({ type, icon: Icon, label }) => {
        const count = data?.reactions?.[type] ?? 0;

        return (
          <li key={type}>
            <button
              type="button"
              onClick={() => handleReaction(type)}
              className="flex items-center justify-center w-[44px] h-[44px] relative group cursor-pointer"
              aria-label={label}
            >
              <Icon size={24} strokeWidth={2} className="text-gray-600 dark:text-gray-400 transition-transform group-hover:scale-125 group-hover:text-gray-900 dark:group-hover:text-gray-100 group-active:scale-95" />
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
