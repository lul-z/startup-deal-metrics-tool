import { z } from "zod";

export const dealMetricsSchema = z.object({
  industry: z.string().min(1, "Industry is required"),
  revenue: z.number()
    .min(0, "Revenue must be positive")
    .max(1000000000000, "Revenue seems unrealistically high"),
  ebitda: z.number()
    .max(1000000000000, "EBITDA seems unrealistically high")
    .refine(val => val <= 0 || val > 0, "EBITDA must be a valid number"),
  growthPercentage: z.number()
    .min(-100, "Growth rate cannot be less than -100%")
    .max(1000, "Growth rate cannot exceed 1000%")
    .default(0)
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
  insights?: {
    description: string;
    dueDiligenceChecklist: string[];
  };
};
