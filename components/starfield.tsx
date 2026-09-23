import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

import {
  edgeFade,
  meteorAt,
  SHOWER_EVENT,
  starAlpha,
  starAt,
} from '@/lib/starfield';

const PITCH = 8;
const FADE_INNER = 300;
const FADE_OUTER = 720;
const PARALLAX = 0.1;
const DRIFT = 3;
const FRAME_MS = 1000 / 30;
const METEOR_LENGTH = 180;
const METEOR_TAIL = 14;
const METEOR_MS = 1100;
const SHOWER_SIZE = 6;
const SHOWER_GAP_MS = 320;

interface ShowerMeteor {
  start: number;
  x: number;
  y: number;
  direction: number;
}

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
    let shower: ShowerMeteor[] = [];

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

    const spark = (x: number, y: number, arm: number, tilt: number) => {
      const waist = arm * 0.22;
      context.save();
      context.translate(x, y);
      context.rotate(tilt);
      context.beginPath();
      context.moveTo(0, -arm);
      context.quadraticCurveTo(waist, -waist, arm, 0);
      context.quadraticCurveTo(waist, waist, 0, arm);
      context.quadraticCurveTo(-waist, waist, -arm, 0);
      context.quadraticCurveTo(-waist, -waist, 0, -arm);
      context.fill();
      context.restore();
    };

    const meteor = (
      x: number,
      y: number,
      direction: number,
      progress: number,
    ) => {
      const envelope = Math.sin(progress * Math.PI);
      const travel = progress * METEOR_LENGTH;
      for (let index = 0; index < METEOR_TAIL; index += 1) {
        const along = travel - index * 5;
        if (along < 0) break;
        context.globalAlpha = envelope * (1 - index / METEOR_TAIL) * 0.9;
        dot(
          x + direction * along * 0.8,
          y + along * 0.6,
          index === 0 ? 1.3 : 1,
        );
      }
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
          const y = (firstRow + row) * PITCH - offsetY + PITCH / 2;
          if (star.spark) spark(x, y, star.spark, star.tilt);
          else dot(x, y, star.radius);
        }
      }

      const scheduled = still ? null : meteorAt(seconds, width, height);
      if (scheduled) {
        const direction = scheduled.x < center ? -1 : 1;
        meteor(scheduled.x, scheduled.y, direction, scheduled.progress);
      }

      shower = shower.filter(({ start }) => time - start <= METEOR_MS);
      for (const item of shower) {
        const progress = (time - item.start) / METEOR_MS;
        if (progress >= 0) meteor(item.x, item.y, item.direction, progress);
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

    const startShower = () => {
      if (reducedMotion.matches || !wide.matches) return;
      const now = performance.now();
      const reach = Math.max(60, width / 2 - FADE_INNER - 40);
      shower = Array.from({ length: SHOWER_SIZE }, (_, index) => {
        const left = index % 2 === 0;
        const offset = reach * (0.45 + 0.55 * Math.random());
        return {
          start: now + index * SHOWER_GAP_MS + Math.random() * 160,
          x: left ? offset : width - offset,
          y: height * (0.05 + Math.random() * 0.45),
          direction: left ? -1 : 1,
        };
      });
    };

    start();
    window.addEventListener(SHOWER_EVENT, startShower);
    window.addEventListener('resize', start);
    document.addEventListener('visibilitychange', start);
    wide.addEventListener('change', start);
    reducedMotion.addEventListener('change', start);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(SHOWER_EVENT, startShower);
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
