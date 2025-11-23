"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const contentRef = useRef<HTMLDivElement>(null);
        const [height, setHeight] = useState(0);

        useLayoutEffect(() => {
          if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
          }
        }, [isOpen, item.answer]);

        return (
          <div
            key={index}
            className={`border rounded-2xl transition-all duration-300 ${
              isOpen
                ? "bg-neutral-50 dark:bg-neutral-800/50 border-blue-200 dark:border-blue-900"
                : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
            >
              <h3
                className={`text-base font-semibold ${
                  isOpen
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-neutral-900 dark:text-white"
                }`}
              >
                {item.question}
              </h3>
              <ChevronDown
                className={`h-5 w-5 text-neutral-500 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                }`}
              />
            </button>

            <motion.div
              animate={{ height: isOpen ? height : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div
                ref={contentRef}
                className="px-6 pb-6 text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed"
              >
                {item.answer}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
