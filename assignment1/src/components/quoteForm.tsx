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

interface FormValues {
  topic: string;
}

const categories = ["Success", "Courage", "Motivation", "Bravery", "Love", "Romance", "Sad","Nature","Leadership","Inspirational"];

export function QuoteForm() {
  const [result, setResult] = useState<typeof quotes>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: { topic: "" }
  });

  const onSubmit = (data: FormValues) => {
    const filtered = quotes
      .filter(q => q.topic.toLowerCase().includes(data.topic.toLowerCase()))
      .slice(0, 3);
    setResult(filtered);
    setHasSubmitted(true);
  };

  const handleCategoryClick = (category: string) => {
    form.setValue("topic", category);
    onSubmit({ topic: category });
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 mt-10">
      {/*Buttons For Quick Quotes*/}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <Button
            key={cat}
            type="button"
            variant="outline"
            onClick={() => handleCategoryClick(cat)}
            className="capitalize"
          >
            {cat}
          </Button>
        ))}
      </div>
      {/*Form For Inputting type of Qoutes*/}
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
          <Button type="submit">Get Quotes</Button>
        </form>
      </Form>
      {/* Display of Qoutes */}
      <QuoteList quotes={result} hasSubmitted={hasSubmitted} />
    </div>
  );
}
export default QuoteForm;