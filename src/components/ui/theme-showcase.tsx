"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CheckIcon, ArrowRightIcon, BrainCircuitIcon, PenBoxIcon, LayoutGridIcon, SparklesIcon, HeartIcon } from "lucide-react";

export function ThemeShowcase() {
  return (
    <div className="relative min-h-screen bg-bg-primary overflow-hidden">
      {/* Gradient background effects */}
      <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-start/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[50%] rounded-full bg-highlight/10 blur-[100px]" />
      
      {/* Hero section */}
      <div className="container mx-auto pt-24 pb-20">
        <nav className="flex justify-between items-center mb-24">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-accent-gradient bg-clip-text text-transparent">WE<span className="text-white">03</span></span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-text-secondary hover:text-white transition">Products</a>
            <a href="#" className="text-text-secondary hover:text-white transition">Solutions</a>
            <a href="#" className="text-text-secondary hover:text-white transition">Customers</a>
            <a href="#" className="text-text-secondary hover:text-white transition">Pricing</a>
            <a href="#" className="text-text-secondary hover:text-white transition">Resources</a>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button className="bg-white text-black hover:bg-white/90 transition-all">
              Register Now <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-7xl font-semibold tracking-tight text-white leading-tight">
              <span className="text-[#A6A6A6]">Web3</span> Design
              <div>
                <span className="bg-accent-gradient bg-clip-text text-transparent">Agency</span>
                <span className="text-highlight">.</span>
              </div>
            </h1>
            <p className="text-lg text-text-secondary max-w-md">
              Better data leads to more performance models. Performant models lead to faster deployment.
            </p>
            <Button className="bg-white text-black hover:bg-white/90 transition-all text-lg px-8 py-6 h-auto">
              Get Started
            </Button>
            
            <div className="flex gap-8 pt-4">
              <div className="glass-stats-card">
                <div className="text-3xl font-bold text-white">240+</div>
                <div className="text-text-secondary uppercase text-xs tracking-wider">Partners</div>
              </div>
              <div className="glass-stats-card">
                <div className="text-3xl font-bold text-white">92%</div>
                <div className="text-text-secondary uppercase text-xs tracking-wider">Faster Technology</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-accent-start/20 blur-[80px] rounded-full transform scale-75 translate-x-10"></div>
            <div className="relative z-10 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-r from-highlight/20 to-accent-start/20 rounded-full p-1">
                <div className="w-full aspect-square rounded-full bg-bg-primary flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-start/10 to-highlight/10"></div>
                  <div className="w-4/5 h-4/5 relative">
                    {/* This would be replaced with actual 3D art in production */}
                    <div className="absolute inset-0 animate-pulse bg-accent-gradient opacity-40 rounded-full blur-xl"></div>
                    <div className="absolute inset-10 animate-pulse bg-highlight opacity-30 rounded-full blur-xl delay-300"></div>
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      <span className="text-text-secondary opacity-80">3D</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="services-divider flex items-center justify-between mt-12 py-4 glass-subtle overflow-x-auto">
          <div className="flex items-center gap-1 text-text-secondary px-4 whitespace-nowrap">
            <PenBoxIcon className="h-4 w-4 text-highlight" />
            <span>Site Design</span>
          </div>
          <div className="flex items-center gap-1 text-text-secondary px-4 whitespace-nowrap">
            <LayoutGridIcon className="h-4 w-4 text-highlight" />
            <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-1 text-text-secondary px-4 whitespace-nowrap">
            <SparklesIcon className="h-4 w-4 text-highlight" />
            <span>NFT Art</span>
          </div>
          <div className="flex items-center gap-1 text-text-secondary px-4 whitespace-nowrap">
            <BrainCircuitIcon className="h-4 w-4 text-highlight" />
            <span>Development</span>
          </div>
          <div className="flex items-center gap-1 text-text-secondary px-4 whitespace-nowrap">
            <HeartIcon className="h-4 w-4 text-highlight" />
            <span>Mention Design</span>
          </div>
        </div>
      </div>

      {/* Services section */}
      <div className="container mx-auto py-20">
        <h2 className="text-5xl font-semibold text-white text-center mb-20">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Service Card 1 */}
          <div className="glass-service-card group">
            <div className="relative z-10">
              <h3 className="text-3xl font-semibold text-white mb-4">UI/UX Design</h3>
              <p className="text-text-secondary mb-6 max-w-md">
                Hands-on learning via real-life innovation projects. Create immersive UI via wireframes. 
                Conduct heuristic evaluations of your UX design.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-highlight" />
                  <p className="text-text-secondary">User Interface design</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-highlight" />
                  <p className="text-text-secondary">User Experience Design</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-highlight" />
                  <p className="text-text-secondary">Mobile Application design</p>
                </div>
              </div>
              <Button variant="outline" className="mt-8 group-hover:border-highlight/50 transition-all">
                Learn More <ArrowRightIcon className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="service-image-container">
              <div className="service-image bg-gradient-to-br from-accent-start/40 to-highlight/30 rounded-xl">
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-16 rounded bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-10 h-3 bg-highlight/60 rounded-full"></div>
                  </div>
                  <div className="h-16 rounded bg-white/10 backdrop-blur-sm"></div>
                  <div className="h-16 rounded bg-white/10 backdrop-blur-sm col-span-2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="glass-service-card group">
            <div className="relative z-10">
              <h3 className="text-3xl font-semibold text-white mb-4">Web3 Development</h3>
              <p className="text-text-secondary mb-6 max-w-md">
                Build applications on blockchain technology with smart contracts.
                Create decentralized solutions with modern architecture.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-highlight" />
                  <p className="text-text-secondary">Smart contract development</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-highlight" />
                  <p className="text-text-secondary">DApp architecture</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-highlight" />
                  <p className="text-text-secondary">Blockchain integration</p>
                </div>
              </div>
              <Button variant="outline" className="mt-8 group-hover:border-highlight/50 transition-all">
                Learn More <ArrowRightIcon className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="service-image-container">
              <div className="service-image bg-gradient-to-br from-highlight/30 to-accent-start/40 rounded-xl">
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-8 rounded bg-white/10 backdrop-blur-sm"></div>
                  <div className="h-8 rounded bg-white/10 backdrop-blur-sm"></div>
                  <div className="h-8 rounded bg-white/10 backdrop-blur-sm"></div>
                  <div className="h-16 rounded bg-white/10 backdrop-blur-sm col-span-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          <div className="glass-stats-large">
            <div className="text-4xl font-bold text-white">5M+</div>
            <div className="text-text-secondary">Customers</div>
          </div>
          <div className="glass-stats-large">
            <div className="text-4xl font-bold text-white">450M+</div>
            <div className="text-text-secondary">Coverage</div>
          </div>
          <div className="glass-stats-large">
            <div className="text-4xl font-bold text-white">22%</div>
            <div className="text-text-secondary">Earning</div>
          </div>
          <div className="glass-stats-large">
            <div className="text-4xl font-bold text-white">8.03%</div>
            <div className="text-text-secondary">Interest</div>
          </div>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="container mx-auto py-20">
        <h2 className="text-5xl font-semibold text-white text-center mb-20">
          Our happy Customers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((testimonial) => (
            <div key={testimonial} className="glass-testimonial-card">
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-highlight">★</span>
                ))}
              </div>
              <p className="text-text-secondary mb-6">
                &ldquo;I suggest that the top planners spend most of their time engaged in analysis and planning discussions rather than coding.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent-gradient flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <div className="text-white font-medium">Sarah Mosley</div>
                  <div className="text-text-secondary text-sm">Founder at Acme</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="container mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold bg-accent-gradient bg-clip-text text-transparent mb-4">
                WE<span className="text-white">03</span>
              </div>
              <p className="text-text-secondary mb-6 max-w-md">
                A platform built of social contracts that uses cryptography to secure transactions that are digitally recorded on a distributed ledger.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white text-xs">f</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white text-xs">t</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white text-xs">in</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Useful Link</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-text-secondary hover:text-white transition">Get Started</a></li>
                <li><a href="#" className="text-text-secondary hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="text-text-secondary hover:text-white transition">Terms & Condition</a></li>
                <li><a href="#" className="text-text-secondary hover:text-white transition">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="text-text-secondary">+44 123 456 7890</li>
                <li className="text-text-secondary">info@web3agency.com</li>
                <li className="text-text-secondary">Plan St, Central, Baltimore 10234</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-6 text-center text-text-secondary text-sm">
            All rights Reserved © 2023
          </div>
        </div>
      </footer>

      {/* Custom CSS */}
      <style jsx>{`
        /* Global styles */
        :global(.glass-panel) {
          background: rgba(26, 26, 26, 0.25);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        
        :global(.glass-subtle) {
          background: rgba(26, 26, 26, 0.2);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
        }
        
        :global(.glass-stats-card) {
          background: rgba(26, 26, 26, 0.3);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 16px;
          min-width: 100px;
        }
        
        :global(.glass-stats-large) {
          background: rgba(26, 26, 26, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        
        :global(.glass-service-card) {
          background: rgba(26, 26, 26, 0.4);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        :global(.glass-service-card:hover) {
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        
        :global(.service-image-container) {
          position: absolute;
          right: 24px;
          top: 24px;
          width: 160px;
          height: 160px;
          z-index: 0;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        
        :global(.glass-service-card:hover .service-image-container) {
          opacity: 1;
          transform: translateY(-5px);
        }
        
        :global(.service-image) {
          width: 100%;
          height: 100%;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        :global(.glass-testimonial-card) {
          background: rgba(26, 26, 26, 0.3);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
        }
        
        :global(.glass-testimonial-card:hover) {
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
} 