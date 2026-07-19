import { render, screen } from '@testing-library/react';

import { DaysAsSoftwareEngineer } from '@/components/dashboard-card/days-as-engineer';

describe('DaysAsSoftwareEngineer', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2026-07-19T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render elapsed time as years, months and days', () => {
    render(<DaysAsSoftwareEngineer />);

    expect(screen.getByText('7y, 11m, 18d')).toBeInTheDocument();
  });
});
