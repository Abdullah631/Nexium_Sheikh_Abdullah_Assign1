'use client';

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuoteList } from "./quoteList";
import { useState } from "react";
import { quotes } from "@/data/quotes";
import { Loader2 } from "lucide-react"; // Add a spinner icon (requires lucide-react)

interface FormValues {
  topic: string;
}

const categories = ["Success", "Courage", "Motivation", "Bravery", "Love", "Romance", "Sad", "Nature", "Leadership", "Inspirational"];

export function QuoteForm() {
  const [result, setResult] = useState<typeof quotes>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: { topic: "" }
  });

  const showQuotes = (topic: string) => {
    setHasSubmitted(false);
    setLoading(true);
    setResult([]);

    // Simulate a delay to show loader
    setTimeout(() => {
      const filtered = quotes
        .filter(q => q.topic.toLowerCase().includes(topic.toLowerCase()))
        .slice(0, 3);
      setResult(filtered);
      setHasSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  const onSubmit = (data: FormValues) => {
    showQuotes(data.topic);
  };

  const handleCategoryClick = (category: string) => {
    form.setValue("topic", category);
    showQuotes(category);
  };

  return (
    <div className="min-h-screen rounded-2xl bg-gradient-to-br from-purple-200 to-blue-100 flex flex-col items-center justify-start py-12 px-4">
      <div className="bg-sky-950 shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Find a Quote</h2>

        {/* Quick Category Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-lg transition btn btn-soft btn-primary"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter a Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. success, courage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Generate Quotes
            </Button>
          </form>
        </Form>
      </div>

      {/* Results Section */}
      <div className="mt-10 w-full max-w-2xl">
        {loading && (
          <div className="flex justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            <span className="ml-2 text-blue-500 font-semibold">Fetching quotes...</span>
          </div>
        )}
        {!loading && <QuoteList quotes={result} hasSubmitted={hasSubmitted} />}
      </div>
    </div>
  );
}

export default QuoteForm;
