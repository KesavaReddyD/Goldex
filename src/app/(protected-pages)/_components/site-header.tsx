'use client';

import Link from 'next/link';
import { useAuth } from '@/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserNav } from './user-nav';
import { MobileNav } from './mobile-nav';

export function SiteHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-14 items-center">
        <div className="flex items-center mr-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Goldex</span>
          </Link>
        </div>
        
        <MobileNav />
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            {user ? (
              <UserNav />
            ) : (
              <Button size="sm" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
} 