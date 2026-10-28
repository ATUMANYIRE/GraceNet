import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Compass, 
  MessageSquare, 
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
  userProfile,
  pendingRequestsCount = 0
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'sponsors', label: 'Care', badge: pendingRequestsCount > 0 ? `${pendingRequestsCount}` : null },
    { id: 'pay-equity', label: 'Features', badge: null },
    { id: 'roadmaps', label: 'Clinics', badge: null },
    { id: 'community', label: 'Customers', badge: null },
    { id: 'careers', label: 'Careers', badge: null },
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'careers') {
      setActiveTab('roadmaps');
    } else {
      setActiveTab(tabId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] dark:bg-slate-950 border-b border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200">
      <div className="max-w-[1514px] mx-auto px-4 sm:px-[52px]">
        <div className="flex items-center justify-between h-[68px]">
          
          {/* Left: Blue-Violet Gradient V Mark + Brand Title */}
          <div 
            onClick={() => handleTabClick('sponsors')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <Logo size={28} className="group-hover:scale-105 transition-transform" />
            <span className="text-[20px] font-[600] tracking-[-0.03em] text-[#000000] dark:text-white">
              Corvana AI
            </span>
          </div>

          {/* Centre: Care (current, bold) · Features · Clinics · Customers · Careers */}
          <nav className="hidden lg:flex items-center gap-7 text-[14.5px] font-[400] text-[#3A3C40] dark:text-slate-300">
            {tabs.map((tab, idx) => {
              const isActive = (activeTab === tab.id) || (tab.id === 'careers' && false);
              return (
                <React.Fragment key={tab.id}>
                  <button
                    onClick={() => handleTabClick(tab.id)}
                    className={`transition-colors cursor-pointer bg-transparent border-none ${
                      isActive
                        ? 'font-[600] text-[#000000] dark:text-white'
                        : 'hover:text-[#000000] dark:hover:text-white text-[#3A3C40] dark:text-slate-300'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                  {idx < tabs.length - 1 && (
                    <span className="text-[#C0C0C2] dark:text-slate-700 select-none text-[12px]">·</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Right: Light-Grey "Watch a Demo" / Safety Pill & Utilities */}
          <div className="flex items-center gap-2.5">
            {/* Watch a Demo Pill: #EFEFEF, 13.5px, font-weight 500, color #3A3C40 */}
            <button
              onClick={onOpenSafety}
              className="flex items-center gap-1.5 px-[18px] py-[8px] rounded-full text-[13.5px] font-[500] bg-[#EFEFEF] hover:bg-[#E5E5E5] dark:bg-slate-800 dark:hover:bg-slate-700 text-[#3A3C40] dark:text-slate-200 transition-colors border-none cursor-pointer"
            >
              <span>Watch a Demo</span>
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
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
