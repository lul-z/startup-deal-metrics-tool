/**
 * API Routes Configuration
 * Defines endpoints for deal metrics calculation and industry data
 */

import type { Express } from "express";
import { dealMetricsSchema } from "../client/src/lib/schemas";
import { industryMultiples, getIndustryMultiples } from "./config/industryMultiples";
import { generateCompanyInsights } from "./services/openai";

/**
 * Registers all API routes for the application
 * @param app - Express application instance
 */
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
      
      // Advanced growth adjustment with progressive scaling
      const growthAdjustment = Math.min(Math.max(data.growthPercentage, -100), 1000) / 100;
      let growthMultiplier;
      
      if (growthAdjustment <= 0) {
        // Negative growth reduces multiples more aggressively
        growthMultiplier = 1 + (growthAdjustment * 0.7); // 70% impact for negative growth
      } else if (growthAdjustment <= 0.5) {
        // First 50% growth has full impact
        growthMultiplier = 1 + (growthAdjustment * 0.6);
      } else if (growthAdjustment <= 1) {
        // 50-100% growth has diminishing returns
        growthMultiplier = 1.3 + ((growthAdjustment - 0.5) * 0.4);
      } else {
        // Beyond 100% growth has minimal additional impact
        growthMultiplier = 1.5 + ((growthAdjustment - 1) * 0.1);
      }
      
      const revenueMultiple = baseRevenueMultiple * growthMultiplier;
      const ebitdaMultiple = baseEbitdaMultiple * (1 + (growthAdjustment * 0.4)); // 40% impact on EBITDA
      
      // Calculate suggested valuation using weighted average
      const revenueValuation = data.revenue * revenueMultiple;
      const ebitdaValuation = data.ebitda * ebitdaMultiple;
      
      // Weight EBITDA valuation higher for profitable companies
      const ebitdaMargin = data.ebitda / data.revenue;
      const ebitdaWeight = Math.max(0.6, Math.min(0.8, ebitdaMargin)); // 60-80% weight for EBITDA
      const revenueWeight = 1 - ebitdaWeight;
      
      const suggestedValuation = (ebitdaValuation * ebitdaWeight) + (revenueValuation * revenueWeight);
      
      // Generate company insights using OpenAI
      const insights = await generateCompanyInsights(
        data.industry,
        suggestedValuation,
        data.revenue,
        data.ebitda,
        data.growthPercentage
      );
      
      res.json({
        revenueMultiple,
        ebitdaMultiple,
        suggestedValuation,
        industryBenchmarks: {
          avgRevenueMultiple: baseRevenueMultiple,
          avgEbitdaMultiple: baseEbitdaMultiple,
        },
        insights,
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid input data" });
    }
  });
}
