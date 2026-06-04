import { Metadata } from'next';

export const metadata: Metadata = {
  title:'Interview Prep Hub | Data Analyst Launchpad',
  description:'Ace your data analyst interview with 83 curated questions covering SQL, Excel, Python, Power BI, HR, and case studies.',
};

export default function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
