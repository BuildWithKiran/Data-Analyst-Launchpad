import type { Metadata } from"next";
import"./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SplashAnimation from "@/components/providers/SplashAnimation";
import CursorGlow from "@/components/providers/CursorGlow";
import Navbar from"@/components/layout/Navbar";
import Footer from"@/components/layout/Footer";

export const metadata: Metadata = {
  title:"Data Analyst Launchpad — Become Job-Ready",
  description:"Master SQL, Excel, Python, Power BI through structured roadmaps, projects, interview prep, cheat sheets, and progress tracking. The ultimate free resource for aspiring Data Analysts.",
  keywords: ["data analyst","SQL tutorial","Python for data analysis","Excel guide","Power BI","data analytics roadmap","interview prep","data science beginners",
  ],
  authors: [{ name:"Data Analyst Launchpad" }],
  openGraph: {
    title:"Data Analyst Launchpad — Become Job-Ready",
    description:"The ultimate free platform to learn data analytics with roadmaps, projects, interviews, and career tools.",
    type:"website",
    url:"https://dataanalystlaunchpad.dev",
  },
  twitter: {
    card:"summary_large_image",
    title:"Data Analyst Launchpad",
    description:"Become a Job-Ready Data Analyst with structured roadmaps and projects.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <CursorGlow />
          <SplashAnimation>
            <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
              <Navbar />
              <main className="flex-1 relative z-10">
                {children}
              </main>
              <Footer />
            </div>
          </SplashAnimation>
        </ThemeProvider>
      </body>
    </html>
  );
}
