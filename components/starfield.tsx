import { useEffect, useRef } from 'react';

import {
  alphaLevel,
  edgeFade,
  meteorAt,
  SHOWER_EVENT,
  type Star,
  starAlpha,
  starAt,
} from '@/lib/starfield';

const PITCH = 8;
const FADE_INNER = 384;
const FADE_OUTER = 640;
const PARALLAX = 0.1;
const PARALLAX_MARGIN = PITCH * 8;
const DRIFT = 3;
const IDLE_FRAME_MS = 100;
const METEOR_FRAME_MS = 1000 / 30;
const MAX_DPR = 1.5;
const LEVELS = 8;
const METEOR_LENGTH = 180;
const METEOR_TAIL = 14;
const METEOR_MS = 1100;
const SHOWER_SIZE = 6;
const SHOWER_GAP_MS = 320;

interface VisibleStar {
  col: number;
  y: number;
  star: Star;
}

interface ShowerMeteor {
  start: number;
  x: number;
  y: number;
  direction: number;
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible: VisibleStar[] = [];
    let visibleKey = '';
    const buckets = Array.from({ length: LEVELS + 1 }, () => [] as number[]);
    let color = getComputedStyle(canvas).color;
    let width = 0;
    let height = 0;
    let base = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;
    let scrollFrame = 0;
    let resizeFrame = 0;
    let shower: ShowerMeteor[] = [];
    let resolution: MediaQueryList | null = null;
    let ready = false;

    const parallax = () =>
      reducedMotion.matches ? 0 : window.scrollY * PARALLAX;

    const place = () => {
      canvas.style.transform = `translateY(${base - parallax()}px)`;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = window.innerWidth;
      height = window.innerHeight + PARALLAX_MARGIN;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const traceSpark = (x: number, y: number, arm: number, tilt: number) => {
      const cos = Math.cos(tilt);
      const sin = Math.sin(tilt);
      const w = arm * 0.22;
      const px = (dx: number, dy: number) => x + dx * cos - dy * sin;
      const py = (dx: number, dy: number) => y + dx * sin + dy * cos;
      context.moveTo(px(0, -arm), py(0, -arm));
      context.quadraticCurveTo(px(w, -w), py(w, -w), px(arm, 0), py(arm, 0));
      context.quadraticCurveTo(px(w, w), py(w, w), px(0, arm), py(0, arm));
      context.quadraticCurveTo(px(-w, w), py(-w, w), px(-arm, 0), py(-arm, 0));
      context.quadraticCurveTo(
        px(-w, -w),
        py(-w, -w),
        px(0, -arm),
        py(0, -arm),
      );
      context.closePath();
    };

    const meteor = (
      x: number,
      y: number,
      direction: number,
      progress: number,
    ) => {
      const envelope = Math.sin(progress * Math.PI);
      const travel = progress * METEOR_LENGTH;
      const shift = parallax() - base;
      for (let index = 0; index < METEOR_TAIL; index += 1) {
        const along = travel - index * 5;
        if (along < 0) break;
        context.globalAlpha = envelope * (1 - index / METEOR_TAIL) * 0.9;
        context.beginPath();
        context.arc(
          x + direction * along * 0.8,
          y + along * 0.6 + shift,
          index === 0 ? 1.3 : 1,
          0,
          Math.PI * 2,
        );
        context.fill();
      }
    };

    const collect = (firstCol: number, firstRow: number) => {
      const cols = Math.ceil(width / PITCH) + 1;
      const rows = Math.ceil(height / PITCH) + 1;
      const key = `${firstCol}:${firstRow}:${cols}:${rows}`;
      if (key === visibleKey) return;
      visibleKey = key;
      visible = [];
      const center = width / 2;
      for (let col = 0; col < cols; col += 1) {
        const x = col * PITCH + PITCH / 2;
        if (Math.abs(x - center) < FADE_INNER - PITCH) continue;
        for (let row = 0; row < rows; row += 1) {
          const star = starAt(firstCol + col, firstRow + row);
          if (star) visible.push({ col, y: row * PITCH + PITCH / 2, star });
        }
      }
    };

    const draw = (time: number): boolean => {
      const still = reducedMotion.matches;
      const seconds = still ? 0 : time / 1000;
      const offsetX = seconds * DRIFT;
      base = Math.floor(parallax() / PARALLAX_MARGIN) * PARALLAX_MARGIN;
      const firstCol = Math.floor(offsetX / PITCH);
      const firstRow = Math.floor(base / PITCH);
      const center = width / 2;
      const shiftX = firstCol * PITCH - offsetX;
      collect(firstCol, firstRow);

      for (const bucket of buckets) bucket.length = 0;
      for (const { col, y, star } of visible) {
        const x = col * PITCH + PITCH / 2 + shiftX;
        const distance = Math.abs(x - center);
        if (distance < FADE_INNER) continue;
        const fade = edgeFade(star, distance, FADE_INNER, FADE_OUTER);
        if (fade <= 0) continue;
        const level = alphaLevel(fade * starAlpha(star, seconds), LEVELS);
        if (level === 0) continue;
        buckets[level].push(
          x,
          y,
          star.spark || star.radius,
          star.spark ? star.tilt : NaN,
        );
      }

      context.clearRect(0, 0, width, height);
      context.fillStyle = color;
      for (let level = 1; level <= LEVELS; level += 1) {
        const bucket = buckets[level];
        if (bucket.length === 0) continue;
        context.globalAlpha = level / LEVELS;
        context.beginPath();
        for (let index = 0; index < bucket.length; index += 4) {
          const x = bucket[index];
          const y = bucket[index + 1];
          const size = bucket[index + 2];
          const tilt = bucket[index + 3];
          if (Number.isNaN(tilt)) {
            context.moveTo(x + size, y);
            context.arc(x, y, size, 0, Math.PI * 2);
          } else {
            traceSpark(x, y, size, tilt);
          }
        }
        context.fill();
      }

      let flying = false;
      if (!still) {
        const scheduled = meteorAt(
          seconds,
          width,
          window.innerHeight,
          center - FADE_INNER,
        );
        if (scheduled) {
          flying = true;
          meteor(
            scheduled.x,
            scheduled.y,
            scheduled.x < center ? -1 : 1,
            scheduled.progress,
          );
        }
        shower = shower.filter(({ start }) => time - start <= METEOR_MS);
        for (const item of shower) {
          flying = true;
          const progress = (time - item.start) / METEOR_MS;
          if (progress >= 0) meteor(item.x, item.y, item.direction, progress);
        }
      }
      context.globalAlpha = 1;
      place();
      if (!canvas.dataset.drawn) canvas.dataset.drawn = 'true';
      return flying;
    };

    const stop = () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };

    const tick = (time: number) => {
      const flying = draw(time);
      if (reducedMotion.matches || document.hidden) return;
      timer = setTimeout(
        () => {
          frame = requestAnimationFrame(tick);
        },
        flying ? METEOR_FRAME_MS : IDLE_FRAME_MS,
      );
    };

    const start = () => {
      if (!ready) return;
      stop();
      frame = requestAnimationFrame(tick);
    };

    const onResize = () => {
      if (!ready || resizeFrame) return;
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        resize();
        start();
      });
    };

    function onResolution() {
      watchResolution();
      onResize();
    }

    function watchResolution() {
      resolution?.removeEventListener('change', onResolution);
      resolution = window.matchMedia(
        `(resolution: ${window.devicePixelRatio}dppx)`,
      );
      resolution.addEventListener('change', onResolution);
    }

    const onScroll = () => {
      if (reducedMotion.matches || scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const next = Math.floor(parallax() / PARALLAX_MARGIN) * PARALLAX_MARGIN;
        if (next !== base) start();
        else place();
      });
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const onShower = () => {
      if (reducedMotion.matches) return;
      const now = performance.now();
      const reach = Math.max(60, width / 2 - FADE_INNER);
      shower = Array.from({ length: SHOWER_SIZE }, (_, index) => {
        const left = index % 2 === 0;
        const offset = reach * (0.45 + 0.55 * Math.random());
        return {
          start: now + index * SHOWER_GAP_MS + Math.random() * 160,
          x: left ? offset : width - offset,
          y: window.innerHeight * (0.05 + Math.random() * 0.45),
          direction: left ? -1 : 1,
        };
      });
      start();
    };

    const theme = new MutationObserver(() => {
      const next = getComputedStyle(canvas).color;
      if (next === color) return;
      color = next;
      start();
    });

    const begin = () => {
      ready = true;
      resize();
      watchResolution();
      start();
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(begin, { timeout: 1500 })
      : window.setTimeout(begin, 300);
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener(SHOWER_EVENT, onShower);
    document.addEventListener('visibilitychange', onVisibility);
    reducedMotion.addEventListener('change', start);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      stop();
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(resizeFrame);
      theme.disconnect();
      resolution?.removeEventListener('change', onResolution);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener(SHOWER_EVENT, onShower);
      document.removeEventListener('visibilitychange', onVisibility);
      reducedMotion.removeEventListener('change', start);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 -z-10 text-gray-300 will-change-transform print:hidden forced-colors:hidden dark:text-gray-500"
    />
  );
}
