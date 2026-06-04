"use client";

import { useState } from 'react';
import Link from 'next/link';
import { projects, Project } from '@/lib/data/projects';
import { ArrowRight, Clock, Wrench, Star } from 'lucide-react';

type LevelFilter = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';

const LEVEL_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Beginner: { bg: 'color-mix(in srgb, var(--success) 15%, transparent)', text: 'var(--success)', border: 'color-mix(in srgb, var(--success) 40%, transparent)' },
  Intermediate: { bg: 'color-mix(in srgb, var(--warning) 15%, transparent)', text: 'var(--warning)', border: 'color-mix(in srgb, var(--warning) 40%, transparent)' },
  Advanced: { bg: 'color-mix(in srgb, var(--danger) 15%, transparent)', text: 'var(--danger)', border: 'color-mix(in srgb, var(--danger) 40%, transparent)' },
};

function LevelBadge({ level }: { level: Project['level'] }) {
  const colors = LEVEL_COLORS[level];
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
    >
      <Star size={10} fill="currentColor" />
      {level}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="card p-6 flex flex-col gap-4 group transition-all hover:-translate-y-1 hover:border-[var(--border-accent)]">
      
      {/* Top color accent bar (hidden since we use hover border accent, but keeping for fidelity if wanted) */}
      
      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <h3 className="text-[18px] font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
          {project.title}
        </h3>
        <LevelBadge level={project.level} />
      </div>

      {/* Category */}
      <p className="text-[13px] font-medium m-0" style={{ color: project.color || "var(--accent)" }}>
        {project.category}
      </p>

      {/* Description */}
      <p className="text-[14px] leading-[1.65] flex-grow m-0" style={{ color: "var(--text-secondary)" }}>
        {project.description}
      </p>

      {/* Tools */}
      <div className="flex flex-wrap gap-2 mt-2">
        {project.tools.map((tool) => (
          <span
            key={tool}
            className="px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 border"
            style={{
              background: "var(--bg-raised)",
              color: "var(--text-secondary)",
              borderColor: "var(--border)",
            }}
          >
            <Wrench size={10} />
            {tool}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-2 border-t" style={{ borderColor: "var(--border-subtle)" }}>
        <span className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: "var(--text-tertiary)" }}>
          <Clock size={12} />
          {project.duration}
        </span>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors group-hover:text-[var(--accent-hover)]" style={{ color: "var(--accent)" }}>
          View Project <ArrowRight size={14} />
        </div>
      </div>
    </a>
  );
}

const FILTER_OPTIONS: LevelFilter[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function ClientProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<LevelFilter>('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.level === activeFilter);

  const counts: Record<LevelFilter, number> = {
    All: projects.length,
    Beginner: projects.filter((p) => p.level === 'Beginner').length,
    Intermediate: projects.filter((p) => p.level === 'Intermediate').length,
    Advanced: projects.filter((p) => p.level === 'Advanced').length,
  };

  return (
    <div className="w-full pb-20">
      
      {/* Hero Header */}
      <div className="relative pt-[120px] pb-[60px] text-center overflow-hidden" style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}>
        
        <p className="mb-3 text-[13px] font-semibold tracking-[0.12em] uppercase" style={{ color: "var(--accent)" }}>
          Project Showcase
        </p>

        <h1 className="display mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
          Build <span style={{ color: "var(--accent)" }}>Real-World Projects</span>
        </h1>

        <p className="max-w-[600px] mx-auto text-[16px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
          Hands-on analytics projects from beginner to advanced — each built with real datasets, industry tools, and employer-ready deliverables.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex justify-center flex-wrap gap-2.5 py-[40px] px-6">
        {FILTER_OPTIONS.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[14px] font-semibold transition-all border"
              style={{
                background: isActive ? "var(--accent)" : "var(--bg-surface)",
                borderColor: isActive ? "var(--accent)" : "var(--border)",
                color: isActive ? "#FFFFFF" : "var(--text-secondary)",
              }}
            >
              {filter}
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-semibold"
                style={{
                  background: isActive ? "rgba(255,255,255,0.25)" : "var(--bg-raised)",
                  color: isActive ? "#FFFFFF" : "var(--text-tertiary)",
                }}
              >
                {counts[filter]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20" style={{ color: "var(--text-secondary)" }}>
            <p className="text-[17px]">No projects found for this filter.</p>
          </div>
        )}
      </div>

    </div>
  );
}
