import {
  Images,
  Brush,
  FileText,
  Blend,
  Scissors,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "motion/react";

const tools = [
  {
    icon: Images,
    title: "Image Converter",
    description: "Convert your images to multiple formats instantly.",
    href: "/image/convert",
    hoverBorder: "hover:border-blue-500/50 dark:hover:border-blue-400/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Brush,
    title: "AI Background Removal",
    description: "Remove backgrounds from images with a single click.",
    href: "/ai/remove-bg",
    hoverBorder: "hover:border-pink-500/50 dark:hover:border-pink-400/50",
    iconColor: "text-pink-600 dark:text-pink-400",
    iconBg: "bg-pink-50 dark:bg-pink-900/20",
  },
  {
    icon: FileText,
    title: "File Converter",
    description: "Convert PDFs, DOCX, TXT and more seamlessly.",
    href: "/file/convert",
    hoverBorder: "hover:border-orange-500/50 dark:hover:border-orange-400/50",
    iconColor: "text-orange-600 dark:text-orange-400",
    iconBg: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    icon: Blend,
    title: "File Merge",
    description: "Combine multiple PDFs into a single file effortlessly.",
    href: "/file/merge",
    hoverBorder: "hover:border-green-500/50 dark:hover:border-green-400/50",
    iconColor: "text-green-600 dark:text-green-400",
    iconBg: "bg-green-50 dark:bg-green-900/20",
  },
  {
    icon: Scissors,
    title: "File Split",
    description: "Split large PDF files into smaller chunks quickly.",
    href: "/file/split",
    hoverBorder: "hover:border-purple-500/50 dark:hover:border-purple-400/50",
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-50 dark:bg-purple-900/20",
  },
];

const Tools = () => {
  return (
    <section id="tools" className="py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-5xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
            Explore Our Tools
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Whether it’s converting, merging, or enhancing — Morphly gives you
            the tools to handle any file with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {tools.map((tool, index) => (
            <motion.a
              key={tool.title}
              href={tool.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                  group relative flex flex-col p-6 h-full
                  bg-white dark:bg-neutral-900 
                  border border-neutral-200 dark:border-neutral-800 
                  rounded-3xl transition-all duration-300 ease-out
                  hover:shadow-xl hover:shadow-neutral-200/40 dark:hover:shadow-none hover:-translate-y-1
                  ${tool.hoverBorder}
                `}
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`
                      w-14 h-14 rounded-2xl ${tool.iconBg} 
                      flex items-center justify-center 
                      transition-transform duration-500 ease-out 
                      group-hover:scale-110 group-hover:rotate-3
                    `}
                >
                  <tool.icon className={`w-7 h-7 ${tool.iconColor}`} />
                </div>

                <div className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white" />
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
