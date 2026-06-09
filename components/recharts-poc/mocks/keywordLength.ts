export interface KeywordLengthBucket {
  length: number;
  currentPeriod: number;
  previousPeriod: number;
}

export const KEYWORD_LENGTH: KeywordLengthBucket[] = [
  { length: 1, currentPeriod: 300, previousPeriod: 280 },
  { length: 2, currentPeriod: 1559, previousPeriod: 1400 },
  { length: 3, currentPeriod: 4183, previousPeriod: 3900 },
  { length: 4, currentPeriod: 4478, previousPeriod: 4100 },
  { length: 5, currentPeriod: 3112, previousPeriod: 3200 },
  { length: 6, currentPeriod: 1466, previousPeriod: 1500 },
  { length: 7, currentPeriod: 732, previousPeriod: 690 },
  { length: 8, currentPeriod: 414, previousPeriod: 450 },
  { length: 9, currentPeriod: 261, previousPeriod: 240 },
  { length: 10, currentPeriod: 179, previousPeriod: 200 },
];
