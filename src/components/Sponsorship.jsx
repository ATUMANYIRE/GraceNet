import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Building, 
  MapPin, 
  Sparkles, 
  Send, 
  CheckCircle, 
  UserCheck, 
  HelpCircle, 
  X,
  Clock,
  Award
} from 'lucide-react';
import { SPONSORS_DATA, SPONSOR_CATEGORIES } from '../data/sponsorsData';
import Logo from './Logo';

export default function Sponsorship({ requestsSent, onSendRequest, showToast, userProfile }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');

  const [requestMode, setRequestMode] = useState('Executive Sponsorship');
  const [focusAreas, setFocusAreas] = useState(['Staff+ Promotion Dossier']);
  const [messageText, setMessageText] = useState('');
  const [cadence, setCadence] = useState('Bi-weekly (30 min)');

  const filteredSponsors = SPONSORS_DATA.filter((sp) => {
    const matchesCategory = selectedCategory === 'All' || sp.category === selectedCategory;
    const matchesSearch = 
      sp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sp.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const openRequestDrawer = (sponsor) => {
    setSelectedSponsor(sponsor);
    const defaultPitch = `Hi ${sponsor.name.split(' ')[0]},\n\nI admire your leadership at ${sponsor.company} and your focus on ${sponsor.skills[0]}. As a ${userProfile?.roleTitle || 'Software Engineer'}, I am targeting promotion to the next technical tier and seeking an executive sponsor to help review my impact dossier and advise on closed-door calibration. Would you be open to an introductory 20-minute conversation?`;
    setMessageText(defaultPitch);
    setIsDrawerOpen(true);
  };

  const handleGeneratePitch = () => {
    if (!selectedSponsor) return;
    const generated = `Dear ${selectedSponsor.name},\n\nI have followed your work in ${selectedSponsor.track} at ${selectedSponsor.company} with great inspiration. Currently in my role as ${userProfile?.roleTitle || 'Technologist'}, I have delivered significant outcomes in my team, but I am looking to secure executive sponsorship for ${focusAreas.join(' & ')}.\n\nYour mentorship track record of promoting ${selectedSponsor.menteesPromoted} women resonates deeply with my goals. I would welcome the opportunity to connect for guidance.\n\nBest regards,\n${userProfile?.name || 'A Fellow Technologist'}`;
    setMessageText(generated);
    showToast('✨ Pitch template generated!', 'info');
  };

  const handleSendRequest = (e) => {
    e.preventDefault();
    if (!messageText.trim()) {
      showToast('Please provide a message or pitch', 'error');
      return;
    }

    const newRequest = {
      id: `req-${Date.now()}`,
      sponsorId: selectedSponsor.id,
      sponsorName: selectedSponsor.name,
      sponsorTitle: selectedSponsor.title,
      sponsorCompany: selectedSponsor.company,
      sponsorAvatar: selectedSponsor.avatar,
      mode: requestMode,
      focusAreas: [...focusAreas],
      cadence,
      message: messageText,
      sentAt: 'Just now',
      status: 'Pending Sponsor Review'
    };

    onSendRequest(newRequest);
    showToast(`Sponsorship request successfully sent to ${selectedSponsor.name}!`, 'success');
    setIsDrawerOpen(false);
  };

  const toggleFocusArea = (area) => {
    if (focusAreas.includes(area)) {
      setFocusAreas(focusAreas.filter(a => a !== area));
    } else {
      setFocusAreas([...focusAreas, area]);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* View Switcher: Browse Sponsors vs My Active Requests */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 rounded-full text-[13px] font-[500] transition-all cursor-pointer border ${
              activeTab === 'browse'
                ? 'bg-[#000000] text-white border-transparent shadow-sm font-[600]'
                : 'bg-white dark:bg-slate-800 border-black/[0.08] dark:border-white/10 text-[#3A3C40] dark:text-slate-300 hover:text-[#000000]'
            }`}
          >
            Browse Verified Sponsors ({filteredSponsors.length})
          </button>

          <button
            onClick={() => setActiveTab('my-requests')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-[500] transition-all cursor-pointer border ${
              activeTab === 'my-requests'
                ? 'bg-[#000000] text-white border-transparent shadow-sm font-[600]'
                : 'bg-white dark:bg-slate-800 border-black/[0.08] dark:border-white/10 text-[#3A3C40] dark:text-slate-300 hover:text-[#000000]'
            }`}
          >
            <span>My Active Requests</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-[600] ${
              activeTab === 'my-requests' ? 'bg-white/20 text-white' : 'bg-gradient-to-r from-[#F1EDFE] to-[#E8E2FD] text-[#6A4CEB]'
            }`}>
              {requestsSent.length}
            </span>
          </button>
        </div>

        {/* Search Bar */}
        {activeTab === 'browse' && (
          <div className="w-full sm:w-80 relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#5E6064]" />
            <input
              type="text"
              placeholder="Search by name, company, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-[13px] rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-[#FFFFFF] dark:bg-slate-900 text-[#000000] dark:text-white placeholder-[#5E6064] focus:outline-none focus:ring-2 focus:ring-[#7A5CF0]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-[#5E6064] hover:text-[#000000] bg-transparent border-none cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Category Pills (When browsing) */}
      {activeTab === 'browse' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[12px] font-[500] text-[#5E6064] uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {SPONSOR_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-[500] whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-[#000000] text-white border-transparent'
                  : 'bg-[#FFFFFF] dark:bg-slate-900 border-black/[0.08] dark:border-white/[0.1] text-[#3A3C40] dark:text-slate-300 hover:border-[#7A5CF0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid of Sponsors */}
      {activeTab === 'browse' && (
        <>
          {filteredSponsors.length === 0 ? (
            <div className="text-center py-16 bg-[#FFFFFF] dark:bg-slate-900 rounded-[16px] border border-dashed border-black/[0.1] dark:border-white/[0.1] p-8">
              <HelpCircle className="w-12 h-12 text-[#5E6064] mx-auto mb-3" />
              <h3 className="text-lg font-[600] text-[#000000] dark:text-white">No sponsors found</h3>
              <p className="text-xs text-[#5E6064] mt-1">Try resetting your search query or selecting "All" categories.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-4 px-4 py-2 rounded-full text-xs font-[600] bg-[#000000] text-white cursor-pointer border-none"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSponsors.map((sponsor) => {
                const hasRequested = requestsSent.some(r => r.sponsorId === sponsor.id);

                return (
                  <div
                    key={sponsor.id}
                    className="group relative flex flex-col justify-between bg-[#FFFFFF] dark:bg-slate-900 border border-black/[0.06] dark:border-white/[0.08] rounded-[16px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300"
                  >
                    <div>
                      {/* Top Row: Avatar & Badges */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="relative">
                          <img
                            src={sponsor.avatar}
                            alt={sponsor.name}
                            className="w-14 h-14 rounded-[12px] object-cover ring-2 ring-black/[0.06]"
                          />
                          <span className="absolute -bottom-1 -right-1 p-0.5 bg-[#F8533F] rounded-full text-white shadow-sm" title="Verified Sponsor">
                            <Logo size={12} />
                          </span>
                        </div>

                        <div className="flex flex-col items-end gap-1.5">
                          <span className="text-[11px] font-[600] px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#F1EDFE] to-[#E8E2FD] text-[#6A4CEB]">
                            {sponsor.category}
                          </span>
                          <span className="text-[10px] font-[500] text-[#6A4CEB] dark:text-[#E8E2FD] bg-[#F1EDFE] dark:bg-purple-950/60 px-2 py-0.5 rounded-full border border-[#E8E2FD] dark:border-purple-800/40">
                            {sponsor.availability}
                          </span>
                        </div>
                      </div>

                      {/* Sponsor Identity */}
                      <div className="space-y-1">
                        <h3 className="text-lg font-[600] text-[#000000] dark:text-white tracking-[-0.02em]">
                          {sponsor.name}
                        </h3>
                        <p className="text-[13px] font-[500] text-[#3A3C40] dark:text-slate-300">
                          {sponsor.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-[#5E6064] pt-0.5">
                          <span className="flex items-center gap-1 font-[500] text-[#7A5CF0]">
                            <Building className="w-3.5 h-3.5" />
                            {sponsor.company}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {sponsor.location}
                          </span>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-[#5E6064] dark:text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                        {sponsor.bio}
                      </p>

                      {/* Featured Quote (NO GREY BG) */}
                      <div className="mt-3 p-2.5 rounded-[12px] bg-[#FAF9F8] dark:bg-slate-800/50 border border-black/[0.04] dark:border-white/[0.04] italic text-[11.5px] text-[#3A3C40] dark:text-slate-300">
                        "{sponsor.featuredQuote}"
                      </div>

                      {/* Skills Badges */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {sponsor.skills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-[500] px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-black/[0.06] dark:border-white/[0.08] text-[#3A3C40] dark:text-slate-300 shadow-2xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Stats & Action */}
                    <div className="mt-5 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-[#5E6064]">
                        <Award className="w-4 h-4 text-[#F8533F]" />
                        <span className="font-[600] text-[#000000] dark:text-white">
                          {sponsor.menteesPromoted}
                        </span>
                        <span>promoted</span>
                      </div>

                      {hasRequested ? (
                        <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-[600] bg-[#F1EDFE] dark:bg-purple-950/60 text-[#6A4CEB] dark:text-[#E8E2FD] border border-[#E8E2FD] dark:border-purple-800/40">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Request Sent</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => openRequestDrawer(sponsor)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-[500] bg-[#000000] hover:bg-slate-900 text-white shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer border-none"
                        >
                          <Send className="w-3 h-3" />
                          <span>Request Sponsorship</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* My Active Requests View */}
      {activeTab === 'my-requests' && (
        <div className="space-y-4">
          {requestsSent.length === 0 ? (
            <div className="text-center py-16 bg-[#FFFFFF] dark:bg-slate-900 rounded-[16px] border border-dashed border-black/[0.1] dark:border-white/[0.1] p-8 space-y-3">
              <Send className="w-12 h-12 text-[#5E6064] mx-auto" />
              <h3 className="text-lg font-[600] text-[#000000] dark:text-white">
                You haven't requested sponsorship yet
              </h3>
              <p className="text-xs text-[#5E6064] max-w-md mx-auto">
                Explore verified sponsors to submit your career promotion dossier or request technical mentorship.
              </p>
              <button
                onClick={() => setActiveTab('browse')}
                className="mt-2 px-5 py-2.5 rounded-full text-xs font-[600] bg-[#000000] text-white border-none cursor-pointer"
              >
                Browse Available Sponsors
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {requestsSent.map((req) => (
                <div
                  key={req.id}
                  className="bg-[#FFFFFF] dark:bg-slate-900 border border-black/[0.06] dark:border-white/[0.08] rounded-[16px] p-6 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <img
                        src={req.sponsorAvatar}
                        alt={req.sponsorName}
                        className="w-12 h-12 rounded-[10px] object-cover ring-2 ring-black/[0.06]"
                      />
                      <div>
                        <h4 className="text-base font-[600] text-[#000000] dark:text-white">
                          {req.sponsorName}
                        </h4>
                        <p className="text-xs text-[#5E6064]">
                          {req.sponsorTitle} • <strong className="text-[#7A5CF0]">{req.sponsorCompany}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs px-3 py-1 rounded-full font-[600] bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {req.status}
                      </span>
                      <span className="text-xs text-[#5E6064]">{req.sentAt}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-[12px] bg-[#FAF9F8] dark:bg-slate-800/50 border border-black/[0.04] dark:border-white/[0.04] space-y-1">
                      <span className="text-[#5E6064] font-[600] uppercase text-[10px] tracking-wider">
                        Engagement Mode
                      </span>
                      <p className="font-[600] text-[#000000] dark:text-white">{req.mode}</p>
                    </div>

                    <div className="p-3 rounded-[12px] bg-[#FAF9F8] dark:bg-slate-800/50 border border-black/[0.04] dark:border-white/[0.04] space-y-1">
                      <span className="text-[#5E6064] font-[600] uppercase text-[10px] tracking-wider">
                        Proposed Cadence
                      </span>
                      <p className="font-[600] text-[#000000] dark:text-white">{req.cadence}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-[12px] bg-[#F1EDFE]/50 dark:bg-slate-800/70 border border-[#E8E2FD] dark:border-slate-800 text-xs text-[#3A3C40] dark:text-slate-300 whitespace-pre-line">
                    <p className="font-[600] text-[#000000] dark:text-white mb-1">Cover Note:</p>
                    {req.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* REQUEST SPONSORSHIP DRAWER */}
      {isDrawerOpen && selectedSponsor && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl h-full bg-[#FFFFFF] dark:bg-slate-900 border-l border-black/[0.08] dark:border-white/[0.08] shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Header */}
              <div className="p-6 border-b border-black/[0.06] dark:border-white/[0.08] flex items-start justify-between bg-[#FAF9F8] dark:bg-slate-800/40">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedSponsor.avatar}
                    alt={selectedSponsor.name}
                    className="w-14 h-14 rounded-[12px] object-cover ring-2 ring-[#7A5CF0]"
                  />
                  <div>
                    <span className="text-[10px] font-[600] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#000000] text-white">
                      {selectedSponsor.sponsorshipType}
                    </span>
                    <h3 className="text-xl font-[600] text-[#000000] dark:text-white mt-1">
                      {selectedSponsor.name}
                    </h3>
                    <p className="text-xs text-[#5E6064]">
                      {selectedSponsor.title} @ <strong className="text-[#7A5CF0]">{selectedSponsor.company}</strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full text-[#5E6064] hover:text-[#000000] bg-transparent border-none cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSendRequest} className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-[600] uppercase tracking-wider text-[#5E6064] mb-2">
                    Select Engagement Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Executive Sponsorship (Promotion Advocacy)',
                      'Technical Mentorship (Architecture & Code)',
                      'Salary & Pay Equity Coaching',
                      'Staff+ System Design Review'
                    ].map((mode) => (
                      <button
                        type="button"
                        key={mode}
                        onClick={() => setRequestMode(mode)}
                        className={`p-3 rounded-[12px] border text-left text-xs font-[500] transition-all cursor-pointer ${
                          requestMode === mode
                            ? 'bg-gradient-to-r from-[#F1EDFE] to-[#E8E2FD] border-[#7A5CF0] text-[#6A4CEB] font-[600]'
                            : 'border-black/[0.08] dark:border-white/[0.1] text-[#3A3C40] dark:text-slate-400 bg-white dark:bg-slate-800'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-[600] uppercase tracking-wider text-[#5E6064] mb-2">
                    Priority Focus Deliverables
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Staff+ Promotion Dossier',
                      'Closed-Door Calibration Strategy',
                      'System Design Drills',
                      'Executive Presence & Visibility',
                      'Pay Disparity Counter-Offer',
                      'Open Source RFC Leadership'
                    ].map((area) => {
                      const isSelected = focusAreas.includes(area);
                      return (
                        <button
                          type="button"
                          key={area}
                          onClick={() => toggleFocusArea(area)}
                          className={`px-3 py-1.5 rounded-full text-xs font-[500] transition-all cursor-pointer border ${
                            isSelected
                              ? 'bg-[#000000] text-white border-transparent'
                              : 'bg-white dark:bg-slate-800 border-black/[0.08] dark:border-white/[0.1] text-[#3A3C40] dark:text-slate-300'
                          }`}
                        >
                          {area}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-[600] uppercase tracking-wider text-[#5E6064]">
                      Personal Note / Pitch
                    </label>
                    <button
                      type="button"
                      onClick={handleGeneratePitch}
                      className="text-[11.5px] font-[600] text-[#7A5CF0] hover:underline bg-transparent border-none cursor-pointer"
                    >
                      ✨ Auto-Generate Pitch
                    </button>
                  </div>
                  <textarea
                    rows={6}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full p-3 text-xs sm:text-sm rounded-[12px] border border-black/[0.08] dark:border-white/[0.1] bg-[#FFFFFF] dark:bg-slate-800 text-[#000000] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A5CF0] leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="px-4 py-2 rounded-full text-xs font-[500] text-[#5E6064] bg-transparent border-none cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-[500] bg-[#000000] hover:bg-slate-900 text-white shadow-md cursor-pointer border-none"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Sponsorship Request</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
