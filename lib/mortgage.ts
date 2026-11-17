export type MortgageInputs = {
  homePrice: number;
  downPayment: number;
  annualInterestRate: number;
  termYears: number;
  annualPropertyTax: number;
  annualHomeInsurance: number;
  monthlyHoa: number;
  annualPmiRate: number;
};

export type MortgageResult = {
  loanAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyPmi: number;
  monthlyHoa: number;
  monthlyTotal: number;
  totalInterest: number;
  totalRepaid: number;
  totalMonths: number;
  principalShare: number;
  pmiRequired: boolean;
};

function nonNegative(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResult {
  const homePrice = nonNegative(inputs.homePrice);
  const downPayment = Math.min(nonNegative(inputs.downPayment), homePrice);
  const loanAmount = homePrice - downPayment;
  const totalMonths = Math.round(nonNegative(inputs.termYears) * 12);

  const monthlyRate = nonNegative(inputs.annualInterestRate) / 100 / 12;
  const monthlyPrincipalAndInterest =
    loanAmount === 0 || totalMonths === 0
      ? 0
      : monthlyRate === 0
        ? loanAmount / totalMonths
        : (loanAmount * monthlyRate) /
          (1 - Math.pow(1 + monthlyRate, -totalMonths));

  const pmiRequired = homePrice > 0 && downPayment / homePrice < 0.2;

  const monthlyPropertyTax = nonNegative(inputs.annualPropertyTax) / 12;
  const monthlyHomeInsurance = nonNegative(inputs.annualHomeInsurance) / 12;
  const monthlyPmi = pmiRequired
    ? (loanAmount * nonNegative(inputs.annualPmiRate)) / 100 / 12
    : 0;
  const monthlyHoa = nonNegative(inputs.monthlyHoa);

  const monthlyTotal =
    monthlyPrincipalAndInterest +
    monthlyPropertyTax +
    monthlyHomeInsurance +
    monthlyPmi +
    monthlyHoa;

  const totalPrincipalAndInterest = monthlyPrincipalAndInterest * totalMonths;
  const totalInterest = Math.max(0, totalPrincipalAndInterest - loanAmount);
  const totalRepaid =
    totalPrincipalAndInterest +
    (monthlyPropertyTax + monthlyHomeInsurance + monthlyPmi + monthlyHoa) *
      totalMonths;

  return {
    loanAmount,
    monthlyPrincipalAndInterest,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyPmi,
    monthlyHoa,
    monthlyTotal,
    totalInterest,
    totalRepaid,
    totalMonths,
    principalShare: totalRepaid > 0 ? (loanAmount / totalRepaid) * 100 : 0,
    pmiRequired,
  };
}
