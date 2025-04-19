// ExplainCodeToFiveYearOld [GenAI, UI]: Accept code input from the user and display a simplified explanation suitable for a 5-year-old.
'use server';
/**
 * @fileOverview Explains code snippets in a way that a 5-year-old can understand.
 *
 * - explainCodeToFive - A function that handles the code explanation process.
 * - ExplainCodeToFiveInput - The input type for the explainCodeToFive function.
 * - ExplainCodeToFiveOutput - The return type for the explainCodeToFive function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ExplainCodeToFiveInputSchema = z.object({
  code: z.string().describe('The code snippet to explain.'),
  language: z.string().describe('The programming language of the code snippet.'),
});
export type ExplainCodeToFiveInput = z.infer<typeof ExplainCodeToFiveInputSchema>;

const ExplainCodeToFiveOutputSchema = z.object({
  explanation: z.string().describe('A simplified explanation of the code suitable for a 5-year-old.'),
});
export type ExplainCodeToFiveOutput = z.infer<typeof ExplainCodeToFiveOutputSchema>;

export async function explainCodeToFive(input: ExplainCodeToFiveInput): Promise<ExplainCodeToFiveOutput> {
  return explainCodeToFiveFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainCodeToFivePrompt',
  input: {
    schema: z.object({
      code: z.string().describe('The code snippet to explain.'),
      language: z.string().describe('The programming language of the code snippet.'),
    }),
  },
  output: {
    schema: z.object({
      explanation: z.string().describe('A simplified explanation of the code suitable for a 5-year-old.'),
    }),
  },
  prompt: `You are an expert at explaining code to 5-year-olds. Explain the following code snippet in simple terms that a 5-year-old can understand. Use analogies and examples that a 5-year-old would be familiar with.\n\nLanguage: {{{language}}}\nCode: {{{code}}}`,
});

const explainCodeToFiveFlow = ai.defineFlow<
  typeof ExplainCodeToFiveInputSchema,
  typeof ExplainCodeToFiveOutputSchema
>({
  name: 'explainCodeToFiveFlow',
  inputSchema: ExplainCodeToFiveInputSchema,
  outputSchema: ExplainCodeToFiveOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
