export const getCopyrightYearString = (
  createYear: number,
  currentYear: number,
) => {
  if (createYear === currentYear) {
    return currentYear.toString();
  }

  return `${createYear} - ${currentYear}`;
};
