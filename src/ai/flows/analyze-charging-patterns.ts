'use server';

/**
 * @fileOverview Analyzes historical charging data to optimize charging schedules and predict potential grid overload.
 *
 * - analyzeChargingPatterns - A function that handles the analysis of charging patterns.
 * - AnalyzeChargingPatternsInput - The input type for the analyzeChargingPatterns function.
 * - AnalyzeChargingPatternsOutput - The return type for the analyzeChargingPatterns function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeChargingPatternsInputSchema = z.object({
  stationId: z.string().describe('The ID of the charging station.'),
  startDate: z.string().describe('The start date for the analysis (ISO 8601 format).'),
  endDate: z.string().describe('The end date for the analysis (ISO 8601 format).'),
});
export type AnalyzeChargingPatternsInput = z.infer<typeof AnalyzeChargingPatternsInputSchema>;

const AnalyzeChargingPatternsOutputSchema = z.object({
  peakUsageTimes: z.array(z.string()).describe('The times of day with the highest charging demand.'),
  averageChargingDuration: z.number().describe('The average duration of charging sessions (in minutes).'),
  predictedOverloadRisk: z.boolean().describe('Whether there is a high risk of grid overload during peak times.'),
  suggestedChargingSchedule: z.string().describe('A suggested charging schedule to optimize energy distribution and avoid disruptions.'),
});
export type AnalyzeChargingPatternsOutput = z.infer<typeof AnalyzeChargingPatternsOutputSchema>;

export async function analyzeChargingPatterns(input: AnalyzeChargingPatternsInput): Promise<AnalyzeChargingPatternsOutput> {
  return analyzeChargingPatternsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeChargingPatternsPrompt',
  input: {schema: AnalyzeChargingPatternsInputSchema},
  output: {schema: AnalyzeChargingPatternsOutputSchema},
  prompt: `You are an AI assistant specialized in analyzing charging station data to optimize energy distribution.

You will analyze the historical charging data from charging station {{stationId}} between {{startDate}} and {{endDate}}.

Based on this data, identify the peak usage times, average charging duration, predict potential grid overload risk, and suggest an optimized charging schedule.

Output should be in JSON format.
`,
});

const analyzeChargingPatternsFlow = ai.defineFlow(
  {
    name: 'analyzeChargingPatternsFlow',
    inputSchema: AnalyzeChargingPatternsInputSchema,
    outputSchema: AnalyzeChargingPatternsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
