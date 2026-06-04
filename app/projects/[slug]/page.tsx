import { notFound } from'next/navigation';
import Link from'next/link';
import { Metadata } from'next';
import { projects } from'@/lib/data/projects';
import { Github } from'@/components/icons';
import {
  ArrowLeft,
  Clock,
  Layers,
  Wrench,
  BookOpen,
  Database,
  ListChecks,
  Lightbulb,
  Star,
  CheckCircle2,
} from'lucide-react';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return { title:'Project Not Found — Data Analyst Launchpad' };
  }
  return {
    title:`${project.title} — Data Analyst Launchpad`,
    description: project.description,
  };
}

const LEVEL_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Beginner: {
    bg:'rgba(16, 185, 129, 0.15)',
    text:'#10B981',
    border:'rgba(16, 185, 129, 0.4)',
  },
  Intermediate: {
    bg:'rgba(245, 158, 11, 0.15)',
    text:'#F59E0B',
    border:'rgba(245, 158, 11, 0.4)',
  },
  Advanced: {
    bg:'rgba(239, 68, 68, 0.15)',
    text:'#EF4444',
    border:'rgba(239, 68, 68, 0.4)',
  },
};

function SectionCard({
  title,
  icon,
  color,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background:'rgba(255,255,255,0.04)',
        backdropFilter:'(20px)',
        WebkitBackdropFilter:'(20px)',
        border:'1px solid rgba(255,255,255,0.08)',
        borderRadius:'16px',
        padding:'28px',
        display:'flex',
        flexDirection:'column',
        gap:'20px',
      }}
    >
      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
        <div
          style={{
            width:'36px',
            height:'36px',
            borderRadius:'10px',
            background:'var(--bg-muted)',
            border:`1px solid ${color}44`,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            color: color,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <h2
          style={{
            margin: 0,
            fontSize:'1.05rem',
            fontWeight: 600,
            color:'var(--text-primary, #f1f5f9)',
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const levelColors = LEVEL_COLORS[project.level];

  return (
    <div
      style={{
        minHeight:'100vh',
        background:'var(--bg-primary, #0f172a)',
        padding:'0 0 100px',
      }}
    >
      {/* Hero */}
      <div
        style={{
          position:'relative',
          padding:'60px 24px 50px',
          overflow:'hidden',
        }}
      >
        {/* Background glow tied to project color */}
        <div
          style={{
            position:'absolute',
            top:'-80px',
            left:'50%',
            transform:'translateX(-50%)',
            width:'700px',
            height:'500px',
            background:`transparent`,
            pointerEvents:'none',
          }}
        />

        <div style={{ maxWidth:'900px', margin:'0 auto', position:'relative' }}>
          {/* Back link */}
          <Link
            href="/projects"
            style={{
              display:'inline-flex',
              alignItems:'center',
              gap:'6px',
              marginBottom:'28px',
              fontSize:'0.85rem',
              fontWeight: 500,
              color:'var(--text-secondary, #94a3b8)',
              textDecoration:'none',
              transition:'color 0.2s ease',
            }}
          >
            <ArrowLeft size={15} />
            Back to Projects
          </Link>

          {/* Category */}
          <p
            style={{
              margin:'0 0 10px',
              fontSize:'0.8rem',
              fontWeight: 600,
              letterSpacing:'0.1em',
              textTransform:'uppercase',
              color: project.color,
            }}
          >
            {project.category}
          </p>

          {/* Title */}
          <h1
            style={{
              margin:'0 0 20px',
              fontSize:'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 600,
              color:'var(--text-primary, #f1f5f9)',
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h1>

          {/* Meta row */}
          <div
            style={{
              display:'flex',
              flexWrap:'wrap',
              alignItems:'center',
              gap:'12px',
              marginBottom:'28px',
            }}
          >
            {/* Level badge */}
            <span
              style={{
                display:'inline-flex',
                alignItems:'center',
                gap:'5px',
                padding:'5px 14px',
                borderRadius:'999px',
                fontSize:'0.8rem',
                fontWeight: 600,
                backgroundColor: levelColors.bg,
                color: levelColors.text,
                border:`1px solid ${levelColors.border}`,
              }}
            >
              <Star size={11} fill="currentColor" />
              {project.level}
            </span>

            {/* Duration */}
            <span
              style={{
                display:'inline-flex',
                alignItems:'center',
                gap:'5px',
                fontSize:'0.82rem',
                color:'var(--text-secondary, #94a3b8)',
              }}
            >
              <Clock size={13} />
              {project.duration}
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              margin:'0 0 28px',
              fontSize:'1.05rem',
              color:'var(--text-secondary, #94a3b8)',
              lineHeight: 1.75,
              maxWidth:'720px',
            }}
          >
            {project.description}
          </p>

          {/* Tools row */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
            {project.tools.map((tool) => (
              <span
                key={tool}
                style={{
                  display:'inline-flex',
                  alignItems:'center',
                  gap:'5px',
                  padding:'6px 14px',
                  borderRadius:'8px',
                  fontSize:'0.82rem',
                  fontWeight: 500,
                  background:'var(--bg-muted)',
                  color: project.color,
                  border:`1px solid ${project.color}44`,
                }}
              >
                <Wrench size={12} />
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div
        style={{
          maxWidth:'900px',
          margin:'0 auto',
          padding:'0 24px',
          display:'flex',
          flexDirection:'column',
          gap:'24px',
        }}
      >
        {/* Problem Statement */}
        <SectionCard
          title="Problem Statement"
          icon={<BookOpen size={18} />}
          color={project.color}
        >
          <p
            style={{
              margin: 0,
              fontSize:'0.95rem',
              color:'var(--text-secondary, #94a3b8)',
              lineHeight: 1.8,
            }}
          >
            {project.problemStatement}
          </p>
        </SectionCard>

        {/* Dataset Info */}
        <SectionCard
          title="Dataset Information"
          icon={<Database size={18} />}
          color={project.color}
        >
          <p
            style={{
              margin: 0,
              fontSize:'0.95rem',
              color:'var(--text-secondary, #94a3b8)',
              lineHeight: 1.8,
            }}
          >
            {project.datasetInfo}
          </p>
        </SectionCard>

        {/* Solution Approach */}
        <SectionCard
          title="Solution Approach"
          icon={<ListChecks size={18} />}
          color={project.color}
        >
          <ol
            style={{
              margin: 0,
              padding: 0,
              listStyle:'none',
              display:'flex',
              flexDirection:'column',
              gap:'14px',
            }}
          >
            {project.solutionApproach.map((step, index) => (
              <li
                key={index}
                style={{
                  display:'flex',
                  gap:'14px',
                  alignItems:'flex-start',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width:'28px',
                    height:'28px',
                    borderRadius:'50%',
                    background:'var(--bg-muted)',
                    border:`1px solid ${project.color}55`,
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    fontSize:'0.75rem',
                    fontWeight: 600,
                    color: project.color,
                    marginTop:'1px',
                  }}
                >
                  {index + 1}
                </span>
                <p
                  style={{
                    margin: 0,
                    fontSize:'0.92rem',
                    color:'var(--text-secondary, #94a3b8)',
                    lineHeight: 1.75,
                  }}
                >
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </SectionCard>

        {/* Skills Learned */}
        <SectionCard
          title="Skills You Will Learn"
          icon={<Lightbulb size={18} />}
          color={project.color}
        >
          <div style={{ display:'flex', flexWrap:'wrap', gap:'10px' }}>
            {project.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  display:'inline-flex',
                  alignItems:'center',
                  gap:'6px',
                  padding:'7px 14px',
                  borderRadius:'8px',
                  fontSize:'0.82rem',
                  fontWeight: 500,
                  background:'rgba(255,255,255,0.05)',
                  color:'var(--text-primary, #e2e8f0)',
                  border:'1px solid rgba(255,255,255,0.1)',
                }}
              >
                <CheckCircle2 size={13} color={project.color} />
                {skill}
              </span>
            ))}
          </div>
        </SectionCard>

        {/* CTA — GitHub */}
        <div
          style={{
            display:'flex',
            flexWrap:'wrap',
            gap:'14px',
            alignItems:'center',
            padding:'28px',
            background:'rgba(255,255,255,0.04)',
            backdropFilter:'(20px)',
            WebkitBackdropFilter:'(20px)',
            border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:'16px',
          }}
        >
          <div style={{ flex: 1, minWidth:'220px' }}>
            <p
              style={{
                margin:'0 0 4px',
                fontSize:'1rem',
                fontWeight: 600,
                color:'var(--text-primary, #f1f5f9)',
              }}
            >
              Ready to build this project?
            </p>
            <p
              style={{
                margin: 0,
                fontSize:'0.85rem',
                color:'var(--text-secondary, #94a3b8)',
              }}
            >
              Access the starter code, datasets, and step-by-step guide on GitHub.
            </p>
          </div>

          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:'inline-flex',
                alignItems:'center',
                gap:'8px',
                padding:'12px 24px',
                borderRadius:'10px',
                fontSize:'0.9rem',
                fontWeight: 600,
                color:'#fff',
                background:`var(--primary)`,
                textDecoration:'none',
                border:'none',
                cursor:'pointer',
                boxShadow:'none',
              }}
            >
              <Github size={16} />
              View on GitHub
            </a>

            <Link
              href="/projects"
              style={{
                display:'inline-flex',
                alignItems:'center',
                gap:'8px',
                padding:'12px 24px',
                borderRadius:'10px',
                fontSize:'0.9rem',
                fontWeight: 600,
                color:'var(--text-secondary, #94a3b8)',
                background:'rgba(255,255,255,0.06)',
                textDecoration:'none',
                border:'1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Layers size={16} />
              All Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
