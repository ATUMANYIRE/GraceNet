import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle, 
  Circle, 
  ExternalLink, 
  Award, 
  Flame, 
  Sparkles, 
  Shield, 
  User, 
  Share2, 
  Copy, 
  Check, 
  BookOpen, 
  Layers,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { ROADMAP_TRACKS, ACHIEVEMENT_BADGES } from '../data/roadmapsData';

export default function Roadmaps({ completedMilestones, onToggleMilestone, showToast }) {
  const [selectedTrackId, setSelectedTrackId] = useState('fullstack-react');
  const [copiedPlan, setCopiedPlan] = useState(false);

  // Active track
  const currentTrack = ROADMAP_TRACKS.find(t => t.id === selectedTrackId) || ROADMAP_TRACKS[0];

  // Calculate live completion progress for this track
  const totalTrackMilestones = currentTrack.milestones.length;
  const completedInTrack = currentTrack.milestones.filter(m => completedMilestones.includes(m.id)).length;
  const trackProgressPct = Math.round((completedInTrack / totalTrackMilestones) * 100);

  // Calculate overall progress across all tracks
  const totalAllMilestones = ROADMAP_TRACKS.reduce((acc, t) => acc + t.milestones.length, 0);
  const totalCompletedAll = completedMilestones.length;
  const overallProgressPct = Math.round((totalCompletedAll / totalAllMilestones) * 100);

  // Milestone toggling with celebration toast
  const handleMilestoneClick = (milestone) => {
    const isNowDone = !completedMilestones.includes(milestone.id);
    onToggleMilestone(milestone.id);

    if (isNowDone) {
      showToast(`Milestone completed: "${milestone.title}"! 🎉`, 'success');
    }
  };

  // Export / Copy Career Plan
  const handleExportPlan = () => {
    const summary = `GraceNet Career Roadmap: ${currentTrack.title}\nProgress: ${trackProgressPct}% (${completedInTrack}/${totalTrackMilestones} Milestones Completed)\n\nCompleted Milestones:\n` +
      currentTrack.milestones
        .filter(m => completedMilestones.includes(m.id))
        .map(m => `✅ [${m.difficulty}] ${m.title}`)
        .join('\n') +
      `\n\nNext Priority Milestones:\n` +
      currentTrack.milestones
        .filter(m => !completedMilestones.includes(m.id))
        .map(m => `⬜ [${m.difficulty}] ${m.title} (~${m.estimatedHours})`)
        .join('\n') +
      `\n\nGenerated via GraceNet • Catalyst California Conference (C3)`;

    navigator.clipboard.writeText(summary);
    setCopiedPlan(true);
    showToast('Career Roadmap copied to clipboard! Ready to share with your sponsor.', 'success');
    setTimeout(() => setCopiedPlan(false), 3000);
  };

  const getTrackIcon = (iconName) => {
    switch(iconName) {
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'Shield': return <Shield className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-deepViolet to-rose-950 text-white p-6 sm:p-10 shadow-xl border border-purple-800/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>In honor of Rear Admiral Grace Hopper — Pioneer of Modern Computing</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Grace Hopper <br />
            <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-purple-200 bg-clip-text text-transparent">
              Career & Technical Skill Roadmaps
            </span>
          </h1>

          <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed max-w-2xl">
            Structured competency milestones designed to elevate women engineers from IC execution to Staff+ system architecture, open source prominence, and executive leadership.
          </p>

          {/* Overall Global Progress Banner */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <div className="space-y-1">
              <div className="text-xs uppercase font-extrabold tracking-wider text-purple-200 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                Overall GraceNet Platform Progress
              </div>
              <div className="text-sm font-semibold text-white">
                {totalCompletedAll} of {totalAllMilestones} Total Milestones Mastered ({overallProgressPct}%)
              </div>
            </div>

            <div className="w-full sm:w-48 h-3.5 bg-black/30 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${overallProgressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Glow decoration */}
        <div className="absolute right-0 top-0 -mr-20 -mt-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Track Selector Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ROADMAP_TRACKS.map((track) => {
          const isSelected = selectedTrackId === track.id;
          const completedCount = track.milestones.filter(m => completedMilestones.includes(m.id)).length;
          const pct = Math.round((completedCount / track.milestones.length) * 100);

          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrackId(track.id)}
              className={`p-5 rounded-3xl border text-left flex flex-col justify-between transition-all duration-200 group ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-deepViolet dark:border-purple-600 shadow-lg ring-2 ring-deepViolet/20'
                  : 'bg-white/70 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-2xl ${
                    isSelected ? 'bg-deepViolet text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {getTrackIcon(track.icon)}
                  </div>
                  <span className="text-xs font-mono font-bold text-deepViolet dark:text-purple-400">
                    {pct}%
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-deepViolet dark:group-hover:text-purple-300 transition-colors">
                  {track.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {track.description}
                </p>
              </div>

              {/* Progress mini-bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-deepViolet dark:bg-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Track Focus Area */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Track Header & Interactive Progress Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-deepViolet/10 text-deepViolet dark:bg-purple-950 dark:text-purple-300">
                {currentTrack.badgeLabel}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {completedInTrack} of {totalTrackMilestones} milestones completed
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {currentTrack.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportPlan}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              {copiedPlan ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Dossier Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Export Roadmap Dossier</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Progress Bar (0% to 100%) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-deepViolet" />
              Track Mastery Progress
            </span>
            <span className="text-deepViolet dark:text-purple-400 font-mono text-sm">
              {trackProgressPct}% Complete
            </span>
          </div>

          <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-deepViolet via-purple-600 to-roseQuartz rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${trackProgressPct}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0% Initiation</span>
            <span>50% Mid-Point Mastery</span>
            <span>100% Staff Calibration Ready</span>
          </div>
        </div>

        {/* Milestone Checklist */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Actionable Milestone Checklist
          </h3>

          <div className="space-y-3">
            {currentTrack.milestones.map((milestone) => {
              const isDone = completedMilestones.includes(milestone.id);

              return (
                <div
                  key={milestone.id}
                  className={`p-5 rounded-2xl border transition-all duration-200 ${
                    isDone
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80 shadow-sm'
                      : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/90 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox Button */}
                    <button
                      onClick={() => handleMilestoneClick(milestone)}
                      aria-label={isDone ? `Mark ${milestone.title} incomplete` : `Mark ${milestone.title} complete`}
                      className={`mt-1 shrink-0 p-1 rounded-xl transition-all ${
                        isDone 
                          ? 'text-emerald-600 dark:text-emerald-400 hover:scale-110' 
                          : 'text-slate-400 hover:text-deepViolet hover:scale-110'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle className="w-6 h-6 fill-emerald-100 dark:fill-emerald-950/60" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>

                    {/* Milestone Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className={`text-base font-bold transition-all ${
                            isDone ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-white'
                          }`}>
                            {milestone.title}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {milestone.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-deepViolet/10 text-deepViolet dark:bg-purple-950 dark:text-purple-300">
                            {milestone.difficulty}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            ~{milestone.estimatedHours}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {milestone.summary}
                      </p>

                      {/* Key takeaway callout */}
                      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                        <strong className="text-deepViolet dark:text-purple-400">Key Takeaway: </strong>
                        {milestone.keyTakeaway}
                      </div>

                      {/* Resource Link */}
                      {milestone.resourceUrl && (
                        <div className="pt-1 flex items-center justify-between">
                          <a
                            href={milestone.resourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-deepViolet dark:text-purple-400 hover:underline"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Recommended Study: {milestone.resourceTitle}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          <span className="text-[10px] text-slate-400">
                            {isDone ? '✓ Completed' : 'Pending Verification'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION: Achievement Badges Showcase */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deepViolet dark:text-purple-400 mb-1">
            <Award className="w-4 h-4" />
            Verified Technical Milestones
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Career Milestone Badges
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Unlocked automatically as you check off milestones and build your promotion dossier.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACHIEVEMENT_BADGES.map((badge) => {
            const isUnlocked = badge.requiredCount 
              ? totalCompletedAll >= badge.requiredCount
              : overallProgressPct >= (badge.requiredPct || 0);

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border text-center flex flex-col items-center justify-between transition-all ${
                  isUnlocked
                    ? `${badge.color} shadow-sm ring-1 ring-black/5 dark:ring-white/10`
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-50 grayscale'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm mb-3">
                  <Award className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {badge.name}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-current/10 w-full text-[10px] font-bold uppercase tracking-wider">
                  {isUnlocked ? '★ Unlocked' : 'Locked'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
