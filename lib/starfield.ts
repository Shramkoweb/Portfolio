export interface Star {
  rank: number;
  radius: number;
  phase: number;
  speed: number;
  spark: number;
  tilt: number;
}

export interface Meteor {
  x: number;
  y: number;
  progress: number;
}

export const SHOWER_EVENT = 'starfield:shower';

const STAR_CHANCE = 0.04;
const BRIGHT_CHANCE = 0.1;
const SPARK_CHANCE = 0.12;
const METEOR_PERIOD = 14;
const METEOR_DURATION = 1.1;

function hash(a: number, b: number): number {
  let value = Math.imul(a, 0x27d4eb2d) ^ Math.imul(b, 0x165667b1);
  value = Math.imul(value ^ (value >>> 16), 0x85ebca6b);
  value = Math.imul(value ^ (value >>> 13), 0xc2b2ae35);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
}

export function starAt(col: number, row: number): Star | null {
  const roll = hash(col, row);
  if (roll >= STAR_CHANCE) return null;
  const detail = hash(row, col);
  const shape = hash(col - 3, row + 5);
  return {
    rank: roll / STAR_CHANCE,
    radius: detail < BRIGHT_CHANCE ? 1.4 : 1,
    phase: detail * Math.PI * 2,
    speed: 0.6 + hash(col + 1, row - 1) * 1,
    spark: shape < SPARK_CHANCE ? 2.2 + (shape / SPARK_CHANCE) * 1.3 : 0,
    tilt: (hash(row + 2, col - 7) - 0.5) * 0.5,
  };
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function edgeFade(
  star: Star,
  distance: number,
  inner: number,
  outer: number,
): number {
  const reach = smoothstep(inner, outer, distance);
  return smoothstep(star.rank * 0.85, star.rank * 0.85 + 0.15, reach);
}

export function starAlpha(star: Star, seconds: number): number {
  const breath = 0.5 + 0.5 * Math.sin(seconds * star.speed + star.phase);
  return 0.3 + 0.7 * breath * breath;
}

export function meteorAt(
  seconds: number,
  width: number,
  height: number,
): Meteor | null {
  const cycle = Math.floor(seconds / METEOR_PERIOD);
  const local = seconds - cycle * METEOR_PERIOD - hash(cycle, 7) * 6;
  if (local < 0 || local > METEOR_DURATION) return null;
  const left = hash(cycle, 3) < 0.5;
  const gutter = width * 0.22;
  return {
    x: left ? hash(cycle, 5) * gutter : width - hash(cycle, 5) * gutter,
    y: (0.1 + hash(cycle, 9) * 0.5) * height,
    progress: local / METEOR_DURATION,
  };
}
