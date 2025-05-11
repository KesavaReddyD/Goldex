'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  BarChart,
  Bell,
  ChevronRight,
  CreditCard,
  Home,
  Settings,
  LineChart,
  History,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  variant: 'default' | 'ghost';
}

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <Home className="h-5 w-5" />,
      variant: pathname === '/dashboard' ? 'default' : 'ghost',
    },
    {
      title: 'Charts',
      href: '/charts',
      icon: <LineChart className="h-5 w-5" />,
      variant: pathname === '/charts' ? 'default' : 'ghost',
    },
    {
      title: 'Alerts',
      href: '/alerts',
      icon: <Bell className="h-5 w-5" />,
      variant: pathname === '/alerts' ? 'default' : 'ghost',
    },
    {
      title: 'History',
      href: '/history',
      icon: <History className="h-5 w-5" />,
      variant: pathname === '/history' ? 'default' : 'ghost',
    },
    {
      title: 'Performance',
      href: '/performance',
      icon: <BarChart className="h-5 w-5" />,
      variant: pathname === '/performance' ? 'default' : 'ghost',
    },
    {
      title: 'Subscription',
      href: '/subscription',
      icon: <CreditCard className="h-5 w-5" />,
      variant: pathname === '/subscription' ? 'default' : 'ghost',
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <Settings className="h-5 w-5" />,
      variant: pathname === '/settings' ? 'default' : 'ghost',
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Mobile sidebar toggle */}
      <div className="flex h-16 items-center px-4 lg:hidden">
        <Button variant="outline" size="icon" onClick={() => setIsMobileOpen(true)}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform border-r bg-background transition-transform duration-300 ease-in-out lg:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <span className="font-bold text-xl">Goldex</span>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Navigation
            </h2>
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    item.variant === "default" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Sidebar for desktop */}
      <div
        className={cn(
          "hidden border-r bg-background transition-all duration-300 ease-in-out lg:block",
          isCollapsed ? "w-16" : "w-72"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!isCollapsed && <span className="font-bold text-xl">Goldex</span>}
          <Button
            variant="ghost"
            size="icon"
            className={cn("ml-auto", isCollapsed && "rotate-180")}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="px-3 py-2">
            {!isCollapsed && (
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Navigation
              </h2>
            )}
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    item.variant === "default" ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    isCollapsed ? "justify-center" : "gap-3"
                  )}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
} 