import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - Goldex',
  description: 'Sign in or create an account with Goldex',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
} 