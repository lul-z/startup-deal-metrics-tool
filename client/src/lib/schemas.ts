import { z } from "zod";

export const dealMetricsSchema = z.object({
  industry: z.string().min(1, "Industry is required"),
  revenue: z.number().min(0, "Revenue must be positive"),
  ebitda: z.number(),
  growthPercentage: z.number().min(-100).max(1000)
});

export type DealMetrics = z.infer<typeof dealMetricsSchema>;

export type CalculationResult = {
  revenueMultiple: number;
  ebitdaMultiple: number;
  suggestedValuation: number;
  industryBenchmarks: {
    avgRevenueMultiple: number;
    avgEbitdaMultiple: number;
  };
};
