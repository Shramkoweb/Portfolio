export interface KpiTile {
  label: string;
  value: number;
  format: 'count' | 'percent';
  info: string;
}

export const KPIS: KpiTile[] = [
  {
    label: 'Utilization rate, %',
    value: 36,
    format: 'percent',
    info: 'Share of MAU who actively used the program during the selected period.',
  },
  {
    label: 'MAU',
    value: 200,
    format: 'count',
    info: 'Monthly active users — unique users with at least one tracked action this month.',
  },
];

export interface WeeklyActivity {
  week: string;
  high: number;
  moderate: number;
  low: number;
  inactive: number;
  total: number;
}

export const WEEKLY_ACTIVITY: WeeklyActivity[] = [
  {
    week: 'Week 1',
    high: 22,
    moderate: 31,
    low: 27,
    inactive: 20,
    total: 463_120,
  },
  {
    week: 'Week 2',
    high: 28,
    moderate: 34,
    low: 23,
    inactive: 15,
    total: 478_523,
  },
  {
    week: 'Week 3',
    high: 24,
    moderate: 32,
    low: 26,
    inactive: 18,
    total: 471_044,
  },
  {
    week: 'Week 4',
    high: 26,
    moderate: 30,
    low: 25,
    inactive: 19,
    total: 469_812,
  },
];

export const ACTIVITY_SEGMENTS = [
  { key: 'high', label: 'High activity' },
  { key: 'moderate', label: 'Moderate activity' },
  { key: 'low', label: 'Low activity' },
  { key: 'inactive', label: 'Inactive' },
] as const;

export type ActivitySegmentKey = (typeof ACTIVITY_SEGMENTS)[number]['key'];

export const FEATURE_KEYS = [
  'meal-logging',
  'workout',
  'water-intake',
  'habit-check-in',
  'sleep-log',
  'step-challenge',
] as const;

export type FeatureKey = (typeof FEATURE_KEYS)[number];

export interface FeatureMeta {
  key: FeatureKey;
  label: string;
}

export const FEATURES: FeatureMeta[] = [
  { key: 'meal-logging', label: 'Meal Logging' },
  { key: 'workout', label: 'Workout' },
  { key: 'water-intake', label: 'Water Intake' },
  { key: 'habit-check-in', label: 'Habit Check-in' },
  { key: 'sleep-log', label: 'Sleep Log' },
  { key: 'step-challenge', label: 'Step Challenge' },
];

export interface FeatureAdoption {
  key: FeatureKey;
  label: string;
  users: number;
}

export const FEATURE_ADOPTION: FeatureAdoption[] = [
  { key: 'meal-logging', label: 'Meal Logging', users: 8_400 },
  { key: 'workout', label: 'Workout', users: 6_200 },
  { key: 'water-intake', label: 'Water Intake', users: 4_900 },
  { key: 'habit-check-in', label: 'Habit Check-in', users: 3_700 },
  { key: 'sleep-log', label: 'Sleep Log', users: 2_400 },
  { key: 'step-challenge', label: 'Step Challenge', users: 1_900 },
];

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export type Month = (typeof MONTHS)[number];

export interface SeriesPoint {
  month: Month;
  actual: number | null;
  projected: number | null;
}

function buildSeries(
  values: Array<number | null>,
  projectedFrom: number,
): SeriesPoint[] {
  return MONTHS.map((month, idx) => {
    const v = values[idx] ?? null;
    if (idx < projectedFrom) {
      return { month, actual: v, projected: null };
    }
    if (idx === projectedFrom) {
      return { month, actual: v, projected: v };
    }
    return { month, actual: null, projected: v };
  });
}

export const MONTHLY_ACTIVE_USERS: SeriesPoint[] = buildSeries(
  [1_000, 460, 360, 320, 290, 260, 240, 230, 220, 215, 195, 180],
  9,
);

export const NEW_USERS_COHORT: SeriesPoint[] = buildSeries(
  [80, 400, 820, 720, 600, 480, 380, 310, 230, 220, 210, 200],
  9,
);

export type RetentionByFeature = Record<FeatureKey, SeriesPoint[]>;

export const FEATURE_RETENTION: RetentionByFeature = {
  'meal-logging': buildSeries(
    [100, 62, 48, 41, 37, 34, 32, 31, 29, 28, 27, 26],
    9,
  ),
  workout: buildSeries([100, 38, 31, 27, 25, 24, 23, 22, 22, 21, 20, 19], 9),
  'water-intake': buildSeries(
    [100, 55, 44, 38, 34, 32, 30, 28, 27, 26, 25, 24],
    9,
  ),
  'habit-check-in': buildSeries(
    [100, 48, 37, 31, 28, 26, 24, 23, 22, 21, 20, 19],
    9,
  ),
  'sleep-log': buildSeries(
    [100, 42, 32, 27, 24, 22, 21, 20, 19, 18, 17, 16],
    9,
  ),
  'step-challenge': buildSeries(
    [100, 33, 24, 19, 16, 14, 13, 12, 11, 10, 10, 9],
    9,
  ),
};

export interface UtilizationPoint {
  month: Month;
  utilization: number;
}

export const PROGRAM_UTILIZATION: UtilizationPoint[] = [
  { month: 'Jan', utilization: 10 },
  { month: 'Feb', utilization: 13 },
  { month: 'Mar', utilization: 11 },
  { month: 'Apr', utilization: 8 },
  { month: 'May', utilization: 12 },
  { month: 'Jun', utilization: 18 },
];

export const UTILIZATION_TARGET = 40;
