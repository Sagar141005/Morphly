"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Pricing() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 text-center">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Simple Pricing</h2>
        <p className="text-muted-foreground text-lg">
          Choose the plan that fits your needs.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        {/* Free Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>
              Great for testing and personal use
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="mb-6">
              <p className="text-4xl font-bold">$0</p>
              <ul className="mt-4 space-y-2 text-left text-sm text-muted-foreground">
                <li>✔️ 5 file conversions / month</li>
                <li>✔️ Basic compression options</li>
                <li>✔️ Access to core tools</li>
              </ul>
            </div>
            <Button variant="outline" className="w-full" disabled>
              Current Plan
            </Button>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="border-primary border-2 shadow-lg">
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>
              Perfect for professionals and businesses
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="mb-6">
              <p className="text-4xl font-bold">
                $9<span className="text-base font-normal">/mo</span>
              </p>
              <ul className="mt-4 space-y-2 text-left text-sm text-muted-foreground">
                <li>✔️ Unlimited conversions</li>
                <li>✔️ Advanced compression</li>
                <li>✔️ Priority processing</li>
                <li>✔️ Cloud storage (via Supabase)</li>
              </ul>
            </div>
            <Button className="w-full">Upgrade to Pro</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
