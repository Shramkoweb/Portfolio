export const theme = {
  background: '#fbf9f4',
  surface: '#fdfcf8',
  border: '#e7e1d2',
  borderStrong: '#d6cdb4',
  text: '#1f1a12',
  textMuted: '#6f6857',
  textSubtle: '#8c8472',

  axis: '#9a9382',
  grid: '#e7e1d2',
  line: '#1f1a12',
  lineDashed: '#1f1a12',
  reference: '#c0552a',

  segment: {
    high: '#494033',
    moderate: '#857556',
    low: '#b2a384',
    inactive: '#dcd1b5',
  },

  bar: '#b2a384',
  area: '#1f1a12',

  tooltipBackground: '#1f1a12',
  tooltipText: '#fdfcf8',
} as const;

export const SEGMENT_COLORS = {
  high: theme.segment.high,
  moderate: theme.segment.moderate,
  low: theme.segment.low,
  inactive: theme.segment.inactive,
} as const;
