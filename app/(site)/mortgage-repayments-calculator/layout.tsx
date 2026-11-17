import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Repayments Calculator | FinCalc",
  description:
    "Estimate your full monthly mortgage payment — principal, interest, taxes, insurance, PMI and HOA — and see the total cost over the life of the loan.",
};

export default function MortgageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
