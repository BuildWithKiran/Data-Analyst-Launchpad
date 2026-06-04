"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, PlayCircle } from "lucide-react";

const headline = "Become a Job-Ready Data Analyst";

export default function HeroSection() {
  const headlineWords = headline.split(" ");

  return (
    <section className="relative w-full pt-[120px] pb-[100px] overflow-hidden" style={{ background: "var(--bg-base)" }}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: 55% */}
          <div className="lg:col-span-7 pr-0 lg:pr-8">
            
            {/* Eyebrow Pill */}
            <motion.div
              className="inline-flex items-center gap-2 px-[14px] py-[5px] rounded-full border mb-6"
              style={{ background: "var(--bg-raised)", borderColor: "var(--border)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
            >
              <div className="relative flex items-center justify-center w-2 h-2">
                <span className="absolute w-2 h-2 rounded-full" style={{ background: "var(--success)" }} />
                <motion.span
                  className="absolute w-2 h-2 rounded-full"
                  style={{ background: "var(--success)" }}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
                Open Source · 100% Free
              </span>
            </motion.div>

            {/* Headline */}
            <div className="mb-6 max-w-[600px]">
              <h1 className="display m-0 p-0 flex flex-wrap gap-[12px] leading-[1.05]">
                {headlineWords.map((word, i) => {
                  const isAccent = word === "Job-Ready";
                  return (
                    <motion.span
                      key={i}
                      className={isAccent ? "" : ""}
                      style={{ color: isAccent ? "var(--accent)" : "var(--text-primary)" }}
                      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.42, delay: i * 0.04 }}
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </h1>
            </div>

            {/* Subheadline */}
            <motion.p
              className="text-[18px] max-w-[500px] leading-[1.75] mb-8"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.36 }}
            >
              Master the complete data analyst stack — SQL, Excel, Python, Power BI, Pandas and NumPy — through structured roadmaps built for freshers and career switchers.
            </motion.p>

            {/* Feature List */}
            <motion.div
              className="flex flex-col gap-[18px] mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, delay: 0.44 }}
            >
              {[
                { title: "500+ interview questions", desc: "SQL, Python, Excel, Power BI — with answers" },
                { title: "Visual learning roadmaps", desc: "Topic-by-topic, not scattered playlists" },
                { title: "Real-world projects", desc: "Datasets, walkthroughs, GitHub templates" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Check size={16} style={{ color: "var(--success)" }} />
                    <span className="text-[15px] font-medium" style={{ color: "var(--text-primary)" }}>{item.title}</span>
                  </div>
                  <div className="text-[13px] pl-6" style={{ color: "var(--text-tertiary)" }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-[12px]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, delay: 0.52 }}
            >
              <a href="/roadmaps" className="btn-primary">
                Start Learning →
              </a>
              <Link href="/roadmaps" className="btn-ghost">
                <PlayCircle size={18} />
                View Roadmap
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              className="mt-8 text-[12px]"
              style={{ color: "var(--text-tertiary)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              Trusted by analysts from TCS · Infosys · Wipro · Cognizant and top product startups
            </motion.div>

          </div>

          {/* RIGHT COLUMN: 45% */}
          <div className="lg:col-span-5 relative" style={{ perspective: "1200px" }}>
            <motion.div
              className="w-full relative overflow-hidden"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "14px"
              }}
              initial={{ opacity: 0, y: 28, rotateX: 3 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Left Accent Bar */}
              <div
                className="absolute left-[-1px] top-[40px] w-[3px] h-[60px] rounded-full"
                style={{ background: "var(--accent)" }}
              />

              {/* Top Bar */}
              <div className="px-[20px] py-[16px] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="px-[6px] py-[2px] rounded-[4px] text-[11px] font-medium"
                    style={{ background: "color-mix(in srgb, var(--warning) 15%, transparent)", color: "var(--warning)" }}
                  >
                    Medium
                  </span>
                  <span className="text-[15px] font-medium" style={{ color: "var(--text-primary)" }}>
                    Find Top Earners by Department
                  </span>
                </div>
                <span className="text-[13px]" style={{ color: "var(--text-tertiary)" }}>
                  SQL · #47
                </span>
              </div>

              <div className="w-full h-[1px]" style={{ background: "var(--border)" }} />

              {/* Problem */}
              <div className="px-[20px] py-[16px]">
                <p className="text-[13px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
                  Given an employees table, write a query to return the top 2 earners from each department using window functions.
                </p>
              </div>

              {/* Code Block */}
              <div
                className="mx-[20px] mb-[16px] p-[14px] px-[16px] rounded-[8px] overflow-x-auto"
                style={{ background: "var(--bg-base)" }}
              >
                <pre className="code-font leading-[1.6]">
                  <span style={{ color: "var(--accent)" }}>SELECT</span>{" "}
                  <span style={{ color: "var(--text-primary)" }}>department, name, salary</span>
                  <br />
                  <span style={{ color: "var(--accent)" }}>FROM</span> <span style={{ color: "var(--text-primary)" }}>(</span>
                  <br />
                  {"  "}<span style={{ color: "var(--accent)" }}>SELECT</span> <span style={{ color: "var(--text-primary)" }}>*,</span>
                  <br />
                  {"    "}<span style={{ color: "var(--text-primary)" }}>RANK()</span> <span style={{ color: "var(--accent)" }}>OVER</span> <span style={{ color: "var(--text-primary)" }}>(</span>
                  <br />
                  {"      "}<span style={{ color: "var(--accent)" }}>PARTITION BY</span> <span style={{ color: "var(--text-primary)" }}>department</span>
                  <br />
                  {"      "}<span style={{ color: "var(--accent)" }}>ORDER BY</span> <span style={{ color: "var(--text-primary)" }}>salary</span> <span style={{ color: "var(--accent)" }}>DESC</span>
                  <br />
                  {"    "}<span style={{ color: "var(--text-primary)" }}>)</span> <span style={{ color: "var(--accent)" }}>AS</span> <span style={{ color: "var(--text-primary)" }}>rnk</span>
                  <br />
                  {"  "}<span style={{ color: "var(--accent)" }}>FROM</span> <span style={{ color: "var(--text-primary)" }}>employees</span>
                  <br />
                  <span style={{ color: "var(--text-primary)" }}>) ranked</span>
                  <br />
                  <span style={{ color: "var(--accent)" }}>WHERE</span> <span style={{ color: "var(--text-primary)" }}>rnk {"<="} </span><span style={{ color: "var(--success)" }}>2</span><span style={{ color: "var(--text-primary)" }}>;</span>
                </pre>
              </div>

              {/* Bottom Bar */}
              <div className="px-[20px] py-[12px] flex items-center justify-between" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                <span className="text-[12px]" style={{ color: "var(--text-tertiary)" }}>
                  47 solutions · 1.2k attempts
                </span>
                <Link href="/practice" className="text-[13px] font-medium transition-colors hover:underline" style={{ color: "var(--accent)" }}>
                  Solve →
                </Link>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
