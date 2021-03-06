export function getFinancialJulyPeriods(year) {
  const periods = [];
  for (let i = 0; i <= 10; i++) {
    const useYear = parseInt(year, 10) - i;
    const currentYear = useYear + 1;
    periods.push({
      id: useYear + 'July',
      name: 'July ' + useYear + ' - June ' + currentYear
    });
  }
  return periods.map((period: any) => {
    period.type = 'FinancialJuly';
    return period;
  });
}
