import type { Express } from "express";
import { dealMetricsSchema } from "../client/src/lib/schemas";

export function registerRoutes(app: Express) {
  app.post("/api/calculate", async (req, res) => {
    try {
      const data = dealMetricsSchema.parse(req.body);
      
      // Simple calculation logic - in a real app, this would be more sophisticated
      const baseRevenueMultiple = data.industry.toLowerCase() === "saas" ? 10 : 5;
      const baseEbitdaMultiple = data.industry.toLowerCase() === "saas" ? 15 : 8;
      
      // Adjust multiples based on growth
      const growthAdjustment = data.growthPercentage / 100;
      const revenueMultiple = baseRevenueMultiple * (1 + growthAdjustment);
      const ebitdaMultiple = baseEbitdaMultiple * (1 + growthAdjustment);
      
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
