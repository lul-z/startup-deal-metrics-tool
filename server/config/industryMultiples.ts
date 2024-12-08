/**
 * Defines the structure for industry-specific valuation multiples
 * @property ebitdaMultiple - The EBITDA multiple typical for the industry
 * @property revenueMultiple - The revenue multiple typical for the industry
 */
interface IndustryMultiples {
  ebitdaMultiple: number;
  revenueMultiple: number;
}

/**
 * Configuration object type for storing industry-specific multiples
 * Allows dynamic lookup by industry name
 */
interface IndustryConfig {
  [key: string]: IndustryMultiples;
}

/**
 * Pre-defined industry multiples based on market research and industry standards
 * These values are used as base multipliers before growth adjustments
 */
export const industryMultiples: IndustryConfig = {
  "saas": {
    ebitdaMultiple: 5,
    revenueMultiple: 4
  },
  "e-commerce": {
    ebitdaMultiple: 3,
    revenueMultiple: 1.5
  },
  "fmcg": {
    ebitdaMultiple: 2.5,
    revenueMultiple: 1
  },
  "manufacturing": {
    ebitdaMultiple: 3,
    revenueMultiple: 1
  },
  "healthcare": {
    ebitdaMultiple: 6,
    revenueMultiple: 2
  },
  "biotech": {
    ebitdaMultiple: 7,
    revenueMultiple: 3
  },
  "fintech": {
    ebitdaMultiple: 5,
    revenueMultiple: 3
  },
  "consulting": {
    ebitdaMultiple: 4,
    revenueMultiple: 1.5
  },
  "energy": {
    ebitdaMultiple: 4,
    revenueMultiple: 1
  },
  "renewable-energy": {
    ebitdaMultiple: 5,
    revenueMultiple: 2
  },
  "retail": {
    ebitdaMultiple: 3,
    revenueMultiple: 1
  },
  "media": {
    ebitdaMultiple: 4,
    revenueMultiple: 2
  }
};

export const defaultMultiples: IndustryMultiples = {
  ebitdaMultiple: 3,
  revenueMultiple: 1
};

export const getIndustryMultiples = (industry: string): IndustryMultiples => {
  const normalizedIndustry = industry.toLowerCase().trim();
  return industryMultiples[normalizedIndustry] || defaultMultiples;
};
