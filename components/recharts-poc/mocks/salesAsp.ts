export interface SalesAspPoint {
  month: string;
  asp: number;
  sales: number;
}

export const SALES_ASP: SalesAspPoint[] = [
  { month: 'May', asp: 24, sales: 55 },
  { month: 'Jun', asp: 27, sales: 60 },
  { month: 'Jul', asp: 25, sales: 70 },
  { month: 'Aug', asp: 20, sales: 130 },
  { month: 'Sep', asp: 17, sales: 200 },
  { month: 'Oct', asp: 15, sales: 245 },
];
