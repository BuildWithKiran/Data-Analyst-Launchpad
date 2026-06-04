"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Search, Moon, Sun, ChevronDown, ChevronRight, Menu, X, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchModal from "@/components/search/SearchModal";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Roadmaps",
    href: "/roadmaps",
    dropdown: [
      { label: "SQL Roadmap", href: "/roadmaps/sql" },
      { label: "Excel Roadmap", href: "/roadmaps/excel" },
      { label: "Python Roadmap", href: "/roadmaps/python" },
      { label: "Power BI Roadmap", href: "/roadmaps/powerbi" },
    ],
  },
  { label: "Interview", href: "/interview" },
  { label: "Resources", href: "/resources" },
  {
    label: "More",
    href: "#",
    dropdown: [
      { label: "Projects", href: "/projects" },
      { label: "Cheat Sheets", href: "/cheatsheets" },
      { label: "Resume Guide", href: "/resume" },
      { label: "About", href: "/about" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Dropdown hover handling
  const handleMouseEnter = (label: string) => setOpenDropdown(label);
  const handleMouseLeave = () => setOpenDropdown(null);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[56px] flex items-center transition-all duration-300 ${
        scrolled ? "border-b" : "border-b border-transparent"
      }`}
      style={{
        background: scrolled ? "color-mix(in srgb, var(--bg-base) 82%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(160%)" : "none",
        borderColor: scrolled ? "var(--border)" : "transparent",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-full">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 outline-none group" aria-label="Home">
          <img src="/logo.png" alt="DAL Logo" className="w-8 h-8 rounded-lg transition-transform group-hover:scale-105" />
          <span className="font-semibold tracking-tight hidden sm:block" style={{ color: "var(--text-primary)" }}>
            Launchpad
          </span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-1 h-full">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative h-full flex items-center"
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-1.5 text-[14px] font-medium transition-colors"
                style={{
                  color: pathname === item.href || openDropdown === item.label ? "var(--text-primary)" : "var(--text-secondary)",
                }}
              >
                {item.label}
                {item.dropdown && <ChevronDown size={14} className="opacity-60" />}
              </Link>
              
              {/* Active underline indicator */}
              {(pathname === item.href && !item.dropdown) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-3 right-3 h-[2px]"
                  style={{ background: "var(--accent)" }}
                />
              )}

              {/* Dropdown */}
              {item.dropdown && (
                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute top-[50px] left-0 min-w-[200px] rounded-[10px] p-1.5"
                      style={{
                        background: "var(--bg-overlay)",
                        border: "1px solid var(--border)",
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 12px 32px rgba(0,0,0,0.12)"
                      }}
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="flex items-center px-[10px] py-[7px] text-[14px] rounded-[6px] transition-colors"
                          style={{ color: "var(--text-secondary)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--bg-raised)";
                            e.currentTarget.style.color = "var(--text-primary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "var(--text-secondary)";
                          }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] border border-transparent transition-colors hover:border-[var(--border)]"
            style={{ color: "var(--text-tertiary)", background: "var(--bg-surface)" }}
          >
            <Search size={14} />
            Search
            <kbd className="ml-2 font-mono text-[10px] px-1 rounded border border-[var(--border)] bg-[var(--bg-raised)]">Ctrl K</kbd>
          </button>

          {mounted && (
            <button
              onClick={() => toggleTheme()}
              className="btn-icon"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </motion.div>
              </AnimatePresence>
            </button>
          )}

          <a
            href="/roadmaps"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-[13px] font-medium text-white transition-transform hover:-translate-y-[1px] active:scale-95"
            style={{ background: "var(--accent)" }}
          >
            Start Learning
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="sm:hidden btn-icon ml-1"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: "var(--bg-base)" }}
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <span className="font-semibold" style={{ fontFamily: "Outfit, sans-serif" }}>Menu</span>
              <button
                className="btn-icon"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <Link
                    href={item.href}
                    className="py-3 px-4 rounded-lg font-medium text-lg transition-colors"
                    style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
                    onClick={() => {
                      if (!item.dropdown) setMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                  
                  {item.dropdown && (
                    <div className="flex flex-col gap-1 pl-4 mt-2 border-l-2 border-[var(--border)] ml-4">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="py-2 px-4 rounded-lg text-sm"
                          style={{ color: "var(--text-secondary)" }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col gap-3">
                <a
                  href="/roadmaps"
                  className="btn-primary w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Learning
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
