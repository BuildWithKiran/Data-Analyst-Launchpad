"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const stages = [
  { week: "Week 1–2", title: "SQL Foundations", active: true },
  { week: "Week 3–4", title: "Excel & Power BI Basics", active: false },
  { week: "Week 5–6", title: "Python & Pandas", active: false },
  { week: "Week 7–8", title: "Projects & Portfolio", active: false },
  { week: "Week 9–10", title: "Interview Prep", active: false },
];

export default function RoadmapPreviewStepper() {
  return (
    <section className="section" style={{ background: "var(--bg-surface)" }}>
      <div className="container mx-auto">
        
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <motion.div
            className="h-[1px] mb-6 mx-auto"
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
            <h2 className="h2 mb-4">Your learning path, visualized</h2>
            <p className="body-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              A clear week-by-week roadmap. Know exactly where you are.
            </p>
          </motion.div>
        </div>

        {/* Stepper */}
        <div className="max-w-4xl mx-auto mb-16 relative px-4">
          
          {/* Connector Line Base */}
          <div className="absolute top-[22px] left-[10%] right-[10%] h-[1px] -z-10"
               style={{ borderTop: "1px dashed var(--border)" }} />
               
          {/* Connector Line Active */}
          <motion.div
            className="absolute top-[22px] left-[10%] h-[1px] -z-10"
            style={{ background: "var(--accent)" }}
            initial={{ width: 0 }}
            whileInView={{ width: "20%" }} // Highlight the first segment
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          />

          <div className="flex justify-between items-start relative z-10">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.week}
                className="flex flex-col items-center w-[120px] text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, type: "spring", bounce: 0, delay: i * 0.1 }}
              >
                <div
                  className="w-[44px] h-[44px] rounded-full flex items-center justify-center mb-4 transition-colors"
                  style={{
                    background: stage.active ? "var(--accent)" : "var(--bg-raised)",
                    border: stage.active ? "2px solid var(--accent)" : "2px solid var(--border)",
                  }}
                >
                  {stage.active ? (
                    <Check size={20} color="#FFFFFF" />
                  ) : (
                    <div className="w-2 h-2 rounded-full" style={{ background: "var(--border-strong)" }} />
                  )}
                </div>
                <div className="label mb-2" style={{ color: "var(--text-tertiary)" }}>
                  {stage.week}
                </div>
                <div className="text-[13px] font-medium" style={{ color: "var(--text-secondary)" }}>
                  {stage.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/roadmaps" className="btn-ghost">
            View Full Roadmap <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
