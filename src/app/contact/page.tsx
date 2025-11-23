"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const sections = [
    {
      title: "📩 Contact Us",
      content: `We’re here to help you with anything you need. Whether you’re facing an issue, have a suggestion, or want to know more about our features — our team is always ready to assist.

Email: support@morphly.com
Business Hours: Monday – Friday, 10:00 AM to 6:00 PM (IST)`,
    },
    {
      title: "Support",
      content: `Facing an issue with file conversion, payments, or your account? We’re here to help.

Support queries may include:
• Login or authentication issues
• Stripe payment / billing queries
• Errors in file upload or conversion
• Problems with storage or history
• AI background removal issues
• Bugs, glitches, or performance problems

Support Email: help@morphly.com
Response Time: Within 24–48 hours`,
    },
    {
      title: "Report a Problem",
      content: `If you’ve encountered a bug or something is not working as expected, please share:
• Your email
• File type you were using
• Steps to reproduce the issue
• Screenshot (if possible)

Send bug reports to: bugs@morphly.com`,
    },
    {
      title: "Feedback & Suggestions",
      content: `We love hearing from users. If you have ideas that can help us improve, share them anytime.

Feedback Email: feedback@morphly.com`,
    },
    {
      title: "Social Media",
      content: `Follow us or reach out via social platforms:
• Twitter: https://twitter.com/morphly
• LinkedIn: https://linkedin.com/company/morphly`,
    },
    {
      title: "Our Team",
      content: `We are a small but dedicated team focused on delivering fast, secure, and modern file tools for everyone.

Thank you for using Morphly. Your support helps us grow and build better tools for the community.`,
    },
  ];

  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("•")) {
        return (
          <li key={i} className="flex items-start gap-2 mb-2 ml-2">
            <span className="text-blue-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
            <span>{trimmed.substring(1).trim()}</span>
          </li>
        );
      }
      if (!trimmed) return <div key={i} className="h-2" />;
      return (
        <p key={i} className="mb-2">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 antialiased transition-colors">
      <Navbar />

      <main className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-6">
              Contact & Support
            </h1>

            <p className="mt-8 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              We’re here to help you with questions, feedback, or support
              issues. Reach out and we’ll get back to you as quickly as
              possible.
            </p>
          </motion.div>

          <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl shadow-neutral-200/50 dark:shadow-none border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <div className="p-8 sm:p-12 space-y-12">
              {sections.map((section, index) => (
                <motion.section
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative pl-4"
                >
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    {section.title}
                  </h2>

                  <div className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base">
                    {renderContent(section.content)}
                  </div>
                </motion.section>
              ))}
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-800/50 p-6 text-center border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Need more help?{" "}
                <a
                  href="/contact"
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Reach Out
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
