export type CompoundFrequency = 1 | 2 | 4 | 12 | 365;

export type CompoundInterestInputs = {
  startingBalance: number;
  monthlyContribution: number;
  annualReturnRate: number;
  years: number;
  compoundsPerYear: CompoundFrequency;
};

export type CompoundInterestResult = {
  futureValue: number;
  halfwayBalance: number;
  totalContributions: number;
  growth: number;
  growthShare: number;
  effectiveAnnualYield: number;
  totalMonths: number;
};

const FREQUENCIES: CompoundFrequency[] = [1, 2, 4, 12, 365];

function nonNegative(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function normalizeInputs(inputs: CompoundInterestInputs) {
  const compoundsPerYear = FREQUENCIES.includes(inputs.compoundsPerYear)
    ? inputs.compoundsPerYear
    : 12;

  return {
    startingBalance: nonNegative(inputs.startingBalance),
    monthlyContribution: nonNegative(inputs.monthlyContribution),
    annualReturnRate: nonNegative(inputs.annualReturnRate),
    years: nonNegative(inputs.years),
    compoundsPerYear,
  };
}

function projectBalance(
  startingBalance: number,
  monthlyContribution: number,
  annualReturnRate: number,
  periods: number,
  compoundsPerYear: number,
): number {
  if (periods <= 0) return startingBalance;

  const periodicRate = annualReturnRate / 100 / compoundsPerYear;
  const contributionPerPeriod = (monthlyContribution * 12) / compoundsPerYear;
  const growthFactor = Math.pow(1 + periodicRate, periods);

  const initialGrowth = startingBalance * growthFactor;
  const contributionGrowth =
    periodicRate === 0
      ? contributionPerPeriod * periods
      : contributionPerPeriod * ((growthFactor - 1) / periodicRate);

  return initialGrowth + contributionGrowth;
}

export type CompoundInterestPoint = {
  year: number;
  balance: number;
  contributions: number;
};

export function calculateCompoundInterest(
  inputs: CompoundInterestInputs,
): CompoundInterestResult {
  const {
    startingBalance,
    monthlyContribution,
    annualReturnRate,
    years,
    compoundsPerYear,
  } = normalizeInputs(inputs);

  const totalPeriods = Math.round(years * compoundsPerYear);
  const halfPeriods = Math.round(totalPeriods / 2);
  const totalMonths = Math.round(years * 12);

  const futureValue = projectBalance(
    startingBalance,
    monthlyContribution,
    annualReturnRate,
    totalPeriods,
    compoundsPerYear,
  );
  const halfwayBalance = projectBalance(
    startingBalance,
    monthlyContribution,
    annualReturnRate,
    halfPeriods,
    compoundsPerYear,
  );

  const totalContributions =
    startingBalance + monthlyContribution * totalMonths;
  const growth = futureValue - totalContributions;
  const effectiveAnnualYield =
    (Math.pow(1 + annualReturnRate / 100 / compoundsPerYear, compoundsPerYear) -
      1) *
    100;

  return {
    futureValue,
    halfwayBalance,
    totalContributions,
    growth,
    growthShare: futureValue > 0 ? (growth / futureValue) * 100 : 0,
    effectiveAnnualYield,
    totalMonths,
  };
}

export function buildCompoundInterestSeries(
  inputs: CompoundInterestInputs,
): CompoundInterestPoint[] {
  const {
    startingBalance,
    monthlyContribution,
    annualReturnRate,
    years,
    compoundsPerYear,
  } = normalizeInputs(inputs);

  const totalYears = Math.round(years);
  const series: CompoundInterestPoint[] = [
    { year: 0, balance: startingBalance, contributions: startingBalance },
  ];

  for (let year = 1; year <= totalYears; year++) {
    series.push({
      year,
      balance: projectBalance(
        startingBalance,
        monthlyContribution,
        annualReturnRate,
        Math.round(year * compoundsPerYear),
        compoundsPerYear,
      ),
      contributions: startingBalance + monthlyContribution * year * 12,
    });
  }

  return series;
}
