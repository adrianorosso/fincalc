"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ChartNoAxesCombinedIcon,
  PiggyBankIcon,
  RotateCcwIcon,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
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
import {
  buildCompoundInterestSeries,
  calculateCompoundInterest,
  type CompoundFrequency,
  type CompoundInterestInputs,
} from "@/lib/compound-interest";
import { formatCurrency } from "@/lib/utils";

const DEFAULT_INPUTS: CompoundInterestInputs = {
  startingBalance: 0,
  monthlyContribution: 250,
  annualReturnRate: 7,
  years: 20,
  compoundsPerYear: 12,
};

const TERM_OPTIONS = [
  { label: "5 years", value: "5" },
  { label: "10 years", value: "10" },
  { label: "15 years", value: "15" },
  { label: "20 years", value: "20" },
  { label: "25 years", value: "25" },
  { label: "30 years", value: "30" },
  { label: "40 years", value: "40" },
];

const FREQUENCY_OPTIONS = [
  { label: "Annually", value: "1" },
  { label: "Semi-annually", value: "2" },
  { label: "Quarterly", value: "4" },
  { label: "Monthly", value: "12" },
  { label: "Daily", value: "365" },
];

const chartConfig = {
  balance: {
    label: "Projected balance",
    color: "var(--chart-1)",
  },
  contributions: {
    label: "Your contributions",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function CompoundInterestCalculatorPage() {
  const [inputs, setInputs] = useState<CompoundInterestInputs>(DEFAULT_INPUTS);
  const result = useMemo(() => calculateCompoundInterest(inputs), [inputs]);
  const series = useMemo(() => buildCompoundInterestSeries(inputs), [inputs]);

  function update(
    field: "startingBalance" | "monthlyContribution" | "annualReturnRate",
  ) {
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
            <PiggyBankIcon data-icon="inline-start" />
            Compound interest
          </Badge>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            See what steady saving could grow into.
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Start with a balance, add a monthly contribution and choose an
            expected return. Then watch compounding turn time into real growth —
            and test how the outcome changes when you adjust the plan.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 px-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your savings plan</CardTitle>
              <CardDescription>
                Every change updates the projection instantly.
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
                <FieldLegend>Your contributions</FieldLegend>
                <FieldDescription>
                  What you start with and what you add each month.
                </FieldDescription>

                <FieldGroup className="grid gap-5 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="starting-balance">
                      Starting balance
                    </FieldLabel>
                    <Input
                      id="starting-balance"
                      type="number"
                      min={0}
                      step={1000}
                      inputMode="numeric"
                      value={inputs.startingBalance}
                      onChange={update("startingBalance")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="monthly-contribution">
                      Monthly contribution
                    </FieldLabel>
                    <Input
                      id="monthly-contribution"
                      type="number"
                      min={0}
                      step={50}
                      inputMode="numeric"
                      value={inputs.monthlyContribution}
                      onChange={update("monthlyContribution")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="annual-return">
                      Expected annual return (%)
                    </FieldLabel>
                    <Input
                      id="annual-return"
                      type="number"
                      min={0}
                      step={0.1}
                      inputMode="decimal"
                      value={inputs.annualReturnRate}
                      onChange={update("annualReturnRate")}
                    />
                    <FieldDescription>
                      A steady average, not a guarantee.
                    </FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="time-horizon">Time horizon</FieldLabel>
                    <Select
                      value={String(inputs.years)}
                      items={TERM_OPTIONS}
                      onValueChange={(value) =>
                        setInputs((current) => ({
                          ...current,
                          years: Number(value),
                        }))
                      }
                    >
                      <SelectTrigger id="time-horizon" className="w-full">
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
                <FieldLegend>Compounding</FieldLegend>
                <FieldDescription>
                  How often your returns are added to the balance.
                </FieldDescription>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="compound-frequency">
                      Compound frequency
                    </FieldLabel>
                    <Select
                      value={String(inputs.compoundsPerYear)}
                      items={FREQUENCY_OPTIONS}
                      onValueChange={(value) =>
                        setInputs((current) => ({
                          ...current,
                          compoundsPerYear: Number(value) as CompoundFrequency,
                        }))
                      }
                    >
                      <SelectTrigger id="compound-frequency" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FREQUENCY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </CardContent>

            <CardFooter>
              <p className="text-xs text-muted-foreground">
                Total you put in:{" "}
                <span className="font-medium text-foreground tabular-nums">
                  {formatCurrency(result.totalContributions)}
                </span>{" "}
                over {Math.round(result.totalMonths / 12)} years.
              </p>
            </CardFooter>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Projected balance</CardTitle>
                <CardDescription>
                  What your plan could be worth by the end of the term.
                </CardDescription>
                <CardAction>
                  <Badge variant="secondary">Live estimate</Badge>
                </CardAction>
              </CardHeader>

              <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">
                    Estimated future value
                  </span>
                  <span className="text-4xl font-semibold tracking-tight tabular-nums">
                    {formatCurrency(result.futureValue)}
                    <span className="text-base font-normal text-muted-foreground">
                      {" "}
                      after {Math.round(result.totalMonths / 12)} years
                    </span>
                  </span>
                </div>

                <Separator />

                <dl className="flex flex-col gap-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">
                      Your contributions
                    </dt>
                    <dd className="font-medium tabular-nums">
                      {formatCurrency(result.totalContributions)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">
                      Growth from compounding
                    </dt>
                    <dd className="font-medium tabular-nums">
                      {formatCurrency(result.growth)}
                    </dd>
                  </div>
                </dl>

                <Separator />

                <Progress
                  value={Math.min(100, Math.max(0, result.growthShare))}
                  className="w-full"
                >
                  <ProgressLabel>
                    Compound growth as a share of the final balance
                  </ProgressLabel>
                  <ProgressValue />
                </Progress>
              </CardContent>

              <CardFooter>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Assumes a steady return and contributions made at the end of
                  each compounding period.
                </p>
              </CardFooter>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-lg">A little more context</CardTitle>
                <CardDescription>
                  Two more ways to read the same projection.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
                  <span className="text-xs text-muted-foreground">
                    Balance at the halfway point
                  </span>
                  <span className="text-lg font-semibold tabular-nums">
                    {formatCurrency(result.halfwayBalance)}
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
                  <span className="text-xs text-muted-foreground">
                    Effective annual yield
                  </span>
                  <span className="text-lg font-semibold tabular-nums">
                    {result.effectiveAnnualYield.toFixed(2)}%
                  </span>
                </div>
              </CardContent>

              <CardFooter>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  An estimate only. Real returns vary and can be negative.
                </p>
              </CardFooter>
            </Card>
          </div>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>How your balance grows</CardTitle>
              <CardDescription>
                What you put in versus what compounding builds over{" "}
                {Math.round(result.totalMonths / 12)} years.
              </CardDescription>
              <CardAction>
                <Badge variant="outline">
                  <ChartNoAxesCombinedIcon data-icon="inline-start" />
                  Year by year
                </Badge>
              </CardAction>
            </CardHeader>

            <CardContent>
              <ChartContainer config={chartConfig} className="h-[320px] w-full">
                <AreaChart
                  accessibilityLayer
                  data={series}
                  margin={{ top: 12, right: 12, left: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="year"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={24}
                    tickFormatter={(value) => `Yr ${value}`}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={72}
                    tickFormatter={(value) => formatCurrency(Number(value))}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="line"
                        labelFormatter={(value) => `Year ${value}`}
                        formatter={(value, name) => (
                          <div className="flex w-full items-center justify-between gap-4">
                            <span className="text-muted-foreground">
                              {name}
                            </span>
                            <span className="font-mono font-medium text-foreground tabular-nums">
                              {formatCurrency(Number(value))}
                            </span>
                          </div>
                        )}
                      />
                    }
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area
                    name="Projected balance"
                    dataKey="balance"
                    type="monotone"
                    stroke="var(--color-balance)"
                    fill="var(--color-balance)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Area
                    name="Your contributions"
                    dataKey="contributions"
                    type="monotone"
                    stroke="var(--color-contributions)"
                    fill="var(--color-contributions)"
                    fillOpacity={0.05}
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>

            <CardFooter>
              <p className="text-xs leading-relaxed text-muted-foreground">
                The gap between the two lines is the growth from compounding.
              </p>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
}
