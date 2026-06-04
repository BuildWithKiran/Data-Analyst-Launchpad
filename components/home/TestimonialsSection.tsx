"use client";

import React from"react";
import Link from"next/link";
import { ArrowRight, Star, Quote } from"lucide-react";

const testimonials = [
  {
    name:"Priya Sharma",
    role:"Data Analyst @ Infosys",
    avatar:"PS",
    color:"#3B82F6",
    text:"Data Analyst Launchpad changed my life! I went from knowing nothing about SQL to landing my first DA job in 4 months. The roadmap and interview prep are world-class.",
    stars: 5,
  },
  {
    name:"Rahul Kumar",
    role:"Business Analyst @ TCS",
    avatar:"RK",
    color:"#8B5CF6",
    text:"The structured roadmaps and 500+ interview questions gave me the confidence I needed. Got placed at TCS after following this guide religiously for 3 months.",
    stars: 5,
  },
  {
    name:"Sneha Patel",
    role:"BI Developer @ Wipro",
    avatar:"SP",
    color:"#10B981",
    text:"The Power BI roadmap and DAX cheat sheet are incredible. I built my first BI dashboard in week 2. The projects section helped me build a strong portfolio.",
    stars: 5,
  },
  {
    name:"Arjun Nair",
    role:"Data Engineer @ Accenture",
    avatar:"AN",
    color:"#F59E0B",
    text:"Started as a complete fresher. The Python roadmap + practice challenges made me interview-ready. Got 3 offers and joined Accenture. Thank you DAL!",
    stars: 5,
  },
  {
    name:"Divya Menon",
    role:"SQL Developer @ HCL",
    avatar:"DM",
    color:"#06B6D4",
    text:"Best free resource for aspiring data analysts. The SQL roadmap alone is worth more than any paid course. Got my HCL offer after 2 months of practice.",
    stars: 5,
  },
  {
    name:"Karan Singh",
    role:"Data Analyst @ Deloitte",
    avatar:"KS",
    color:"#EC4899",
    text:"The career tracker kept me accountable and the resume builder helped me craft an ATS-friendly CV. DAL is a must-use platform for every fresher.",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section" style={{ background:"var(--bg-primary)" }} aria-label="Success stories">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{
              background:"rgba(16, 185, 129, 0.1)",
              border:"1px solid rgba(16, 185, 129, 0.3)",
              color:"#10B981",
            }}
          >
            ✨ Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ fontFamily:"Outfit, sans-serif" }}>
            From Learners to{""}
            <span className="gradient-text">Data Analysts</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color:"var(--text-secondary)" }}>
            Join thousands of learners who transformed their careers with Data Analyst Launchpad.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-6 relative" role="article">
              {/* Quote Icon */}
              <Quote
                size={32}
                className="absolute top-4 right-4 opacity-10"
                style={{ color: t.color }}
              />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={14} className="fill-current" style={{ color:"#F59E0B" }} />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm leading-relaxed mb-5" style={{ color:"var(--text-secondary)" }}>
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-inverse)] font-semibold text-sm flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color:"var(--text-primary)" }}>
                    {t.name}
                  </div>
                  <div className="text-xs" style={{ color:"var(--text-muted)" }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="card p-8 sm:p-12 text-center relative overflow-hidden"
          style={{ border:"1px solid rgba(59, 130, 246, 0.2)" }}
        >
          <div className="relative z-10">
            <h2
              className="text-3xl sm:text-4xl font-semibold mb-4"
              style={{ fontFamily:"Outfit, sans-serif" }}
            >
              Ready to Start Your{""}
              <span className="gradient-text">Data Journey?</span>
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color:"var(--text-secondary)" }}>
              Join 10,000+ learners who are already on the path to becoming job-ready Data Analysts. It&apos;s completely free.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/roadmaps" id="btn-cta-roadmaps" className="btn-primary" aria-label="Start with roadmaps">
                Start Learning Now
                <ArrowRight size={18} />
              </Link>
              <Link href="/community" id="btn-cta-community" className="btn-secondary" aria-label="Join community">
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
