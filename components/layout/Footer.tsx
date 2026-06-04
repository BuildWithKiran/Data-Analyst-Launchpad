"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-base)", borderTop: "1px solid var(--border)" }}>
      <div className="container mx-auto">
        <div className="pt-[56px] pb-[32px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16">
            
            {/* Column 1: Brand */}
            <div className="md:col-span-6 flex flex-col items-start">
              <Link href="/" className="flex items-center gap-3 outline-none group mb-4" aria-label="Home">
                <img src="/logo.png" alt="DAL Logo" className="w-8 h-8 rounded-lg transition-transform group-hover:scale-105" />
                <span className="font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                  Launchpad
                </span>
              </Link>
              <p className="text-[14px] mb-6" style={{ color: "var(--text-secondary)" }}>
                Your roadmap to a data career.
              </p>
              <div className="flex items-center gap-4 text-[13px] font-medium mt-2">
                <a href="https://github.com/BuildWithKiran" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                  GitHub <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Column 2: Learn */}
            <div className="md:col-span-3">
              <h4 className="text-[14px] font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                Learn
              </h4>
              <ul className="space-y-3">
                <li><Link href="/roadmaps" className="btn-link">Roadmaps</Link></li>
                <li><Link href="/interview" className="btn-link">Interview Questions</Link></li>
                <li><Link href="/projects" className="btn-link">Projects</Link></li>
                <li><Link href="/cheatsheets" className="btn-link">Cheat Sheets</Link></li>
                <li><Link href="/resources" className="btn-link">Resources</Link></li>
              </ul>
            </div>

            {/* Column 3: Platform */}
            <div className="md:col-span-3">
              <h4 className="text-[14px] font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                Platform
              </h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="btn-link">About</Link></li>
                <li><Link href="#" className="btn-link">Changelog</Link></li>
                <li><a href="https://github.com/BuildWithKiran" target="_blank" rel="noopener noreferrer" className="btn-link">GitHub</a></li>
                <li><a href="https://github.com/BuildWithKiran/Data-Analyst-Launchpad" target="_blank" rel="noopener noreferrer" className="btn-link">Star on GitHub</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div
            className="pt-[24px] text-center text-[13px] flex flex-wrap justify-center items-center gap-[8px]"
            style={{ borderTop: "1px solid var(--border)", color: "var(--text-tertiary)" }}
          >
            <span>© 2026 Data Analyst Launchpad</span>
            <span>·</span>
            <span>Open Source</span>
            <span>·</span>
            <span>Built for freshers</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
