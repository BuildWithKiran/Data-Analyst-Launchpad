"use client";

import React, { useState } from"react";
import { useParams } from"next/navigation";
import { roadmaps } from"@/lib/data/roadmaps";
import { ChevronDown, ChevronRight, CheckCircle, Clock, BookOpen, Code2, MessageSquare, Target, Database, BarChart3, TrendingUp } from"lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Database,
  BarChart3,
  Code2,
  TrendingUp,
};

const difficultyColors: Record<string, string> = {
  Beginner:"#10B981",
  Intermediate:"#F59E0B",
  Advanced:"#EF4444",
};

type TabType ="description" |"notes" |"example" |"practice" |"interview";

export default function RoadmapDetailClient() {
  const params = useParams();
  const slug = params?.slug as string;
  const roadmap = roadmaps[slug];

  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("description");

  if (!roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4" style={{ color:"var(--text-primary)" }}>Roadmap Not Found</h1>
          <p style={{ color:"var(--text-muted)" }}>The roadmap you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[roadmap.icon] || Database;
  const progress = (completedTopics.size / roadmap.topics.length) * 100;

  const toggleComplete = (topicId: string) => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);
      return next;
    });
  };

  const tabs: { key: TabType; label: string; icon: React.ElementType }[] = [
    { key:"description", label:"Overview", icon: BookOpen },
    { key:"notes", label:"Notes", icon: BookOpen },
    { key:"example", label:"Examples", icon: Code2 },
    { key:"practice", label:"Practice", icon: Target },
    { key:"interview", label:"Interview Q", icon: MessageSquare },
  ];

  return (
    <div style={{ background:"var(--bg-base)", minHeight:"100vh" }}>
      {/* Header */}
      <div
        className="pt-24 pb-8 relative overflow-hidden"
        style={{ background:"var(--bg-surface)", borderBottom:"1px solid var(--border)" }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background:`${roadmap.color}20` }}
            >
              <IconComponent size={30} style={{ color: roadmap.color }} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background:`${roadmap.color}20`, color: roadmap.color }}
                >
                  {roadmap.topics.length} Topics
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color:"var(--text-muted)" }}>
                  <Clock size={11} /> {roadmap.duration}
                </span>
                <span className="text-xs" style={{ color:"var(--text-muted)" }}>{roadmap.level}</span>
              </div>
              <h1
                className="text-3xl sm:text-4xl font-semibold mb-2"
                style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}
              >
                {roadmap.title}
              </h1>
              <p style={{ color:"var(--text-secondary)" }}>{roadmap.description}</p>
            </div>
            <div className="lg:text-right">
              <div className="text-3xl font-semibold gradient-text mb-1" style={{ fontFamily:"Outfit, sans-serif" }}>
                {Math.round(progress)}%
              </div>
              <div className="text-sm mb-2" style={{ color:"var(--text-muted)" }}>Complete</div>
              <div className="w-48 progress-track">
                <div className="progress-fill" style={{ width:`${progress}%` }} />
              </div>
              <div className="text-xs mt-1" style={{ color:"var(--text-muted)" }}>
                {completedTopics.size}/{roadmap.topics.length} topics
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Topic List (left) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2
                className="font-semibold text-sm uppercase tracking-wider mb-4"
                style={{ color:"var(--text-muted)" }}
              >
                Topics
              </h2>
              <div className="space-y-1">
                {roadmap.topics.map((topic, index) => {
                  const isCompleted = completedTopics.has(topic.id);
                  const isExpanded = expandedTopic === topic.id;
                  return (
                    <button
                      key={topic.id}
                      id={`topic-btn-${topic.id}`}
                      onClick={() => {
                        setExpandedTopic(isExpanded ? null : topic.id);
                        setActiveTab("description");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
                      style={{
                        background: isExpanded ?`${roadmap.color}15` :"transparent",
                        border: isExpanded ?`1px solid ${roadmap.color}40` :"1px solid transparent",
                      }}
                      aria-expanded={isExpanded}
                      aria-label={`Topic: ${topic.title}`}
                    >
                      {/* Step number / check */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 cursor-pointer"
                        style={{
                          background: isCompleted ?"#10B98130" :"var(--bg-muted)",
                          color: isCompleted ?"#10B981" :"var(--text-muted)",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleComplete(topic.id);
                        }}
                        role="checkbox"
                        aria-checked={isCompleted}
                        aria-label={`Mark ${topic.title} as ${isCompleted ?"incomplete" :"complete"}`}
                        tabIndex={0}
                      >
                        {isCompleted ? <CheckCircle size={14} /> : index + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div
                          className="text-sm font-medium truncate"
                          style={{ color: isExpanded ? roadmap.color :"var(--text-primary)" }}
                        >
                          {topic.title}
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: difficultyColors[topic.difficulty] }}
                        >
                          {topic.difficulty} · {topic.estimatedTime}
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown size={14} style={{ color:"var(--text-muted)", flexShrink: 0 }} />
                      ) : (
                        <ChevronRight size={14} style={{ color:"var(--text-muted)", flexShrink: 0 }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Topic Detail (right) */}
          <div className="lg:col-span-2">
            {expandedTopic ? (
              (() => {
                const topic = roadmap.topics.find((t) => t.id === expandedTopic);
                if (!topic) return null;
                return (
                  <div className="card overflow-hidden">
                    {/* Topic Header */}
                    <div
                      className="p-6"
                      style={{ borderBottom:"1px solid var(--border)", background:`${roadmap.color}08` }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="badge"
                              style={{
                                background:`${difficultyColors[topic.difficulty]}20`,
                                color: difficultyColors[topic.difficulty],
                                border:`1px solid ${difficultyColors[topic.difficulty]}40`,
                              }}
                            >
                              {topic.difficulty}
                            </span>
                            <span className="flex items-center gap-1 text-xs" style={{ color:"var(--text-muted)" }}>
                              <Clock size={11} /> {topic.estimatedTime}
                            </span>
                          </div>
                          <h2
                            className="text-2xl font-semibold"
                            style={{ color:"var(--text-primary)", fontFamily:"Outfit, sans-serif" }}
                          >
                            {topic.title}
                          </h2>
                        </div>
                        <button
                          id={`btn-complete-${topic.id}`}
                          onClick={() => toggleComplete(topic.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                          style={{
                            background: completedTopics.has(topic.id) ?"#10B98120" :"var(--bg-muted)",
                            color: completedTopics.has(topic.id) ?"#10B981" :"var(--text-muted)",
                            border: completedTopics.has(topic.id) ?"1px solid #10B98140" :"1px solid var(--border)",
                          }}
                          aria-label={completedTopics.has(topic.id) ?"Mark incomplete" :"Mark complete"}
                        >
                          <CheckCircle size={14} />
                          {completedTopics.has(topic.id) ?"Completed" :"Mark Done"}
                        </button>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div
                      className="flex overflow-x-auto gap-0"
                      style={{ borderBottom:"1px solid var(--border)" }}
                      role="tablist"
                    >
                      {tabs.map((tab) => (
                        <button
                          key={tab.key}
                          id={`tab-${tab.key}`}
                          onClick={() => setActiveTab(tab.key)}
                          role="tab"
                          aria-selected={activeTab === tab.key}
                          className="flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2"
                          style={{
                            color: activeTab === tab.key ? roadmap.color :"var(--text-muted)",
                            borderBottomColor: activeTab === tab.key ? roadmap.color :"transparent",
                            background:"transparent",
                          }}
                        >
                          <tab.icon size={14} />
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-6" role="tabpanel">
                      {activeTab ==="description" && (
                        <div>
                          <p className="text-base leading-relaxed" style={{ color:"var(--text-secondary)" }}>
                            {topic.description}
                          </p>
                        </div>
                      )}

                      {activeTab ==="notes" && (
                        <div className="prose-like">
                          <pre
                            className="code-block text-sm leading-relaxed whitespace-pre-wrap"
                            style={{ color:"var(--text-secondary)" }}
                          >
                            {topic.notes}
                          </pre>
                        </div>
                      )}

                      {activeTab ==="example" && (
                        <div>
                          <pre
                            className="code-block text-sm leading-relaxed"
                            style={{ color:"#A0D2FF" }}
                          >
                            {topic.example}
                          </pre>
                        </div>
                      )}

                      {activeTab ==="practice" && (
                        <div className="space-y-3">
                          {topic.practiceQuestions.map((q, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 p-4 rounded-xl"
                              style={{ background:"var(--bg-muted)", border:"1px solid var(--border)" }}
                            >
                              <div
                                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 text-[var(--text-inverse)]"
                                style={{ background: roadmap.color }}
                              >
                                {i + 1}
                              </div>
                              <p className="text-sm" style={{ color:"var(--text-secondary)" }}>{q}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab ==="interview" && (
                        <div className="space-y-3">
                          {topic.interviewQuestions.map((q, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 p-4 rounded-xl"
                              style={{ background:"var(--bg-muted)", border:"1px solid var(--border)" }}
                            >
                              <MessageSquare size={16} className="flex-shrink-0 mt-0.5" style={{ color:"#8B5CF6" }} />
                              <p className="text-sm" style={{ color:"var(--text-secondary)" }}>{q}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="card p-12 text-center">
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background:`${roadmap.color}20` }}
                >
                  <IconComponent size={30} style={{ color: roadmap.color }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color:"var(--text-primary)" }}>
                  Select a Topic
                </h3>
                <p style={{ color:"var(--text-muted)" }}>
                  Click any topic on the left to view its content, examples, and interview questions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
