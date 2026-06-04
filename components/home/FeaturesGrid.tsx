"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, BarChart2, Code2, MessageSquare, FolderOpen, Map } from "lucide-react";

const features = [
  {
    title: "SQL Mastery Path",
    desc: "Basics to window functions, CTEs and query optimization with real datasets.",
    icon: Database,
  },
  {
    title: "Excel & Power BI",
    desc: "Pivot tables, DAX, data modeling and dashboard design from scratch.",
    icon: BarChart2,
  },
  {
    title: "Python for Analysis",
    desc: "Pandas, NumPy, Matplotlib — guided projects with real-world data.",
    icon: Code2,
  },
  {
    title: "Interview Question Bank",
    desc: "500+ categorized Q&A across all DA tools, concepts and case studies.",
    icon: MessageSquare,
  },
  {
    title: "Project Templates",
    desc: "End-to-end projects with data, code and GitHub-ready documentation.",
    icon: FolderOpen,
  },
  {
    title: "Career Roadmap",
    desc: "Week-by-week plan from zero to job-ready. No guesswork.",
    icon: Map,
  },
];

export default function FeaturesGrid() {
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
            <h2 className="h2 mb-4">Everything you need to land the role</h2>
            <p className="body-lg" style={{ color: "var(--text-secondary)" }}>
              No fluff. No paywalls.<br />Just the path that works.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, type: "spring", bounce: 0, delay: i * 0.055 }}
              className="card p-6 group cursor-pointer"
            >
              <div
                className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center mb-4 transition-colors"
                style={{ background: "var(--accent-muted)" }}
              >
                <motion.div
                  className="transition-transform duration-240"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <feature.icon size={20} style={{ color: "var(--accent)" }} />
                </motion.div>
              </div>
              <h3 className="text-[16px] font-medium" style={{ color: "var(--text-primary)" }}>
                {feature.title}
              </h3>
              <p className="text-[14px] mt-[6px] leading-[1.65]" style={{ color: "var(--text-secondary)" }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
