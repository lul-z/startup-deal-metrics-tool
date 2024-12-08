import type { Express } from "express";
import { dealMetricsSchema } from "../client/src/lib/schemas";
import { industryMultiples, getIndustryMultiples } from "./config/industryMultiples";

export function registerRoutes(app: Express) {
  app.get("/api/industries", (req, res) => {
    res.json(Object.keys(industryMultiples));
  });

  app.post("/api/calculate", async (req, res) => {
    try {
      const data = dealMetricsSchema.parse(req.body);
      
      // Get base multiples from configuration
      const { ebitdaMultiple: baseEbitdaMultiple, revenueMultiple: baseRevenueMultiple } = 
        getIndustryMultiples(data.industry);
      
      // Adjust multiples based on growth with diminishing returns
      const growthAdjustment = Math.min(data.growthPercentage, 100) / 100; // Cap at 100%
      const revenueMultiple = baseRevenueMultiple * (1 + growthAdjustment * 0.5); // 50% impact
      const ebitdaMultiple = baseEbitdaMultiple * (1 + growthAdjustment * 0.3); // 30% impact
      
      // Calculate suggested valuation using weighted average
      const revenueValuation = data.revenue * revenueMultiple;
      const ebitdaValuation = data.ebitda * ebitdaMultiple;
      
      // Weight EBITDA valuation higher for profitable companies
      const ebitdaMargin = data.ebitda / data.revenue;
      const ebitdaWeight = Math.max(0.6, Math.min(0.8, ebitdaMargin)); // 60-80% weight for EBITDA
      const revenueWeight = 1 - ebitdaWeight;
      
      const suggestedValuation = (ebitdaValuation * ebitdaWeight) + (revenueValuation * revenueWeight);
      
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
