import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle, 
  Circle, 
  ExternalLink, 
  Award, 
  Flame, 
  Shield, 
  User, 
  Share2, 
  Check, 
  BookOpen, 
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { ROADMAP_TRACKS, ACHIEVEMENT_BADGES } from '../data/roadmapsData';

export default function Roadmaps({ completedMilestones, onToggleMilestone, showToast }) {
  const [selectedTrackId, setSelectedTrackId] = useState('fullstack-react');
  const [copiedPlan, setCopiedPlan] = useState(false);

  const currentTrack = ROADMAP_TRACKS.find(t => t.id === selectedTrackId) || ROADMAP_TRACKS[0];

  const totalTrackMilestones = currentTrack.milestones.length;
  const completedInTrack = currentTrack.milestones.filter(m => completedMilestones.includes(m.id)).length;
  const trackProgressPct = Math.round((completedInTrack / totalTrackMilestones) * 100);

  const totalAllMilestones = ROADMAP_TRACKS.reduce((acc, t) => acc + t.milestones.length, 0);
  const totalCompletedAll = completedMilestones.length;
  const overallProgressPct = Math.round((totalCompletedAll / totalAllMilestones) * 100);

  const handleMilestoneClick = (milestone) => {
    const isNowDone = !completedMilestones.includes(milestone.id);
    onToggleMilestone(milestone.id);

    if (isNowDone) {
      showToast(`Milestone completed: "${milestone.title}"! 🎉`, 'info');
    }
  };

  const handleExportPlan = () => {
    const summary = `GraceNet Career Roadmap: ${currentTrack.title}\nProgress: ${trackProgressPct}% (${completedInTrack}/${totalTrackMilestones} Completed)\n\nCompleted:\n` +
      currentTrack.milestones
        .filter(m => completedMilestones.includes(m.id))
        .map(m => `✅ [${m.difficulty}] ${m.title}`)
        .join('\n') +
      `\n\nNext Priority:\n` +
      currentTrack.milestones
        .filter(m => !completedMilestones.includes(m.id))
        .map(m => `⬜ [${m.difficulty}] ${m.title} (~${m.estimatedHours})`)
        .join('\n') +
      `\n\nGenerated via GraceNet • C3 Hackathon`;

    navigator.clipboard.writeText(summary);
    setCopiedPlan(true);
    showToast('✨ Career roadmap dossier copied to clipboard!', 'info');
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
    <div className="space-y-8 font-sans">
      {/* Top Banner (Pure white card - NO GREY BG) */}
      <div className="rounded-[16px] bg-white dark:bg-slate-900 border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs font-[600] uppercase tracking-wider text-[#7A5CF0]">
            Grace Hopper Engineering Tracks
          </span>
          <h3 className="text-2xl font-[600] tracking-[-0.03em] text-[#000000] dark:text-white mt-1">
            Career & Technical Skill Roadmaps
          </h3>
          <p className="text-xs sm:text-sm text-[#5E6064] dark:text-slate-300 mt-1 max-w-xl">
            Structured step-by-step milestones curated by women engineering leaders. Track your progress toward Staff+, AI systems engineering, and open-source governance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-black/[0.06] dark:border-white/[0.08] shadow-2xs text-center">
            <span className="text-[10px] text-[#5E6064] uppercase font-[600] block">Overall Progress</span>
            <span className="text-sm font-[600] text-[#7A5CF0] font-mono">
              {totalCompletedAll} of {totalAllMilestones} ({overallProgressPct}%)
            </span>
          </div>
        </div>
      </div>

      {/* Track Selector Navigation (5 Tracks responsive grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {ROADMAP_TRACKS.map((track) => {
          const isSelected = selectedTrackId === track.id;
          const completedCount = track.milestones.filter(m => completedMilestones.includes(m.id)).length;
          const pct = Math.round((completedCount / track.milestones.length) * 100);

          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrackId(track.id)}
              className={`p-4 rounded-[16px] border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#FFFFFF] dark:bg-slate-900 border-[#000000] dark:border-white shadow-sm ring-1 ring-black/10'
                  : 'bg-[#FFFFFF] dark:bg-slate-900 border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.2]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className={`p-2 rounded-[10px] ${
                    isSelected ? 'bg-[#000000] text-white dark:bg-white dark:text-black' : 'bg-slate-100 dark:bg-slate-800 text-[#3A3C40] dark:text-slate-400'
                  }`}>
                    {getTrackIcon(track.icon)}
                  </div>
                  <span className="text-xs font-mono font-[600] text-[#7A5CF0]">
                    {pct}%
                  </span>
                </div>

                <h4 className="text-xs sm:text-[13px] font-[600] text-[#000000] dark:text-white leading-snug">
                  {track.title}
                </h4>
                <p className="text-[10.5px] text-[#5E6064] dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {track.description}
                </p>
              </div>

              {/* Progress mini-bar */}
              <div className="mt-3 pt-2.5 border-t border-black/[0.06] dark:border-white/[0.08]">
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7A5CF0] rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Track Focus Area */}
      <div className="bg-[#FFFFFF] dark:bg-slate-900 border border-black/[0.06] dark:border-white/[0.08] rounded-[16px] p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Track Header & Interactive Progress Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-[600] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#F1EDFE] to-[#E8E2FD] text-[#6A4CEB] dark:bg-purple-950 dark:text-purple-300">
                {currentTrack.badgeLabel}
              </span>
              <span className="text-xs text-[#5E6064] dark:text-slate-400">
                {completedInTrack} of {totalTrackMilestones} milestones completed
              </span>
            </div>
            <h2 className="text-2xl font-[600] text-[#000000] dark:text-white tracking-[-0.03em]">
              {currentTrack.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportPlan}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-[500] bg-white dark:bg-slate-800 border border-black/[0.08] dark:border-white/10 hover:bg-slate-50 text-[#3A3C40] dark:text-white transition-all cursor-pointer shadow-2xs"
            >
              {copiedPlan ? (
                <>
                  <Check className="w-4 h-4 text-[#7A5CF0]" />
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
          <div className="flex items-center justify-between text-xs font-[600]">
            <span className="text-[#3A3C40] dark:text-slate-300 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#7A5CF0]" />
              Mastery Progress
            </span>
            <span className="text-[#7A5CF0] font-mono text-sm">
              {trackProgressPct}% Complete
            </span>
          </div>

          <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#7A5CF0] to-[#F8533F] rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${trackProgressPct}%` }}
            />
          </div>
        </div>

        {/* Milestone Checklist (NO GREEN - Corvana violet/lavender styling) */}
        <div className="space-y-3 pt-4">
          {currentTrack.milestones.map((milestone) => {
            const isDone = completedMilestones.includes(milestone.id);

            return (
              <div
                key={milestone.id}
                className={`p-5 rounded-[14px] border transition-all duration-200 ${
                  isDone
                    ? 'bg-[#F1EDFE]/60 dark:bg-purple-950/20 border-[#7A5CF0]/30 shadow-2xs'
                    : 'bg-[#FFFFFF] dark:bg-slate-800/40 border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.15]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => handleMilestoneClick(milestone)}
                    aria-label={isDone ? `Mark incomplete` : `Mark complete`}
                    className={`mt-1 shrink-0 p-1 rounded-xl transition-all cursor-pointer bg-transparent border-none ${
                      isDone 
                        ? 'text-[#7A5CF0]' 
                        : 'text-slate-300 hover:text-[#7A5CF0]'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle className="w-6 h-6 fill-[#E8E2FD] dark:fill-purple-900/60" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={`text-base font-[600] ${
                          isDone ? 'line-through text-[#5E6064]' : 'text-[#000000] dark:text-white'
                        }`}>
                          {milestone.title}
                        </h4>
                        <span className="text-[10px] font-[500] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-[#3A3C40] dark:text-slate-300">
                          {milestone.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-[500] px-2.5 py-0.5 rounded-full bg-[#F1EDFE] text-[#6A4CEB] dark:bg-purple-950 dark:text-purple-300">
                          {milestone.difficulty}
                        </span>
                        <span className="text-[11px] font-mono text-[#5E6064] dark:text-slate-400">
                          ~{milestone.estimatedHours}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5E6064] dark:text-slate-300 leading-relaxed">
                      {milestone.summary}
                    </p>

                    <div className="p-3 rounded-[8px] bg-[#FAF9F8] dark:bg-slate-900 border border-black/[0.04] dark:border-slate-800 text-xs text-[#3A3C40] dark:text-slate-300">
                      <strong className="text-[#7A5CF0]">Key Takeaway: </strong>
                      {milestone.keyTakeaway}
                    </div>

                    {milestone.resourceUrl && (
                      <div className="pt-1 flex items-center justify-between">
                        <a
                          href={milestone.resourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-[600] text-[#7A5CF0] hover:underline"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Recommended Study: {milestone.resourceTitle}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Achievement Badges Section */}
        <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
          <h4 className="text-xs font-[600] uppercase tracking-wider text-[#5E6064] mb-3">
            Unlocked Milestones & Badges
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ACHIEVEMENT_BADGES.map((ach) => {
              const isUnlocked = completedInTrack >= ach.threshold;
              return (
                <div
                  key={ach.id}
                  className={`p-3.5 rounded-[12px] border flex items-center gap-3 transition-all ${
                    isUnlocked
                      ? `${ach.color} shadow-2xs`
                      : 'bg-[#F9F9FB] dark:bg-slate-800/40 border-black/[0.06] opacity-50 grayscale'
                  }`}
                >
                  <Award className="w-5 h-5 shrink-0" />
                  <div>
                    <h5 className="text-xs font-[600]">{ach.title}</h5>
                    <p className="text-[10px] opacity-80">{ach.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
