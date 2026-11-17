import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compound Interest Calculator | FinCalc",
  description:
    "See how a starting balance and regular monthly contributions grow over time, with a full breakdown of your contributions and compound growth.",
};

export default function CompoundInterestCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
