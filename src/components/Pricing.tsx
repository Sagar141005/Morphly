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
      "A simple way to convert your files instantly — no strings attached.",
    features: [
      "Convert between popular formats (PNG → JPG, JPG → PDF, etc.)",
      "No file storage — instant download only",
      "Limit: 5 conversions/day, max 5MB per file",
      "Conversion logs available (no download history)",
    ],
    cta: "Get started for free",
  },
  {
    id: "pro",
    name: "Pro",
    icon: Zap,
    price: {
      monthly: 19,
      yearly: 10,
    },
    description:
      "Upgrade for powerful tools, cloud access, and unlimited conversions.",
    features: [
      "All Free features included",
      "AI Background Removal",
      "Cloud-based file storage with 30-day retention",
      "View your conversion history anytime",
      "Limit: Unlimited conversions, up to 50MB per file",
    ],
    cta: "Subscribe to Pro",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Shield,
    price: {
      monthly: "Contact us for pricing",
      yearly: "Contact us for pricing",
    },
    description: "Built for teams, automation, and high-volume file workflows.",
    features: [
      "Everything in Pro",
      "Team access with role-based controls",
      "Advanced analytics & usage insights",
      "API access for automated file processing",
      "Priority support with custom onboarding",
    ],
    cta: "Contact Sales",
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
      {/* Pricing Toggle */}
      <div className="flex justify-center mb-8">
        <Tabs
          defaultValue={frequency}
          onValueChange={(value) => {
            if (value === "monthly" || value === "yearly") {
              setFrequency(value);
            }
          }}
        >
          <TabsList className="bg-gray-100 rounded-full p-1">
            <TabsTrigger
              value="monthly"
              className="data-[state=active]:bg-white rounded-full px-4 py-1 transition"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              className="data-[state=active]:bg-white rounded-full px-4 py-1 transition flex items-center"
            >
              Yearly
              <Badge className="ml-2 bg-gray-200 text-xs text-gray-800">
                20% off
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "border border-gray-200 shadow-sm flex flex-col justify-between",
              plan.popular && "border-black"
            )}
          >
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-gray-100 p-2 rounded-full">
                  <plan.icon className="h-4 w-4 text-gray-800" />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
              </div>
              <CardDescription className="text-sm text-gray-600">
                {plan.description}
              </CardDescription>
              <div className="mt-4">
                {typeof plan.price[frequency] === "number" ? (
                  <div className="text-2xl font-bold">
                    <NumberFlow
                      value={plan.price[frequency] as number}
                      format={{
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }}
                    />
                    <span className="text-sm text-gray-500 ml-1">/month</span>
                  </div>
                ) : (
                  <div className="text-2xl font-bold">
                    {plan.price[frequency]}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button onClick={handleCheckout} className="w-full mt-4">
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
