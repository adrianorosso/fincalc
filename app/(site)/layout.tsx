import Link from "next/link";
import { ArrowUpRightIcon, CalculatorIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="FinCalc home"
          >
            <Badge variant="secondary" className="size-8 justify-center p-0">
              <CalculatorIcon />
            </Badge>
            <span className="text-base font-semibold tracking-tight">
              FinCalc
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 md:flex"
          >
            <Link
              href="/#calculators"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Calculators
            </Link>
            <Link
              href="/mortgage-repayments-calculator"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Mortgage calculator
            </Link>
            <Link
              href="/#how-it-works"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              How it works
            </Link>
            <Link
              href="/#why-fincalc"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Why FinCalc
            </Link>
            <Link
              href="/#faq"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              FAQ
            </Link>
          </nav>

          <Link href="/#calculators" className={buttonVariants({ size: "sm" })}>
            Get started
            <ArrowUpRightIcon data-icon="inline-end" />
          </Link>
        </div>
      </header>

      {children}

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Badge variant="secondary" className="size-8 justify-center p-0">
              <CalculatorIcon />
            </Badge>
            <span className="text-sm font-semibold">FinCalc</span>
          </Link>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            <Link
              href="/#calculators"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Calculators
            </Link>
            <Link
              href="/mortgage-repayments-calculator"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Mortgage calculator
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              How it works
            </Link>
            <Link
              href="/#why-fincalc"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Why FinCalc
            </Link>
            <Link
              href="/#faq"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              FAQ
            </Link>
          </nav>

          <p className="text-xs text-muted-foreground">
            © 2026 FinCalc. Built for clearer money decisions.
          </p>
        </div>
      </footer>
    </div>
  );
}
