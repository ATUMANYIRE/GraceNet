import React, { useState } from 'react';
import { 
  Shield, 
  Moon, 
  Sun, 
  Menu, 
  X
} from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  darkMode, 
  setDarkMode, 
  onOpenSafety, 
  onOpenJoin, 
  userProfile
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'sponsors', label: 'Sponsorship' },
    { id: 'pay-equity', label: 'Pay Equity' },
    { id: 'roadmaps', label: 'Roadmaps' },
    { id: 'community', label: 'Community' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] dark:bg-[#0B0F19] border-b border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200">
      <div className="max-w-[1514px] mx-auto px-4 sm:px-8 lg:px-[52px]">
        <div className="flex items-center justify-between h-[68px]">
          
          {/* Left: Corvana-Style Minimal Logo Mark + Title */}
          <div 
            onClick={() => handleTabClick('sponsors')}
            className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
          >
            <div className="transition-transform duration-200 group-hover:scale-105">
              <Logo size={28} />
            </div>
            <span className="text-[20px] font-[600] tracking-[-0.035em] text-[#000000] dark:text-white">
              GraceNet
            </span>
          </div>

          {/* Centre: Pure Typographic Nav Links separated by delicate middle dots (NO grey pill backgrounds) */}
          <nav className="hidden lg:flex items-center gap-7 text-[14.5px] text-[#3A3C40] dark:text-slate-300 font-[400]">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              return (
                <React.Fragment key={tab.id}>
                  <button
                    onClick={() => handleTabClick(tab.id)}
                    className={`transition-colors cursor-pointer bg-transparent border-none p-0 ${
                      isActive
                        ? 'font-[600] text-[#000000] dark:text-white'
                        : 'font-[400] text-[#3A3C40] dark:text-slate-300 hover:text-[#000000] dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                  {idx < tabs.length - 1 && (
                    <span className="text-[#C0C0C2] dark:text-slate-700 select-none text-[12px]">·</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Right Action Items: Clean Safety link, Join Network Black Pill, Theme toggle (NO grey bgs) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Safety & Rights Clean Link (No grey background) */}
            <button
              onClick={onOpenSafety}
              title="Workplace Rights & Safety"
              className="hidden sm:flex items-center gap-1.5 text-[13.5px] font-[500] text-[#3A3C40] dark:text-slate-300 hover:text-[#000000] dark:hover:text-white transition-colors bg-transparent border-none cursor-pointer px-2 py-1"
            >
              <Shield className="w-3.5 h-3.5 text-[#F8533F] shrink-0" />
              <span>Safety</span>
            </button>

            {/* Join Network Black Pill Button */}
            <button
              onClick={onOpenJoin}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-[13.5px] font-[500] bg-[#000000] hover:bg-neutral-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-black transition-all cursor-pointer border-none shadow-sm"
            >
              {userProfile?.isRegistered ? (
                <>
                  <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-white/60 dark:ring-black/40 shrink-0">
                    <img 
                      src={userProfile.avatar} 
                      alt={userProfile.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="truncate max-w-[95px] font-[600]">{userProfile.name}</span>
                </>
              ) : (
                <span>Join Network</span>
              )}
            </button>

            {/* Dark / Light Mode Minimal Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Theme"
              className="p-1.5 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer bg-transparent border-none shrink-0"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-700 dark:text-slate-300 hover:text-black bg-transparent border-none cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-5 space-y-2 bg-white dark:bg-slate-900 border-b border-black/[0.06] dark:border-slate-800 shadow-md">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-sm cursor-pointer border-none ${
                  isActive
                    ? 'font-[600] text-[#000000] dark:text-white bg-[#FAF9F8] dark:bg-slate-800'
                    : 'font-[400] text-[#3A3C40] dark:text-slate-300 hover:text-black dark:hover:text-white bg-transparent'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenSafety();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-black/[0.08] dark:border-white/10 text-[#3A3C40] dark:text-slate-200 text-sm font-[500] bg-transparent cursor-pointer"
            >
              <Shield className="w-4 h-4 text-[#F8533F]" />
              <span>Safety & Legal Rights</span>
            </button>
            <button
              onClick={() => {
                onOpenJoin();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#000000] text-white dark:bg-white dark:text-black text-sm font-[500] border-none cursor-pointer"
            >
              <span>{userProfile?.isRegistered ? 'Edit Profile' : 'Join GraceNet Network'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
