"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 dark:from-black dark:to-neutral-900 antialiased">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white text-center mb-6"
        >
          Privacy Policy
        </motion.h1>

        <p className="text-center text-neutral-600 dark:text-neutral-300 mb-16">
          Last Updated: November 2025
          <br />
          Thank you for using Morphly. This Privacy Policy explains how we
          collect, use, store, and protect your information.
        </p>

        <div className="space-y-10">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                {section.title}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 whitespace-pre-line leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
