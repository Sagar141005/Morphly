"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Eye } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect the following types of information:

1.1 Personal Information
If you create an account or make a purchase, we may collect:
• Name (optional)
• Email address
• Profile image (optional)
• Payment information (processed via Stripe)
• Account preferences

1.2 Uploaded Files
When you upload files for conversion, splitting, merging, or AI processing:
• We temporarily store your files to process them
• We may store metadata (e.g., file type, size, timestamps)
• Paid users may have extended file storage depending on their plan

We do not claim ownership of your files.

1.3 Usage Data
We automatically collect:
• Device information
• Browser type
• IP address
• Pages visited
• Time spent on platform
• Conversion history

This helps improve performance and detect abuse.

1.4 Cookies & Tracking
We use cookies and similar technologies for:
• Authentication
• User preferences
• Analytics
• Subscription tracking

You may disable cookies but some features may stop working.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `We use your information to:
• Provide file conversion, merging, splitting, and AI services
• Improve processing accuracy and platform performance
• Manage your account and subscription
• Display your usage history and stored files
• Detect and prevent fraud or abuse
• Communicate updates, notifications, or support messages
• Comply with legal obligations

We never sell your personal information.`,
    },
    {
      title: "3. How We Handle Uploaded Files",
      content: `• Files are stored temporarily only to complete processing
• Temporary files may be auto-deleted after a short period
• Premium users may have longer file retention
• You may delete stored files manually at any time
• We do not review, analyze, or share the content of your files

We take security seriously, but cannot guarantee absolute protection against all threats.`,
    },
    {
      title: "4. Payment Information (Stripe)",
      content: `All payments are securely processed by Stripe. We do not store:
• Card numbers
• Bank account details
• CVV/CVC codes

Stripe may store and manage your billing information according to their own privacy policy.`,
    },
    {
      title: "5. Data Sharing",
      content: `We only share your information with:
• Service providers (e.g., cloud storage, AI processing, analytics)
• Payment processors (Stripe)
• Law enforcement, if legally required

We do not sell or rent your information to advertisers or third parties.`,
    },
    {
      title: "6. Data Storage & Security",
      content: `We use industry-standard security measures to protect data. However:
• No method of transmission is 100% secure
• We cannot guarantee absolute protection from unauthorized access

Your data may be stored using third-party cloud providers.`,
    },
    {
      title: "7. Data Retention",
      content: `We retain:
• Account data until you request deletion
• Conversion history for functionality purposes
• Uploaded files only temporarily (unless you opt for extended storage)

You may request deletion of your account and associated data.`,
    },
    {
      title: "8. User Rights",
      content: `Depending on your region, you may have rights to:
• Access your data
• Download your data
• Request correction or deletion
• Object to certain data processing activities
• Delete your account permanently

Submit requests through our support page.`,
    },
    {
      title: "9. Children’s Privacy",
      content: `The Service is not intended for users under 13.
If we discover that a child under 13 has created an account, we will delete it immediately.`,
    },
    {
      title: "10. Third-Party Links",
      content: `Our website may contain links to third-party sites.
We are not responsible for their privacy practices.`,
    },
    {
      title: "11. Changes to This Privacy Policy",
      content: `We may update this Policy from time to time.
Continued use of the Service means you accept the updated terms.`,
    },
    {
      title: "12. Contact Us",
      content: `If you have questions about this Privacy Policy, please contact our support team through the website’s support page.`,
    },
  ];

  // Helper to render bullet points
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
              Privacy Policy
            </h1>

            <div className="flex items-center justify-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-full px-4 py-1.5 w-fit mx-auto">
              <Calendar className="w-3.5 h-3.5" />
              <span>Last Updated: November 2025</span>
            </div>

            <p className="mt-8 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              Thank you for using Morphly. This Privacy Policy explains how we
              collect, use, store, and protect your information.
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
              <div className="inline-flex items-center text-sm gap-2">
                <Eye className="w-4 h-4" />
                <span>We never sell your data</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
