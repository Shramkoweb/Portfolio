import { useTheme } from 'next-themes';

import { useIsMounted } from './useIsMounted';

export interface Palette {
  primary: string;
  primaryStrong: string;
  secondary: string;
  secondaryStrong: string;
  neutral: string;
  axis: string;
  grid: string;
  up: string;
  down: string;
  background: string;
  textLabel: string;
}

export const LIGHT_PALETTE: Palette = {
  primary: '#b6dcfe',
  primaryStrong: '#4a90e2',
  secondary: '#cfe6ff',
  secondaryStrong: '#3b78c4',
  neutral: '#9ca3af',
  axis: '#6b7280',
  grid: '#e5e7eb',
  up: '#16a34a',
  down: '#dc2626',
  background: '#ffffff',
  textLabel: '#374151',
};

export const DARK_PALETTE: Palette = {
  primary: '#1e3a5f',
  primaryStrong: '#60a5fa',
  secondary: '#1f2937',
  secondaryStrong: '#93c5fd',
  neutral: '#6b7280',
  axis: '#9ca3af',
  grid: '#374151',
  up: '#22c55e',
  down: '#ef4444',
  background: '#111827',
  textLabel: '#d1d5db',
};

export function resolvePalette(theme: string | undefined): Palette {
  return theme === 'dark' ? DARK_PALETTE : LIGHT_PALETTE;
}

export function usePalette(): Palette {
  const mounted = useIsMounted();
  const { resolvedTheme } = useTheme();
  if (!mounted) return LIGHT_PALETTE;
  return resolvePalette(resolvedTheme);
}
