import React from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const allTestimonials = [
    {
      text: "Signing up was quick, and the dashboard makes everything easy to access. Really smooth experience.",
      name: "Aarav Shah",
      role: "Freelance Designer",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      text: "The interface feels clean and modern. I converted images in seconds without any confusion.",
      name: "Mia Rodriguez",
      role: "Content Creator",
      img: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      text: "PDF split and merge works perfectly. I use it every day for office paperwork.",
      name: "Nikhil Verma",
      role: "Operations Coordinator",
      img: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      text: "AI background removal is surprisingly accurate for product shots. Saves me so much time.",
      name: "Emma Collins",
      role: "Small Business Owner",
      img: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      text: "Everything is organized in the history tab, so I never lose track of files I converted earlier.",
      name: "Leo Parker",
      role: "Frontend Developer",
      img: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      text: "File compression keeps quality intact while reducing size significantly. Perfect for email attachments.",
      name: "Sana Qureshi",
      role: "Marketing Specialist",
      img: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      text: "The dashboard is super useful. I can revisit any older conversions instantly.",
      name: "David Nguyen",
      role: "Project Lead",
      img: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      text: "Conversion speed is genuinely impressive. Much faster than desktop tools I’ve tried.",
      name: "Isabella Rossi",
      role: "Journalist",
      img: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      text: "The dark mode is clean and well-designed. Using the app for long sessions feels comfortable.",
      name: "Tom Harris",
      role: "Web Developer",
      img: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      text: "I like that all tools—conversion, compression, background removal—are under one account.",
      name: "Alina Petrova",
      role: "Research Student",
      img: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
      text: "The UX is simple and intuitive. Upload, pick a format, done. Great for quick tasks.",
      name: "Rajat Malhotra",
      role: "Teacher",
      img: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      text: "Perfect for creating studio-like transparent images of my products. AI removal is on point.",
      name: "Sophie Andersen",
      role: "Small Store Owner",
      img: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      text: "Haven’t run into a single failed conversion yet. The reliability is top-notch.",
      name: "Marcus Lee",
      role: "IT Assistant",
      img: "https://randomuser.me/api/portraits/men/13.jpg",
    },
    {
      text: "Compressing screenshots before sending reports is so much easier now.",
      name: "Rachel Gomez",
      role: "QA Engineer",
      img: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      text: "Exactly the type of organized, fast file tool we needed in our team workspace.",
      name: "Aaron Brooks",
      role: "Startup Founder",
      img: "https://randomuser.me/api/portraits/men/15.jpg",
    },
    {
      text: "Finally, a converter that doesn't spam me with ads. Clean, professional, effective.",
      name: "Layla Hassan",
      role: "Digital Marketer",
      img: "https://randomuser.me/api/portraits/women/17.jpg",
    },
    {
      text: "I use the mobile view constantly while commuting. It works just as well as desktop.",
      name: "Julian Moretti",
      role: "Travel Blogger",
      img: "https://randomuser.me/api/portraits/men/18.jpg",
    },
    {
      text: "I manage dozens of client files daily — this platform has replaced three separate tools for me.",
      name: "Carlos Mendes",
      role: "Agency Consultant",
      img: "https://randomuser.me/api/portraits/men/20.jpg",
    },
  ];

  const column1 = allTestimonials.slice(0, 6);
  const column2 = allTestimonials.slice(6, 12);
  const column3 = allTestimonials.slice(12, 18);

  const columns = [column1, column2, column3];

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-4"
        >
          Trusted by Professionals Everywhere
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-16"
        >
          Real experiences from creators, teams, developers, and businesses who
          rely on Morphly daily.
        </motion.p>

        <div className="relative h-[700px] overflow-hidden">
          <div className="absolute inset-0 z-20 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-[700px] overflow-hidden relative opacity-100 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            {columns.map((columnItems, colIndex) => (
              <motion.div
                key={colIndex}
                className="flex flex-col gap-6"
                animate={{
                  y: colIndex === 1 ? ["-50%", "0%"] : ["0%", "-50%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 45 + colIndex * 10,
                  ease: "linear",
                }}
              >
                {[...Array(2)].map((_, duplicateIndex) => (
                  <div key={duplicateIndex} className="flex flex-col gap-6">
                    {columnItems.map((t, i) => (
                      <div
                        key={`${colIndex}-${duplicateIndex}-${i}`}
                        className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm p-6"
                      >
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-6 text-left">
                          “{t.text}”
                        </p>

                        <div className="flex items-center gap-4">
                          <img
                            src={t.img}
                            alt={t.name}
                            className="w-10 h-10 rounded-full object-cover bg-neutral-200 dark:bg-neutral-800"
                          />
                          <div className="text-left">
                            <p className="font-semibold text-neutral-900 dark:text-white text-sm">
                              {t.name}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                              {t.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
