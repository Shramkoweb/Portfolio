import clsx from 'clsx';
import Image from 'next/image';
import {
  type CSSProperties,
  type PointerEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { SHOWER_EVENT } from '@/lib/starfield';

import smile from '../public/static/images/smile.webp';
import tongue from '../public/static/images/tongue.webp';

const LENS = { x: 42, y: 67.5, r: 9 };
const LENS_SPARK = { x: 49.5, y: 60, arm: 4.5 };
const SPARKS = [
  { x: 24, y: 24, arm: 3.5 },
  { x: 106, y: 18, arm: 4.5 },
  { x: 116, y: 64, arm: 3 },
  { x: 14, y: 86, arm: 3.5 },
];
const SHOWER_CLICKS = 5;
const CLICK_GAP_MS = 600;
const TAP_WINK_MS = 1200;

function sparkPath({ x, y, arm }: { x: number; y: number; arm: number }) {
  const w = arm * 0.22;
  return `M${x} ${y - arm}Q${x + w} ${y - w} ${x + arm} ${y}Q${x + w} ${y + w} ${x} ${y + arm}Q${x - w} ${y + w} ${x - arm} ${y}Q${x - w} ${y - w} ${x} ${y - arm}Z`;
}

export function Avatar() {
  const id = useId();
  const lensId = `${id}-lens`;
  const glintId = `${id}-glint`;
  const [winking, setWinking] = useState(false);
  const clicks = useRef({ count: 0, at: -Infinity });
  const tapTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(tapTimer.current), []);

  const handlePointerEnter = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') setWinking(true);
  };

  const handlePointerLeave = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') setWinking(false);
  };

  const handlePointerUp = (event: PointerEvent) => {
    const now = performance.now();
    const { count, at } = clicks.current;
    const next = now - at < CLICK_GAP_MS ? count + 1 : 1;
    clicks.current = { count: next >= SHOWER_CLICKS ? 0 : next, at: now };
    if (next >= SHOWER_CLICKS) window.dispatchEvent(new Event(SHOWER_EVENT));

    if (event.pointerType !== 'mouse') {
      clearTimeout(tapTimer.current);
      setWinking(true);
      tapTimer.current = setTimeout(() => setWinking(false), TAP_WINK_MS);
    }
  };

  return (
    <div
      className="avatar relative mr-auto mb-8 block h-32 w-32 shrink-0 sm:mb-0"
      data-wink={winking}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
    >
      <Image
        alt="Serhii Shramko's Memoji avatar — smiling face with brown hair and round glasses"
        src={smile}
        quality={75}
        width={128}
        height={128}
        className={clsx(
          'absolute top-0 left-0 transition-opacity duration-150 ease-out',
          winking && 'opacity-0',
        )}
        sizes="128px"
        priority
      />
      <Image
        alt=""
        src={tongue}
        quality={75}
        width={128}
        height={128}
        className={clsx(
          'absolute top-0 left-0 transition-opacity duration-150 ease-out',
          !winking && 'opacity-0',
        )}
        sizes="128px"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 128 128"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <clipPath id={lensId}>
            <circle cx={LENS.x} cy={LENS.y} r={LENS.r} />
          </clipPath>
          <linearGradient id={glintId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g clipPath={`url(#${lensId})`}>
          <g transform={`rotate(25 ${LENS.x} ${LENS.y})`}>
            <rect
              className="avatar-glint"
              x={LENS.x - LENS.r - 8}
              y={LENS.y - LENS.r * 2}
              width="6"
              height={LENS.r * 4}
              fill={`url(#${glintId})`}
            />
          </g>
        </g>
        <path
          className="avatar-lens-spark"
          d={sparkPath(LENS_SPARK)}
          fill="#fff"
        />
        <g className="text-gray-400 dark:text-gray-500">
          {SPARKS.map((spark, index) => (
            <path
              key={`${spark.x}-${spark.y}`}
              className="avatar-spark"
              d={sparkPath(spark)}
              fill="currentColor"
              style={{ '--delay': `${index * 90}ms` } as CSSProperties}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
