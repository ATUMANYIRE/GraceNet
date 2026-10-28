import React, { useState } from 'react';
import { Sparkles, User, Briefcase, Building, Layers, Check, X, ShieldCheck } from 'lucide-react';

export default function JoinNetworkModal({ isOpen, onClose, userProfile, onSaveProfile, showToast }) {
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    roleTitle: userProfile?.roleTitle || '',
    company: userProfile?.company || '',
    membershipType: userProfile?.membershipType || 'mentee',
    track: userProfile?.track || 'Software Engineering',
    bio: userProfile?.bio || '',
    linkedIn: userProfile?.linkedIn || '',
    openToSponsor: userProfile?.openToSponsor ?? true
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Please enter your full name', 'error');
      return;
    }
    onSaveProfile({
      ...formData,
      isRegistered: true,
      avatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    });
    showToast(`Welcome to GraceNet, ${formData.name}! Your network profile is active.`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-modal-title"
      >
        {/* Modal Header */}
        <div className="relative p-6 bg-gradient-to-br from-purple-700 via-deepViolet to-indigo-900 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-xl bg-white/20 backdrop-blur-md text-amber-300">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold text-purple-200">
              Catalyst California C3 Hackathon
            </span>
          </div>
          <h2 id="join-modal-title" className="text-2xl font-bold tracking-tight">
            Join the GraceNet Network
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 mt-1">
            Connect with senior sponsors, share transparent compensation, and accelerate your tech leadership path.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Membership Type Switcher */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              I am joining GraceNet primarily as a:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'mentee', label: 'Mentee', desc: 'Seeking guidance & sponsors' },
                { id: 'mentor', label: 'Mentor', desc: '1:1 technical coaching' },
                { id: 'sponsor', label: 'Executive Sponsor', desc: 'Advocate for promotions' }
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setFormData({ ...formData, membershipType: opt.id })}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    formData.membershipType === opt.id
                      ? 'bg-deepViolet/10 dark:bg-deepViolet/25 border-deepViolet text-deepViolet dark:text-purple-300 ring-2 ring-deepViolet/20'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{opt.label}</span>
                    {formData.membershipType === opt.id && <Check className="w-3.5 h-3.5 text-deepViolet" />}
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Name & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ada Lovelace"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-deepViolet"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Current Role Title *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Software Engineer"
                  value={formData.roleTitle}
                  onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-deepViolet"
                />
              </div>
            </div>
          </div>

          {/* Company & Track */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Company / Organization
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. GitHub / NASA / Caltech"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-deepViolet"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Primary Technical Track
              </label>
              <div className="relative">
                <Layers className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <select
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-deepViolet"
                >
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Product Management">Product Management</option>
                  <option value="UI/UX & Design Systems">UI/UX & Design Systems</option>
                  <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure & DevOps</option>
                  <option value="Executive Engineering Leadership">Executive Engineering Leadership</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bio / Goals */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Short Bio & Career Aspiration
            </label>
            <textarea
              rows={3}
              placeholder="e.g. 5 years building backend microservices. Looking to transition into Staff Engineer and break into AI platform systems."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-deepViolet"
            />
          </div>

          {/* Privacy Note */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Your profile is preserved client-side in this browser session. You can post anonymously at any time on the Community Hub.
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-deepViolet hover:bg-purple-700 text-white shadow-lg shadow-purple-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Complete Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
