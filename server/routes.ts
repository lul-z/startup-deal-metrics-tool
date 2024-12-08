import type { Express } from "express";
import { dealMetricsSchema } from "../client/src/lib/schemas";

export function registerRoutes(app: Express) {
  app.post("/api/calculate", async (req, res) => {
    try {
      const data = dealMetricsSchema.parse(req.body);
      
      // Enhanced calculation logic with industry-specific multiples
      let baseRevenueMultiple;
      let baseEbitdaMultiple;
      
      // Set base multiples according to industry
      switch (data.industry.toLowerCase()) {
        case "saas":
          baseRevenueMultiple = 10;
          baseEbitdaMultiple = 15;
          break;
        case "e-commerce":
          baseRevenueMultiple = 3;
          baseEbitdaMultiple = 10;
          break;
        case "manufacturing":
          baseRevenueMultiple = 2;
          baseEbitdaMultiple = 8;
          break;
        case "services":
          baseRevenueMultiple = 2;
          baseEbitdaMultiple = 6;
          break;
        default:
          baseRevenueMultiple = 3;
          baseEbitdaMultiple = 8;
      }
      
      // Adjust multiples based on growth with diminishing returns
      const growthAdjustment = Math.min(data.growthPercentage, 100) / 100; // Cap at 100%
      const revenueMultiple = baseRevenueMultiple * (1 + growthAdjustment * 0.75); // 75% impact
      const ebitdaMultiple = baseEbitdaMultiple * (1 + growthAdjustment * 0.5); // 50% impact
      
      // Calculate suggested valuation
      const revenueValuation = data.revenue * revenueMultiple;
      const ebitdaValuation = data.ebitda * ebitdaMultiple;
      const suggestedValuation = Math.max(revenueValuation, ebitdaValuation);
      
      res.json({
        revenueMultiple,
        ebitdaMultiple,
        suggestedValuation,
        industryBenchmarks: {
          avgRevenueMultiple: baseRevenueMultiple,
          avgEbitdaMultiple: baseEbitdaMultiple,
        },
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid input data" });
    }
  });
}
