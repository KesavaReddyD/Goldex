'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  BarChart3,
  Bell,
  Home,
  Menu,
  Settings,
  CreditCard,
  LineChart,
  X,
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

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={() => setOpen(false)}
          >
            <span className="font-bold text-lg">Goldex</span>
          </Link>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex w-full items-center rounded-md px-2 py-2 text-sm font-medium',
                  pathname === item.href
                    ? 'bg-muted'
                    : 'hover:bg-muted'
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 