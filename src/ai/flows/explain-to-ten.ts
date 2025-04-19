'use server';
/**
 * @fileOverview Explains code snippets in a simplified way for a 10-year-old.
 *
 * - explainCodeToTen - A function that takes code input and returns a simplified explanation.
 * - ExplainCodeToTenInput - The input type for the explainCodeToTen function.
 * - ExplainCodeToTenOutput - The return type for the explainCodeToTen function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ExplainCodeToTenInputSchema = z.object({
  code: z.string().describe('The code snippet to explain.'),
  language: z.string().optional().describe('The programming language of the code.'),
});
export type ExplainCodeToTenInput = z.infer<typeof ExplainCodeToTenInputSchema>;

const ExplainCodeToTenOutputSchema = z.object({
  explanation: z.string().describe('The simplified explanation of the code for a 10-year-old.'),
});
export type ExplainCodeToTenOutput = z.infer<typeof ExplainCodeToTenOutputSchema>;

export async function explainCodeToTen(input: ExplainCodeToTenInput): Promise<ExplainCodeToTenOutput> {
  return explainCodeToTenFlow(input);
}

const identifyKeyPartsTool = ai.defineTool({
  name: 'identifyKeyParts',
  description: 'Identifies the key functional parts of the code snippet.',
  inputSchema: z.object({
    code: z.string().describe('The code snippet to analyze.'),
    language: z.string().optional().describe('The programming language of the code.'),
  }),
  outputSchema: z.array(z.string()).describe('An array of the key parts of the code.'),
},
async input => {
  // In a real implementation, this would involve code analysis or querying a service.
  // For now, return some hardcoded sample data
  return ['function definition', 'loop', 'variable assignment'];
}
);

const prompt = ai.definePrompt({
  name: 'explainCodeToTenPrompt',
  input: {
    schema: z.object({
      code: z.string().describe('The code snippet to explain.'),
      language: z.string().optional().describe('The programming language of the code.'),
      keyParts: z.array(z.string()).describe('The key parts of the code to focus on in the explanation.'),
    }),
  },
  output: {
    schema: z.object({
      explanation: z.string().describe('The simplified explanation of the code for a 10-year-old.'),
    }),
  },
  prompt: `You are an expert at explaining code to 10-year-olds.  Your explanations should be clear, simple, and engaging.

  Here is the code you need to explain:
  \`\`\`{{language}}
  {{{code}}}
  \`\`\`

  Focus your explanation on these key parts: {{#each keyParts}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.
  Explain the code in a way that a 10-year-old can understand.`, // Handlebars template
});

const explainCodeToTenFlow = ai.defineFlow<
  typeof ExplainCodeToTenInputSchema,
  typeof ExplainCodeToTenOutputSchema
>({
  name: 'explainCodeToTenFlow',
  inputSchema: ExplainCodeToTenInputSchema,
  outputSchema: ExplainCodeToTenOutputSchema,
}, async input => {
  const keyParts = await identifyKeyPartsTool(input);
  const {output} = await prompt({...input, keyParts});
  return output!;
});

    

    