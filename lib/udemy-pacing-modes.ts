export const UDEMY_PACING_VERSION = '2.1.2';

export const UDEMY_PACING_MODES = [
  {
    name: 'Turbo',
    delay: '100 ms',
    batch: 'No pause',
    pause: '-',
  },
  {
    name: 'Balanced',
    delay: '250 ms',
    batch: 'Every 30 clicks',
    pause: '1.5 s',
  },
  {
    name: 'Safe',
    delay: '400 ms',
    batch: 'Every 20 clicks',
    pause: '3 s',
  },
  {
    name: 'Auto (default)',
    delay: '250 ms',
    batch: 'Every 30 clicks',
    pause: '1.5 s',
  },
  {
    name: 'Advanced',
    delay: '50 to 1000 ms',
    batch: 'Every 5 to 50 clicks',
    pause: 'Six delays, at least 1 s',
  },
];
