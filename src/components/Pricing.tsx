"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Star, Zap, Shield } from "lucide-react";
import NumberFlow from "@number-flow/react";

const plans = [
  {
    id: "free",
    name: "Free",
    icon: Star,
    price: {
      monthly: "Free forever",
      yearly: "Free forever",
    },
    description:
      "Get started with essential tools and daily free credits — perfect for quick conversions.",
    features: [
      "Includes core tools",
      "No AI tools access in this plan",
      "5 credits/day (renews every 24h)",
      "Max file size: 10MB",
      "No cloud storage — instant download only",
      "Basic conversion logs (no cloud history)",
    ],
    cta: "Get started for free",
  },
  {
    id: "plus",
    name: "Plus",
    icon: Zap,
    price: {
      monthly: 4.99,
      yearly: 3.99,
    },
    description:
      "Higher credits and access to AI tools — great for regular creators and professionals.",
    features: [
      "All Free features included",
      "25 credits/day (renews every 24h)",
      "AI tools included",
      "Faster conversion & priority queue",
      "Max file size: 100MB",
      "5GB cloud storage",
      "30-day cloud history",
    ],
    cta: "Upgrade to Plus",
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    icon: Shield,
    price: {
      monthly: 9.99,
      yearly: 7.99,
    },
    description:
      "Unlimited productivity with generous credits, premium AI tools, and cloud storage.",
    features: [
      "All Plus features included",
      "Unlimited basic conversions",
      "100 AI credits/month",
      "Max file size: 500MB",
      "50GB cloud storage",
      "90-day cloud history",
      "Priority support",
      "Early access to new tools",
    ],
    cta: "Subscribe to Pro",
  },
];

export default function Pricing() {
  const [frequency, setFrequency] = useState<"monthly" | "yearly">("monthly");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleCheckout = async (planId: string) => {
    if (planId === "free") {
      window.location.href = "/login";
      return;
    }

    const res = await fetch("/api/billing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ planId, frequency }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error("Failed to create checkout session:", data.error);
    }
  };

  return (
    <>
      <div className="flex justify-center mb-12">
        <Tabs
          defaultValue={frequency}
          onValueChange={(value) => {
            if (value === "monthly" || value === "yearly") {
              setFrequency(value);
            }
          }}
        >
          <TabsList className="bg-white dark:bg-neutral-800 rounded-full p-1 shadow-sm dark:shadow-neutral-700">
            <TabsTrigger
              value="monthly"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-4 py-1 transition dark:data-[state=active]:bg-blue-500"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-4 py-1 transition flex items-center dark:data-[state=active]:bg-blue-500"
            >
              Yearly
              <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs dark:bg-blue-800 dark:text-blue-200">
                20% off
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "flex flex-col justify-between rounded-xl shadow-lg border border-transparent transition transform hover:scale-102 hover:shadow-xl dark:hover:shadow-neutral-700",
              plan.popular
                ? "ring-2 ring-blue-500 dark:ring-blue-400"
                : "bg-white dark:bg-neutral-900 hover:ring-2 hover:ring-blue-200 dark:hover:ring-blue-300"
            )}
          >
            <CardHeader className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-50 dark:bg-blue-800 p-2 rounded-full">
                  <plan.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {plan.name}
                </CardTitle>
              </div>
              <CardDescription className="text-neutral-600 dark:text-neutral-300">
                {plan.description}
              </CardDescription>
              <div className="mt-4">
                {typeof plan.price[frequency] === "number" ? (
                  <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-baseline justify-center">
                    <NumberFlow
                      value={plan.price[frequency] as number}
                      format={{
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 2,
                      }}
                    />
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-1">
                      /month
                    </span>
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 text-center">
                    {plan.price[frequency]}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                onClick={() => handleCheckout(plan.id)}
                className={cn(
                  "w-full mt-4",
                  plan.popular
                    ? "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white"
                    : "bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-blue-50 dark:hover:bg-neutral-700"
                )}
              >
                {plan.cta}
                {plan.id !== "free" && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
