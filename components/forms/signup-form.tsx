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
import { signUp } from "@/server/users"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import { z } from "zod"
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  // username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["recruiter", "applicant"]),
  org: z.string().optional(), // Required conditionally in form
}).refine((data) => data.role !== "recruiter" || !!data.org, {
  message: "Organization is required for recruiters",
  path: ["org"],
});

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const signInWithGoogle = async () => {
      await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // username: "",
      email: "",
      password: "",
      role: "applicant",
      org: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // update onSubmit call (remove values.username)
    const { success, message } = await signUp(
      values.email,
      values.password,
      values.role,
      values.org
    );

    if (success) {
      toast.success(message as string);
      router.push("/dashboard")
    } else {
      toast.error(message as string);
    }

    setIsLoading(false);
  }

  const selectedRole = form.watch("role"); // For conditional render

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create your account
        </p>
      </div>
      <div className="grid gap-6">
      {/* <div className="grid gap-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div> */}
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
        <div className="grid gap-3">
          <div className="flex-col items-center">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" required {...field} type="password"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 mt-2">
              <a
                href="/forgot-password"
                className="text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recruiter">Recruiter</SelectItem>
                      <SelectItem value="applicant">Applicant</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* New: Conditional org input */}
        {selectedRole === "recruiter" && (
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="org"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (<Loader2 className="size-4 animate-spin" />) : ("Sign up")}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button type="button" variant="outline" className="w-full" onClick={signInWithGoogle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="mr-2 h-4 w-4"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 256 504 118.5 504 8 393.5 8 256S118.5 8 256 8c68.9 0 126.1 25.3 169.5 66.8l-68.7 66.8C328.6 113.2 294.6 100 256 100c-83.7 0-151.7 68-151.7 152s68 152 151.7 152c72.7 0 133.4-49.7 146.1-116.2H256v-92.6h232c2.3 12.6 3.7 25.5 3.7 39z"
          />
        </svg>
          Sign up with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
    </Form>
  )
}