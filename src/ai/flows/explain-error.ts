'use server';
/**
 * @fileOverview Explains error messages in a simplified way.
 *
 * - explainError - A function that takes an error message and returns a simplified explanation.
 * - ExplainErrorInput - The input type for the explainError function.
 * - ExplainErrorOutput - The return type for the explainError function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ExplainErrorInputSchema = z.object({
  errorMessage: z.string().describe('The error message to explain.'),
});
export type ExplainErrorInput = z.infer<typeof ExplainErrorInputSchema>;

const ExplainErrorOutputSchema = z.object({
  explanation: z.string().describe('The simplified explanation of the error, what went wrong, and how to fix it.'),
});
export type ExplainErrorOutput = z.infer<typeof ExplainErrorOutputSchema>;

export async function explainError(input: ExplainErrorInput): Promise<ExplainErrorOutput> {
  return explainErrorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainErrorPrompt',
  input: {
    schema: z.object({
      errorMessage: z.string().describe('The error message to explain.'),
    }),
  },
  output: {
    schema: z.object({
      explanation: z.string().describe('The simplified explanation of the error, what went wrong, and how to fix it.'),
    }),
  },
  prompt: `You are an expert at explaining error messages in simple terms. Explain the following error message, what might have caused it, and how to fix it. Be concise and use language suitable for someone with limited technical knowledge.\n\nError Message: {{{errorMessage}}}`,
});

const explainErrorFlow = ai.defineFlow<
  typeof ExplainErrorInputSchema,
  typeof ExplainErrorOutputSchema
>({
  name: 'explainErrorFlow',
  inputSchema: ExplainErrorInputSchema,
  outputSchema: ExplainErrorOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
