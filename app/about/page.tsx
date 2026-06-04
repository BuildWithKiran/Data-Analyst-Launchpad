import React from"react";
import Link from"next/link";
import { Star, Heart, Code2, Users, Zap, Globe, ArrowRight } from"lucide-react";
import { Github } from"@/components/icons";
import type { Metadata } from"next";

export const metadata: Metadata = {
  title:"About — Data Analyst Launchpad",
  description:"Learn about the Data Analyst Launchpad project — a free, open-source platform for aspiring data analysts.",
};

const team = [
  { name:"DAL Community", role:"Open Source Contributors", avatar:"🌍", bio:"Built by data analysts, for data analysts. 100+ contributors from around the world." },
  { name:"You!", role:"Future Contributor", avatar:"🚀", bio:"Spotted an error? Have a suggestion? We welcome all contributions via GitHub." },
];

const techStack = [
  { name:"Next.js 14", description:"React framework with App Router", color:"#000000" },
  { name:"TypeScript", description:"Type-safe JavaScript", color:"#3178C6" },
  { name:"Tailwind CSS", description:"Utility-first styling", color:"#06B6D4" },
  { name:"Framer Motion", description:"Smooth animations", color:"#FF5D5D" },
  { name:"Lucide React", description:"Beautiful icons", color:"#8B5CF6" },
  { name:"Recharts", description:"Data visualization charts", color:"#3B82F6" },
  { name:"Zustand", description:"Lightweight state management", color:"#F59E0B" },
];

const values = [
  { icon:"🆓", title:"Free Forever", description:"Every resource, roadmap, and tool is and will remain completely free." },
  { icon:"🌍", title:"Open Source", description:"All source code is publicly available under the MIT License on GitHub." },
  { icon:"🎯", title:"Practical First", description:"We focus on real-world skills and projects, not just theory." },
  { icon:"🤝", title:"Community-Driven", description:"Content is created and reviewed by working data analytics professionals." },
  { icon:"📈", title:"Always Improving", description:"Regular updates to keep content aligned with industry needs." },
  { icon:"♿", title:"Accessible", description:"Built with accessibility in mind — everyone deserves quality education." },
];

export default function AboutPage() {
  return (
    <div style={{ background:"var(--bg-primary)", minHeight:"100vh" }}>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <div
              className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-[var(--text-inverse)] text-2xl font-semibold"
              style={{ background:"var(--primary)" }}
            >
              DA
            </div>
            <h1
              className="text-4xl sm:text-5xl font-semibold mb-4"
              style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}
            >
              About{""}
              <span className="gradient-text">DAL</span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto mb-8" style={{ color:"var(--text-secondary)" }}>
              Data Analyst Launchpad is a free, open-source learning platform built to help anyone become a job-ready Data Analyst — regardless of background or budget.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/BuildWithKiran"
                target="_blank"
                rel="noopener noreferrer"
                id="btn-github-about"
                className="btn-primary"
                aria-label="View on GitHub"
              >
                <Github size={18} /> View on GitHub
              </a>
            </div>
          </div>

          {/* Mission */}
          <div className="card p-8 sm:p-12 mb-16 text-center relative overflow-hidden">
            <Globe size={40} className="mx-auto mb-4" style={{ color:"#3B82F6" }} />
            <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}>
              Our Mission
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color:"var(--text-secondary)" }}>
              We believe that quality education in data analytics should be accessible to everyone. Whether you are a fresh graduate in a small town, a working professional looking to switch careers, or someone who simply cannot afford expensive courses — <strong style={{ color:"var(--text-primary)" }}>DAL is for you</strong>.
            </p>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-center mb-10" style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}>
              Our <span className="gradient-text">Values</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value) => (
                <div key={value.title} className="card p-6">
                  <div className="text-3xl mb-3">{value.icon}</div>
                  <h3 className="font-semibold mb-2" style={{ color:"var(--text-primary)" }}>{value.title}</h3>
                  <p className="text-sm" style={{ color:"var(--text-secondary)" }}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-center mb-10" style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}>
              Built With ❤️ Using
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="card px-5 py-4 text-center min-w-32"
                >
                  <div className="font-semibold text-sm mb-0.5" style={{ color:"var(--text-primary)" }}>{tech.name}</div>
                  <div className="text-xs" style={{ color:"var(--text-muted)" }}>{tech.description}</div>
                </div>
              ))}
            </div>
          </div>


          {/* License Notice */}
          <div
            className="text-center p-6 rounded-2xl"
            style={{ background:'var(--bg-muted)' }}
          >
            <div className="text-lg mb-2" style={{ color:"#10B981" }}>🟢 MIT License</div>
            <p className="text-sm" style={{ color:"var(--text-secondary)" }}>
              Data Analyst Launchpad is free and open-source software licensed under the MIT License.
              You are free to use, copy, modify, merge, publish, distribute, sublicense, and sell copies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
