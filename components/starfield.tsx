import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

import { edgeFade, meteorAt, starAlpha, starAt } from '@/lib/starfield';

const PITCH = 8;
const FADE_INNER = 300;
const FADE_OUTER = 720;
const PARALLAX = 0.1;
const DRIFT = 3;
const FRAME_MS = 1000 / 30;
const METEOR_LENGTH = 180;
const METEOR_TAIL = 14;

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context || !resolvedTheme) return;

    const wide = window.matchMedia('(min-width: 768px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const color = getComputedStyle(canvas).color;
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = -Infinity;
    let lastScroll = -1;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const dot = (x: number, y: number, radius: number) => {
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    };

    const draw = (time: number) => {
      const still = reducedMotion.matches;
      const seconds = still ? 0 : time / 1000;
      const offsetX = seconds * DRIFT;
      const offsetY = still ? 0 : window.scrollY * PARALLAX;
      const firstCol = Math.floor(offsetX / PITCH);
      const firstRow = Math.floor(offsetY / PITCH);
      const cols = Math.ceil(width / PITCH) + 1;
      const rows = Math.ceil(height / PITCH) + 1;
      const center = width / 2;

      context.clearRect(0, 0, width, height);
      context.fillStyle = color;
      for (let col = 0; col < cols; col += 1) {
        const x = (firstCol + col) * PITCH - offsetX + PITCH / 2;
        const distance = Math.abs(x - center);
        if (distance < FADE_INNER) continue;
        for (let row = 0; row < rows; row += 1) {
          const star = starAt(firstCol + col, firstRow + row);
          if (!star) continue;
          const fade = edgeFade(star, distance, FADE_INNER, FADE_OUTER);
          if (fade <= 0) continue;
          context.globalAlpha = fade * starAlpha(star, seconds);
          dot(x, (firstRow + row) * PITCH - offsetY + PITCH / 2, star.radius);
        }
      }

      const meteor = still ? null : meteorAt(seconds, width, height);
      if (meteor) {
        const direction = meteor.x < center ? -1 : 1;
        const envelope = Math.sin(meteor.progress * Math.PI);
        const travel = meteor.progress * METEOR_LENGTH;
        for (let index = 0; index < METEOR_TAIL; index += 1) {
          const along = travel - index * 5;
          if (along < 0) break;
          context.globalAlpha = envelope * (1 - index / METEOR_TAIL) * 0.9;
          dot(
            meteor.x + direction * along * 0.8,
            meteor.y + along * 0.6,
            index === 0 ? 1.3 : 1,
          );
        }
      }
      context.globalAlpha = 1;
    };

    const loop = (time: number) => {
      if (time - last >= FRAME_MS || window.scrollY !== lastScroll) {
        last = time;
        lastScroll = window.scrollY;
        draw(time);
      }
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      resize();
      if (!wide.matches) {
        context.clearRect(0, 0, width, height);
        return;
      }
      if (reducedMotion.matches || document.hidden) {
        draw(0);
        return;
      }
      frame = requestAnimationFrame(loop);
    };

    start();
    window.addEventListener('resize', start);
    document.addEventListener('visibilitychange', start);
    wide.addEventListener('change', start);
    reducedMotion.addEventListener('change', start);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', start);
      document.removeEventListener('visibilitychange', start);
      wide.removeEventListener('change', start);
      reducedMotion.removeEventListener('change', start);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full text-gray-300 dark:text-gray-500"
    />
  );
}
