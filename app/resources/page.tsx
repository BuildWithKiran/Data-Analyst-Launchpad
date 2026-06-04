"use client";

import React, { useState } from"react";
import { resources, resourceCategories } from"@/lib/data/resources";
import { ExternalLink, Clock, BookOpen, Video, FileText, Wrench, Book, Code2, Filter } from"lucide-react";

const typeIcons: Record<string, React.ElementType> = {
  Article: FileText,
  Course: BookOpen,
  Video: Video,
  Book: Book,
  Tool: Wrench,
  Documentation: Code2,
};

const typeColors: Record<string, string> = {
  Article:"#3B82F6",
  Course:"#8B5CF6",
  Video:"#EF4444",
  Book:"#F59E0B",
  Tool:"#10B981",
  Documentation:"#06B6D4",
};

const difficultyColors: Record<string, string> = {
  Beginner:"#10B981",
  Intermediate:"#F59E0B",
  Advanced:"#EF4444",
};

const categoryColors: Record<string, string> = {
  SQL:"#3B82F6",
  Excel:"#10B981",
  Python:"#8B5CF6","Power BI":"#F59E0B",
  Statistics:"#06B6D4",
  Career:"#EC4899",
};

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = resources.filter((r) => {
    if (activeCategory !=="All" && r.category !== activeCategory) return false;
    if (activeDifficulty !=="All" && r.difficulty !== activeDifficulty) return false;
    if (activeType !=="All" && r.type !== activeType) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const types = ["All","Article","Course","Video","Documentation","Tool","Book"];
  const difficulties = ["All","Beginner","Intermediate","Advanced"];

  return (
    <div style={{ background:"var(--bg-primary)", minHeight:"100vh" }}>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{ background:'var(--bg-muted)', border:"1px solid rgba(59,130,246,0.3)", color:"#3B82F6" }}
            >
              <BookOpen size={14} />
              Curated Library
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold mb-4" style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}>
              Learning{""}
              <span className="gradient-text">Resources</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color:"var(--text-secondary)" }}>
              Hand-picked tutorials, courses, videos, and documentation to accelerate your data analytics journey.
            </p>
          </div>

          {/* Filters */}
          <div className="card p-4 sm:p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={16} style={{ color:"var(--text-muted)" }} />
              <span className="text-sm font-medium" style={{ color:"var(--text-secondary)" }}>Filter Resources</span>
            </div>
            <div className="space-y-3">
              {/* Search */}
              <input
                id="resource-search"
                type="text"
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  background:"var(--bg-muted)",
                  border:"1px solid var(--border)",
                  color:"var(--text-primary)",
                }}
                aria-label="Search resources"
              />
              {/* Category */}
              <div className="flex flex-wrap gap-2">
                {resourceCategories.map((cat) => (
                  <button
                    key={cat}
                    id={`filter-category-${cat.toLowerCase().replace(/\s+/g,"-")}`}
                    onClick={() => setActiveCategory(cat)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: activeCategory === cat ? (categoryColors[cat] ||"#3B82F6") +"20" :"var(--bg-muted)",
                      color: activeCategory === cat ? (categoryColors[cat] ||"#3B82F6") :"var(--text-muted)",
                      border:`1px solid ${activeCategory === cat ? (categoryColors[cat] ||"#3B82F6") +"50" :"var(--border)"}`,
                    }}
                    aria-pressed={activeCategory === cat}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {/* Difficulty */}
              <div className="flex flex-wrap gap-2">
                {difficulties.map((d) => (
                  <button
                    key={d}
                    id={`filter-difficulty-${d.toLowerCase()}`}
                    onClick={() => setActiveDifficulty(d)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: activeDifficulty === d ? (difficultyColors[d] ||"#3B82F6") +"20" :"var(--bg-muted)",
                      color: activeDifficulty === d ? (difficultyColors[d] ||"#3B82F6") :"var(--text-muted)",
                      border:`1px solid ${activeDifficulty === d ? (difficultyColors[d] ||"#3B82F6") +"50" :"var(--border)"}`,
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
              {/* Type */}
              <div className="flex flex-wrap gap-2">
                {types.map((t) => (
                  <button
                    key={t}
                    id={`filter-type-${t.toLowerCase()}`}
                    onClick={() => setActiveType(t)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: activeType === t ? (typeColors[t] ||"#3B82F6") +"20" :"var(--bg-muted)",
                      color: activeType === t ? (typeColors[t] ||"#3B82F6") :"var(--text-muted)",
                      border:`1px solid ${activeType === t ? (typeColors[t] ||"#3B82F6") +"50" :"var(--border)"}`,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm" style={{ color:"var(--text-muted)" }}>
              Showing <span className="font-semibold" style={{ color:"var(--text-primary)" }}>{filtered.length}</span> resources
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource) => {
              const TypeIcon = typeIcons[resource.type] || FileText;
              return (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`resource-${resource.id}`}
                  className="card p-6 group block"
                  aria-label={`${resource.title}: ${resource.description}`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: (typeColors[resource.type] ||"#3B82F6") +"20" }}
                    >
                      <TypeIcon size={18} style={{ color: typeColors[resource.type] ||"#3B82F6" }} />
                    </div>
                    <div className="flex items-center gap-2">
                      {resource.free && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ background:"rgba(16,185,129,0.15)", color:"#10B981", border:"1px solid rgba(16,185,129,0.3)" }}
                        >
                          Free
                        </span>
                      )}
                      <ExternalLink size={14} style={{ color:"var(--text-muted)" }} className="group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-sm mb-2" style={{ color:"var(--text-primary)" }}>
                    {resource.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color:"var(--text-secondary)" }}>
                    {resource.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: (categoryColors[resource.category] ||"#3B82F6") +"20",
                        color: categoryColors[resource.category] ||"#3B82F6",
                      }}
                    >
                      {resource.category}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: (difficultyColors[resource.difficulty]) +"20",
                        color: difficultyColors[resource.difficulty],
                      }}
                    >
                      {resource.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color:"var(--text-muted)" }}>
                      <Clock size={11} /> {resource.estimatedTime}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <BookOpen size={48} className="mx-auto mb-4 opacity-20" style={{ color:"var(--text-muted)" }} />
              <p className="text-lg font-medium" style={{ color:"var(--text-muted)" }}>No resources match your filters</p>
              <button
                onClick={() => { setActiveCategory("All"); setActiveDifficulty("All"); setActiveType("All"); setSearch(""); }}
                className="mt-4 text-sm text-blue-400 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
