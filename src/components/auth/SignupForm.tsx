"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

type SignupSchema = z.infer<typeof signupSchema>;

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({ resolver: zodResolver(signupSchema) });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: SignupSchema) => {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.error || "Something went wrong");
      setLoading(false);
      return;
    }

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
      <div className="grid gap-2 text-left">
        <Label
          htmlFor="name"
          className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          {...register("name")}
          className="text-base bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="grid gap-3">
        <Label
          htmlFor="email"
          className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="me@example.com"
          {...register("email")}
          className="text-base bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="grid gap-3">
        <Label
          htmlFor="password"
          className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          className="text-base bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <p className="text-center text-sm text-red-700 font-medium">{error}</p>
      )}

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-medium shadow-md hover:shadow-lg transition"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Sign Up"}
      </Button>

      <div className="relative text-center text-sm text-neutral-500 dark:text-neutral-400 my-6">
        <span className="relative z-10 px-2 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md">
          or continue with
        </span>
        <div className="absolute inset-0 top-1/2 border-t border-gray-200 dark:border-neutral-700 -z-0"></div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2 border-gray-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <img
          src="/Google-icon.svg"
          alt="Google icon"
          className="h-5 w-5"
          aria-hidden="true"
        />
        Continue with Google
      </Button>
    </form>
  );
}
