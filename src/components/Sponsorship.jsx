import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Building, 
  MapPin, 
  Sparkles, 
  Send, 
  CheckCircle, 
  Star, 
  UserCheck, 
  HelpCircle, 
  ChevronRight, 
  X,
  Clock,
  Award,
  Shield,
  Layers,
  Heart
} from 'lucide-react';
import { SPONSORS_DATA, SPONSOR_CATEGORIES } from '../data/sponsorsData';

export default function Sponsorship({ requestsSent, onSendRequest, showToast, userProfile }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'my-requests'

  // Request form state
  const [requestMode, setRequestMode] = useState('Executive Sponsorship');
  const [focusAreas, setFocusAreas] = useState(['Staff+ Promotion Dossier']);
  const [messageText, setMessageText] = useState('');
  const [cadence, setCadence] = useState('Bi-weekly (30 min)');

  // Filter sponsors based on search & category
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
    showToast('✨ Smart Pitch generated!', 'info');
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
    <div className="space-y-8 animate-fadeIn">
      {/* Hero / Value Proposition Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-deepViolet via-purple-900 to-indigo-950 text-white p-6 sm:p-10 shadow-xl border border-purple-800/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Catalyst C3 Sponsorship Initiative</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Mentors give advice. <br />
            <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-purple-200 bg-clip-text text-transparent">
              Sponsors open executive doors.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed max-w-2xl">
            GraceNet connects high-potential women in tech directly with seasoned leaders at Google, Meta, NASA, OpenAI, and Stripe who actively advocate for your promotions in calibration rooms.
          </p>

          {/* Quick Metrics */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black text-white">72+</div>
              <div className="text-xs text-purple-200">Executive Sponsors</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black text-amber-300">142+</div>
              <div className="text-xs text-purple-200">Promotions Championed</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black text-rose-300">100%</div>
              <div className="text-xs text-purple-200">Volunteer Tech Leaders</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black text-emerald-300">4.96 ★</div>
              <div className="text-xs text-purple-200">Mentee Rating</div>
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 -mr-20 -mt-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* View Switcher: Browse Sponsors vs My Active Requests */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'browse'
                ? 'bg-deepViolet text-white shadow-md shadow-purple-900/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Browse Verified Sponsors ({filteredSponsors.length})
          </button>

          <button
            onClick={() => setActiveTab('my-requests')}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'my-requests'
                ? 'bg-deepViolet text-white shadow-md shadow-purple-900/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span>My Active Requests</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              activeTab === 'my-requests' ? 'bg-white/20 text-white' : 'bg-purple-100 dark:bg-purple-900/60 text-deepViolet dark:text-purple-300'
            }`}>
              {requestsSent.length}
            </span>
          </button>
        </div>

        {/* Search Bar */}
        {activeTab === 'browse' && (
          <div className="w-full sm:w-80 relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, company, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-deepViolet transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
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
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {SPONSOR_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-deepViolet text-white shadow-sm ring-2 ring-deepViolet/20'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* TAB 1 CONTENT: Grid of Sponsors */}
      {activeTab === 'browse' && (
        <>
          {filteredSponsors.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-8">
              <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No sponsors found</h3>
              <p className="text-xs text-slate-500 mt-1">Try resetting your search query or selecting "All" categories.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-deepViolet text-white"
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
                    className="group relative flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-700/60 transition-all duration-300"
                  >
                    <div>
                      {/* Top Row: Avatar & Badges */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="relative">
                          <img
                            src={sponsor.avatar}
                            alt={sponsor.name}
                            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-100 dark:ring-purple-950 group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-lg text-white shadow-sm" title="Verified Sponsor">
                            <UserCheck className="w-3 h-3" />
                          </span>
                        </div>

                        <div className="flex flex-col items-end gap-1.5">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-deepViolet/10 text-deepViolet dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                            {sponsor.category}
                          </span>
                          <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {sponsor.availability}
                          </span>
                        </div>
                      </div>

                      {/* Sponsor Identity */}
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-deepViolet dark:group-hover:text-purple-300 transition-colors">
                          {sponsor.name}
                        </h3>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                          {sponsor.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                          <span className="flex items-center gap-1 font-medium text-deepViolet dark:text-purple-400">
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
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                        {sponsor.bio}
                      </p>

                      {/* Featured Quote */}
                      <div className="mt-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 italic text-[11px] text-slate-600 dark:text-slate-400">
                        "{sponsor.featuredQuote}"
                      </div>

                      {/* Skills Badges */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {sponsor.skills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Stats & Action */}
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span className="font-bold text-slate-700 dark:text-slate-200">
                          {sponsor.menteesPromoted}
                        </span>
                        <span>promoted</span>
                      </div>

                      {hasRequested ? (
                        <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Request Sent</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => openRequestDrawer(sponsor)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-deepViolet hover:bg-purple-700 text-white shadow-sm shadow-purple-900/20 group-hover:shadow-glow-purple transition-all duration-200 hover:scale-[1.02]"
                        >
                          <Send className="w-3.5 h-3.5" />
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

      {/* TAB 2 CONTENT: My Active Requests */}
      {activeTab === 'my-requests' && (
        <div className="space-y-4">
          {requestsSent.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-8 space-y-3">
              <Send className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                You haven't requested sponsorship yet
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Explore the verified sponsors from Google, Meta, NASA, and Stripe to submit your first sponsorship dossier or request mentorship.
              </p>
              <button
                onClick={() => setActiveTab('browse')}
                className="mt-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-deepViolet text-white shadow-md shadow-purple-900/20"
              >
                Browse Available Sponsors
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Showing {requestsSent.length} sponsorship application(s)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">● Sponsors respond within 48-72 hours</span>
              </div>

              {requestsSent.map((req) => (
                <div
                  key={req.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <img
                        src={req.sponsorAvatar}
                        alt={req.sponsorName}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-purple-100 dark:ring-purple-900"
                      />
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {req.sponsorName}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {req.sponsorTitle} • <strong className="text-deepViolet dark:text-purple-400">{req.sponsorCompany}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs px-3 py-1 rounded-full font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {req.status}
                      </span>
                      <span className="text-xs text-slate-400">{req.sentAt}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                      <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                        Engagement Mode
                      </span>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{req.mode}</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                      <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                        Proposed Cadence
                      </span>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{req.cadence}</p>
                    </div>
                  </div>

                  {/* Focus Areas */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Focus Deliverables
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {req.focusAreas.map((area, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-0.5 rounded-lg bg-deepViolet/10 text-deepViolet dark:bg-purple-950 dark:text-purple-300 font-medium"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sent Message */}
                  <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-slate-800/70 border border-purple-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line">
                    <p className="font-bold text-slate-900 dark:text-white mb-1">Cover Letter & Pitch Note:</p>
                    {req.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* INTERACTIVE SPONSORSHIP REQUEST DRAWER / MODAL */}
      {isDrawerOpen && selectedSponsor && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-xl h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideLeft"
            role="dialog"
            aria-modal="true"
          >
            {/* Drawer Header */}
            <div>
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between bg-gradient-to-r from-purple-50 via-white to-purple-50 dark:from-slate-900 dark:via-purple-950/20 dark:to-slate-900">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedSponsor.avatar}
                    alt={selectedSponsor.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-deepViolet"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-deepViolet text-white">
                        {selectedSponsor.sponsorshipType}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                      {selectedSponsor.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedSponsor.title} @ <strong className="text-deepViolet dark:text-purple-400">{selectedSponsor.company}</strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSendRequest} className="p-6 space-y-5">
                {/* Mode Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
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
                        className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all ${
                          requestMode === mode
                            ? 'bg-deepViolet/10 dark:bg-purple-950/50 border-deepViolet text-deepViolet dark:text-purple-300 ring-2 ring-deepViolet/20'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Focus Areas Checkboxes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Priority Focus Areas (Select all that apply)
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
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-deepViolet text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {isSelected && <CheckCircle className="w-3 h-3" />}
                          <span>{area}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Cadence */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Proposed Cadence
                  </label>
                  <select
                    value={cadence}
                    onChange={(e) => setCadence(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-deepViolet"
                  >
                    <option value="Bi-weekly (30 min)">Bi-weekly (30 minutes virtual 1:1)</option>
                    <option value="Monthly Executive Check-in (45 min)">Monthly Executive Check-in (45 minutes)</option>
                    <option value="Ad-hoc Promotion Dossier Review">Ad-hoc Promotion Dossier Review</option>
                  </select>
                </div>

                {/* Message / Pitch Note with AI helper */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Personal Note / Career Pitch
                    </label>
                    <button
                      type="button"
                      onClick={handleGeneratePitch}
                      className="flex items-center gap-1 text-[11px] font-bold text-deepViolet dark:text-purple-400 hover:underline"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>✨ Auto-Generate Pitch</span>
                    </button>
                  </div>
                  <textarea
                    rows={6}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Describe your current scope, recent achievements, and what specific sponsorship you are requesting..."
                    className="w-full p-3 text-xs sm:text-sm rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-deepViolet leading-relaxed"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-deepViolet hover:bg-purple-700 text-white shadow-lg shadow-purple-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Send className="w-4 h-4" />
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
