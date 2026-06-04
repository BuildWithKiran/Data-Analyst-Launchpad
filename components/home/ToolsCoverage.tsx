"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, BarChart3, Code2, TrendingUp, Table, PieChart } from "lucide-react";

const tools = [
  { name: "SQL", topics: "24 topics", cov: 85, icon: Database },
  { name: "Excel", topics: "18 topics", cov: 78, icon: Table },
  { name: "Python", topics: "22 topics", cov: 72, icon: Code2 },
  { name: "Power BI", topics: "16 topics", cov: 68, icon: TrendingUp },
  { name: "Pandas", topics: "14 topics", cov: 65, icon: BarChart3 },
  { name: "Statistics", topics: "10 topics", cov: 60, icon: PieChart },
];

export default function ToolsCoverage() {
  return (
    <section className="section" style={{ background: "var(--bg-surface)" }}>
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
            <h2 className="h2 mb-4">Master the tools that get you hired</h2>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, type: "spring", bounce: 0, delay: i * 0.055 }}
              className="card p-6 transition-all hover:border-[var(--accent)] hover:-translate-y-[3px]"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-[44px] h-[44px] rounded-[10px] flex items-center justify-center"
                  style={{ background: "var(--accent-muted)" }}
                >
                  <tool.icon size={22} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <h3 className="text-[15px] font-medium" style={{ color: "var(--text-primary)" }}>
                    {tool.name}
                  </h3>
                  <div className="text-[12px]" style={{ color: "var(--text-tertiary)" }}>
                    {tool.topics}
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-[2px] rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "var(--accent)" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tool.cov}%` }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + (i * 0.05) }}
                  />
                </div>
                <div className="text-[12px] font-medium w-[32px] text-right" style={{ color: "var(--text-secondary)" }}>
                  {tool.cov}%
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
