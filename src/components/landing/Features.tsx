import {
  Zap,
  HardDrive,
  WandSparkles,
  FileText,
  Layers,
  LayoutDashboard,
  Lock,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "In-Memory Speed",
    description:
      "Light files process instantly and securely, never touching a server. Ideal for quick, private jobs.",
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    gradient: "from-indigo-500/10",
    colSpan: "lg:col-span-2",
    badge: "Free",
  },
  {
    icon: HardDrive,
    title: "High-Volume Processing",
    description:
      "Convert larger, complex files effortlessly. Jobs are stored securely for later access via the Dashboard.",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    gradient: "from-emerald-500/10",
    rowSpan: "lg:row-span-2",
    badge: "Plus",
  },
  {
    icon: WandSparkles,
    title: "AI Background Removal",
    description:
      "Instantly and accurately isolate subjects in any image with a single click.",
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    gradient: "from-pink-500/10",
    badge: "Plus",
  },
  {
    icon: FileText,
    title: "Document Control",
    description:
      "Comprehensive PDF tools: split large documents, securely merge multiple files, and convert formats.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    gradient: "from-orange-500/10",
    badge: "Core",
  },
  {
    icon: Layers,
    title: "Image Tools Suite",
    description:
      "Convert images instantly between PNG, JPG, and WebP formats with fast, reliable processing.",
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-50 dark:bg-teal-900/20",
    gradient: "from-teal-500/10",
    badge: "Core",
  },
  {
    icon: LayoutDashboard,
    title: "Personal Dashboard",
    description:
      "Track your history, manage high-volume files, and download previous conversions from one central interface.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    gradient: "from-blue-500/10",
    rowSpan: "lg:row-span-2",
    badge: "Plus",
  },
  {
    icon: Lock,
    title: "Secure & Private Auth",
    description:
      "Log in securely with Google or Email. Your data is protected with industry-standard authentication.",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    gradient: "from-purple-500/10",
    colSpan: "lg:col-span-2",
    badge: "Core",
  },
  {
    icon: Globe,
    title: "Cloud-Based Reliability",
    description:
      "Fast global delivery powered by edge caching and distributed infrastructure.",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    gradient: "from-amber-500/10",
    badge: "Core",
  },
];

const getBadgeStyles = (badge: string) => {
  switch (badge) {
    case "Plus":
      return "bg-neutral-900 text-white dark:bg-white dark:text-black shadow-md shadow-neutral-900/20";
    case "Free":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
    default:
      return "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400";
  }
};

const Features = () => {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-5xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
            More Power Than Your Standard Converter
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Discover how Morphly redefines file conversion — built for speed,
            privacy, and professional workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(220px,auto)] gap-5">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`
                  group relative flex flex-col justify-between
                  bg-neutral-50 dark:bg-neutral-900 
                  border border-neutral-200 dark:border-neutral-800 
                  rounded-3xl p-8 overflow-hidden transition-all duration-300
                  hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-none hover:border-neutral-300 dark:hover:border-neutral-700 hover:-translate-y-1
                  ${feature.colSpan || ""} 
                  ${feature.rowSpan || ""}
                `}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl ${feature.bgColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>

                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide ${getBadgeStyles(
                      feature.badge
                    )}`}
                  >
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 leading-tight">
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </div>

              {(feature.colSpan || feature.rowSpan) && (
                <div className="absolute bottom-0 right-0 p-6 opacity-[0.03] dark:opacity-[0.05] pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12">
                  <feature.icon className="w-32 h-32 -mb-10 -mr-10 text-neutral-900 dark:text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
