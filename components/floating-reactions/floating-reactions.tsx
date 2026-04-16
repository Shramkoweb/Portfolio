import { Beer, Heart, Trophy } from 'lucide-react';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';

import { fetcher } from '@/lib/fetcher';
import { ReactionsResponse, ReactionType } from '@/lib/types';

const REACTIONS = [
  {
    type: 'heart' as const,
    icon: Heart,
    label: 'Love it',
    color: 'text-rose-500',
    bgColor: 'bg-rose-500',
  },
  {
    type: 'beer' as const,
    icon: Beer,
    label: 'Cheers',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500',
  },
  {
    type: 'trophy' as const,
    icon: Trophy,
    label: 'Champion',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500',
  },
];

interface FloatingReactionsProps {
  slug: string;
}

export function FloatingReactions(props: FloatingReactionsProps) {
  const { slug } = props;
  const cacheKey = `/api/reactions/${slug}`;
  const { data } = useSWR<ReactionsResponse>(cacheKey, fetcher);
  const [animating, setAnimating] = useState<ReactionType | null>(null);

  const handleReaction = async (type: ReactionType) => {
    setAnimating(type);
    setTimeout(() => setAnimating(null), 600);

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
      {REACTIONS.map(({ type, icon: Icon, label, color, bgColor }) => {
        const count = data?.reactions?.[type] ?? 0;
        const isAnimating = animating === type;

        return (
          <li key={type}>
            <button
              type="button"
              onClick={() => handleReaction(type)}
              className="flex items-center justify-center w-[44px] h-[44px] relative group cursor-pointer"
              aria-label={`${label}${count > 0 ? `, ${count} reaction${count !== 1 ? 's' : ''}` : ''}`}
            >
              {/* Burst particles */}
              {isAnimating && (
                <>
                  <span
                    className={`absolute w-2 h-2 rounded-full ${bgColor} animate-burst-1`}
                  />
                  <span
                    className={`absolute w-2 h-2 rounded-full ${bgColor} animate-burst-2`}
                  />
                  <span
                    className={`absolute w-1.5 h-1.5 rounded-full ${bgColor} animate-burst-3`}
                  />
                  <span
                    className={`absolute w-1.5 h-1.5 rounded-full ${bgColor} animate-burst-4`}
                  />
                  <span
                    className={`absolute w-1 h-1 rounded-full ${bgColor} animate-burst-5`}
                  />
                  <span
                    className={`absolute w-1 h-1 rounded-full ${bgColor} animate-burst-6`}
                  />
                </>
              )}
              {/* Ring burst */}
              {isAnimating && (
                <span
                  className={`absolute w-8 h-8 rounded-full border-2 ${color.replace('text-', 'border-')} animate-ring-burst`}
                />
              )}
              <Icon
                aria-hidden="true"
                size={24}
                strokeWidth={2}
                className={`
                  transition-[color,transform] duration-200 ease-out-expo
                  ${isAnimating ? `${color} scale-125` : 'text-gray-600 dark:text-gray-400'}
                  group-hover:scale-125 group-hover:text-gray-900 dark:group-hover:text-gray-100
                  group-active:scale-95
                `}
              />
              {count > 0 && (
                <span
                  aria-live="polite"
                  className={`
                    absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[10px] font-medium
                    bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                    rounded-full flex items-center justify-center
                    ${isAnimating ? 'animate-bounce-pop' : ''}
                  `}
                >
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
