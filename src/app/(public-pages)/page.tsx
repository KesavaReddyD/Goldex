'use client'

import { GoldBar3D } from "@/components/landing/GoldBar3D";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {

  // const router = useRouter();

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 flex flex-col items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-start/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[50%] rounded-full bg-highlight/10 blur-[100px]" />
        </div>
        <nav className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 mb-12">
          <div className="flex items-center">
            <div className="text-2xl font-bold">
              <span className="text-accent-start">Gold</span>
              <span className="text-highlight">ex</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" className="border-foreground/30 text-foreground hover:text-foreground hover:bg-foreground/5"  asChild>
              <Link href="/sign-in" prefetch={true}>Log In</Link>
            </Button>
            <Button variant="outline"  className="border-foreground/30 text-foreground hover:text-foreground hover:bg-foreground/5" asChild>
              <Link href="/sign-up" prefetch={true}>Sign Up</Link>
            </Button>
          </div>
        </nav>
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 flex flex-col items-start gap-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              AI-Powered Gold & Forex Trading Insights
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Unlock smarter trading with real-time analytics, AI recommendations, and a global trader community. Goldex empowers you to make data-driven decisions in volatile markets.
            </p>
            <div className="flex gap-4">
              <Button className="bg-accent-start hover:bg-accent-start/90 text-black dark:text-white shadow px-8 py-4 text-lg font-semibold" asChild>
                <Link href="/sign-up">Get Started Free</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <GoldBar3D />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container mx-auto py-20">
        <h2 className="text-4xl font-bold text-foreground text-center mb-16">Why Goldex?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Real-time Market Data",
              desc: "Stay ahead with live gold and forex prices, charts, and news.",
            },
            {
              title: "AI-Powered Recommendations",
              desc: "Get actionable buy/sell signals and risk analysis from advanced AI models.",
            },
            {
              title: "Custom Alerts",
              desc: "Set price, news, and volatility alerts tailored to your strategy.",
            },
            {
              title: "Secure Cloud Portfolio",
              desc: "Track your holdings and performance securely, anywhere, anytime.",
            },
            {
              title: "Community Insights",
              desc: "Learn from top traders and share strategies in a global community.",
            },
            {
              title: "Mobile & Web Access",
              desc: "Trade and monitor markets on any device, 24/7.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="glass-feature-card p-8 rounded-2xl border border-white/30 shadow-gold-glow flex flex-col gap-4"
            >
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-highlight" />
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground text-base">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Users", value: "12,000+" },
            { label: "Trades Executed", value: "1.2M+" },
            { label: "Supported Assets", value: "50+" },
            { label: "Uptime", value: "99.99%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-stats-card p-8 rounded-xl border border-white/30 shadow-gold-glow flex flex-col items-center"
            >
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="container mx-auto py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold mb-4 md:mb-0">
            <span className="text-accent-start">Gold</span>
            <span className="text-highlight">ex</span>
          </div>
          <div className="text-muted-foreground text-sm">© {new Date().getFullYear()} Goldex. All rights reserved.</div>
        </div>
      </footer>

      {/* Custom CSS for glassmorphism and gold glow */}
      <style jsx>{`
        :global(.glass-hero-card) {
          background: rgba(255,255,255,0.10);
          border: 1.5px solid rgba(255,255,255,0.25);
          box-shadow: 0 8px 32px 0 rgba(255,255,255,0.10), 0 0 24px 0 #FEC75A44;
          backdrop-filter: blur(24px);
        }
        :global(.glass-feature-card) {
          background: rgba(255,255,255,0.13);
          border: 1.5px solid rgba(255,255,255,0.22);
          box-shadow: 0 4px 32px 0 rgba(255,255,255,0.10), 0 0 12px 0 #FEC75A33;
          backdrop-filter: blur(18px);
        }
        :global(.glass-stats-card) {
          background: rgba(255,255,255,0.10);
          border: 1.5px solid rgba(255,255,255,0.18);
          box-shadow: 0 2px 16px 0 rgba(255,255,255,0.08), 0 0 8px 0 #FEC75A22;
          backdrop-filter: blur(12px);
        }
        :global(.shadow-gold-glow) {
          box-shadow: 0 0 0 2px #FEC75A33, 0 4px 32px 0 #FEC75A22;
        }

        /* Adjust glass cards for light mode */
        :global(.light .glass-hero-card),
        :global(.light .glass-feature-card),
        :global(.light .glass-stats-card) {
          background: rgba(0,0,0,0.05);
          border: 1.5px solid rgba(0,0,0,0.1);
          box-shadow: 0 8px 32px 0 rgba(0,0,0,0.05), 0 0 12px 0 #FEC75A22;
        }
      `}</style>
    </div>
  );
}
