import React from"react";
import Link from"next/link";
import { ArrowRight, CheckCircle, FileText, Award, Search, ExternalLink } from"lucide-react";
import { Linkedin } from"@/components/icons";
import type { Metadata } from"next";

export const metadata: Metadata = {
  title:"Resume Builder & Career Guide — Data Analyst Launchpad",
  description:"ATS-optimized resume templates, checklists, LinkedIn guide, and portfolio tips for aspiring Data Analysts.",
};

const atsChecklist = ["Use a single-column layout for better ATS parsing","Include keywords from the job description (SQL, Excel, Python, Power BI)","Use standard section headers: Experience, Education, Skills, Projects","Save as PDF unless instructed otherwise","Use standard fonts: Arial, Calibri, or Times New Roman","Avoid tables, columns, headers/footers, and graphics","Start each bullet with an action verb (Analyzed, Built, Developed)","Quantify achievements:'Reduced report time by 40%'","Keep to 1 page if under 3 years of experience","Include a professional email address","Add your LinkedIn profile URL","List technical skills prominently",
];

const resumeSections = [
  {
    title:"Contact Information",
    tips: ["Full name, phone, email, LinkedIn","City and state (not full address)","GitHub/Portfolio link if relevant"],
  },
  {
    title:"Professional Summary",
    tips: ["2-3 sentences about your skills and goals","Include your target role:'Aspiring Data Analyst'","Mention key skills: SQL, Python, Power BI",
    ],
  },
  {
    title:"Technical Skills",
    tips: ["Group by category: Languages, Tools, Databases","List SQL, Excel, Python, Power BI, Tableau","Include libraries: Pandas, NumPy, Matplotlib",
    ],
  },
  {
    title:"Projects (Most Important!)",
    tips: ["List 2-4 real projects from your portfolio","Include tools used and measurable outcomes","Link to GitHub repository","Format:'Built X using Y that resulted in Z'",
    ],
  },
  {
    title:"Education",
    tips: ["Degree, Institution, Year","Include relevant coursework (Statistics, Data Structures)","GPA if above 7.0/3.5",
    ],
  },
  {
    title:"Certifications",
    tips: ["Microsoft PL-300 (Power BI Data Analyst)","Google Data Analytics Certificate","HackerRank SQL Certificates","IBM Data Analyst Professional Certificate",
    ],
  },
];

const resumeTemplates = [
  {
    name:"Fresher Template",
    description:"Clean one-page template for fresh graduates with no experience. Focuses on projects and skills.",
    level:"0 years experience",
    color:"#3B82F6",
  },
  {
    name:"Career Switch Template",
    description:"Highlights transferable skills and analytics projects. Perfect for professionals switching to data analytics.",
    level:"2-5 years experience",
    color:"#8B5CF6",
  },
  {
    name:"Experienced Template",
    description:"Two-page format for experienced analysts with a strong work history and multiple achievements.",
    level:"5+ years experience",
    color:"#10B981",
  },
];

const linkedinTips = ["Use'Data Analyst | SQL | Python | Power BI' in your headline","Write an'About' section with your story and skills","Add all relevant skills (LinkedIn allows 50)","Get endorsed for SQL, Excel, Python, Data Analysis","Connect with data analysts, recruiters, and DAL community","Share your projects and insights weekly","Comment on industry posts to increase visibility","Join LinkedIn groups: Data Analytics, SQL, Business Intelligence",
];

export default function ResumePage() {
  return (
    <div style={{ background:"var(--bg-primary)", minHeight:"100vh" }}>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{ background:'var(--bg-muted)', border:"1px solid rgba(139,92,246,0.3)", color:"#8B5CF6" }}
            >
              <Award size={14} /> Career Tools
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold mb-4" style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}>
              Resume &{""}
              <span className="gradient-text">Career Guide</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color:"var(--text-secondary)" }}>
              Everything you need to land your first Data Analyst job — ATS guide, templates, checklists, and LinkedIn optimization.
            </p>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { label:"ATS Guide", icon: Search, href:"#ats-guide", color:"#3B82F6" },
              { label:"Resume Templates", icon: FileText, href:"#templates", color:"#8B5CF6" },
              { label:"Resume Checklist", icon: CheckCircle, href:"#checklist", color:"#10B981" },
              { label:"LinkedIn Guide", icon: Linkedin, href:"#linkedin", color:"#0077B5" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                id={`nav-${item.label.toLowerCase().replace(/\s+/g,"-")}`}
                className="card p-4 flex flex-col items-center gap-2 text-center group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: item.color +"20" }}
                >
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <span className="text-sm font-medium" style={{ color:"var(--text-primary)" }}>{item.label}</span>
              </a>
            ))}
          </div>

          <div className="space-y-12">
            {/* ATS Guide */}
            <section id="ats-guide">
              <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}>
                🎯 ATS-Optimized Resume Guide
              </h2>
              <div className="card p-6">
                <p className="text-sm mb-6 leading-relaxed" style={{ color:"var(--text-secondary)" }}>
                  <strong style={{ color:"var(--text-primary)" }}>ATS (Applicant Tracking System)</strong> is software companies use to automatically screen resumes before a human sees them. Up to 75% of resumes are rejected by ATS before reaching a recruiter. Follow these rules to pass the ATS filter:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {atsChecklist.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color:"#10B981" }} />
                      <span className="text-sm" style={{ color:"var(--text-secondary)" }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Resume Sections Guide */}
            <section>
              <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}>
                📄 Resume Structure Guide
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {resumeSections.map((section, i) => (
                  <div key={i} className="card p-5">
                    <h3 className="font-semibold text-sm mb-3" style={{ color:"var(--text-primary)" }}>
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.tips.map((tip, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs" style={{ color:"var(--text-secondary)" }}>
                          <ArrowRight size={12} className="flex-shrink-0 mt-0.5" style={{ color:"#3B82F6" }} />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Templates */}
            <section id="templates">
              <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}>
                📋 Resume Templates
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {resumeTemplates.map((template) => (
                  <div key={template.name} className="card p-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: template.color +"20" }}
                    >
                      <FileText size={22} style={{ color: template.color }} />
                    </div>
                    <h3 className="font-semibold mb-1" style={{ color:"var(--text-primary)" }}>{template.name}</h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full mb-3 inline-block"
                      style={{ background: template.color +"20", color: template.color }}
                    >
                      {template.level}
                    </span>
                    <p className="text-sm leading-relaxed mb-4" style={{ color:"var(--text-secondary)" }}>
                      {template.description}
                    </p>
                    <a
                      href="https://enhancv.com/resume-examples/data-analyst/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium"
                      style={{ color: template.color }}
                    >
                      Use Template <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Checklist */}
            <section id="checklist">
              <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}>
                ✅ Resume Submission Checklist
              </h2>
              <div className="card p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Proofread for spelling and grammar errors","All contact info is accurate and professional","File saved as PDF named'FirstName_LastName_Resume.pdf'","Tailored keywords match the job description","All GitHub/LinkedIn links are working","Projects section includes quantified outcomes","Skills section includes all tools mentioned in JD","Resume is 1 page (for freshers)","Font is professional and consistent throughout","No personal photo, DOB, or religion listed","Education GPA is included if impressive","Certifications section is up to date",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center"
                        style={{ borderColor:"var(--border-strong)" }}
                      />
                      <span className="text-sm" style={{ color:"var(--text-secondary)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* LinkedIn */}
            <section id="linkedin">
              <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily:"Outfit, sans-serif", color:"var(--text-primary)" }}>
                💼 LinkedIn Optimization Guide
              </h2>
              <div className="card p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {linkedinTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Linkedin size={15} className="flex-shrink-0 mt-0.5" style={{ color:"#0077B5" }} />
                      <span className="text-sm" style={{ color:"var(--text-secondary)" }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
