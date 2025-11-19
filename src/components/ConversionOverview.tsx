import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Database,
  FileText,
  ImageIcon,
  Layers,
  Lightbulb,
  Lock,
  ShieldCheck,
  Wand2,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: ImageIcon,
    title: "Image Formats",
    description: "JPG, PNG, WEBP, GIF, SVG",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900",
    highlight: "from-blue-500/10 dark:from-blue-900/80",
  },
  {
    icon: FileText,
    title: "Document Formats",
    description: "PDF, DOCX, TXT, CSV",
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-50 dark:bg-violet-900",
    highlight: "from-violet-500/10 dark:from-violet-900/80",
  },
  {
    icon: Zap,
    title: "Conversion Speed",
    description: "Under 5 seconds per file",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-900",
    highlight: "from-emerald-500/10 dark:from-emerald-900/80",
  },
  {
    icon: Layers,
    title: "Batch Processing",
    description: "Convert multiple files simultaneously",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900",
    highlight: "from-orange-500/10 dark:from-orange-900/80",
  },
  {
    icon: Wand2,
    title: "AI BG Removal",
    description: "Remove image backgrounds with AI.",
    color: "text-fuchsia-600 dark:text-fuchsia-400",
    bgColor: "bg-fuchsia-50 dark:bg-fuchsia-900",
    highlight: "from-fuchsia-500/10 dark:from-fuchsia-900/80",
  },
  {
    icon: Database,
    title: "Cloud Storage",
    description: "Securely manage past conversions",
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-900",
    highlight: "from-indigo-500/10 dark:from-indigo-900/80",
  },
];

const ConversionOverview: React.FC = () => {
  return (
    <div className="mt-20 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 lg:w-[800px] h-[400px] bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900 border border-blue-100 dark:border-blue-700 mb-6">
            <Lightbulb className="w-4 h-4 text-yellow-400 dark:text-yellow-300" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Conversion Tips
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-5 tracking-tight">
            Maximize Your Conversion Quality
          </h3>
          <p className="text-lg text-neutral-600 leading-relaxed dark:text-neutral-300">
            Upload high-quality source files for optimal results. Morphly’s
            smart engine automatically enhances and optimizes your files during
            conversion, preserving clarity and minimizing quality loss.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative flex flex-col items-start p-8 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-900 transition-all duration-300 hover:border-neutral-300 hover:shadow-xl`}
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.highlight} to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity`}
                />

                <div
                  className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>

                <div className="flex-1 flex flex-col justify-between w-full">
                  <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="flex items-center justify-center mb-10">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent" />
        </div>

        <motion.section
          id="how-it-works"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative py-12 overflow-hidden"
        >
          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <div className="mb-14">
              <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight mb-3">
                How Morphly Works
              </h3>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                A simple, intelligent 3-step process — designed for speed and
                clarity.
              </p>
            </div>

            <div className="relative grid md:grid-cols-3 gap-10">
              <div className="hidden md:block absolute top-[4.6rem] left-1/2 w-[75%] -translate-x-1/2 h-[2px] bg-gradient-to-r from-blue-200/30 dark:from-blue-800/30 via-violet-200/30 dark:via-violet-800/30 to-emerald-200/30 dark:to-emerald-800/30"></div>

              {[
                {
                  step: "1",
                  title: "Smart Detection",
                  desc: "Morphly identifies file type and optimizes parameters automatically for best output.",
                  gradient: "from-blue-500 to-cyan-500",
                  shadow: "shadow-blue-500/20",
                },
                {
                  step: "2",
                  title: "AI Processing",
                  desc: "Our adaptive AI engine enhances clarity, structure, and detail while preserving fidelity.",
                  gradient: "from-violet-500 to-purple-500",
                  shadow: "shadow-violet-500/20",
                },
                {
                  step: "3",
                  title: "Instant Download",
                  desc: "Your optimized files are ready instantly — no queues, no watermarks, no hassle.",
                  gradient: "from-emerald-500 to-teal-500",
                  shadow: "shadow-emerald-500/20",
                },
              ].map((card, i) => (
                <div
                  key={card.step}
                  className="relative group bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-700 p-10 transition-all duration-500 hover:border-transparent hover:shadow-xl hover:shadow-neutral-200/40 dark:hover:shadow-neutral-800/40"
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity`}
                  ></div>
                  <div
                    className={`relative z-10 w-16 h-16 mb-6 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg ${card.shadow} text-white text-2xl font-bold group-hover:scale-105 transition-transform`}
                  >
                    {card.step}
                  </div>
                  <h4 className="relative z-10 text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                    {card.title}
                  </h4>
                  <p className="relative z-10 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {card.desc}
                  </p>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-[4.4rem] right-[-1.5rem] w-2 h-2 rounded-full bg-gradient-to-br from-neutral-200 dark:from-neutral-600 to-neutral-300 dark:to-neutral-700"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <div className="hidden sm:flex items-center justify-center mb-10">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent" />
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="hidden lg:block relative py-24 bg-gradient-to-b from-blue-100/50 dark:from-neutral-900 via-blue-50/30 dark:via-neutral-800 to-white dark:to-neutral-900 rounded-2xl transition-colors"
        >
          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-800 mb-6">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Enterprise Security
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-neutral-900 dark:text-white">
              Your Privacy is Our Priority
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl mx-auto mb-10">
              Files are processed securely in-memory with automatic cleanup. We
              use encrypted HTTPS connections and never store your files
              permanently.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Lock,
                  text: "HTTPS Encryption",
                  color: "text-green-500",
                },
                {
                  icon: ShieldCheck,
                  text: "In-Memory Only",
                  color: "text-blue-500",
                },
                { icon: Clock, text: "Auto Cleanup", color: "text-purple-500" },
                {
                  icon: CheckCircle,
                  text: "Zero Storage",
                  color: "text-yellow-500",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="bg-white/80 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg flex flex-col items-center"
                  >
                    <Icon className={`w-8 h-8 ${item.color} mb-3`} />
                    <p className="text-neutral-900 dark:text-white font-semibold text-sm text-center">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ConversionOverview;
