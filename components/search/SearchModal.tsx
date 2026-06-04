"use client";

import React, { useState, useEffect, useRef } from"react";
import Link from"next/link";
import { Search, X, ArrowRight, Database, BarChart3, Code2, TrendingUp, FileText, Briefcase } from"lucide-react";

const searchData = [
  // Roadmaps
  { title:"SQL Roadmap", category:"Roadmap", href:"/roadmaps/sql", icon: Database },
  { title:"Excel Roadmap", category:"Roadmap", href:"/roadmaps/excel", icon: BarChart3 },
  { title:"Python Roadmap", category:"Roadmap", href:"/roadmaps/python", icon: Code2 },
  { title:"Power BI Roadmap", category:"Roadmap", href:"/roadmaps/powerbi", icon: TrendingUp },
  // Interview
  { title:"SQL Interview Questions", category:"Interview", href:"/interview/sql", icon: Database },
  { title:"Excel Interview Questions", category:"Interview", href:"/interview/excel", icon: BarChart3 },
  { title:"Python Interview Questions", category:"Interview", href:"/interview/python", icon: Code2 },
  { title:"Power BI Interview Questions", category:"Interview", href:"/interview/powerbi", icon: TrendingUp },
  { title:"HR Interview Questions", category:"Interview", href:"/interview/hr", icon: Briefcase },
  { title:"Case Studies", category:"Interview", href:"/interview/case-studies", icon: FileText },
  // Projects
  { title:"Sales Dashboard Project", category:"Project", href:"/projects/sales-dashboard", icon: BarChart3 },
  { title:"Netflix Analysis Project", category:"Project", href:"/projects/netflix-analysis", icon: BarChart3 },
  { title:"Customer Churn Project", category:"Project", href:"/projects/customer-churn", icon: TrendingUp },
  { title:"HR Analytics Project", category:"Project", href:"/projects/hr-analytics", icon: Briefcase },
  // Cheat Sheets
  { title:"SQL Cheat Sheet", category:"Cheat Sheet", href:"/cheatsheets", icon: Database },
  { title:"Pandas Cheat Sheet", category:"Cheat Sheet", href:"/cheatsheets", icon: Code2 },
  { title:"Excel Cheat Sheet", category:"Cheat Sheet", href:"/cheatsheets", icon: BarChart3 },
  { title:"Power BI DAX Cheat Sheet", category:"Cheat Sheet", href:"/cheatsheets", icon: TrendingUp },
  // Resources
  { title:"Resources Hub", category:"Resource", href:"/resources", icon: FileText },
  { title:"Resume Builder", category:"Career", href:"/resume", icon: Briefcase },
  { title:"Career Tracker", category:"Career", href:"/career", icon: TrendingUp },
  { title:"Practice Challenges", category:"Practice", href:"/practice", icon: Code2 },
  { title:"Notes Hub", category:"Notes", href:"/notes", icon: FileText },
  { title:"Community", category:"Community", href:"/community", icon: Briefcase },
];

const categoryColors: Record<string, string> = {
  Roadmap:"#3B82F6",
  Interview:"#8B5CF6",
  Project:"#06B6D4","Cheat Sheet":"#10B981",
  Resource:"#F59E0B",
  Career:"#EF4444",
  Practice:"#F97316",
  Notes:"#84CC16",
  Community:"#EC4899",
};

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.length > 0
    ? searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : searchData.slice(0, 8);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4"
      style={{ background:"rgba(0,0,0,0.7)", backdropFilter:"(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-label="Search"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl card overflow-hidden"
        style={{ border:"1px solid rgba(59, 130, 246, 0.3)" }}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4" style={{ borderBottom:"1px solid var(--border)" }}>
          <Search size={20} style={{ color:"var(--primary)" }} />
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            placeholder="Search roadmaps, questions, projects, cheat sheets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-base outline-none"
            style={{ color:"var(--text-primary)" }}
            aria-label="Search"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background:"var(--bg-muted)", color:"var(--text-muted)" }}
            aria-label="Close search"
          >
            <X size={14} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center" style={{ color:"var(--text-muted)" }}>
              <Search size={32} className="mx-auto mb-2 opacity-30" />
              <p>No results for &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <>
              {!query && (
                <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color:"var(--text-muted)" }}>
                  Quick Links
                </p>
              )}
              {filtered.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  onClick={onClose}
                  id={`search-result-${i}`}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all group"
                  style={{ color:"var(--text-primary)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background ="var(--bg-muted)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background ="transparent";
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-inverse)] flex-shrink-0"
                    style={{ background: categoryColors[item.category] ||"#3B82F6", opacity: 0.9 }}
                  >
                    <item.icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs" style={{ color:"var(--text-muted)" }}>{item.category}</p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    style={{ color:"var(--primary)" }}
                  />
                </Link>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-4 py-3 text-xs"
          style={{
            borderTop:"1px solid var(--border)",
            color:"var(--text-muted)",
            background:"var(--bg-muted)",
          }}
        >
          <span>
            <kbd className="px-1.5 py-0.5 rounded" style={{ background:"var(--bg-secondary)", border:"1px solid var(--border)" }}>↑↓</kbd>
            {""}navigate
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded" style={{ background:"var(--bg-secondary)", border:"1px solid var(--border)" }}>↵</kbd>
            {""}select
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded" style={{ background:"var(--bg-secondary)", border:"1px solid var(--border)" }}>Esc</kbd>
            {""}close
          </span>
        </div>
      </div>
    </div>
  );
}
