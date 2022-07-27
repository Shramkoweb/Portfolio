const YEAR_OF_CREATE = 2022;

export const getCopyright = () => {
  const currentYear = new Date().getFullYear();

  if (YEAR_OF_CREATE === currentYear) {
    return currentYear.toString();
  }

  return `${YEAR_OF_CREATE} - ${currentYear}`;
};
