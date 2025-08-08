'use server';

/**
 * @fileOverview Predicts when a 'read' receipt is likely to be expected based on conversation history.
 *
 * - predictReadReceipt - A function that handles the read receipt prediction process.
 * - PredictReadReceiptInput - The input type for the predictReadReceipt function.
 * - PredictReadReceiptOutput - The return type for the predictReadReceipt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictReadReceiptInputSchema = z.object({
  conversationHistory: z
    .string()
    .describe('The conversation history between the user and the contact.'),
});
export type PredictReadReceiptInput = z.infer<typeof PredictReadReceiptInputSchema>;

const PredictReadReceiptOutputSchema = z.object({
  expectedReadReceiptTime: z
    .string()
    .describe(
      'A prediction of when the user is likely to expect a read receipt, in ISO 8601 format.'
    ),
  reasoning: z
    .string()
    .describe('The reasoning behind the predicted read receipt time.'),
});
export type PredictReadReceiptOutput = z.infer<typeof PredictReadReceiptOutputSchema>;

export async function predictReadReceipt(input: PredictReadReceiptInput): Promise<PredictReadReceiptOutput> {
  return predictReadReceiptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictReadReceiptPrompt',
  input: {schema: PredictReadReceiptInputSchema},
  output: {schema: PredictReadReceiptOutputSchema},
  prompt: `You are an AI assistant that analyzes conversation history to predict when a user is likely to expect a read receipt.\n
Analyze the following conversation history and provide a prediction of when the user is likely to expect a read receipt. Provide your prediction in ISO 8601 format and explain your reasoning.\n
Conversation History:\n{{{conversationHistory}}}\n
Prediction:\n`,
});

const predictReadReceiptFlow = ai.defineFlow(
  {
    name: 'predictReadReceiptFlow',
    inputSchema: PredictReadReceiptInputSchema,
    outputSchema: PredictReadReceiptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
