import { redirect } from 'next/navigation';
import { DashboardNav } from './_components/dashboard-nav';
import { SiteHeader } from './_components/site-header';
import { requireAuth } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated
  try {
    await requireAuth();
  } catch (error) {
    redirect('/sign-in');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 md:py-6">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav />
        </aside>
        <main className="relative py-6 md:py-0">
          {children}
        </main>
      </div>
    </div>
  );
} 