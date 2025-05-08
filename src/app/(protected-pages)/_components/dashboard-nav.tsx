'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  BarChart3,
  Bell,
  Home,
  Settings,
  CreditCard,
  LineChart
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <Home className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Market Insights',
    href: '/insights',
    icon: <LineChart className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Alerts',
    href: '/alerts',
    icon: <Bell className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Performance',
    href: '/performance',
    icon: <BarChart3 className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Subscription',
    href: '/subscription',
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start'
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  );
} 