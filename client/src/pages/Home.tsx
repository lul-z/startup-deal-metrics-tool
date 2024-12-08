import { DealMetricsForm } from "@/components/DealMetricsForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { useState } from "react";
import type { CalculationResult } from "@/lib/schemas";
import { Card } from "@/components/ui/card";

export function Home() {
  const [results, setResults] = useState<CalculationResult | null>(null);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Deal Metrics Calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Quick analysis tool for startups and SMEs
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <DealMetricsForm onCalculated={setResults} />
        </Card>

        <Card className="p-6">
          <ResultsDisplay results={results} />
        </Card>
      </div>
    </div>
  );
}
