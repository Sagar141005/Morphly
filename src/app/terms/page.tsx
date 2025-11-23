"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar } from "lucide-react";

export default function Terms() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By using our Service, you confirm that you:
      • Are at least 13 years old.
      • Have read, understood, and agreed to these Terms.
      • Will use the Service legally and responsibly.

      If you do not agree, please discontinue use immediately.`,
    },
    {
      title: "2. Description of Service",
      content: `Our platform provides tools for:
      • Image conversion (PNG, JPG, WEBP, etc.)
      • Document conversion (PDF, DOCX, TXT, etc.)
      • File splitting and merging
      • AI-powered background removal
      • Storage and access to previously converted files
      • Paid services through Stripe-based subscription plans

      We may update, modify, or discontinue features at any time.`,
    },
    {
      title: "3. User Accounts",
      content: `Some features require creating an account. You agree to:
      • Provide accurate information
      • Keep your login credentials confidential
      • Be responsible for all activity under your account

      We reserve the right to suspend or terminate accounts found violating these Terms.`,
    },
    {
      title: "4. File Uploads and Content",
      content: `By uploading files, you confirm that:
      • You own the rights or have permission to use the uploaded content
      • Your files do not violate intellectual property laws
      • Your files do not contain harmful, illegal, or malicious content

      We do not claim ownership of your files. Files may be processed, stored temporarily, and deleted automatically after a certain period.`,
    },
    {
      title: "5. Data Storage and Retention",
      content: `• Files may be stored temporarily for processing
      • Your history and metadata may be retained for account functionality
      • Paid users may receive extended storage as part of their plan
      • We may delete files after a specified retention period without notice

      We are not responsible for loss of user data.`,
    },
    {
      title: "6. Payment, Billing, and Subscriptions",
      content: `Paid features are accessible through Stripe-based billing. By subscribing, you agree to:
      • Provide accurate payment details
      • Allow recurring charges (if applicable)
      • Understand that all payments are final unless otherwise stated

      Failure to make payments may result in termination of premium features.`,
    },
    {
      title: "7. Acceptable Use",
      content: `You agree not to:
      • Use the platform for illegal activities
      • Upload malware or harmful content
      • Attempt to reverse-engineer, hack, or disrupt the Service
      • Abuse free-tier limits or create multiple accounts to bypass restrictions

      Violation may lead to immediate account termination.`,
    },
    {
      title: "8. AI Features and Limitations",
      content: `AI-powered tools (e.g., background removal) may not always produce perfect results. You acknowledge that:
      • Output accuracy is not guaranteed
      • Processing is automated and may vary based on input quality
      • We are not liable for incorrect or imperfect results`,
    },
    {
      title: "9. Intellectual Property",
      content: `All trademarks, branding, UI/UX, design components, code, and content on the site belong to the Company. Users may not copy, resell, or replicate any part of the Service.`,
    },
    {
      title: "10. Service Availability and Performance",
      content: `We strive to maintain uptime but do not guarantee:
      • Uninterrupted availability
      • Error-free performance
      • Compatibility with all devices or formats

      We may throttle, restrict, or suspend services for maintenance or abuse prevention.`,
    },
    {
      title: "11. Limitation of Liability",
      content: `To the maximum extent permitted by law:
      • We are not responsible for data loss, corrupted files, or failed conversions
      • We do not guarantee output accuracy, performance, or file safety
      • Your use of the Service is at your own risk`,
    },
    {
      title: "12. Privacy",
      content: `Your personal data is handled according to our Privacy Policy. By using the Service, you consent to our data practices.`,
    },
    {
      title: "13. Termination",
      content: `We may suspend or terminate accounts that violate our Terms or engage in suspicious activity. Users may delete their accounts at any time.`,
    },
    {
      title: "14. Changes to Terms",
      content: `We may update these Terms periodically. Continued use of the Service constitutes acceptance of any revised Terms.`,
    },
    {
      title: "15. Contact Information",
      content: `For questions or support related to these Terms, please contact our support team through the website’s support page.`,
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-[100px] opacity-60" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-6">
              Terms and Conditions
            </h1>

            <div className="flex items-center justify-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-full px-4 py-1.5 w-fit mx-auto">
              <Calendar className="w-3.5 h-3.5" />
              <span>Last Updated: November 2025</span>
            </div>

            <p className="mt-8 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              Welcome to Morphly. By accessing or using our Service, you agree
              to the following Terms and Conditions. Please read them carefully.
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
                Questions about these terms?{" "}
                <a
                  href="/contact"
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Contact Support
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
