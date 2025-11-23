"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

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

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignupSchema) => {
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      toast.error(err.error || "Something went wrong");
      setLoading(false);
      return;
    }

    toast.success("Account created! Redirecting…");
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

      <Button
        size="lg"
        type="submit"
        className="w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
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
        size="lg"
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center font-semibold bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300"
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
