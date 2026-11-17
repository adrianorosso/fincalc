import Link from "next/link";
import {
  ArrowRightIcon,
  CalculatorIcon,
  ChartNoAxesCombinedIcon,
  CheckIcon,
  CircleCheckIcon,
  Clock3Icon,
  HouseIcon,
  LandmarkIcon,
  PiggyBankIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TrendingUpIcon,
  WalletIcon,
  ZapIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
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
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="flex-1">
      <section
        id="top"
        className="border-b bg-linear-to-b from-muted/50 via-background to-background"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <div className="flex flex-col items-start gap-6">
            <Badge variant="outline">
              <SparklesIcon data-icon="inline-start" />
              Money math, made simple
            </Badge>

            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Big decisions deserve{" "}
              <span className="text-primary">clear numbers.</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Calculate mortgage repayments and compound interest in seconds.
              FinCalc shows you the whole story behind every number — no
              spreadsheets, no guesswork.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#calculators" className={buttonVariants({ size: "lg" })}>
                Explore the calculators
                <ArrowRightIcon data-icon="inline-end" />
              </a>
              <a
                href="#how-it-works"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                See how it works
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckIcon className="size-4 text-primary" />
                Free to use
              </span>
              <span className="flex items-center gap-2">
                <CheckIcon className="size-4 text-primary" />
                No account needed
              </span>
              <span className="flex items-center gap-2">
                <CheckIcon className="size-4 text-primary" />
                Results in an instant
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly repayment snapshot</CardTitle>
                <CardDescription>
                  $320,000 home loan · 6.25% APR · 30 years
                </CardDescription>
                <CardAction>
                  <Badge variant="secondary">
                    <HouseIcon data-icon="inline-start" />
                    Mortgage
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">
                    Estimated principal &amp; interest
                  </span>
                  <span className="text-4xl font-semibold tracking-tight tabular-nums">
                    $1,970
                    <span className="text-base font-normal text-muted-foreground">
                      {" "}
                      / month
                    </span>
                  </span>
                </div>

                <Separator />

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
                    <span className="text-xs text-muted-foreground">
                      Total interest paid
                    </span>
                    <span className="text-lg font-semibold tabular-nums">
                      $389,306
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
                    <span className="text-xs text-muted-foreground">
                      Total amount repaid
                    </span>
                    <span className="text-lg font-semibold tabular-nums">
                      $709,306
                    </span>
                  </div>
                </div>

                <Progress value={45} className="w-full">
                  <ProgressLabel>
                    Principal share of the total repaid
                  </ProgressLabel>
                  <ProgressValue />
                </Progress>
              </CardContent>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardTitle>
                  Your money could be working at the same time
                </CardTitle>
                <CardAction>
                  <Badge variant="outline">
                    <TrendingUpIcon data-icon="inline-start" />
                    7% / yr
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Save $250 a month for 20 years and you could end up with{" "}
                  <span className="font-semibold text-foreground tabular-nums">
                    $130,232
                  </span>{" "}
                  — including{" "}
                  <span className="font-semibold text-foreground tabular-nums">
                    $70,232
                  </span>{" "}
                  of compound growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="calculators" className="scroll-mt-20 py-20 lg:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-4">
            <Badge variant="outline" className="w-fit">
              <CalculatorIcon data-icon="inline-start" />
              Two built-in calculators
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              The two numbers that shape the biggest decisions.
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Whether you are signing a mortgage or growing a savings habit,
              FinCalc turns a wall of figures into an answer you can use.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Mortgage repayments calculator
                </CardTitle>
                <CardDescription>
                  Know exactly what a home will cost each month — and across the
                  full life of the loan.
                </CardDescription>
                <CardAction>
                  <Badge variant="secondary">
                    <HouseIcon data-icon="inline-start" />
                    Buying a home
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <ul className="flex flex-col gap-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>
                      Monthly principal and interest payments you can budget
                      around
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>
                      The full amortization picture, including total interest
                      over the term
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>
                      Factor in taxes, insurance, and PMI for a realistic
                      monthly figure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>
                      Compare loan amounts, rates, and terms in seconds
                    </span>
                  </li>
                </ul>

                <div className="flex flex-col gap-3 rounded-lg border bg-muted/40 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Example scenario
                    </span>
                    <Badge variant="outline">6.25% APR</Badge>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm text-muted-foreground">
                      $350,000 · 30 years
                    </span>
                    <span className="text-xl font-semibold tabular-nums">
                      $2,155 / month
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">
                      Interest paid over the loan
                    </span>
                    <span className="font-medium tabular-nums">$425,804</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between gap-4">
                <span className="text-xs text-muted-foreground">
                  Principal · interest · taxes · insurance
                </span>
                <Link
                  href="/mortgage-repayments-calculator"
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Open calculator
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Compound interest calculator
                </CardTitle>
                <CardDescription>
                  Watch consistent contributions turn into a serious nest egg,
                  one compounding period at a time.
                </CardDescription>
                <CardAction>
                  <Badge variant="secondary">
                    <PiggyBankIcon data-icon="inline-start" />
                    Growing savings
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <ul className="flex flex-col gap-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>
                      Model a starting balance, regular deposits, and any time
                      horizon
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>
                      See how much of your final balance is growth versus the
                      money you put in
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>
                      Adjust the rate and compounding frequency to test
                      different scenarios
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>
                      Understand the long-term cost of waiting to start
                    </span>
                  </li>
                </ul>

                <div className="flex flex-col gap-3 rounded-lg border bg-muted/40 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Example scenario
                    </span>
                    <Badge variant="outline">7% annual return</Badge>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm text-muted-foreground">
                      $250 / month · 20 years
                    </span>
                    <span className="text-xl font-semibold tabular-nums">
                      $130,232
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">
                      Growth from compounding
                    </span>
                    <span className="font-medium tabular-nums">$70,232</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between gap-4">
                <span className="text-xs text-muted-foreground">
                  Contributions · returns · time
                </span>
                <Link
                  href="/compound-interest-calculator"
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Open calculator
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-20 border-y bg-muted/30 py-20 lg:py-28"
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-4 text-center">
            <Badge variant="outline" className="w-fit self-center">
              <Clock3Icon data-icon="inline-start" />
              How it works
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              From question to answer in three steps.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              No onboarding and no finance degree required. Just the inputs you
              already know.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">01</Badge>
                </CardAction>
                <CardTitle>Enter your numbers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Add the loan amount, interest rate, and term — or your
                  starting balance, monthly deposit, and time horizon.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">02</Badge>
                </CardAction>
                <CardTitle>See the full picture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Get your monthly payment or projected balance, plus the
                  breakdown of where every dollar goes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">03</Badge>
                </CardAction>
                <CardTitle>Compare and decide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Change one input at a time and watch the numbers update so you
                  can choose with confidence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="why-fincalc" className="scroll-mt-20 py-20 lg:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-4">
            <Badge variant="outline" className="w-fit">
              <ShieldCheckIcon data-icon="inline-start" />
              Why FinCalc
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Built to make the math feel effortless.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card size="sm">
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">
                    <ZapIcon />
                  </Badge>
                </CardAction>
                <CardTitle>Instant answers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No waiting, no loading, no spreadsheet formulas to remember.
                </p>
              </CardContent>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">
                    <ChartNoAxesCombinedIcon />
                  </Badge>
                </CardAction>
                <CardTitle>The whole story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Totals, interest, and growth — not just a single headline
                  number.
                </p>
              </CardContent>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">
                    <LandmarkIcon />
                  </Badge>
                </CardAction>
                <CardTitle>Explore freely</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Test different rates and timelines before committing to
                  anything.
                </p>
              </CardContent>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">
                    <WalletIcon />
                  </Badge>
                </CardAction>
                <CardTitle>Plain-English results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Clear labels and useful context, without the jargon.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="scroll-mt-20 border-t bg-muted/30 py-20 lg:py-28"
      >
        <div className="mx-auto w-full max-w-3xl px-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Frequently asked questions
              </CardTitle>
              <CardDescription>
                The essentials before you start calculating.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion defaultValue={["faq-1"]}>
                <AccordionItem value="faq-1">
                  <AccordionTrigger>
                    What does the mortgage repayments calculator show?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      It estimates your monthly principal and interest payments,
                      then shows the total interest and total amount you would
                      repay over the life of the loan. You can adjust the loan
                      amount, rate, and term to see how each one changes the
                      outcome.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2">
                  <AccordionTrigger>
                    How does the compound interest calculator work?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      It projects how an initial balance plus regular
                      contributions grows over time as returns earn returns of
                      their own. The result separates the money you contributed
                      from the growth generated by compounding.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3">
                  <AccordionTrigger>
                    Do I need an account to use FinCalc?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      No. Both calculators are free to use without signing up,
                      so you can run the numbers whenever you need to.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-4">
                  <AccordionTrigger>
                    Are these results financial advice?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      No. FinCalc provides estimates to help you understand your
                      options. Actual rates, fees, taxes, and returns will vary,
                      so treat the results as a starting point rather than
                      professional advice.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Card className="items-center text-center">
            <CardHeader className="w-full justify-items-center">
              <Badge variant="secondary" className="w-fit">
                <SparklesIcon data-icon="inline-start" />
                Ready when you are
              </Badge>
              <CardTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Make your next money decision with confidence.
              </CardTitle>
              <CardDescription className="max-w-xl text-base">
                Start with a mortgage repayment estimate, then see what steady
                saving could grow into. It only takes a few seconds.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-3">
              <a href="#calculators" className={buttonVariants({ size: "lg" })}>
                Try the calculators
                <ArrowRightIcon data-icon="inline-end" />
              </a>
              <a
                href="#faq"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Read the FAQ
              </a>
            </CardContent>
            <CardFooter className="w-full justify-center">
              <p className="text-xs text-muted-foreground">
                Clear numbers. Better decisions. No spreadsheets.
              </p>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
}
