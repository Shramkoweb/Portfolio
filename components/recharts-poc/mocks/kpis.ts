import type { LucideIcon } from 'lucide-react';
import { Eye, FileText, MousePointerClick, Users } from 'lucide-react';

export interface KpiTile {
  label: string;
  current: number;
  previous: number;
  format: 'count' | 'percent';
  icon: LucideIcon;
}

export const KPIS: KpiTile[] = [
  {
    label: 'Unique Pages',
    current: 570,
    previous: 555,
    format: 'count',
    icon: FileText,
  },
  {
    label: 'Page Views',
    current: 12480,
    previous: 11200,
    format: 'count',
    icon: Eye,
  },
  {
    label: 'CTR',
    current: 4.3,
    previous: 4.6,
    format: 'percent',
    icon: MousePointerClick,
  },
  {
    label: 'Active Users',
    current: 1820,
    previous: 1900,
    format: 'count',
    icon: Users,
  },
];
