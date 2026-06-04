"use client";

import React, { useState } from"react";
import { Search, MessageSquare, Heart, Share2, Plus, TrendingUp, Users, Lightbulb, Trophy } from"lucide-react";

const discussions = [
  {
    id: 1,
    title:"Best way to learn SQL from scratch in 2024?",
    author:"Priya_DA",
    avatar:"PR",
    avatarColor:"#3B82F6",
    category:"SQL",
    replies: 24,
    likes: 48,
    time:"2 hours ago",
    preview:"I've been trying to learn SQL for 3 months but struggling with JOINs. Any tips on resources?",
  },
  {
    id: 2,
    title:"Landed my first Data Analyst job at TCS! Here's my journey 🎉",
    author:"RahulSuccess",
    avatar:"RS",
    avatarColor:"#10B981",
    category:"Success Story",
    replies: 67,
    likes: 203,
    time:"1 day ago",
    preview:"After 4 months of following the DAL roadmap, I finally got placed. Here's what worked for me...",
  },
  {
    id: 3,
    title:"Power BI vs Tableau — which should I learn as a fresher?",
    author:"DataDivya",
    avatar:"DD",
    avatarColor:"#F59E0B",
    category:"Power BI",
    replies: 31,
    likes: 87,
    time:"3 hours ago",
    preview:"I see both on job descriptions. Starting from scratch — which gives better job prospects?",
  },
  {
    id: 4,
    title:"My Sales Dashboard Project — Feedback Welcome!",
    author:"Arjun_Analytics",
    avatar:"AA",
    avatarColor:"#8B5CF6",
    category:"Project Share",
    replies: 15,
    likes: 42,
    time:"5 hours ago",
    preview:"Just completed my first Power BI project — a sales dashboard with DAX measures. GitHub link inside!",
  },
  {
    id: 5,
    title:"What salary to expect as a fresher Data Analyst in India?",
    author:"FreshGrad2024",
    avatar:"FG",
    avatarColor:"#06B6D4",
    category:"Career",
    replies: 52,
    likes: 134,
    time:"6 hours ago",
    preview:"I have offers from two companies — one in Bangalore and one in Hyderabad. Trying to evaluate...",
  },
  {
    id: 6,
    title:"Study group for SQL interview prep — anyone interested?",
    author:"StudyBuddy",
    avatar:"SB",
    avatarColor:"#EC4899",
    category:"Study Group",
    replies: 28,
    likes: 91,
    time:"8 hours ago",
    preview:"Looking to form a WhatsApp/Discord group for daily SQL practice and mock interviews.",
  },
];

const successStories = [
  { name:"Sneha Patel", role:"BI Developer @ Wipro", time:"3 months", avatar:"SP", color:"#10B981" },
  { name:"Karan Singh", role:"Data Analyst @ Deloitte", time:"4 months", avatar:"KS", color:"#3B82F6" },
  { name:"Meena Rao", role:"Analyst @ Amazon", time:"6 months", avatar:"MR", color:"#8B5CF6" },
  { name:"Rohit Sharma", role:"SQL Developer @ HCL", time:"2 months", avatar:"RS", color:"#F59E0B" },
];

const categoryColors: Record<string, string> = {
  SQL:"#3B82F6",
  Excel:"#10B981",
  Python:"#8B5CF6","Power BI":"#F59E0B","Success Story":"#10B981","Project Share":"#06B6D4",
  Career:"#EC4899","Study Group":"#F97316",
};

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions");
  const [search, setSearch] = useState("");

  const filtered = discussions.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background:"var(--bg-primary)", minHeight:"100vh" }}>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{ background:'var(--bg-muted)', border:"1px solid rgba(236,72,153,0.3)", color:"#EC4899" }}
            >
              <Users size={14} /> 10,000+ Members
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold mb-4" style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}>
              Join the{""}
              <span className="gradient-text">Community</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color:"var(--text-secondary)" }}>
              Connect with 10,000+ aspiring data analysts. Share projects, get help, celebrate wins, and find study partners.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { value:"10K+", label:"Members", icon: Users, color:"#3B82F6" },
              { value:"500+", label:"Discussions", icon: MessageSquare, color:"#8B5CF6" },
              { value:"200+", label:"Success Stories", icon: Trophy, color:"#10B981" },
              { value:"50+", label:"Study Groups", icon: Lightbulb, color:"#F59E0B" },
            ].map((stat) => (
              <div key={stat.label} className="card p-4 text-center">
                <div
                  className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ background: stat.color +"20" }}
                >
                  <stat.icon size={18} style={{ color: stat.color }} />
                </div>
                <div className="text-2xl font-semibold gradient-text" style={{ fontFamily:"Outfit, sans-serif" }}>{stat.value}</div>
                <div className="text-xs" style={{ color:"var(--text-muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div
                className="flex gap-1 p-1 rounded-xl mb-6"
                style={{ background:"var(--bg-secondary)", border:"1px solid var(--border)" }}
                role="tablist"
              >
                {[
                  { key:"discussions", label:"💬 Discussions" },
                  { key:"success", label:"🏆 Success Stories" },
                  { key:"projects", label:"🚀 Project Showcase" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    id={`community-tab-${tab.key}`}
                    onClick={() => setActiveTab(tab.key)}
                    role="tab"
                    aria-selected={activeTab === tab.key}
                    className="flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: activeTab === tab.key ?"var(--primary)" :"transparent",
                      color: activeTab === tab.key ?"white" :"var(--text-muted)",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:"var(--text-muted)" }} />
                <input
                  id="community-search"
                  type="text"
                  placeholder="Search discussions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background:"var(--bg-secondary)", border:"1px solid var(--border)", color:"var(--text-primary)" }}
                  aria-label="Search community discussions"
                />
              </div>

              {/* New Post button */}
              <button
                id="btn-new-post"
                className="flex items-center gap-2 btn-primary w-full sm:w-auto mb-6"
                aria-label="Start a new discussion"
              >
                <Plus size={16} /> Start Discussion
              </button>

              {/* Discussions */}
              <div className="space-y-4" role="list">
                {filtered.map((post) => (
                  <div
                    key={post.id}
                    className="card p-5 group cursor-pointer"
                    role="listitem"
                    id={`discussion-${post.id}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-inverse)] text-xs font-semibold flex-shrink-0"
                        style={{ background: post.avatarColor }}
                      >
                        {post.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-sm leading-tight" style={{ color:"var(--text-primary)" }}>
                            {post.title}
                          </h3>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                            style={{
                              background: (categoryColors[post.category] ||"#3B82F6") +"20",
                              color: categoryColors[post.category] ||"#3B82F6",
                            }}
                          >
                            {post.category}
                          </span>
                        </div>
                        <p className="text-xs mt-0.5" style={{ color:"var(--text-muted)" }}>
                          {post.author} · {post.time}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm ml-12 mb-3 leading-relaxed" style={{ color:"var(--text-secondary)" }}>
                      {post.preview}
                    </p>
                    <div className="flex items-center gap-4 ml-12">
                      <button className="flex items-center gap-1.5 text-xs transition-all" style={{ color:"var(--text-muted)" }} aria-label="Like post">
                        <Heart size={13} /> {post.likes}
                      </button>
                      <button className="flex items-center gap-1.5 text-xs transition-all" style={{ color:"var(--text-muted)" }} aria-label="View replies">
                        <MessageSquare size={13} /> {post.replies} replies
                      </button>
                      <button className="flex items-center gap-1.5 text-xs transition-all" style={{ color:"var(--text-muted)" }} aria-label="Share post">
                        <Share2 size={13} /> Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Success Stories */}
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy size={16} style={{ color:"#F59E0B" }} />
                  <h3 className="font-semibold text-sm" style={{ color:"var(--text-primary)" }}>Recent Success Stories</h3>
                </div>
                <div className="space-y-3">
                  {successStories.map((story) => (
                    <div key={story.name} className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-inverse)] text-xs font-semibold flex-shrink-0"
                        style={{ background: story.color }}
                      >
                        {story.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-xs" style={{ color:"var(--text-primary)" }}>{story.name}</div>
                        <div className="text-xs" style={{ color:"var(--text-secondary)" }}>{story.role}</div>
                        <div className="text-xs" style={{ color: story.color }}>Placed in {story.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Study Groups */}
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb size={16} style={{ color:"#06B6D4" }} />
                  <h3 className="font-semibold text-sm" style={{ color:"var(--text-primary)" }}>Active Study Groups</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { name:"SQL Warriors 💪", members: 142, category:"SQL" },
                    { name:"Python Data Crew 🐍", members: 98, category:"Python" },
                    { name:"Power BI Champions 📊", members: 76, category:"Power BI" },
                    { name:"Excel Masters 📈", members: 63, category:"Excel" },
                  ].map((group) => (
                    <div
                      key={group.name}
                      className="flex items-center justify-between p-2.5 rounded-lg"
                      style={{ background:"var(--bg-muted)" }}
                    >
                      <div>
                        <div className="text-xs font-medium" style={{ color:"var(--text-primary)" }}>{group.name}</div>
                        <div className="text-xs" style={{ color:"var(--text-muted)" }}>{group.members} members</div>
                      </div>
                      <button
                        className="text-xs font-medium px-2 py-1 rounded-lg"
                        style={{
                          background: (categoryColors[group.category] ||"#3B82F6") +"20",
                          color: categoryColors[group.category] ||"#3B82F6",
                        }}
                        aria-label={`Join ${group.name}`}
                      >
                        Join
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={16} style={{ color:"#EC4899" }} />
                  <h3 className="font-semibold text-sm" style={{ color:"var(--text-primary)" }}>Trending Topics</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["SQL Window Functions","Power BI DAX","Pandas Tips","Interview Prep","Resume Review","Project Ideas","Salary Discussion","Python EDA"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full cursor-pointer transition-all"
                      style={{
                        background:"var(--bg-muted)",
                        color:"var(--text-secondary)",
                        border:"1px solid var(--border)",
                      }}
                    >
                      #{tag.replace(/\s+/g,"")}
                    </span>
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
