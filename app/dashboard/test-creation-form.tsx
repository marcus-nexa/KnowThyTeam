"use client";

import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  traits: z
    .array(
      z.enum(["extraversion", "agreeableness", "conscientiousness", "neuroticism", "openness"]) 
    )
    .min(1, { message: "Select at least 1 trait" }),
});

type Question = { text: string; type: "likert" | "mcq"; options?: string[] };

export default function TestCreationForm() {
  const [questions, setQuestions] = useState<Question[]>([{ text: "", type: "likert", options: [] }]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      traits: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // basic guard to ensure at least one question with text
      const validQuestions = questions.filter((q) => q.text.trim().length > 0);
      if (validQuestions.length === 0) {
        toast.error("Add at least one question");
        return;
      }
      // Prefer API route to avoid any server action invocation limitations in some environments
      const res = await fetch("/api/tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ traits: values.traits, questions }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create test");
      }
      const { testId } = await res.json();
      toast.success(`Test created! Share link: /test/${testId}`);
      navigator.clipboard.writeText(`${window.location.origin}/test/${testId}`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const addQuestion = () => setQuestions([...questions, { text: "", type: "likert", options: [] }]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="traits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personality Traits to Assess</FormLabel>
              <Select onValueChange={(val) => field.onChange([...(field.value ?? []), val])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select traits" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="extraversion">Extraversion</SelectItem>
                  <SelectItem value="agreeableness">Agreeableness</SelectItem>
                  <SelectItem value="conscientiousness">Conscientiousness</SelectItem>
                  <SelectItem value="neuroticism">Neuroticism</SelectItem>
                  <SelectItem value="openness">Openness</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>Questions</FormLabel>
          {questions.map((q, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <Input placeholder="Question text" onChange={(e) => {
                questions[idx].text = e.target.value;
                setQuestions([...questions]);
              }} />
              <Select onValueChange={(val: "likert" | "mcq") => {
                questions[idx].type = val;
                setQuestions([...questions]);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="likert">Likert (1-5)</SelectItem>
                  <SelectItem value="mcq">MCQ</SelectItem>
                </SelectContent>
              </Select>
              {questions[idx].type === "mcq" && (
                <Input placeholder="Options (comma sep)" onChange={(e) => {
                  questions[idx].options = e.target.value.split(",");
                  setQuestions([...questions]);
                }} />
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addQuestion}>Add Question</Button>
        </div>
        <Button type="submit">Create Test</Button>
      </form>
    </Form>
  );
}


