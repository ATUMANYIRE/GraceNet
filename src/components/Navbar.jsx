import React, { useState } from 'react';
import { 
  Shield, 
  Moon, 
  Sun, 
  Menu, 
  X,
  UserPlus,
  Compass,
  DollarSign,
  Users,
  Award,
  Sparkles
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
    { 
      id: 'sponsors', 
      label: 'Sponsorship', 
      badge: pendingRequestsCount > 0 ? `${pendingRequestsCount} Sent` : '14 Verified',
      icon: Users
    },
    { 
      id: 'pay-equity', 
      label: 'Pay Equity', 
      badge: 'Audited Data',
      icon: DollarSign 
    },
    { 
      id: 'roadmaps', 
      label: 'Career Roadmaps', 
      badge: '5 Tracks',
      icon: Compass 
    },
    { 
      id: 'community', 
      label: 'Community Hub', 
      badge: 'Safe Space',
      icon: Award 
    },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 dark:bg-[#0B0F19]/90 backdrop-blur-md border-b border-[#EAEAEA] dark:border-white/10 transition-colors duration-200">
      <div className="max-w-[1514px] mx-auto px-4 sm:px-8 lg:px-[52px]">
        <div className="flex items-center justify-between h-[68px]">
          
          {/* Left: GraceNet Brand Logo + Title + C3 Hackathon Badge */}
          <div 
            onClick={() => handleTabClick('sponsors')}
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="transition-transform duration-200 group-hover:scale-105">
              <Logo size={32} />
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[20px] font-[600] tracking-[-0.035em] text-[#000000] dark:text-white">
                GraceNet
              </span>
              <span className="hidden sm:inline-flex items-center text-[10.5px] uppercase font-[600] tracking-wider px-2.5 py-0.5 rounded-full bg-[#F1EDFE] text-[#6A4CEB] dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/40">
                C3 Hackathon
              </span>
            </div>
          </div>

          {/* Centre: Nav links with refined typography, active pill & middle dots */}
          <nav className="hidden lg:flex items-center gap-2 text-[14px] font-[500] text-[#3A3C40] dark:text-slate-300">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              return (
                <React.Fragment key={tab.id}>
                  <button
                    onClick={() => handleTabClick(tab.id)}
                    className={`transition-all duration-150 cursor-pointer border-none flex items-center gap-2 px-3.5 py-1.5 rounded-full ${
                      isActive
                        ? 'bg-[#F4F4F6] dark:bg-slate-800/90 font-[600] text-[#000000] dark:text-white shadow-2xs'
                        : 'bg-transparent hover:bg-black/[0.04] dark:hover:bg-white/[0.05] hover:text-[#000000] dark:hover:text-white text-[#3A3C40] dark:text-slate-300'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-[600] tracking-tight ${
                        isActive
                          ? 'bg-[#000000] text-white dark:bg-white dark:text-black'
                          : 'bg-[#EAEAEA] dark:bg-slate-700 text-[#5E6064] dark:text-slate-300'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                  {idx < tabs.length - 1 && (
                    <span className="text-[#C0C0C2] dark:text-slate-700 select-none text-[12px] px-0.5">·</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Right Action Pills: Safety, Join Network, Theme toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Safety & Rights Pill: #F4F4F6, 13.5px, coral shield */}
            <button
              onClick={onOpenSafety}
              title="Workplace Rights, California Equal Pay & Emergency Exit"
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-[13px] font-[500] bg-[#F4F4F6] hover:bg-[#EBEBEF] dark:bg-slate-800 dark:hover:bg-slate-700 text-[#3A3C40] dark:text-slate-200 transition-colors border border-black/[0.04] dark:border-white/[0.06] cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#F8533F] shrink-0" />
              <span className="hidden sm:inline">Safety & Rights</span>
            </button>

            {/* Join Network Pill / Profile */}
            <button
              onClick={onOpenJoin}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-[13px] font-[500] bg-[#000000] hover:bg-neutral-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-black transition-all hover:-translate-y-0.5 cursor-pointer border-none shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
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
                  <span className="hidden sm:inline truncate max-w-[105px] font-[600]">{userProfile.name}</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5 shrink-0" />
                  <span>Join Network</span>
                </>
              )}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Theme"
              className="p-2 rounded-full border border-black/[0.08] dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors cursor-pointer bg-transparent shrink-0"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] bg-transparent border-none cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-5 space-y-2 bg-white dark:bg-slate-900 border-b border-[#EAEAEA] dark:border-slate-800 shadow-lg">
          <div className="text-[11px] font-[600] uppercase tracking-wider text-[#7A5CF0] px-3 pb-1">
            Platform Navigation
          </div>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-sm font-[500] transition-colors cursor-pointer border-none ${
                  isActive
                    ? 'bg-[#F4F4F6] dark:bg-slate-800 text-[#000000] dark:text-white font-[600]'
                    : 'bg-transparent text-[#3A3C40] dark:text-slate-300 hover:bg-black/[0.02] dark:hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#7A5CF0]' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className={`text-[10px] font-[600] px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#000000] text-white dark:bg-white dark:text-black'
                      : 'bg-[#EAEAEA] dark:bg-slate-700 text-[#5E6064] dark:text-slate-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenSafety();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F4F4F6] dark:bg-slate-800 text-[#3A3C40] dark:text-slate-200 text-sm font-[500] border-none cursor-pointer"
            >
              <Shield className="w-4 h-4 text-[#F8533F]" />
              <span>Safety & Legal Workplace Rights</span>
            </button>
            <button
              onClick={() => {
                onOpenJoin();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#000000] text-white dark:bg-white dark:text-black text-sm font-[500] border-none cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>{userProfile?.isRegistered ? 'Edit Profile' : 'Join GraceNet Network'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
