"use client";

import React, { useState } from"react";
import {
  TrendingUp, Target, Calendar, CheckCircle2, BarChart3, Flame, Award, BookOpen, Zap, Clock, Plus, X
} from"lucide-react";

const weeklyGoals = [
  { id: 1, task:"Complete SQL JOINs topic", done: true, category:"SQL" },
  { id: 2, task:"Practice 5 SQL interview questions", done: true, category:"SQL" },
  { id: 3, task:"Start Pandas chapter", done: false, category:"Python" },
  { id: 4, task:"Build sales dashboard", done: false, category:"Project" },
  { id: 5, task:"Review Excel VLOOKUP", done: true, category:"Excel" },
];

const progressData = [
  { subject:"SQL", progress: 65, total: 15, done: 10, color:"#3B82F6" },
  { subject:"Excel", progress: 50, total: 8, done: 4, color:"#10B981" },
  { subject:"Python", progress: 33, total: 9, done: 3, color:"#8B5CF6" },
  { subject:"Power BI", progress: 25, total: 8, done: 2, color:"#F59E0B" },
];

const recentActivity = [
  { day:"Mon", completed: 3 },
  { day:"Tue", completed: 5 },
  { day:"Wed", completed: 2 },
  { day:"Thu", completed: 6 },
  { day:"Fri", completed: 4 },
  { day:"Sat", completed: 7 },
  { day:"Sun", completed: 1 },
];

const projects = [
  { name:"Sales Dashboard", status:"Completed", color:"#10B981" },
  { name:"HR Analytics", status:"In Progress", color:"#F59E0B" },
  { name:"Netflix Analysis", status:"Not Started", color:"#EF4444" },
  { name:"Customer Churn", status:"Not Started", color:"#EF4444" },
];

const skillMetrics = [
  { skill:"SQL", score: 72, icon:"🗄️" },
  { skill:"Excel", score: 58, icon:"📊" },
  { skill:"Python", score: 41, icon:"🐍" },
  { skill:"Power BI", score: 30, icon:"📈" },
  { skill:"Statistics", score: 45, icon:"📐" },
];

const overallReadiness = Math.round(
  skillMetrics.reduce((sum, s) => sum + s.score, 0) / skillMetrics.length
);

export default function CareerTrackerPage() {
  const [goals, setGoals] = useState(weeklyGoals);
  const [newGoal, setNewGoal] = useState("");
  const [streak] = useState(12);

  const toggleGoal = (id: number) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g)));
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals((prev) => [
      ...prev,
      { id: Date.now(), task: newGoal, done: false, category:"General" },
    ]);
    setNewGoal("");
  };

  const removeGoal = (id: number) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const completedGoals = goals.filter((g) => g.done).length;
  const goalProgress = Math.round((completedGoals / goals.length) * 100);

  return (
    <div style={{ background:"var(--bg-primary)", minHeight:"100vh" }}>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h1
                className="text-3xl sm:text-4xl font-semibold"
                style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}
              >
                Career{""}
                <span className="gradient-text">Tracker</span>
              </h1>
              <p className="text-sm mt-1" style={{ color:"var(--text-secondary)" }}>
                Track your progress, stay accountable, and become job-ready.
              </p>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ background:'var(--bg-muted)', border:"1px solid rgba(245,158,11,0.3)" }}
            >
              <Flame size={20} style={{ color:"#F59E0B" }} />
              <div>
                <div className="font-semibold text-lg leading-none" style={{ color:"#F59E0B" }}>{streak} days</div>
                <div className="text-xs" style={{ color:"var(--text-muted)" }}>Study streak</div>
              </div>
            </div>
          </div>

          {/* Top KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label:"Readiness Score", value:`${overallReadiness}%`, icon: Award, color:"#8B5CF6", bg:"rgba(139,92,246,0.1)" },
              { label:"Topics Completed", value:"19/40", icon: CheckCircle2, color:"#10B981", bg:"rgba(16,185,129,0.1)" },
              { label:"Study Streak", value:`${streak} days`, icon: Flame, color:"#F59E0B", bg:"rgba(245,158,11,0.1)" },
              { label:"Goals This Week", value:`${completedGoals}/${goals.length}`, icon: Target, color:"#3B82F6", bg:"rgba(59,130,246,0.1)" },
            ].map((kpi) => (
              <div key={kpi.label} className="card p-4 sm:p-5">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: kpi.bg }}
                  >
                    <kpi.icon size={20} style={{ color: kpi.color }} />
                  </div>
                </div>
                <div
                  className="text-2xl font-semibold gradient-text mb-1"
                  style={{ fontFamily:"Outfit, sans-serif" }}
                >
                  {kpi.value}
                </div>
                <div className="text-xs" style={{ color:"var(--text-muted)" }}>{kpi.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Learning Progress */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <BarChart3 size={18} style={{ color:"#3B82F6" }} />
                  <h2 className="font-semibold text-lg" style={{ color:"var(--text-primary)", fontFamily:"Outfit, sans-serif" }}>
                    Learning Progress
                  </h2>
                </div>
                <div className="space-y-5">
                  {progressData.map((item) => (
                    <div key={item.subject}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm" style={{ color:"var(--text-primary)" }}>{item.subject}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs" style={{ color:"var(--text-muted)" }}>{item.done}/{item.total} topics</span>
                          <span className="font-semibold text-sm" style={{ color: item.color }}>{item.progress}%</span>
                        </div>
                      </div>
                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{
                            width:`${item.progress}%`,
                            background:`var(--primary)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Chart */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp size={18} style={{ color:"#10B981" }} />
                  <h2 className="font-semibold text-lg" style={{ color:"var(--text-primary)", fontFamily:"Outfit, sans-serif" }}>
                    Weekly Activity
                  </h2>
                </div>
                <div className="flex items-end justify-between gap-2">
                  {recentActivity.map((day) => (
                    <div key={day.day} className="flex flex-col items-center gap-1 flex-1">
                      <div
                        className="w-full rounded-t-lg transition-all"
                        style={{
                          height:`${day.completed * 14}px`,
                          background:`var(--primary)`,
                          minHeight:"8px",
                        }}
                      />
                      <span className="text-xs" style={{ color:"var(--text-muted)" }}>{day.day}</span>
                      <span className="text-xs font-medium" style={{ color:"var(--text-secondary)" }}>{day.completed}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <BookOpen size={18} style={{ color:"#F59E0B" }} />
                  <h2 className="font-semibold text-lg" style={{ color:"var(--text-primary)", fontFamily:"Outfit, sans-serif" }}>
                    Project Tracker
                  </h2>
                </div>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div
                      key={project.name}
                      className="flex items-center justify-between p-3 rounded-xl"
                      style={{ background:"var(--bg-muted)", border:"1px solid var(--border)" }}
                    >
                      <span className="text-sm font-medium" style={{ color:"var(--text-primary)" }}>{project.name}</span>
                      <span
                        className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{
                          background: project.color +"20",
                          color: project.color,
                          border:`1px solid ${project.color}40`,
                        }}
                      >
                        {project.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Interview Readiness */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Zap size={18} style={{ color:"#8B5CF6" }} />
                  <h2 className="font-semibold text-lg" style={{ color:"var(--text-primary)", fontFamily:"Outfit, sans-serif" }}>
                    Interview Readiness
                  </h2>
                </div>

                {/* Gauge */}
                <div className="flex flex-col items-center mb-5">
                  <div
                    className="w-32 h-32 rounded-full flex items-center justify-center border-8 mb-3"
                    style={{
                      borderColor: overallReadiness > 70 ?"#10B981" : overallReadiness > 40 ?"#F59E0B" :"#EF4444",
                      background: (overallReadiness > 70 ?"#10B981" : overallReadiness > 40 ?"#F59E0B" :"#EF4444") +"15",
                    }}
                  >
                    <div className="text-center">
                      <div
                        className="text-3xl font-semibold"
                        style={{
                          color: overallReadiness > 70 ?"#10B981" : overallReadiness > 40 ?"#F59E0B" :"#EF4444",
                          fontFamily:"Outfit, sans-serif",
                        }}
                      >
                        {overallReadiness}%
                      </div>
                      <div className="text-xs" style={{ color:"var(--text-muted)" }}>Ready</div>
                    </div>
                  </div>
                  <p className="text-sm text-center" style={{ color:"var(--text-muted)" }}>
                    {overallReadiness > 70 ?"You're interview ready! 🎉" :
                      overallReadiness > 40 ?"Making great progress! 💪" :"Keep learning! You got this! 🚀"}
                  </p>
                </div>

                <div className="space-y-2">
                  {skillMetrics.map((skill) => (
                    <div key={skill.skill} className="flex items-center gap-3">
                      <span className="text-lg w-6 text-center">{skill.icon}</span>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-0.5">
                          <span style={{ color:"var(--text-secondary)" }}>{skill.skill}</span>
                          <span style={{ color: skill.score > 60 ?"#10B981" : skill.score > 40 ?"#F59E0B" :"#EF4444" }}>
                            {skill.score}%
                          </span>
                        </div>
                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{
                              width:`${skill.score}%`,
                              background: skill.score > 60 ?"#10B981" : skill.score > 40 ?"#F59E0B" :"#EF4444",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Goals */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} style={{ color:"#06B6D4" }} />
                    <h2 className="font-semibold text-lg" style={{ color:"var(--text-primary)", fontFamily:"Outfit, sans-serif" }}>
                      Weekly Goals
                    </h2>
                  </div>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ background:"rgba(6,182,212,0.15)", color:"#06B6D4" }}
                  >
                    {goalProgress}%
                  </span>
                </div>

                {/* Progress */}
                <div className="progress-track mb-4">
                  <div className="progress-fill" style={{ width:`${goalProgress}%` }} />
                </div>

                {/* Goals List */}
                <div className="space-y-2 mb-4">
                  {goals.map((goal) => (
                    <div
                      key={goal.id}
                      className="flex items-center gap-3 p-2 rounded-lg"
                      style={{ background:"var(--bg-muted)" }}
                    >
                      <button
                        onClick={() => toggleGoal(goal.id)}
                        id={`goal-toggle-${goal.id}`}
                        className="flex-shrink-0 transition-all"
                        aria-label={`Toggle goal: ${goal.task}`}
                      >
                        <CheckCircle2
                          size={18}
                          style={{ color: goal.done ?"#10B981" :"var(--text-muted)" }}
                          className={goal.done ?"fill-current" :""}
                        />
                      </button>
                      <span
                        className="flex-1 text-xs"
                        style={{
                          color: goal.done ?"var(--text-muted)" :"var(--text-secondary)",
                          textDecoration: goal.done ?"line-through" :"none",
                        }}
                      >
                        {goal.task}
                      </span>
                      <button
                        onClick={() => removeGoal(goal.id)}
                        aria-label="Remove goal"
                        className="flex-shrink-0 opacity-40 hover:opacity-100 transition-opacity"
                      >
                        <X size={14} style={{ color:"var(--text-muted)" }} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Goal */}
                <div className="flex gap-2">
                  <input
                    id="new-goal-input"
                    type="text"
                    placeholder="Add a goal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyDown={(e) => e.key ==="Enter" && addGoal()}
                    className="flex-1 px-3 py-2 rounded-lg text-xs outline-none"
                    style={{ background:"var(--bg-secondary)", border:"1px solid var(--border)", color:"var(--text-primary)" }}
                    aria-label="New goal text"
                  />
                  <button
                    id="btn-add-goal"
                    onClick={addGoal}
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background:"var(--primary)", color:"white" }}
                    aria-label="Add goal"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Study Tip */}
              <div
                className="card p-5 relative overflow-hidden"
                style={{ border:"1px solid rgba(59,130,246,0.2)" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[var(--text-inverse)] text-sm"
                    style={{ background:"var(--primary)" }}
                  >
                    💡
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1" style={{ color:"var(--text-primary)" }}>Today&apos;s Tip</div>
                    <p className="text-xs leading-relaxed" style={{ color:"var(--text-secondary)" }}>
                      Practice window functions today! They are one of the most asked SQL topics in data analyst interviews. Try ROW_NUMBER, RANK, and DENSE_RANK on a real dataset.
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={16} style={{ color:"#F59E0B" }} />
                  <h3 className="font-semibold text-sm" style={{ color:"var(--text-primary)" }}>Recommended Next</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { label:"SQL Window Functions", time:"~6 hrs", href:"/roadmaps/sql" },
                    { label:"Python Pandas Chapter", time:"~10 hrs", href:"/roadmaps/python" },
                    { label:"Build Sales Dashboard", time:"~4 hrs", href:"/projects" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between p-2.5 rounded-lg transition-all"
                      style={{ background:"var(--bg-muted)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background ="rgba(59,130,246,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background ="var(--bg-muted)";
                      }}
                    >
                      <span className="text-xs" style={{ color:"var(--text-secondary)" }}>{item.label}</span>
                      <span className="text-xs" style={{ color:"var(--text-muted)" }}>{item.time}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
