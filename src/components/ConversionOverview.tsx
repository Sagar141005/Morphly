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

const ConversionOverview: React.FC = () => {
  return (
    <div className="mt-20 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-blue-600">
              Conversion Tips
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 tracking-tight">
            Maximize Your Conversion Quality
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Upload high-quality source files for optimal results. Morphly’s
            smart engine automatically enhances and optimizes your files during
            conversion, preserving clarity and minimizing quality loss.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                Image Formats
              </h4>
              <p className="text-gray-600">JPG, PNG, WEBP, GIF, SVG</p>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-violet-200 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-violet-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                Document Formats
              </h4>
              <p className="text-gray-600">PDF, DOCX, TXT, CSV</p>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                Conversion Speed
              </h4>
              <p className="text-gray-600">Under 5 seconds per file</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-orange-200 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                Batch Processing
              </h4>
              <p className="text-gray-600">
                Convert multiple files simultaneously
              </p>
            </div>
          </div>
          <div className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-fuchsia-200 transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-fuchsia-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 bg-fuchsia-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wand2 className="w-6 h-6 text-fuchsia-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">
                AI BG Removal
              </h4>
              <p className="text-gray-600">Remove image backgrounds with AI.</p>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                Cloud Storage
              </h4>
              <p className="text-gray-600">Securely manage past conversions</p>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>

        <motion.section
          id="how-it-works"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative py-8 overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/40 blur-[100px] rounded-full"></div>
          </div>

          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <div className="mb-14">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                How Morphly Works
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A simple, intelligent 3-step process — designed for speed and
                clarity.
              </p>
            </div>

            <div className="relative grid md:grid-cols-3 gap-10">
              <div className="hidden md:block absolute top-[4.6rem] left-1/2 w-[75%] -translate-x-1/2 h-[2px] bg-gradient-to-r from-blue-100 via-violet-100 to-emerald-100"></div>

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
                  className="relative group bg-white rounded-2xl border border-gray-100 p-10 transition-all duration-500 hover:border-transparent hover:shadow-xl hover:shadow-gray-200/40"
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity`}
                  ></div>
                  <div
                    className={`relative z-10 w-16 h-16 mb-6 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg ${card.shadow} text-white text-2xl font-bold group-hover:scale-105 transition-transform`}
                  >
                    {card.step}
                  </div>
                  <h4 className="relative z-10 text-xl font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h4>
                  <p className="relative z-10 text-gray-600 leading-relaxed">
                    {card.desc}
                  </p>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-[4.4rem] right-[-1.5rem] w-2 h-2 rounded-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <div className="flex items-center justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative py-24"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-blue-400/70 to-blue-500/80 border-blue-200 rounded-3xl opacity-60 pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-6 text-center text-neutral-900">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-semibold">Enterprise Security</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Your Privacy is Our Priority
            </h3>
            <p className="text-lg text-neutral-900 leading-relaxed max-w-3xl mx-auto mb-10">
              Files are processed securely in-memory with automatic cleanup. We
              use encrypted HTTPS connections and never store your files
              permanently.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Lock,
                  text: "HTTPS Encryption",
                  color: "text-[#10B981]",
                },
                {
                  icon: ShieldCheck,
                  text: "In-Memory Only",
                  color: "text-[#3B82F6]",
                },
                {
                  icon: Clock,
                  text: "Auto Cleanup",
                  color: "text-[#8B5CF6]",
                },
                {
                  icon: CheckCircle,
                  text: "Zero Storage",
                  color: "text-[#F59E0B]",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="bg-white/15 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-colors hover:bg-white/20"
                  >
                    <Icon className={`w-8 h-8 ${item.color} mb-3 mx-auto`} />
                    <p className="text-white font-semibold text-sm text-center">
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
