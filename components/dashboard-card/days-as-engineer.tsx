import { useEffect, useState } from 'react';

import { DashboardCard } from '@/components/dashboard-card/dashboard-card';
import { getCalendarDuration } from '@/lib/utils';

const DATE_OF_CREATION = new Date('2018-08-01');

export function DaysAsSoftwareEngineer() {
  const [timeString, setTimeString] = useState<string>();

  // Computed after mount: the page is statically prerendered, so a
  // day-precise value baked at build time would mismatch on hydration.
  useEffect(() => {
    const { years, months, days } = getCalendarDuration(
      DATE_OF_CREATION,
      new Date(),
    );
    setTimeString(`${years}y, ${months}m, ${days}d`);
  }, []);

  return (
    <DashboardCard header="Time as Software Engineer" metric={timeString} />
  );
}
