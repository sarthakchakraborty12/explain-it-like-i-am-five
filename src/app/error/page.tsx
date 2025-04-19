'use client';

import {useState, useRef} from 'react';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Slider} from '@/components/ui/slider';
import {explainError} from '@/ai/flows/explain-error';
import React from 'react';

const formSchema = z.object({
  errorMessage: z.string().min(2, {
    message: 'Error message must be at least 2 characters.',
  }),
});

export default function Home() {
  const [explanation, setExplanation] = useState('');
    const [isGenerating, setIsGenerating] = useState(false); // Track generating state
    const explanationRef = useRef(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      errorMessage: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsGenerating(true); // Start generating
        setExplanation(''); // Clear previous explanation

    try {
      const result = await explainError({ errorMessage: values.errorMessage });
      setExplanation(result?.explanation || 'Failed to explain error.');
    } catch (error) {
      console.error('Error explaining error:', error);
      setExplanation('Failed to explain error due to an internal error.');
    } finally {
            setIsGenerating(false); // Stop generating
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-2 font-sans">

      <Card className="w-[90%] max-w-3xl">
        <CardHeader>
          <CardTitle>Explain Error</CardTitle>
          <CardDescription>Enter the error message you want to understand.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="errorMessage"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Error Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your error message here" className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please enter the error message you want to be explained.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-[90%] max-w-3xl mt-8" ref={explanationRef}>
        <CardHeader>
          <CardTitle>Explanation</CardTitle>
          <CardDescription>Here is the explanation of the error.</CardDescription>
        </CardHeader>
        <CardContent>
            {isGenerating ? (
            <div className="flex items-center justify-center">
              <img src="https://www.dropbox.com/scl/fi/5d1debjoi6j3o6frwttx6/Animation.gif?rlkey=i0s2jm0d39rcz2nu52n07mz5w&st=mriwy72h&dl=1" alt="Generating explanation..." />
            </div>
          ) : (
          <p>{explanation}</p>
           )}
        </CardContent>
      </Card>
    </div>
  );
}

