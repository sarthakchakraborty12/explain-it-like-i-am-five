'use client';

import {useState, useRef} from 'react';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Slider} from '@/components/ui/slider';
import {explainCodeToFive} from '@/ai/flows/explain-to-five';
import {explainCodeToTen} from '@/ai/flows/explain-to-ten';
import {explainError} from '@/ai/flows/explain-error';
import React from 'react';
const formSchema = z.object({
  code: z.string().min(2, {
    message: 'Code must be at least 2 characters.',
  }),
  language: z.string().optional(),
});

export default function ExplainPage() {
  const [explanation, setExplanation] = useState('');
  const [age, setAge] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false); // Track generating state
  const explanationRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      language: 'javascript',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true); // Start generating
    setExplanation(''); // Clear previous explanation

    // Scroll to explanation section
    explanationRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    try {
      let result;
      if (age <= 9) {
        result = await explainCodeToFive({code: values.code, language: values.language || 'javascript'});
      } else if (age <= 14) {
        result = await explainCodeToTen({code: values.code, language: values.language});
      } else {
        result = await explainError({errorMessage: values.code});
      }
      setExplanation(result?.explanation || 'Failed to explain code.');
    } catch (error) {
      console.error('Error explaining code:', error);
      setExplanation('Failed to explain code due to an internal error.');
    } finally {
      setIsGenerating(false); // Stop generating
    }
  }

  const languages = [
    {value: 'assembly', label: 'Assembly'},
    {value: 'bash', label: 'Bash'},
    {value: 'cpp', label: 'C++'},
    {value: 'csharp', label: 'C#'},
    {value: 'css', label: 'CSS'},
    {value: 'dart', label: 'Dart'},
    {value: 'go', label: 'Go'},
    {value: 'html', label: 'HTML'},
    {value: 'java', label: 'Java'},
    {value: 'javascript', label: 'JavaScript'},
    {value: 'kotlin', label: 'Kotlin'},
    {value: 'lua', label: 'Lua'},
    {value: 'matlab', label: 'MATLAB'},
    {value: 'objectivec', label: 'Objective-C'},
    {value: 'perl', label: 'Perl'},
    {value: 'php', label: 'PHP'},
    {value: 'powershell', label: 'PowerShell'},
    {value: 'python', label: 'Python'},
    {value: 'r', label: 'R'},
    {value: 'ruby', label: 'Ruby'},
    {value: 'rust', label: 'Rust'},
    {value: 'scala', label: 'Scala'},
    {value: 'sql', label: 'SQL'},
    {value: 'swift', label: 'Swift'},
    {value: 'typescript', label: 'TypeScript'},
  ].sort((a, b) => a.label.localeCompare(b.label));

  const isErrorMode = age > 14;

  return (
    <div className="flex flex-col items-center justify-center py-2 font-sans">
      <Card className="w-[90%] max-w-3xl">
        <CardHeader>
          <CardTitle>{isErrorMode ? 'Explain Error' : 'Explain Code'}</CardTitle>
          <CardDescription>
            {isErrorMode
              ? 'Enter the error message you want to understand.'
              : 'Enter the code you want to explain.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your code here" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!isErrorMode && (
                <FormField
                  control={form.control}
                  name="language"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((language) => (
                            <SelectItem key={language.value} value={language.value}>
                              {language.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="w-[90%] max-w-3xl mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Explain to Age</CardTitle>
            <CardDescription>Slide to select the target age for the explanation.</CardDescription>
          </CardHeader>
          <CardContent>
            <Slider
              defaultValue={[10]}
              max={18}
              min={5}
              step={1}
              onValueChange={(value) => setAge(value[0])}
            />
            <p className="mt-2 text-sm text-muted-foreground">Age: {age}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="w-[90%] max-w-3xl mt-8" ref={explanationRef}>
        <CardHeader>
          <CardTitle>Explanation</CardTitle>
          <CardDescription>Here is the explanation.</CardDescription>
        </CardHeader>
        <CardContent>
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <img src="https://www.dropbox.com/scl/fi/5d1debjoi6j3o6frwttx6/Animation.gif?rlkey=i0s2jm0d39rcz2nu52n07mz5w&st=mriwy72h&dl=1" alt="Generating explanation..." />
            </div>
          ) : (
          <p>{explanation || 'Explanation will appear here.'}</p>
           )}
        </CardContent>
      </Card>
    </div>
  );
}

