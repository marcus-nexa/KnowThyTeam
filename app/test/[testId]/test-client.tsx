"use client";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { submitAnswers } from "@/server/actions";

type Question = { text: string; type: "likert" | "mcq"; options?: string[] };

export default function TestClient({ testId, questions }: { testId: string; questions: Question[] }) {
  const router = useRouter();

  const formSchema = z.object(
    questions.reduce((acc, _q, idx) => {
      acc[`q${idx}`] = z.string().min(1);
      return acc;
    }, {} as Record<string, z.ZodString>)
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { submissionId, isGuest } = await submitAnswers(testId, values);
      if (isGuest) {
        router.push(`/submission/${submissionId}?guest=true`);
      } else {
        toast.success("Submitted!");
        router.push("/applicant-landing");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Personality Test</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {questions.map((q, idx) => (
            <FormField
              key={idx}
              control={form.control}
              name={`q${idx}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{q.text}</FormLabel>
                  <FormControl>
                    {q.type === "likert" ? (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {["1", "2", "3", "4", "5"].map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {q.options?.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}


