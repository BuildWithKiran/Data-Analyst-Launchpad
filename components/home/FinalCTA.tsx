"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="w-full pb-[100px]" style={{ background: "var(--bg-base)" }}>
      <div className="container mx-auto">
        <motion.div
          className="text-center relative overflow-hidden"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-accent)",
            borderRadius: "16px",
            padding: "80px 64px",
            maxWidth: "860px",
            margin: "0 auto",
          }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="display" style={{ fontSize: "48px", marginBottom: "24px" }}>
            Start your data analyst journey{" "}
            <span style={{ color: "var(--accent)" }}>today.</span>
          </h2>
          
          <p className="text-[18px] max-w-[500px] mx-auto mb-10" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Free. Structured. Built for freshers.<br />
            No account needed — just start learning.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-[12px] mb-8">
            <a href="/roadmaps" className="btn-primary">
              Start Learning →
            </a>
            <Link href="/roadmaps" className="btn-ghost">
              Browse Roadmaps
            </Link>
          </div>

          <div className="text-[12px] flex flex-wrap justify-center items-center gap-[8px]" style={{ color: "var(--text-tertiary)" }}>
            <span>No sign up required</span>
            <span>·</span>
            <span>100% free</span>
            <span>·</span>
            <span>Open source</span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
