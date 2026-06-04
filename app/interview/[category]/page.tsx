"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Search,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  Filter,
  Tag,
} from 'lucide-react';
import { allCategories, InterviewQuestion } from '@/lib/data/interview';

type Difficulty = 'All' | 'Easy' | 'Medium' | 'Hard';

const difficultyColors: Record<string, { bg: string; text: string; border: string }> = {
  Easy: { bg: 'color-mix(in srgb, var(--success) 15%, transparent)', text: 'var(--success)', border: 'color-mix(in srgb, var(--success) 40%, transparent)' },
  Medium: { bg: 'color-mix(in srgb, var(--warning) 15%, transparent)', text: 'var(--warning)', border: 'color-mix(in srgb, var(--warning) 40%, transparent)' },
  Hard: { bg: 'color-mix(in srgb, var(--danger) 15%, transparent)', text: 'var(--danger)', border: 'color-mix(in srgb, var(--danger) 40%, transparent)' },
};

export default function InterviewCategoryPage() {
  const params = useParams();
  const categorySlug = params?.category as string;

  const category = allCategories.find((c) => c.id === categorySlug);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('All');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`bookmarks_${categorySlug}`);
      if (stored) {
        setBookmarkedIds(new Set(JSON.parse(stored)));
      }
    } catch {
      // ignore
    }
  }, [categorySlug]);

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(`bookmarks_${categorySlug}`, JSON.stringify(Array.from(bookmarkedIds)));
    } catch {
      // ignore
    }
  }, [bookmarkedIds, categorySlug]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredQuestions = useMemo(() => {
    if (!category) return [];
    return category.questions.filter((q: InterviewQuestion) => {
      const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const lowerQuery = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        q.question.toLowerCase().includes(lowerQuery) ||
        q.answer.toLowerCase().includes(lowerQuery) ||
        q.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));
      return matchesDifficulty && matchesSearch;
    });
  }, [category, selectedDifficulty, searchQuery]);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="text-[64px]">🔍</div>
        <h1 className="h1">Category Not Found</h1>
        <p className="body max-w-[400px]" style={{ color: "var(--text-secondary)" }}>
          The category &quot;{categorySlug}&quot; does not exist. Please go back and choose a valid category.
        </p>
        <Link href="/interview" className="btn-primary mt-4">
          <ArrowLeft size={16} />
          Back to Interview Hub
        </Link>
      </div>
    );
  }

  const difficulties: Difficulty[] = ['All', 'Easy', 'Medium', 'Hard'];

  return (
    <main className="w-full pb-20">
      {/* Page Header */}
      <section className="pt-10 pb-8" style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}>
        <div className="container mx-auto max-w-[900px] px-6">
          {/* Back link */}
          <Link
            href="/interview"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium mb-5 hover:text-[var(--text-primary)] transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft size={15} />
            Back to Interview Hub
          </Link>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Category color dot */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-2"
              style={{
                background: "var(--bg-raised)",
                borderColor: `color-mix(in srgb, ${category.color} 30%, transparent)`,
              }}
            >
              <div
                className="w-3.5 h-3.5 rounded-full"
                style={{ background: category.color }}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-[28px] font-semibold" style={{ color: "var(--text-primary)" }}>
                  {category.label} Interview Questions
                </h1>
                <span
                  className="px-3 py-1 rounded-full text-[13px] font-semibold border"
                  style={{
                    background: "var(--bg-raised)",
                    color: category.color,
                    borderColor: `color-mix(in srgb, ${category.color} 30%, transparent)`,
                  }}
                >
                  {category.count} Questions
                </span>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {(['Easy', 'Medium', 'Hard'] as const).map((diff) => {
                  const cnt = category.questions.filter((q: InterviewQuestion) => q.difficulty === diff).length;
                  const c = difficultyColors[diff];
                  return (
                    <span
                      key={diff}
                      className="text-[12px] font-medium px-2.5 py-0.5 rounded-full border"
                      style={{ color: c.text, background: c.bg, borderColor: c.border }}
                    >
                      {cnt} {diff}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Bookmarks count */}
            {bookmarkedIds.size > 0 && (
              <div
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold border"
                style={{
                  background: "color-mix(in srgb, var(--warning) 12%, transparent)",
                  borderColor: "color-mix(in srgb, var(--warning) 30%, transparent)",
                  color: "var(--warning)",
                }}
              >
                <Bookmark size={14} fill="currentColor" />
                {bookmarkedIds.size} bookmarked
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section
        className="py-4 sticky top-0 z-10 backdrop-blur-md"
        style={{
          background: "color-mix(in srgb, var(--bg-surface) 90%, transparent)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container mx-auto max-w-[900px] px-6 flex gap-3 items-center flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[220px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--text-tertiary)" }}
            />
            <input
              type="text"
              placeholder="Search questions, answers, or tags…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg text-[14px] outline-none border focus:border-[var(--accent)] transition-colors"
              style={{
                background: "var(--bg-raised)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <Filter size={15} style={{ color: "var(--text-tertiary)" }} />
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors border"
                style={{
                  borderColor:
                    selectedDifficulty === diff
                      ? diff === 'All'
                        ? "var(--accent)"
                        : difficultyColors[diff]?.border
                      : "transparent",
                  background:
                    selectedDifficulty === diff
                      ? diff === 'All'
                        ? "color-mix(in srgb, var(--accent) 15%, transparent)"
                        : difficultyColors[diff]?.bg
                      : "var(--bg-raised)",
                  color:
                    selectedDifficulty === diff
                      ? diff === 'All'
                        ? "var(--accent)"
                        : difficultyColors[diff]?.text
                      : "var(--text-secondary)",
                }}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <div className="container mx-auto max-w-[900px] px-6 mt-2 text-[12px]" style={{ color: "var(--text-tertiary)" }}>
          Showing {filteredQuestions.length} of {category.questions.length} questions
          {searchQuery && ` for "${searchQuery}"`}
        </div>
      </section>

      {/* Questions List */}
      <section className="container mx-auto max-w-[900px] px-6 py-8">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-20" style={{ color: "var(--text-secondary)" }}>
            <div className="text-[48px] mb-4">🔍</div>
            <h3 className="text-[20px] font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              No questions found
            </h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredQuestions.map((question: InterviewQuestion, index: number) => {
              const isExpanded = expandedIds.has(question.id);
              const isBookmarked = bookmarkedIds.has(question.id);
              const dc = difficultyColors[question.difficulty];

              return (
                <div
                  key={question.id}
                  className="card rounded-xl overflow-hidden transition-colors"
                  style={{
                    borderColor: isExpanded ? `color-mix(in srgb, ${category.color} 40%, transparent)` : "var(--border)",
                  }}
                >
                  {/* Question header (clickable) */}
                  <div
                    onClick={() => toggleExpand(question.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleExpand(question.id); } }}
                    className="w-full text-left p-5 cursor-pointer flex items-start gap-3.5 hover:bg-[var(--bg-raised)] transition-colors"
                  >
                    {/* Number */}
                    <span
                      className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-[12px] font-semibold mt-0.5"
                      style={{
                        background: "var(--bg-raised)",
                        color: category.color,
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      {index + 1}
                    </span>

                    {/* Question text */}
                    <span
                      className="flex-1 text-[15.5px] font-semibold leading-snug"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {question.question}
                    </span>

                    {/* Right controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Difficulty badge */}
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap border"
                        style={{ color: dc.text, background: dc.bg, borderColor: dc.border }}
                      >
                        {question.difficulty}
                      </span>

                      {/* Bookmark button */}
                      <button
                        onClick={(e) => toggleBookmark(question.id, e)}
                        className="p-1 cursor-pointer flex items-center transition-colors"
                        style={{ color: isBookmarked ? "var(--warning)" : "var(--text-tertiary)" }}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck size={17} fill="currentColor" />
                        ) : (
                          <Bookmark size={17} />
                        )}
                      </button>

                      {/* Expand arrow */}
                      <span style={{ color: "var(--text-tertiary)" }}>
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </span>
                    </div>
                  </div>

                  {/* Answer (accordion) */}
                  {isExpanded && (
                    <div
                      className="pl-[62px] pr-6 pb-6 pt-4 border-t"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      <p
                        className="text-[14px] leading-relaxed mb-4 whitespace-pre-wrap"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {question.answer}
                      </p>

                      {/* Tags */}
                      {question.tags.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <Tag size={12} style={{ color: "var(--text-tertiary)" }} />
                          {question.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] px-2 py-0.5 rounded-full border"
                              style={{
                                color: "var(--text-secondary)",
                                background: "var(--bg-raised)",
                                borderColor: "var(--border-subtle)",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom nav */}
        <div className="mt-12 pt-8 flex justify-center border-t" style={{ borderColor: "var(--border)" }}>
          <Link
            href="/interview"
            className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium rounded-lg border transition-colors hover:bg-[var(--bg-raised)]"
            style={{
              color: "var(--text-secondary)",
              borderColor: "var(--border)",
              background: "var(--bg-surface)",
            }}
          >
            <ArrowLeft size={15} />
            Back to All Categories
          </Link>
        </div>
      </section>
    </main>
  );
}
