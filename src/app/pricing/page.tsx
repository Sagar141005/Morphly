"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import { ArrowUpRight, Check, X } from "lucide-react";
import Accordion from "@/components/landing/Accordion";
import CTA from "@/components/landing/CTA";

const featureComparison = [
  {
    feature: "Core file tools (Convert, Merge, Split)",
    free: true,
    plus: true,
    pro: true,
  },
  {
    feature: "AI Background Removal",
    free: false,
    plus: true,
    pro: true,
  },
  {
    feature: "AI File Enhancer",
    free: false,
    plus: true,
    pro: true,
  },
  {
    feature: "Cloud storage duration",
    free: "Instant only",
    plus: "30 days",
    pro: "90 days",
  },
  {
    feature: "Max file size",
    free: "10MB",
    plus: "100MB",
    pro: "500MB",
  },
  {
    feature: "Daily credits",
    free: "5/day",
    plus: "25/day",
    pro: "Unlimited + 100 AI/month",
  },
  {
    feature: "Conversion speed",
    free: "Standard",
    plus: "Faster (Priority queue)",
    pro: "Fastest (Dedicated lane)",
  },
  {
    feature: "Support",
    free: "Community only",
    plus: "Email support",
    pro: "Priority support",
  },
];

const pricingFaqs = [
  {
    question: "Do credits renew automatically?",
    answer:
      "Yes! Credits refresh every 24 hours for Free and Plus users. Pro users get unlimited standard conversions and monthly AI credits.",
  },
  {
    question: "What happens when I run out of credits?",
    answer:
      "You’ll need to wait for your daily renewal or upgrade to a higher plan for more conversions and AI access.",
  },
  {
    question: "Can I switch or cancel plans anytime?",
    answer:
      "Absolutely. You can upgrade, downgrade, or cancel anytime from your account settings — no hidden fees.",
  },
  {
    question: "Do my unused AI credits roll over?",
    answer:
      "Unused AI credits don’t roll over to the next month. They reset when your billing cycle renews.",
  },
  {
    question: "Can I try AI tools before upgrading?",
    answer:
      "AI tools are available starting with the Plus plan. You can preview features, but full AI processing requires an active Plus or Pro subscription.",
  },
  {
    question: "Do you offer team or enterprise plans?",
    answer:
      "Yes. The Pro plan includes team access, and for larger use cases you can contact us for custom enterprise pricing.",
  },
];

export default function PricingPage() {
  return (
    <main
      className="
        min-h-screen 
        bg-gradient-to-b 
        from-white via-blue-50/40 to-white 
        dark:from-black dark:via-neutral-900 dark:to-neutral-950
        relative overflow-hidden transition-colors
      "
    >
      <Navbar />

      <section className="w-full max-w-6xl mx-auto px-6 py-24">
        <div className="mb-14 text-center">
          <h1 className="text-5xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4 tracking-tight">
            Choose Your Plan
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Simple, transparent pricing to power your Morphly conversions. Scale
            your workflow at your own pace.
          </p>
        </div>

        <Pricing />
      </section>
      <section className="py-20 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-neutral-900 dark:text-white mb-4">
            Compare Features by Plan
          </h2>

          <p className="text-lg text-neutral-600 dark:text-neutral-300 text-center mb-12 max-w-2xl mx-auto">
            See what’s included in each plan so you can choose the best fit for
            your needs.
          </p>

          <div className="overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm uppercase tracking-wide">
                  <th className="py-4 px-4 text-left">Features</th>
                  <th className="py-4 px-4 text-center font-semibold">Free</th>
                  <th className="py-4 px-4 text-center font-semibold">Plus</th>
                  <th className="py-4 px-4 text-center font-semibold">Pro</th>
                </tr>
              </thead>

              <tbody className="bg-white/70 dark:bg-neutral-900/60 backdrop-blur-sm">
                {featureComparison.map((item, i) => (
                  <tr
                    key={i}
                    className="
                      border-b border-neutral-100 dark:border-neutral-800
                      hover:bg-blue-50/40 dark:hover:bg-neutral-800/40
                      hover:scale-[1.005] transition-transform duration-150
                    "
                  >
                    <td className="py-4 px-4 text-neutral-800 dark:text-neutral-200 text-sm font-medium">
                      {item.feature}
                    </td>

                    <td className="py-4 px-4 text-center">
                      {typeof item.free === "boolean" ? (
                        item.free ? (
                          <Check className="h-5 w-5 mx-auto text-green-600 dark:text-green-400" />
                        ) : (
                          <X className="h-5 w-5 mx-auto text-neutral-300 dark:text-neutral-700" />
                        )
                      ) : (
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                          {item.free}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-center">
                      {typeof item.plus === "boolean" ? (
                        item.plus ? (
                          <Check className="h-5 w-5 mx-auto text-green-600 dark:text-green-400" />
                        ) : (
                          <X className="h-5 w-5 mx-auto text-neutral-300 dark:text-neutral-700" />
                        )
                      ) : (
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                          {item.plus}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300">
                      {typeof item.pro === "boolean" ? (
                        item.pro ? (
                          <Check className="h-5 w-5 mx-auto text-green-600 dark:text-green-400" />
                        ) : (
                          <X className="h-5 w-5 mx-auto text-neutral-300 dark:text-neutral-700" />
                        )
                      ) : (
                        <span className="text-sm text-neutral-700 dark:text-neutral-200">
                          {item.pro}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CTA />

      <section className="py-20 bg-blue-50/30 dark:bg-neutral-900/40 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center font-extrabold text-neutral-900 dark:text-white mb-4">
            Pricing & Billing FAQs
          </h2>
          <p className="text-lg text-center text-neutral-600 dark:text-neutral-300 mb-16">
            Find answers to common questions about plans, payments, and
            subscriptions.
          </p>

          <Accordion items={pricingFaqs} />

          <p className="text-center mt-12 text-neutral-500 dark:text-neutral-300">
            Didn’t find what you’re looking for?{" "}
            <a
              href="/contact"
              className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center hover:underline"
            >
              Contact support <ArrowUpRight className="w-4 h-4 -mb-0.5" />
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
