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
      "Includes core tools: convert, compress, merge, split",
      "No AI tools access in this plan",
      "5 credits/day (renews every 24h)",
      "Max file size: 10MB",
      "No storage — instant download only",
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
      "30-day cloud history",
      "Email support",
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
      "Cloud storage with 90-day retention",
      "Team sharing & advanced analytics",
      "Priority support & early access to new tools",
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

  const handleCheckout = async () => {
    const res = await fetch("/api/billing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
          <TabsList className="bg-white rounded-full p-1 shadow-sm">
            <TabsTrigger
              value="monthly"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-4 py-1 transition"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-4 py-1 transition flex items-center"
            >
              Yearly
              <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">
                20% off
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "flex flex-col justify-between rounded-xl shadow-lg border border-transparent hover:shadow-xl transition",
              plan.popular
                ? "ring-2 ring-blue-500"
                : "bg-white  hover:scale-102 hover:ring-2 hover:ring-blue-200"
            )}
          >
            <CardHeader className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-50 p-2 rounded-full">
                  <plan.icon className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
              </div>
              <CardDescription className="text-gray-600">
                {plan.description}
              </CardDescription>
              <div className="mt-4">
                {typeof plan.price[frequency] === "number" ? (
                  <div className="text-2xl font-bold text-gray-900 flex items-baseline justify-center">
                    <NumberFlow
                      value={plan.price[frequency] as number}
                      format={{
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 2,
                      }}
                    />
                    <span className="text-sm text-gray-500 ml-1">/month</span>
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-gray-900 text-center">
                    {plan.price[frequency]}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2 text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                onClick={handleCheckout}
                className={cn(
                  "w-full mt-4",
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-white border border-gray-300 text-gray-800 hover:bg-blue-50"
                )}
              >
                {plan.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
