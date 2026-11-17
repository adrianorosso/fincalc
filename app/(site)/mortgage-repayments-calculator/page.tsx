"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, HouseIcon, RotateCcwIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { calculateMortgage, type MortgageInputs } from "@/lib/mortgage";
import { formatCurrency } from "@/lib/utils";

const DEFAULT_INPUTS: MortgageInputs = {
  homePrice: 350000,
  downPayment: 70000,
  annualInterestRate: 6.25,
  termYears: 30,
  annualPropertyTax: 4200,
  annualHomeInsurance: 1500,
  monthlyHoa: 0,
  annualPmiRate: 0.5,
};

const TERM_OPTIONS = [
  { label: "10 years", value: "10" },
  { label: "15 years", value: "15" },
  { label: "20 years", value: "20" },
  { label: "25 years", value: "25" },
  { label: "30 years", value: "30" },
];

export default function MortgageRepaymentsCalculatorPage() {
  const [inputs, setInputs] = useState<MortgageInputs>(DEFAULT_INPUTS);
  const result = useMemo(() => calculateMortgage(inputs), [inputs]);

  function update(field: keyof MortgageInputs) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputs((current) => ({
        ...current,
        [field]: value === "" ? 0 : Number(value),
      }));
    };
  }

  return (
    <main className="flex-1">
      <section className="border-b bg-linear-to-b from-muted/50 via-background to-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-14 lg:py-20">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            Back to FinCalc
          </Link>

          <Badge variant="outline" className="w-fit">
            <HouseIcon data-icon="inline-start" />
            Mortgage repayments
          </Badge>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Know exactly what your home will cost each month.
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Adjust the price, down payment, rate and term to see your full
            monthly payment — including taxes, insurance, PMI and HOA — plus the
            true cost across the life of the loan.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 px-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your loan details</CardTitle>
              <CardDescription>
                Every change updates the estimate instantly.
              </CardDescription>
              <CardAction>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setInputs(DEFAULT_INPUTS)}
                >
                  <RotateCcwIcon data-icon="inline-start" />
                  Reset
                </Button>
              </CardAction>
            </CardHeader>

            <CardContent className="flex flex-col gap-8">
              <FieldSet>
                <FieldLegend>Loan details</FieldLegend>
                <FieldDescription>
                  The basics of the home and your mortgage.
                </FieldDescription>

                <FieldGroup className="grid gap-5 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="home-price">Home price</FieldLabel>
                    <Input
                      id="home-price"
                      type="number"
                      min={0}
                      step={1000}
                      inputMode="numeric"
                      value={inputs.homePrice}
                      onChange={update("homePrice")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="down-payment">Down payment</FieldLabel>
                    <Input
                      id="down-payment"
                      type="number"
                      min={0}
                      max={inputs.homePrice}
                      step={1000}
                      inputMode="numeric"
                      value={inputs.downPayment}
                      onChange={update("downPayment")}
                    />
                    <FieldDescription>
                      Putting down 20% or more removes PMI.
                    </FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="interest-rate">
                      Interest rate (%)
                    </FieldLabel>
                    <Input
                      id="interest-rate"
                      type="number"
                      min={0}
                      step={0.01}
                      inputMode="decimal"
                      value={inputs.annualInterestRate}
                      onChange={update("annualInterestRate")}
                    />
                    <FieldDescription>
                      Your expected annual rate.
                    </FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="loan-term">Loan term</FieldLabel>
                    <Select
                      value={String(inputs.termYears)}
                      items={TERM_OPTIONS}
                      onValueChange={(value) =>
                        setInputs((current) => ({
                          ...current,
                          termYears: Number(value),
                        }))
                      }
                    >
                      <SelectTrigger id="loan-term" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TERM_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </FieldSet>

              <Separator />

              <FieldSet>
                <FieldLegend>Ongoing ownership costs</FieldLegend>
                <FieldDescription>
                  Optional, but they make the monthly figure realistic.
                </FieldDescription>

                <FieldGroup className="grid gap-5 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="property-tax">
                      Property tax (per year)
                    </FieldLabel>
                    <Input
                      id="property-tax"
                      type="number"
                      min={0}
                      step={100}
                      inputMode="numeric"
                      value={inputs.annualPropertyTax}
                      onChange={update("annualPropertyTax")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="home-insurance">
                      Home insurance (per year)
                    </FieldLabel>
                    <Input
                      id="home-insurance"
                      type="number"
                      min={0}
                      step={100}
                      inputMode="numeric"
                      value={inputs.annualHomeInsurance}
                      onChange={update("annualHomeInsurance")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="hoa-fees">
                      HOA fees (per month)
                    </FieldLabel>
                    <Input
                      id="hoa-fees"
                      type="number"
                      min={0}
                      step={50}
                      inputMode="numeric"
                      value={inputs.monthlyHoa}
                      onChange={update("monthlyHoa")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="pmi-rate">
                      PMI rate (per year)
                    </FieldLabel>
                    <Input
                      id="pmi-rate"
                      type="number"
                      min={0}
                      step={0.01}
                      inputMode="decimal"
                      value={inputs.annualPmiRate}
                      onChange={update("annualPmiRate")}
                    />
                    <FieldDescription>
                      Applied only with less than 20% down.
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </CardContent>

            <CardFooter>
              <p className="text-xs text-muted-foreground">
                Amount financed:{" "}
                <span className="font-medium text-foreground tabular-nums">
                  {formatCurrency(result.loanAmount)}
                </span>
              </p>
            </CardFooter>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estimated monthly payment</CardTitle>
                <CardDescription>
                  Principal, interest and the costs of owning the home.
                </CardDescription>
                <CardAction>
                  <Badge variant="secondary">Live estimate</Badge>
                </CardAction>
              </CardHeader>

              <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">
                    Total each month
                  </span>
                  <span className="text-4xl font-semibold tracking-tight tabular-nums">
                    {formatCurrency(result.monthlyTotal)}
                    <span className="text-base font-normal text-muted-foreground">
                      {" "}
                      / month
                    </span>
                  </span>
                </div>

                <Separator />

                <dl className="flex flex-col gap-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">
                      Principal &amp; interest
                    </dt>
                    <dd className="font-medium tabular-nums">
                      {formatCurrency(result.monthlyPrincipalAndInterest, 2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Property tax</dt>
                    <dd className="font-medium tabular-nums">
                      {formatCurrency(result.monthlyPropertyTax, 2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Home insurance</dt>
                    <dd className="font-medium tabular-nums">
                      {formatCurrency(result.monthlyHomeInsurance, 2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">
                      PMI
                      {!result.pmiRequired && " (not applicable)"}
                    </dt>
                    <dd className="font-medium tabular-nums">
                      {formatCurrency(result.monthlyPmi, 2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">HOA fees</dt>
                    <dd className="font-medium tabular-nums">
                      {formatCurrency(result.monthlyHoa, 2)}
                    </dd>
                  </div>
                </dl>

                <Separator />

                <Progress
                  value={Math.min(100, Math.max(0, result.principalShare))}
                  className="w-full"
                >
                  <ProgressLabel>
                    Principal share of everything you will pay
                  </ProgressLabel>
                  <ProgressValue />
                </Progress>
              </CardContent>

              <CardFooter>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {result.pmiRequired
                    ? "PMI is included because your down payment is below 20% of the home price."
                    : "No PMI included — your down payment is at least 20% of the home price."}
                </p>
              </CardFooter>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  Across the full {Math.round(result.totalMonths / 12)}-year
                  term
                </CardTitle>
                <CardDescription>
                  What the loan costs from first payment to last.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
                  <span className="text-xs text-muted-foreground">
                    Total interest paid
                  </span>
                  <span className="text-lg font-semibold tabular-nums">
                    {formatCurrency(result.totalInterest)}
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
                  <span className="text-xs text-muted-foreground">
                    Total amount repaid
                  </span>
                  <span className="text-lg font-semibold tabular-nums">
                    {formatCurrency(result.totalRepaid)}
                  </span>
                </div>
              </CardContent>

              <CardFooter>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  An estimate only. Lenders may include different fees, rates
                  and escrow amounts in your actual payment.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
