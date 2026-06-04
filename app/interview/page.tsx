"use client";

import Link from 'next/link';
import {
  Database,
  FileSpreadsheet,
  Code2,
  BarChart3,
  Users,
  BookOpen,
  ArrowRight,
  Trophy,
  Layers,
  Star,
  TrendingUp,
} from 'lucide-react';
import { allCategories } from '@/lib/data/interview';

const categoryIcons: Record<string, React.ReactNode> = {
  sql: <Database size={24} />,
  excel: <FileSpreadsheet size={24} />,
  python: <Code2 size={24} />,
  powerbi: <BarChart3 size={24} />,
  hr: <Users size={24} />,
  'case-studies': <BookOpen size={24} />,
};

const categoryDescriptions: Record<string, string> = {
  sql: 'Master SELECT, JOINs, Window Functions, CTEs, indexes, and query optimization. Essential for every data role.',
  excel: 'VLOOKUP, INDEX-MATCH, Pivot Tables, Power Query, dynamic arrays, and dashboard building techniques.',
  python: 'Pandas, NumPy, EDA workflows, matplotlib & seaborn visualization, and performance optimization.',
  powerbi: 'DAX measures, data modeling, star schema, RLS, time intelligence, and DirectQuery vs Import.',
  hr: 'Behavioral questions, career narrative, salary negotiation, and company-fit answers using STAR method.',
  'case-studies': 'Real-world analytical scenarios: churn analysis, revenue drops, A/B testing, and metric frameworks.',
};

const totalQuestions = allCategories.reduce((sum, c) => sum + c.count, 0);

const heroStats = [
  { label: 'Total Questions', value: totalQuestions, icon: <Trophy size={16} /> },
  { label: 'Categories', value: allCategories.length, icon: <Layers size={16} /> },
  { label: 'Difficulty Levels', value: 3, icon: <Star size={16} /> },
  { label: 'Avg. Answer Length', value: '4–5 sentences', icon: <TrendingUp size={16} /> },
];

export default function InterviewPage() {
  return (
    <main className="w-full pb-20">
      
      {/* Hero Section */}
      <section className="pt-[120px] pb-[80px]" style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}>
        <div className="container mx-auto text-center max-w-[800px]">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6" style={{ background: "var(--accent-muted)", borderColor: "var(--border-accent)" }}>
            <Trophy size={14} style={{ color: "var(--accent)" }} />
            <span className="text-[13px] font-medium" style={{ color: "var(--accent)" }}>
              Interview Preparation Hub
            </span>
          </div>

          <h1 className="display mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
            Ace Your Data Analyst Interview
          </h1>

          <p className="body-lg mb-10 max-w-[600px] mx-auto" style={{ color: "var(--text-secondary)" }}>
            {totalQuestions} curated questions with detailed answers across all key domains. 
            Filter by difficulty, bookmark favourites, and practice until you're confident.
          </p>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="card p-4 flex flex-col items-center justify-center text-center"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: "var(--accent-muted)", color: "var(--accent)" }}
                >
                  {stat.icon}
                </div>
                <div className="text-[20px] font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                  {stat.value}
                </div>
                <div className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Category Cards */}
      <section className="section">
        <div className="container mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="h2 mb-3">Choose a Category</h2>
            <p className="body" style={{ color: "var(--text-secondary)" }}>
              Each category has in-depth questions and model answers reviewed for accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCategories.map((category) => (
              <Link
                key={category.id}
                href={`/interview/${category.id}`}
                className="card p-6 block group transition-all hover:-translate-y-1 hover:border-[var(--border-accent)]"
              >
                <div className="flex items-start justify-between mb-6">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-[10px] flex items-center justify-center transition-colors group-hover:bg-[var(--accent)] group-hover:text-white"
                    style={{ background: "var(--accent-muted)", color: "var(--accent)" }}
                  >
                    {categoryIcons[category.id]}
                  </div>

                  {/* Question Count Badge */}
                  <div
                    className="px-3 py-1 rounded-full text-[12px] font-medium"
                    style={{ background: "var(--bg-raised)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                  >
                    {category.count} Qs
                  </div>
                </div>

                <h3 className="text-[18px] font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  {category.label}
                </h3>
                
                <p className="text-[14px] leading-[1.6] mb-6 min-h-[66px]" style={{ color: "var(--text-secondary)" }}>
                  {categoryDescriptions[category.id]}
                </p>

                {/* Difficulty Breakdowns */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {(['Easy', 'Medium', 'Hard'] as const).map((diff) => {
                    const count = category.questions.filter((q) => q.difficulty === diff).length;
                    const diffColors = { Easy: "var(--success)", Medium: "var(--warning)", Hard: "var(--danger)" };
                    const diffBg = { Easy: "color-mix(in srgb, var(--success) 12%, transparent)", Medium: "color-mix(in srgb, var(--warning) 12%, transparent)", Hard: "color-mix(in srgb, var(--danger) 12%, transparent)" };
                    
                    return (
                      <span
                        key={diff}
                        className="px-[8px] py-[3px] rounded-[4px] text-[11px] font-medium"
                        style={{ color: diffColors[diff], background: diffBg[diff] }}
                      >
                        {count} {diff}
                      </span>
                    );
                  })}
                </div>

                {/* CTA */}
                <div
                  className="flex items-center gap-2 text-[14px] font-medium transition-colors group-hover:text-[var(--accent-hover)]"
                  style={{ color: "var(--accent)" }}
                >
                  Start Practicing <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
          
        </div>
      </section>

    </main>
  );
}
