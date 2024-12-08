import { Link } from "wouter";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Deal Analytics
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">
              Deal Metrics
            </Link>
            <Link href="/due-diligence" className="transition-colors hover:text-foreground/80 text-muted-foreground">
              Due Diligence
            </Link>
            <Link href="/termsheet" className="transition-colors hover:text-foreground/80 text-muted-foreground">
              Termsheet Checker
            </Link>
            <Link href="/valuation" className="transition-colors hover:text-foreground/80 text-muted-foreground">
              Valuation Tools
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
