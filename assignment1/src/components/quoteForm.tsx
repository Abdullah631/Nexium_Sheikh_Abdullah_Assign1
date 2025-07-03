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

export function QuoteForm() {
  const [result, setResult] = useState<typeof quotes>([]);

  const form = useForm<FormValues>({
    defaultValues: { topic: "" }
  });

  const onSubmit = (data: FormValues) => {
    const filtered = quotes
      .filter(q => q.topic.toLowerCase().includes(data.topic.toLowerCase()))
      .slice(0, 3);
    setResult(filtered);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 mt-10">
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
      <QuoteList quotes={result} />
    </div>
  );
}
