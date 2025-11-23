"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginSchema) => {
    setLoading(true);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("Login successful! Redirecting…");
      router.push("/");
    } else {
      toast.error("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-2 text-left">
        <Label
          htmlFor="email"
          className="text-sm font-medium text-neutral-900 dark:text-neutral-200"
        >
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="me@example.com"
          {...register("email")}
          className="text-base bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="grid gap-2 text-left">
        <Label
          htmlFor="password"
          className="text-sm font-medium text-neutral-900 dark:text-neutral-200"
        >
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          className="text-base bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Button
          size="lg"
          type="submit"
          className="w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <Button
          size="lg"
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2 font-semibold bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300"
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
      </div>
    </form>
  );
}
