import OpenAI from 'openai';
import { z } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface GeneratedContent {
  description: string;
  dueDiligenceChecklist: string[];
}

const responseSchema = z.object({
  description: z.string(),
  dueDiligenceChecklist: z.array(z.string()),
});

export async function generateCompanyInsights(
  industry: string,
  valuation: number,
  revenue: number,
  ebitda: number,
  growthPercentage: number
): Promise<GeneratedContent> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a financial analyst specializing in company valuations and due diligence."
        },
        {
          role: "user",
          content: `Generate a JSON response with a company description and due diligence checklist for a company with the following details:
          - Industry: ${industry}
          - Estimated Enterprise Value: €${valuation.toLocaleString()}
          - Annual Revenue: €${revenue.toLocaleString()}
          - EBITDA: €${ebitda.toLocaleString()}
          - Growth Rate: ${growthPercentage}%

          Format the response as:
          {
            "description": "A concise 2-3 sentence description of the company's valuation context",
            "dueDiligenceChecklist": ["5 key due diligence points"]
          }`
        }
      ],
      response_format: { type: "json_object" },
    });

    const response = JSON.parse(completion.choices[0].message.content);
    return responseSchema.parse(response);
  } catch (error) {
    console.error('Error generating company insights:', error);
    return {
      description: "Unable to generate company description at this time.",
      dueDiligenceChecklist: [
        "Review financial statements",
        "Analyze market position",
        "Evaluate growth metrics",
        "Assess operational efficiency",
        "Review legal and regulatory compliance"
      ]
    };
  }
}
