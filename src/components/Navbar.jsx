import React, { useState } from 'react';
import { 
  Sparkles, 
  Users, 
  DollarSign, 
  Compass, 
  MessageSquare, 
  Shield, 
  Moon, 
  Sun, 
  UserPlus, 
  Menu, 
  X,
  HeartHandshake
} from 'lucide-react';

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
    { id: 'sponsors', label: 'Sponsorship Matcher', icon: Users, badge: pendingRequestsCount > 0 ? `${pendingRequestsCount}` : null },
    { id: 'pay-equity', label: 'Wage Transparency', icon: DollarSign, badge: 'Live Parity' },
    { id: 'roadmaps', label: 'Career Roadmaps', icon: Compass, badge: null },
    { id: 'community', label: 'Community Hub', icon: MessageSquare, badge: 'Safe Space' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FDFBF7]/90 dark:bg-[#0F172A]/90 border-b border-purple-100 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleTabClick('sponsors')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 via-deepViolet to-rose-500 p-0.5 shadow-md group-hover:shadow-glow-purple transition-all duration-300">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-deepViolet dark:text-purple-400 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500 border-2 border-white dark:border-slate-900"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-deepViolet via-purple-600 to-roseQuartz bg-clip-text text-transparent">
                  GraceNet
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-deepViolet/10 text-deepViolet dark:bg-purple-900/50 dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/50">
                  C3 Hackathon
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Catalyst California • Women in Tech Sponsorship
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-deepViolet dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-deepViolet dark:text-purple-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive 
                        ? 'bg-deepViolet/10 text-deepViolet dark:bg-purple-950 dark:text-purple-300'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Emergency / Safety Resource Button */}
            <button
              onClick={onOpenSafety}
              title="Workplace Rights, Emergency Safety & Legal Assistance"
              className="group flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-semibold border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 transition-all shadow-sm"
            >
              <Shield className="w-4 h-4 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Safety & Rights</span>
            </button>

            {/* Dark / Warm Porcelain Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Dark / Slate Mode"
              className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-deepViolet dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-700 transition-all shadow-sm"
              title={darkMode ? "Switch to Warm Porcelain theme" : "Switch to Dark Slate theme"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Join Network / User Profile Trigger */}
            <button
              onClick={onOpenJoin}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold bg-gradient-to-r from-deepViolet to-purple-700 hover:from-purple-700 hover:to-indigo-800 text-white shadow-md shadow-purple-900/20 hover:shadow-glow-purple transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-white/20">
                    {userProfile.membershipType}
                  </span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Join Network</span>
                </>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 space-y-2 bg-[#FDFBF7] dark:bg-[#0F172A] border-b border-purple-100 dark:border-slate-800 animate-fadeIn">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-deepViolet/10 text-deepViolet dark:bg-purple-900/40 dark:text-purple-200'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-deepViolet' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
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
