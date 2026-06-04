"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const questions = [
  {
    id: "q1",
    category: "SQL",
    difficulty: "Medium",
    diffColor: "var(--warning)",
    question: "What is the difference between RANK() and DENSE_RANK()?",
    answer: "RANK() skips numbers after ties while DENSE_RANK() does not skip any numbers. For example, if two rows tie for 1st place, RANK() gives them both 1 and the next row 3. DENSE_RANK() gives them both 1 and the next row 2.",
  },
  {
    id: "q2",
    category: "Excel",
    difficulty: "Easy",
    diffColor: "var(--success)",
    question: "How does INDEX+MATCH differ from VLOOKUP?",
    answer: "INDEX+MATCH can look left (not restricted to the leftmost column) and is not column-position dependent, meaning if you insert a new column, the formula won't break unlike VLOOKUP's hardcoded column index.",
  },
  {
    id: "q3",
    category: "Python",
    difficulty: "Medium",
    diffColor: "var(--warning)",
    question: "How do you handle missing values in a Pandas DataFrame?",
    answer: "Using .isnull() to identify them, then either .dropna() to remove the rows/columns, or .fillna() to impute them with a specific value like the mean, median, or a placeholder string depending on the context.",
  },
];

function QuestionCard({ q }: { q: typeof questions[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card p-[20px] px-[22px] transition-all hover:-translate-y-1 hover:border-[var(--border-accent)] cursor-pointer" onClick={() => setExpanded(!expanded)}>
      
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div
          className="text-[11px] font-medium px-[8px] py-[3px] rounded-[4px]"
          style={{ background: "var(--accent-muted)", color: "var(--accent)" }}
        >
          {q.category}
        </div>
        <div className="flex items-center gap-[6px] text-[12px] font-medium" style={{ color: "var(--text-secondary)" }}>
          <div className="w-[6px] h-[6px] rounded-full" style={{ background: q.diffColor }} />
          {q.difficulty}
        </div>
      </div>

      {/* Question */}
      <h3 className="text-[15px] font-medium mt-[12px] mb-[8px] leading-[1.5]" style={{ color: "var(--text-primary)" }}>
        {q.question}
      </h3>

      {/* Answer */}
      <div className="text-[13px] leading-[1.65]" style={{ color: "var(--text-secondary)" }}>
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key="expanded"
              initial={{ height: 44, opacity: 1 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 44, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {q.answer}
              <span className="block mt-[4px] cursor-pointer" style={{ color: "var(--accent)" }}>
                Show less
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ height: "auto", opacity: 1 }}
              animate={{ height: 44, opacity: 1 }}
              exit={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden relative"
            >
              <div className="line-clamp-2">{q.answer}</div>
              <span className="absolute bottom-0 right-0 bg-[var(--bg-surface)] pl-[4px] cursor-pointer" style={{ color: "var(--accent)" }}>
                ...Show more
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function InterviewPreview() {
  return (
    <section className="section" style={{ background: "var(--bg-base)" }}>
      <div className="container mx-auto">
        
        {/* Section Heading */}
        <div className="mb-16">
          <motion.div
            className="h-[1px] mb-6"
            style={{ background: "var(--accent)" }}
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <h2 className="h2 mb-4">Practice with real interview questions</h2>
            <p className="body-lg" style={{ color: "var(--text-secondary)" }}>
              Sourced from actual DA interviews<br />at top Indian IT companies.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {questions.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, type: "spring", bounce: 0, delay: i * 0.055 }}
            >
              <QuestionCard q={q} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/interview" className="btn-primary">
            See All 80+ Questions <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
