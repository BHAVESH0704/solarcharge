'use server';

/**
 * @fileOverview An AI agent that provides personalized charging recommendations based on user's past charging behavior and current grid conditions.
 *
 * - recommendOptimizedCharging - A function that handles the charging recommendation process.
 * - RecommendOptimizedChargingInput - The input type for the recommendOptimizedCharging function.
 * - RecommendOptimizedChargingOutput - The return type for the recommendOptimizedCharging function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendOptimizedChargingInputSchema = z.object({
  userId: z.string().describe('The ID of the user requesting charging recommendations.'),
  recentChargingSessions: z.string().describe('JSON string containing an array of recent charging sessions for the user, with the station id, start time, end time, and energy consumed for each session.'),
  currentGridConditions: z.string().describe('JSON string containing information about the current grid conditions, including energy prices, availability, and any constraints.'),
});
export type RecommendOptimizedChargingInput = z.infer<typeof RecommendOptimizedChargingInputSchema>;

const RecommendOptimizedChargingOutputSchema = z.object({
  recommendation: z.string().describe('A personalized charging recommendation for the user, including the optimal time to charge, estimated cost, and potential grid impact.'),
  confidenceScore: z.number().describe('A score between 0 and 1 indicating the confidence level of the recommendation.'),
});
export type RecommendOptimizedChargingOutput = z.infer<typeof RecommendOptimizedChargingOutputSchema>;

export async function recommendOptimizedCharging(input: RecommendOptimizedChargingInput): Promise<RecommendOptimizedChargingOutput> {
  return recommendOptimizedChargingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendOptimizedChargingPrompt',
  input: {schema: RecommendOptimizedChargingInputSchema},
  output: {schema: RecommendOptimizedChargingOutputSchema},
  prompt: `You are an expert in providing personalized charging recommendations for electric vehicle users.

  Based on the user's past charging behavior and current grid conditions, provide a personalized charging recommendation.
  Consider the following information:

  User ID: {{{userId}}}
  Recent Charging Sessions: {{{recentChargingSessions}}}
  Current Grid Conditions: {{{currentGridConditions}}}

  Recommendation:
  `, // Removed the direct access of confidenceScore and recommendation, they'll be infered by LLM
});

const recommendOptimizedChargingFlow = ai.defineFlow(
  {
    name: 'recommendOptimizedChargingFlow',
    inputSchema: RecommendOptimizedChargingInputSchema,
    outputSchema: RecommendOptimizedChargingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
