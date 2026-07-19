export interface CalendarDuration {
  years: number;
  months: number;
  days: number;
}

function daysInUTCMonth(year: number, monthIndex: number): number {
  // Day 0 of the next month is the last day of monthIndex
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

/**
 * Calendar duration between two instants, computed in UTC so the
 * result does not depend on the viewer's timezone. Month-end anchors
 * cap to shorter months (Jan 31 + 1 month = Feb 29), so days are
 * never negative — the same convention as date-fns.
 */
export function calendarDurationBetween(
  start: Date,
  end: Date,
): CalendarDuration {
  let years = end.getUTCFullYear() - start.getUTCFullYear();
  let months = end.getUTCMonth() - start.getUTCMonth();

  const anchorDay = Math.min(
    start.getUTCDate(),
    daysInUTCMonth(end.getUTCFullYear(), end.getUTCMonth()),
  );
  let days = end.getUTCDate() - anchorDay;

  if (days < 0) {
    months -= 1;
    const prevMonthDays = daysInUTCMonth(
      end.getUTCFullYear(),
      end.getUTCMonth() - 1,
    );
    days =
      end.getUTCDate() +
      prevMonthDays -
      Math.min(start.getUTCDate(), prevMonthDays);
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}
