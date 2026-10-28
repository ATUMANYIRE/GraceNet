import React, { useState } from 'react';
import { 
  Shield, 
  Moon, 
  Sun, 
  Menu, 
  X,
  UserPlus
} from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  darkMode, 
  setDarkMode, 
  onOpenSafety, 
  onOpenJoin, 
  userProfile,
  pendingRequestsCount = 0
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'sponsors', label: 'Sponsorship', badge: pendingRequestsCount > 0 ? `${pendingRequestsCount}` : null },
    { id: 'pay-equity', label: 'Pay Equity', badge: 'Live Parity' },
    { id: 'roadmaps', label: 'Career Roadmaps', badge: null },
    { id: 'community', label: 'Community Hub', badge: 'Safe Space' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] dark:bg-slate-950 border-b border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200">
      <div className="max-w-[1514px] mx-auto px-4 sm:px-[52px]">
        <div className="flex items-center justify-between h-[68px]">
          
          {/* Left: GraceNet Brand Logo + Title */}
          <div 
            onClick={() => handleTabClick('sponsors')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <Logo size={30} className="group-hover:scale-105 transition-transform" />
            <div className="flex items-baseline gap-2">
              <span className="text-[20px] font-[600] tracking-[-0.03em] text-[#000000] dark:text-white">
                GraceNet
              </span>
              <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-[#F1EDFE] to-[#E8E2FD] text-[#6A4CEB]">
                C3 Hackathon
              </span>
            </div>
          </div>

          {/* Centre: Nav links (Inter 14.5px, #3A3C40, active bold #000000, middle dots ·) */}
          <nav className="hidden lg:flex items-center gap-7 text-[14.5px] font-[400] text-[#3A3C40] dark:text-slate-300">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              return (
                <React.Fragment key={tab.id}>
                  <button
                    onClick={() => handleTabClick(tab.id)}
                    className={`transition-colors cursor-pointer bg-transparent border-none flex items-center gap-1.5 ${
                      isActive
                        ? 'font-[600] text-[#000000] dark:text-white'
                        : 'hover:text-[#000000] dark:hover:text-white text-[#3A3C40] dark:text-slate-300'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-[600] ${
                        isActive
                          ? 'bg-[#000000] text-white dark:bg-white dark:text-black'
                          : 'bg-[#EAEAEA] text-[#5E6064]'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                  {idx < tabs.length - 1 && (
                    <span className="text-[#C0C0C2] dark:text-slate-700 select-none text-[12px]">·</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Right Action Pills: Safety, Join Network, Theme toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Safety & Rights Pill: #EFEFEF, 13.5px, #3A3C40 */}
            <button
              onClick={onOpenSafety}
              title="Workplace Rights, California Equal Pay & Emergency Exit"
              className="flex items-center gap-1.5 px-[16px] py-[8px] rounded-full text-[13.5px] font-[500] bg-[#EFEFEF] hover:bg-[#E5E5E5] dark:bg-slate-800 dark:hover:bg-slate-700 text-[#3A3C40] dark:text-slate-200 transition-colors border-none cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#F8533F]" />
              <span className="hidden sm:inline">Safety & Rights</span>
            </button>

            {/* Join Network Pill */}
            <button
              onClick={onOpenJoin}
              className="flex items-center gap-1.5 px-[16px] py-[8px] rounded-full text-[13.5px] font-[500] bg-[#000000] hover:bg-slate-900 text-white transition-all hover:-translate-y-0.5 cursor-pointer border-none shadow-sm"
            >
              {userProfile?.isRegistered ? (
                <>
                  <div className="w-5 h-5 rounded-full overflow-hidden border border-white/60">
                    <img 
                      src={userProfile.avatar} 
                      alt={userProfile.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="hidden sm:inline truncate max-w-[100px]">{userProfile.name}</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Join Network</span>
                </>
              )}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Theme"
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer bg-transparent"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-transparent border-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 space-y-1 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#F1EDFE] text-[#6A4CEB]'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-[#EAEAEA] text-[#5E6064]">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
