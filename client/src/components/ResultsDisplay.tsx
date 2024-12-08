import { type CalculationResult } from "@/lib/schemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ResultsDisplayProps {
  results: CalculationResult | null;
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  if (!results) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Enter your metrics to see the analysis
      </div>
    );
  }

  const formatNumber = (num: number) => 
    new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);

  return (
    <div className="space-y-4">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Analysis Results</CardTitle>
        <CardDescription>Based on your input and industry benchmarks</CardDescription>
      </CardHeader>

      <CardContent className="px-0 pt-0">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Valuation Multiples</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Revenue Multiple</dt>
                  <dd className="text-2xl font-bold">{formatNumber(results.revenueMultiple)}x</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">EBITDA Multiple</dt>
                  <dd className="text-2xl font-bold">{formatNumber(results.ebitdaMultiple)}x</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Industry Benchmarks</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Avg Revenue Multiple</dt>
                  <dd className="text-2xl font-bold">{formatNumber(results.industryBenchmarks.avgRevenueMultiple)}x</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Avg EBITDA Multiple</dt>
                  <dd className="text-2xl font-bold">{formatNumber(results.industryBenchmarks.avgEbitdaMultiple)}x</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Valuation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {formatCurrency(results.suggestedValuation)}
              </div>
            </CardContent>
          </Card>

          {results.insights && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-muted-foreground mb-2">Company Overview</h4>
                  <p className="text-sm">{results.insights.description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground mb-2">Due Diligence Checklist</h4>
                  <ul className="list-disc pl-4 text-sm space-y-1">
                    {results.insights.dueDiligenceChecklist.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </div>
  );
}
