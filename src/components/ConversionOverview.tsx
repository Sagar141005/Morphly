"use client";

import {
  CheckCircle2,
  Clock,
  Database,
  FileText,
  ImageIcon,
  Layers,
  Zap,
  Wand2,
  ShieldCheck,
  Lock,
  ArrowDownCircle,
  Cpu,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: ImageIcon,
    title: "Image Formats",
    description: "JPG, PNG, WEBP, GIF, SVG",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    highlight: "from-blue-500/10 dark:from-blue-900/40",
  },
  {
    icon: FileText,
    title: "Document Formats",
    description: "PDF, DOCX, TXT, CSV",
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-50 dark:bg-violet-900/20",
    highlight: "from-violet-500/10 dark:from-violet-900/40",
  },
  {
    icon: Layers,
    title: "Batch Processing",
    description: "Convert multiple files simultaneously",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    highlight: "from-orange-500/10 dark:from-orange-900/40",
  },
  {
    icon: Wand2,
    title: "AI BG Removal",
    description: "Remove image backgrounds with AI.",
    color: "text-fuchsia-600 dark:text-fuchsia-400",
    bgColor: "bg-fuchsia-50 dark:bg-fuchsia-900/20",
    highlight: "from-fuchsia-500/10 dark:from-fuchsia-900/40",
  },
  {
    icon: Database,
    title: "Cloud Storage",
    description: "Securely manage past conversions",
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    highlight: "from-indigo-500/10 dark:from-indigo-900/40",
  },
  {
    icon: Zap,
    title: "Conversion Speed",
    description: "Under 5 seconds per file",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    highlight: "from-emerald-500/10 dark:from-emerald-900/40",
  },
];

const ConversionOverview: React.FC = () => {
  return (
    <div className="mt-24 relative">
      <div className="relative max-w-7xl mx-auto space-y-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Maximize Your Conversion Quality
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Upload high-quality source files for optimal results. Morphly’s
              smart engine automatically enhances and optimizes your files
              during conversion.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, staggerChildren: 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative flex flex-col items-start p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.highlight} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div
                    className={`relative z-10 w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>

                  <div className="relative z-10">
                    <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
        <motion.section
          id="how-it-works"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              How Morphly Works
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              A simple, intelligent 3-step process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-neutral-100 dark:bg-neutral-800">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent opacity-50" />
            </div>

            {[
              {
                step: "01",
                title: "Smart Detection",
                desc: "Morphly identifies file type and optimizes parameters automatically.",
                icon: Cpu,
              },
              {
                step: "02",
                title: "AI Processing",
                desc: "Our engine enhances clarity and structure while preserving fidelity.",
                icon: Wand2,
              },
              {
                step: "03",
                title: "Instant Download",
                desc: "Your files are ready instantly. No queues, no watermarks.",
                icon: ArrowDownCircle,
              },
            ].map((card, i) => (
              <div
                key={card.step}
                className="relative flex flex-col items-center text-center z-10"
              >
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-neutral-900 border-4 border-neutral-50 dark:border-neutral-950 shadow-xl flex items-center justify-center mb-6 group transition-transform hover:scale-110 duration-300">
                  <card.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>

                <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                  {card.title}
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-xs mx-auto">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 p-8 md:p-12 overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-purple-500 blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 dark:bg-black/5 text-sm font-semibold mb-4">
                <ShieldCheck className="w-4 h-4" /> Enterprise Security
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Your Privacy is Our Priority
              </h3>
              <p className="text-neutral-300 dark:text-neutral-600 leading-relaxed">
                Files are processed securely in-memory with automatic cleanup.
                We never store your free conversions permanently.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:w-auto w-full">
              {[
                { icon: Lock, text: "Encrypted" },
                { icon: Clock, text: "Auto Delete" },
                { icon: CheckCircle2, text: "No Logs" },
                { icon: Database, text: "In-Memory" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 bg-white/10 dark:bg-neutral-100/50 backdrop-blur-sm p-4 rounded-xl"
                >
                  <item.icon className="w-5 h-5 text-blue-400 dark:text-blue-600" />
                  <span className="font-semibold text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConversionOverview;
