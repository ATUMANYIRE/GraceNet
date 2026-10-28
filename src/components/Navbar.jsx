import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Compass, 
  MessageSquare, 
  Shield, 
  Moon, 
  Sun, 
  UserPlus, 
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
  userProfile,
  pendingRequestsCount = 0
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'sponsors', label: 'Sponsorship', icon: Users, badge: pendingRequestsCount > 0 ? `${pendingRequestsCount}` : null },
    { id: 'pay-equity', label: 'Pay Equity', icon: DollarSign, badge: 'Live Parity' },
    { id: 'roadmaps', label: 'Roadmaps', icon: Compass, badge: null },
    { id: 'community', label: 'Community', icon: MessageSquare, badge: 'Safe Space' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200">
      <div className="max-w-[1514px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-[68px]">
          
          {/* Left: Brand Logo + GraceNet */}
          <div 
            onClick={() => handleTabClick('sponsors')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <Logo size={30} className="group-hover:scale-105 transition-transform" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
                GraceNet
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-deepViolet/10 text-deepViolet dark:bg-purple-900/40 dark:text-purple-300">
                C3 Hackathon
              </span>
            </div>
          </div>

          {/* Centre: Nav Links with middle dots */}
          <nav className="hidden lg:flex items-center gap-6 text-[14.5px] font-normal text-slate-600 dark:text-slate-300">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              return (
                <React.Fragment key={tab.id}>
                  <button
                    onClick={() => handleTabClick(tab.id)}
                    className={`transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'font-semibold text-slate-950 dark:text-white'
                        : 'hover:text-slate-950 dark:hover:text-white text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive 
                          ? 'bg-deepViolet/10 text-deepViolet dark:bg-purple-950 dark:text-purple-300' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                  {idx < tabs.length - 1 && (
                    <span className="text-slate-300 dark:text-slate-700 select-none text-xs">·</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Right Action Pills & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Safety & Rights Pill */}
            <button
              onClick={onOpenSafety}
              title="Workplace Rights, Emergency Safety & Legal Assistance"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 transition-all shadow-sm"
            >
              <Shield className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span className="hidden sm:inline">Safety & Rights</span>
            </button>

            {/* Dark / Warm Porcelain Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Theme"
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-deepViolet dark:hover:text-purple-400 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Join Network Pill Button */}
            <button
              onClick={onOpenJoin}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#EFEFEF] hover:bg-[#E5E5E5] dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-all hover:-translate-y-0.5 active:translate-y-0"
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

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300"
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
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-deepViolet/10 text-deepViolet dark:bg-purple-900/40 dark:text-purple-200'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-deepViolet' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
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
