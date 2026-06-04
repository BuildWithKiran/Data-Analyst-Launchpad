"use client";

import React from"react";
import Link from"next/link";
import {
  Map,
  Briefcase,
  Target,
  Code2,
  FileText,
  BookOpen,
  TrendingUp,
  Award,
  Users,
  ArrowRight,
} from"lucide-react";

const features = [
  {
    icon: Map,
    color:"#3B82F6",
    bg:"rgba(59,130,246,0.12)",
    title:"Interactive Roadmaps",
    description:"Visual, step-by-step learning paths for SQL, Excel, Python, and Power BI. Track your progress with checkboxes and see how far you've come.",
    href:"/roadmaps",
    badge:"4 Roadmaps",
  },
  {
    icon: Briefcase,
    color:"#8B5CF6",
    bg:"rgba(139,92,246,0.12)",
    title:"Real-World Projects",
    description:"10 hands-on projects from beginner sales dashboards to advanced BI systems. Each project includes datasets, solutions, and GitHub links.",
    href:"/projects",
    badge:"10 Projects",
  },
  {
    icon: Target,
    color:"#06B6D4",
    bg:"rgba(6,182,212,0.12)",
    title:"Interview Preparation",
    description:"80+ categorized interview questions with detailed answers. SQL, Excel, Python, Power BI, HR rounds, and case studies.",
    href:"/interview",
    badge:"80+ Questions",
  },
  {
    icon: Code2,
    color:"#F59E0B",
    bg:"rgba(245,158,11,0.12)",
    title:"Practice Platform",
    description:"Solve SQL, Python, and Excel challenges with difficulty levels. Timer-based practice with instant solutions to sharpen your skills.",
    href:"/practice",
    badge:"100+ Challenges",
  },
  {
    icon: FileText,
    color:"#10B981",
    bg:"rgba(16,185,129,0.12)",
    title:"Cheat Sheets",
    description:"Printable quick-reference sheets for SQL, Excel, Python, Pandas, NumPy, Power BI DAX, Statistics, and more.",
    href:"/cheatsheets",
    badge:"10 Sheets",
  },
  {
    icon: BookOpen,
    color:"#EF4444",
    bg:"rgba(239,68,68,0.12)",
    title:"Resources Library",
    description:"Curated tutorials, videos, books, and tools for every topic. Filtered by category, difficulty, and estimated time.",
    href:"/resources",
    badge:"50+ Resources",
  },
  {
    icon: TrendingUp,
    color:"#EC4899",
    bg:"rgba(236,72,153,0.12)",
    title:"Career Tracker",
    description:"Personal dashboard to track study streaks, learning progress, project completion, and interview readiness with charts.",
    href:"/career",
    badge:"Visual Analytics",
  },
  {
    icon: Award,
    color:"#F97316",
    bg:"rgba(249,115,22,0.12)",
    title:"Resume Builder",
    description:"ATS-optimized resume templates, checklists, LinkedIn guide, and portfolio tips tailored for Data Analyst roles.",
    href:"/resume",
    badge:"ATS Optimized",
  },
  {
    icon: Users,
    color:"#84CC16",
    bg:"rgba(132,204,22,0.12)",
    title:"Community",
    description:"Join forums, share projects, read success stories, find study partners, and get support from fellow learners.",
    href:"/community",
    badge:"10K+ Members",
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="section"
      style={{ background:"var(--bg-primary)" }}
      aria-label="Platform features"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{
              background:"rgba(139, 92, 246, 0.1)",
              border:"1px solid rgba(139, 92, 246, 0.3)",
              color:"#8B5CF6",
            }}
          >
            Full Feature Set
          </div>
          <h2
            className="text-3xl sm:text-4xl font-semibold mb-4"
            style={{ fontFamily:"Outfit, sans-serif" }}
          >
            Your Complete{""}
            <span className="gradient-text-accent">Data Analytics</span> Hub
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color:"var(--text-secondary)" }}>
            From your first SELECT statement to your first job offer — we&apos;ve got every step covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="card p-6 group block"
              id={`feature-${feature.title.toLowerCase().replace(/\s+/g,"-")}`}
              aria-label={`${feature.title}: ${feature.description}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: feature.bg }}
                >
                  <feature.icon size={22} style={{ color: feature.color }} />
                </div>
                <span
                  className="badge"
                  style={{
                    background: feature.bg,
                    color: feature.color,
                    border:`1px solid ${feature.color}40`,
                  }}
                >
                  {feature.badge}
                </span>
              </div>

              {/* Content */}
              <h3
                className="font-semibold text-lg mb-2 transition-colors"
                style={{ color:"var(--text-primary)" }}
              >
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color:"var(--text-secondary)" }}>
                {feature.description}
              </p>

              {/* CTA */}
              <div
                className="flex items-center gap-1.5 text-sm font-medium transition-all group-hover:gap-2.5"
                style={{ color: feature.color }}
              >
                Explore
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
