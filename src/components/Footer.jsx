import React from 'react';
import { Heart, Shield, Code, ExternalLink } from 'lucide-react';
import Logo from './Logo';

export default function Footer({ onOpenSafety, onOpenJoin, setActiveTab }) {
  return (
    <footer className="mt-16 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs">
      <div className="max-w-[1514px] mx-auto px-4 sm:px-8 py-12 space-y-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Grace Hopper Homage */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Logo size={26} />
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                GraceNet
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-deepViolet/10 text-deepViolet dark:bg-purple-950 dark:text-purple-300">
                C3 Hackathon
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Built for the <strong>Catalyst California Conference (C3) Hackathon</strong>. GraceNet is engineered to dismantle the tech gender wage gap through executive sponsorship, audited pay transparency, and peer safe spaces.
            </p>

            <blockquote className="pt-2 italic border-l-2 border-deepViolet pl-3 text-slate-600 dark:text-slate-400 text-[11px]">
              "The most dangerous phrase in the language is: 'We've always done it this way.'"
              <span className="block not-italic font-bold text-slate-800 dark:text-slate-300 mt-0.5">
                — Rear Admiral Grace Hopper
              </span>
            </blockquote>
          </div>

          {/* Platform Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Platform Modules
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => setActiveTab('sponsors')}
                  className="hover:text-deepViolet dark:hover:text-purple-300 transition-colors"
                >
                  Sponsorship Matcher
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('pay-equity')}
                  className="hover:text-deepViolet dark:hover:text-purple-300 transition-colors"
                >
                  Wage Transparency & Parity
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('roadmaps')}
                  className="hover:text-deepViolet dark:hover:text-purple-300 transition-colors"
                >
                  Grace Hopper Career Roadmaps
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('community')}
                  className="hover:text-deepViolet dark:hover:text-purple-300 transition-colors"
                >
                  Community & Safe Space Forum
                </button>
              </li>
            </ul>
          </div>

          {/* Safety & Initiatives */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Rights & Actions
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={onOpenSafety}
                  className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold hover:underline"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Workplace Safety & Legal Rights</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenJoin}
                  className="hover:text-deepViolet dark:hover:text-purple-300 transition-colors"
                >
                  Join as an Executive Sponsor
                </button>
              </li>
              <li>
                <a
                  href="https://www.dir.ca.gov/dlse/california_equal_pay_act.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-deepViolet dark:hover:text-purple-300 transition-colors"
                >
                  <span>CA Equal Pay Act Info</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://ghc.anitab.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-deepViolet dark:hover:text-purple-300 transition-colors"
                >
                  <span>AnitaB.org GHC Initiative</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} GraceNet. Catalyst California Conference.</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-rose-500">
              Made with <Heart className="w-3 h-3 fill-current" /> for women in technology
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Code className="w-3.5 h-3.5 text-deepViolet" />
              React 19 • Tailwind CSS • Vite
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
