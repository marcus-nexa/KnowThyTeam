"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";



import { z } from "zod"
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
 
const formSchema = z.object({
  email: z.string().email(),
})

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isLoading, setIsLoading] = useState(false);
  

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const { error } = await authClient.forgetPassword({
        email: values.email,
        redirectTo: "/reset-password",
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset email sent");
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot your password?</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to reset your password
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (<Loader2 className="size-4 animate-spin" />) : ("Reset Password")}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
    </Form>
  )
}
