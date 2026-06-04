import React from"react";
import Link from"next/link";
import { ArrowRight, Clock, Database, BarChart3, Code2, TrendingUp, CheckCircle } from"lucide-react";
import type { Metadata } from"next";

export const metadata: Metadata = {
  title:"Learning Roadmaps — Data Analyst Launchpad",
  description:"Structured learning roadmaps for SQL, Excel, Python, and Power BI. Follow step-by-step paths to become a job-ready Data Analyst.",
};

const roadmapCards = [
  {
    id:"sql",
    title:"SQL Roadmap",
    icon: Database,
    color:"#3B82F6",
    bg:"rgba(59,130,246,0.1)",
    topics: 15,
    duration:"8–12 weeks",
    level:"Beginner to Advanced",
    description:"The most in-demand skill for data analysts. From basic SELECT to advanced window functions and query optimization.",
    highlights: ["SELECT, WHERE, GROUP BY","JOINs & Subqueries","CTEs & Window Functions","Indexes & Optimization"],
    href:"/roadmaps/sql",
  },
  {
    id:"excel",
    title:"Excel Roadmap",
    icon: BarChart3,
    color:"#10B981",
    bg:"rgba(16,185,129,0.1)",
    topics: 8,
    duration:"6–8 weeks",
    level:"Beginner to Expert",
    description:"Master the world's most widely used business tool for data analysis, reporting, and dashboards.",
    highlights: ["Formulas & Functions","VLOOKUP, INDEX-MATCH","Pivot Tables","Power Query & Dashboards"],
    href:"/roadmaps/excel",
  },
  {
    id:"python",
    title:"Python Roadmap",
    icon: Code2,
    color:"#8B5CF6",
    bg:"rgba(139,92,246,0.1)",
    topics: 9,
    duration:"10–14 weeks",
    level:"Beginner to Pro",
    description:"Learn Python, NumPy, Pandas, and data visualization to unlock powerful data analysis capabilities.",
    highlights: ["Python Basics","NumPy & Pandas","Data Cleaning & EDA","Visualization with Matplotlib"],
    href:"/roadmaps/python",
  },
  {
    id:"powerbi",
    title:"Power BI Roadmap",
    icon: TrendingUp,
    color:"#F59E0B",
    bg:"rgba(245,158,11,0.1)",
    topics: 8,
    duration:"6–8 weeks",
    level:"Beginner to Expert",
    description:"Build stunning interactive dashboards and reports using Power BI, DAX formulas, and data modeling.",
    highlights: ["Power BI Desktop","Data Modeling","DAX Formulas","Dashboard Deployment"],
    href:"/roadmaps/powerbi",
  },
];

const learningPath = [
  { step: 1, title:"SQL", duration:"8 weeks", reason:"Foundation for all data work" },
  { step: 2, title:"Excel", duration:"6 weeks", reason:"Business reporting essentials" },
  { step: 3, title:"Python", duration:"10 weeks", reason:"Advanced analysis & automation" },
  { step: 4, title:"Power BI", duration:"6 weeks", reason:"Data visualization & BI" },
];

export default function RoadmapsPage() {
  return (
    <div style={{ background:"var(--bg-primary)", minHeight:"100vh" }}>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{ background:'var(--bg-muted)', border:"1px solid rgba(59,130,246,0.3)", color:"#3B82F6" }}
            >
              Structured Learning Paths
            </div>
            <h1
              className="text-4xl sm:text-5xl font-semibold mb-4"
              style={{ fontFamily:"Outfit, sans-serif" }}
            >
              Your Data Analyst{""}
              <span className="gradient-text">Roadmaps</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color:"var(--text-secondary)" }}>
              Follow structured, topic-by-topic paths. Each roadmap includes explanations, examples, practice questions, and interview prep.
            </p>
          </div>

          {/* Recommended Path */}
          <div className="card p-6 mb-12">
            <h2 className="font-semibold text-lg mb-4" style={{ color:"var(--text-primary)", fontFamily:"Outfit, sans-serif" }}>
              🗺️ Recommended Learning Order
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {learningPath.map((item) => (
                <div key={item.step} className="text-center">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-[var(--text-inverse)] font-semibold text-lg"
                    style={{ background:"var(--primary)" }}
                  >
                    {item.step}
                  </div>
                  <div className="font-semibold text-sm mb-0.5" style={{ color:"var(--text-primary)" }}>{item.title}</div>
                  <div className="text-xs mb-1" style={{ color:"#10B981" }}>{item.duration}</div>
                  <div className="text-xs" style={{ color:"var(--text-muted)" }}>{item.reason}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {roadmapCards.map((rm) => (
              <Link
                key={rm.id}
                href={rm.href}
                id={`roadmap-card-${rm.id}`}
                className="card p-8 group block"
                aria-label={`${rm.title}: ${rm.description}`}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: rm.bg }}
                  >
                    <rm.icon size={30} style={{ color: rm.color }} />
                  </div>
                  <div>
                    <h2
                      className="text-xl font-semibold mb-1"
                      style={{ color:"var(--text-primary)", fontFamily:"Outfit, sans-serif" }}
                    >
                      {rm.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: rm.bg, color: rm.color }}
                      >
                        {rm.topics} Topics
                      </span>
                      <span className="flex items-center gap-1 text-xs" style={{ color:"var(--text-muted)" }}>
                        <Clock size={11} /> {rm.duration}
                      </span>
                      <span className="text-xs" style={{ color:"var(--text-muted)" }}>
                        {rm.level}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-5" style={{ color:"var(--text-secondary)" }}>
                  {rm.description}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {rm.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-1.5 text-xs" style={{ color:"var(--text-secondary)" }}>
                      <CheckCircle size={12} style={{ color: rm.color, flexShrink: 0 }} />
                      {h}
                    </div>
                  ))}
                </div>

                <div
                  className="flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                  style={{ color: rm.color }}
                >
                  Start Roadmap
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
