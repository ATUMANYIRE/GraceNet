import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Check, 
  Scale, 
  ShieldCheck, 
  PlusCircle, 
  Info,
  Building,
  MapPin,
  Sparkles,
  X,
  Lock
} from 'lucide-react';
import { 
  ROLE_LEVELS, 
  DISCIPLINES, 
  LOCATIONS, 
  calculateBenchmark, 
  NEGOTIATION_TEMPLATES, 
  COMMUNITY_SALARY_SUBMISSIONS 
} from '../data/salaryBenchmarks';

export default function PayEquity({ showToast, userProfile }) {
  const [selectedDiscipline, setSelectedDiscipline] = useState('swe');
  const [selectedLevel, setSelectedLevel] = useState('senior');
  const [selectedLocation, setSelectedLocation] = useState('bayarea');
  const [userSalary, setUserSalary] = useState(175000);
  const [copiedScriptId, setCopiedScriptId] = useState(null);
  const [activeTemplateTab, setActiveTemplateTab] = useState('annual_review');
  const [communitySubmissions, setCommunitySubmissions] = useState(COMMUNITY_SALARY_SUBMISSIONS);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const [submissionForm, setSubmissionForm] = useState({
    role: 'Senior Software Engineer',
    companyTier: 'Tier 1 Big Tech (Google/Meta)',
    location: 'Bay Area, CA',
    yoe: 6,
    baseSalary: 195000,
    totalComp: 320000,
    gender: 'Woman',
    negotiatedDelta: '+$28,000',
    tips: ''
  });

  const benchmark = calculateBenchmark(selectedDiscipline, selectedLevel, selectedLocation);

  const salaryDiff = userSalary - benchmark.auditedMarketMedian;
  const isUndervalued = salaryDiff < 0;
  const gapAmount = Math.abs(salaryDiff);
  const gapPercentage = Math.abs(Math.round((salaryDiff / benchmark.auditedMarketMedian) * 100));

  const tenYearCompoundedLoss = Math.round(gapAmount * 12.58);
  const maxBarValue = Math.max(benchmark.percentile90 * 1.1, userSalary * 1.1);

  const getWidthPct = (val) => {
    return Math.min(100, Math.round((val / maxBarValue) * 100));
  };

  const handleCopyScript = (scriptText, templateId) => {
    navigator.clipboard.writeText(scriptText);
    setCopiedScriptId(templateId);
    showToast('✨ Negotiation script copied to clipboard!', 'info');
    setTimeout(() => setCopiedScriptId(null), 3000);
  };

  const handleCommunitySubmit = (e) => {
    e.preventDefault();
    if (!submissionForm.tips.trim()) {
      showToast('Please provide a brief tip or context for your peers', 'error');
      return;
    }

    const newSub = {
      id: `cs-${Date.now()}`,
      ...submissionForm,
      baseSalary: Number(submissionForm.baseSalary),
      totalComp: Number(submissionForm.totalComp),
      yoe: Number(submissionForm.yoe)
    };

    setCommunitySubmissions([newSub, ...communitySubmissions]);
    showToast('🎉 Anonymous compensation datapoint published to community!', 'info');
    setIsSubmitModalOpen(false);
  };

  const activeTemplate = NEGOTIATION_TEMPLATES.find(t => t.id === activeTemplateTab) || NEGOTIATION_TEMPLATES[0];
  const renderedScript = activeTemplate.generateScript({
    roleTitle: `${ROLE_LEVELS.find(l => l.id === selectedLevel)?.label.split(' ')[0]} ${DISCIPLINES.find(d => d.id === selectedDiscipline)?.label.split(' ')[0]}`,
    userSalary,
    marketMedian: benchmark.auditedMarketMedian,
    gapAmount,
    targetComp: benchmark.percentile75
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner (Pure white with hairline border - NO GREY BG) */}
      <div className="rounded-[16px] bg-white dark:bg-slate-900 border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs font-[600] uppercase tracking-wider text-[#7A5CF0]">
            Audited Compensation Benchmarks • 2026 Calibrations
          </span>
          <h3 className="text-2xl font-[600] tracking-[-0.03em] text-[#000000] dark:text-white mt-1">
            Pay Equity Parity Calculator
          </h3>
          <p className="text-xs sm:text-sm text-[#5E6064] dark:text-slate-300 mt-1 max-w-xl">
            Compare your compensation against validated market medians, uncover systemic undervaluation, and generate high-leverage negotiation scripts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-[500] bg-white dark:bg-slate-800 border border-black/[0.06] dark:border-white/[0.08] text-[#3A3C40] dark:text-white flex items-center gap-1.5 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#7A5CF0]" />
            <span>100% Client-Side Private</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Input Configuration (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FFFFFF] dark:bg-slate-900 border border-black/[0.06] dark:border-white/[0.08] rounded-[16px] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <h4 className="text-[15px] font-[600] text-[#000000] dark:text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#F8533F]" />
                Your Compensation Profile
              </h4>
              <span className="text-[11px] text-[#5E6064] dark:text-slate-400">Live Calibration</span>
            </div>

            {/* Discipline */}
            <div>
              <label className="block text-xs font-[600] uppercase tracking-wider text-[#5E6064] dark:text-slate-400 mb-2">
                Discipline / Track
              </label>
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="w-full p-3 text-xs sm:text-sm rounded-[12px] border border-black/[0.08] dark:border-white/[0.1] bg-[#FFFFFF] dark:bg-slate-800 text-[#000000] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A5CF0]"
              >
                {DISCIPLINES.map(d => (
                  <option key={d.id} value={d.id}>{d.label}</option>
                ))}
              </select>
            </div>

            {/* Seniority */}
            <div>
              <label className="block text-xs font-[600] uppercase tracking-wider text-[#5E6064] dark:text-slate-400 mb-2">
                Seniority Level
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {ROLE_LEVELS.map(level => {
                  const isSelected = selectedLevel === level.id;
                  return (
                    <button
                      type="button"
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`p-3 rounded-[12px] border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#F1EDFE] to-[#E8E2FD] dark:from-purple-950/60 dark:to-purple-900/40 border-[#7A5CF0] text-[#6A4CEB] dark:text-purple-300 font-[600]'
                          : 'border-black/[0.08] dark:border-white/[0.1] text-[#3A3C40] dark:text-slate-300 bg-white dark:bg-slate-800 hover:border-black/20'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-[600] block">{level.label}</span>
                        <span className="text-[10px] text-[#5E6064] dark:text-slate-400">{level.yoe}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#6A4CEB] dark:text-purple-300" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-[600] uppercase tracking-wider text-[#5E6064] dark:text-slate-400 mb-2">
                Metro Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-3 text-xs sm:text-sm rounded-[12px] border border-black/[0.08] dark:border-white/[0.1] bg-[#FFFFFF] dark:bg-slate-800 text-[#000000] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A5CF0]"
              >
                {LOCATIONS.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.label} ({loc.tier})</option>
                ))}
              </select>
            </div>

            {/* Current Salary Slider */}
            <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-[600] uppercase tracking-wider text-[#5E6064] dark:text-slate-400">
                  Current Annual Base ($)
                </label>
                <div className="text-lg font-[600] text-[#000000] dark:text-white">
                  ${userSalary.toLocaleString()}
                </div>
              </div>

              <input
                type="range"
                min="60000"
                max="450000"
                step="5000"
                value={userSalary}
                onChange={(e) => setUserSalary(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#F8533F]"
              />

              <div className="flex justify-between text-[10px] text-[#5E6064] dark:text-slate-400 mt-1 font-mono">
                <span>$60K</span>
                <span>$250K</span>
                <span>$450K+</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Visual Comparison & Benchmark Bars (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Analysis Badge Card (NO GREEN - Corvana violet/coral/lavender palette) */}
          <div className={`p-6 rounded-[16px] border shadow-sm transition-all ${
            isUndervalued
              ? 'bg-[#FFF5F4] dark:bg-rose-950/20 border-[#F8533F]/30'
              : 'bg-[#F1EDFE]/70 dark:bg-purple-950/20 border-[#7A5CF0]/30'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`p-2.5 rounded-[12px] shrink-0 ${
                isUndervalued ? 'bg-[#F8533F] text-white' : 'bg-[#7A5CF0] text-white'
              }`}>
                {isUndervalued ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
              </div>

              <div className="space-y-1">
                <span className={`text-[11px] uppercase font-[600] tracking-wider px-2.5 py-0.5 rounded-full ${
                  isUndervalued 
                    ? 'bg-[#FFEBE8] text-[#F8533F]' 
                    : 'bg-[#F1EDFE] text-[#6A4CEB] dark:bg-purple-900/60 dark:text-purple-200'
                }`}>
                  {isUndervalued ? 'Pay Gap Disparity Detected' : 'At or Above Market Benchmark'}
                </span>

                <h3 className="text-xl font-[600] text-[#000000] dark:text-white">
                  {isUndervalued ? (
                    <>Estimated Under-valuation: <span className="text-[#F8533F]">-${gapAmount.toLocaleString()} / year (-{gapPercentage}%)</span></>
                  ) : (
                    <>Earning <span className="text-[#7A5CF0]">+${gapAmount.toLocaleString()} (+{gapPercentage}%)</span> above market median</>
                  )}
                </h3>

                <p className="text-xs text-[#5E6064] dark:text-slate-300 leading-relaxed">
                  {isUndervalued 
                    ? `Based on verified 2024–2026 tech calibrations for ${benchmark.levelName} in ${benchmark.locationName}, your current base is below the market median ($${benchmark.auditedMarketMedian.toLocaleString()}).`
                    : `Your current compensation sits in the upper quartiles for ${benchmark.levelName} in ${benchmark.locationName}.`}
                </p>
              </div>
            </div>

            {isUndervalued && (
              <div className="mt-4 pt-4 border-t border-[#F8533F]/20 flex items-center justify-between text-xs">
                <span className="text-[#3A3C40] dark:text-slate-300 font-[500]">
                  <strong>10-Year Compounding Loss:</strong> (Salary delta + 401k match + annual compound raises)
                </span>
                <span className="font-[600] text-[#F8533F] font-mono text-sm">
                  -${tenYearCompoundedLoss.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Visual Benchmark Comparison Bars */}
          <div className="bg-[#FFFFFF] dark:bg-slate-900 border border-black/[0.06] dark:border-white/[0.08] rounded-[16px] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <h4 className="text-[15px] font-[600] text-[#000000] dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#7A5CF0]" />
                Live Benchmark Distribution Bar
              </h4>
              <span className="text-xs text-[#5E6064] dark:text-slate-400 font-mono">{benchmark.levelName}</span>
            </div>

            <div className="space-y-4">
              {/* Bar 1: User Salary */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-[500]">
                  <span className="text-[#000000] dark:text-white flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#000000] dark:bg-white inline-block" />
                    Your Current Base
                  </span>
                  <span className="font-[600] text-[#000000] dark:text-white font-mono">
                    ${userSalary.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-[#000000] dark:bg-white rounded-full transition-all duration-500"
                    style={{ width: `${getWidthPct(userSalary)}%` }}
                  />
                </div>
              </div>

              {/* Bar 2: Female Median */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-[500]">
                  <span className="text-[#5E6064] dark:text-slate-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F8533F] inline-block" />
                    Female Tech Median (Audited -9% Gap)
                  </span>
                  <span className="font-mono text-[#3A3C40] dark:text-slate-300">
                    ${benchmark.auditedFemaleMedian.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-[#F8533F] rounded-full transition-all duration-500 opacity-90"
                    style={{ width: `${getWidthPct(benchmark.auditedFemaleMedian)}%` }}
                  />
                </div>
              </div>

              {/* Bar 3: Full Market Median */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-[600]">
                  <span className="text-[#000000] dark:text-white flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7A5CF0] inline-block" />
                    Industry Full Market Target (Parity Goal)
                  </span>
                  <span className="font-mono text-[#7A5CF0]">
                    ${benchmark.auditedMarketMedian.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-[#7A5CF0] rounded-full transition-all duration-500"
                    style={{ width: `${getWidthPct(benchmark.auditedMarketMedian)}%` }}
                  />
                </div>
              </div>

              {/* Bar 4: 75th Percentile */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-[500]">
                  <span className="text-[#5E6064] dark:text-slate-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                    75th Percentile (Top Quartile)
                  </span>
                  <span className="font-mono text-[#3A3C40] dark:text-slate-300">
                    ${benchmark.percentile75.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-slate-400 rounded-full transition-all duration-500 opacity-80"
                    style={{ width: `${getWidthPct(benchmark.percentile75)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-[11px] text-[#5E6064] dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#7A5CF0]" />
                Audited against 12,000+ tech disclosures
              </span>
              <span className="font-mono text-[#7A5CF0] font-[600]">
                Parity Target: ${benchmark.auditedMarketMedian.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Negotiation Scripts */}
      <div className="bg-[#FFFFFF] dark:bg-slate-900 border border-black/[0.06] dark:border-white/[0.08] rounded-[16px] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div>
            <span className="text-xs font-[600] uppercase tracking-wider text-[#7A5CF0]">
              Dynamic Counter-Offer Templates
            </span>
            <h4 className="text-2xl font-[600] tracking-[-0.03em] text-[#000000] dark:text-white mt-1">
              Actionable Negotiation Scripts
            </h4>
            <p className="text-xs text-[#5E6064] dark:text-slate-400 mt-1">
              Tailored automatically with your target parity wage (${benchmark.auditedMarketMedian.toLocaleString()}) and calculated gap.
            </p>
          </div>

          <button
            onClick={() => handleCopyScript(renderedScript, activeTemplate.id)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-[500] bg-[#000000] hover:bg-neutral-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-black shadow-md transition-all cursor-pointer border-none"
          >
            {copiedScriptId === activeTemplate.id ? (
              <>
                <Check className="w-4 h-4 text-[#7A5CF0]" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Current Script</span>
              </>
            )}
          </button>
        </div>

        {/* Template Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {NEGOTIATION_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setActiveTemplateTab(tmpl.id)}
              className={`px-4 py-2 rounded-full text-xs font-[500] whitespace-nowrap transition-all cursor-pointer border ${
                activeTemplateTab === tmpl.id
                  ? 'bg-[#000000] text-white dark:bg-white dark:text-black border-transparent font-[600]'
                  : 'bg-[#FFFFFF] dark:bg-slate-800 border-black/[0.08] dark:border-white/[0.1] text-[#3A3C40] dark:text-slate-300'
              }`}
            >
              {tmpl.title}
            </button>
          ))}
        </div>

        {/* Script Box (NO GREY BG) */}
        <div className="rounded-[12px] bg-[#FAF9F8] dark:bg-slate-800/60 border border-black/[0.08] dark:border-white/[0.08] p-6 space-y-3 shadow-2xs">
          <pre className="font-sans text-xs sm:text-sm text-[#000000] dark:text-slate-200 whitespace-pre-wrap leading-relaxed select-text font-normal">
            {renderedScript}
          </pre>
        </div>
      </div>

      {/* Community Salary Transparency Feed (Expanded Rich Content) */}
      <div className="bg-[#FFFFFF] dark:bg-slate-900 border border-black/[0.06] dark:border-white/[0.08] rounded-[16px] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div>
            <span className="text-xs font-[600] uppercase tracking-wider text-[#7A5CF0]">
              Crowdsourced Wage Transparency
            </span>
            <h4 className="text-2xl font-[600] tracking-[-0.03em] text-[#000000] dark:text-white mt-1">
              Verified Tech Salary Disclosures ({communitySubmissions.length})
            </h4>
            <p className="text-xs text-[#5E6064] dark:text-slate-400 mt-1">
              Anonymous real-world compensation breakdowns from women engineers, architects, and leaders across top tech organizations.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-[500] bg-[#000000] hover:bg-neutral-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-black shadow-sm transition-all cursor-pointer border-none"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Share Anonymous Disclosure</span>
          </button>
        </div>

        {/* Disclosures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communitySubmissions.map((sub) => (
            <div
              key={sub.id}
              className="p-5 rounded-[14px] border border-black/[0.06] dark:border-white/[0.08] bg-[#FAF9F8] dark:bg-slate-800/50 hover:border-black/[0.15] transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h5 className="text-sm font-[600] text-[#000000] dark:text-white">
                    {sub.role}
                  </h5>
                  <div className="flex items-center gap-2 text-xs text-[#5E6064] dark:text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1 font-[500] text-[#7A5CF0]">
                      <Building className="w-3.5 h-3.5" />
                      {sub.companyTier}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {sub.location}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-[600] px-2.5 py-0.5 rounded-full bg-[#F1EDFE] text-[#6A4CEB] dark:bg-purple-950 dark:text-purple-300">
                  {sub.negotiatedDelta}
                </span>
              </div>

              {/* Comp details */}
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-[10px] bg-white dark:bg-slate-900 border border-black/[0.04] dark:border-white/[0.04] text-center">
                <div>
                  <span className="text-[10px] text-[#5E6064] uppercase block">Base Salary</span>
                  <span className="text-xs font-[600] text-[#000000] dark:text-white font-mono">
                    ${sub.baseSalary.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5E6064] uppercase block">Total Comp</span>
                  <span className="text-xs font-[600] text-[#7A5CF0] font-mono">
                    ${sub.totalComp.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5E6064] uppercase block">Experience</span>
                  <span className="text-xs font-[600] text-[#000000] dark:text-white">
                    {sub.yoe} YOE
                  </span>
                </div>
              </div>

              {/* Negotiation Tip */}
              <div className="text-xs text-[#3A3C40] dark:text-slate-300 italic bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-[10px] border border-black/[0.03] dark:border-white/[0.04]">
                "{sub.tips}"
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Salary Disclosure Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-[20px] max-w-lg w-full p-6 shadow-2xl border border-black/10 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#7A5CF0]" />
                <h3 className="text-lg font-[600] text-[#000000] dark:text-white">
                  Share Anonymous Compensation Data
                </h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-black dark:hover:text-white bg-transparent border-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#5E6064] dark:text-slate-300">
              Your name and employer name are strictly stripped. This datapoint powers pay transparency for women negotiating offers.
            </p>

            <form onSubmit={handleCommunitySubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-[600] text-[#3A3C40] dark:text-slate-300 mb-1">
                  Role Title
                </label>
                <input
                  type="text"
                  value={submissionForm.role}
                  onChange={(e) => setSubmissionForm({ ...submissionForm, role: e.target.value })}
                  placeholder="e.g. Senior Backend Engineer"
                  required
                  className="w-full p-2.5 text-xs sm:text-sm rounded-[10px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-slate-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A5CF0]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-[600] text-[#3A3C40] dark:text-slate-300 mb-1">
                    Company Tier
                  </label>
                  <input
                    type="text"
                    value={submissionForm.companyTier}
                    onChange={(e) => setSubmissionForm({ ...submissionForm, companyTier: e.target.value })}
                    placeholder="e.g. Tier 1 Big Tech"
                    required
                    className="w-full p-2.5 text-xs sm:text-sm rounded-[10px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-slate-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A5CF0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-[600] text-[#3A3C40] dark:text-slate-300 mb-1">
                    Metro / Remote
                  </label>
                  <input
                    type="text"
                    value={submissionForm.location}
                    onChange={(e) => setSubmissionForm({ ...submissionForm, location: e.target.value })}
                    placeholder="e.g. Bay Area / Remote"
                    required
                    className="w-full p-2.5 text-xs sm:text-sm rounded-[10px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-slate-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A5CF0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-[600] text-[#3A3C40] dark:text-slate-300 mb-1">
                    Base Salary ($)
                  </label>
                  <input
                    type="number"
                    value={submissionForm.baseSalary}
                    onChange={(e) => setSubmissionForm({ ...submissionForm, baseSalary: e.target.value })}
                    required
                    className="w-full p-2.5 text-xs sm:text-sm rounded-[10px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-slate-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A5CF0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-[600] text-[#3A3C40] dark:text-slate-300 mb-1">
                    Total Comp ($)
                  </label>
                  <input
                    type="number"
                    value={submissionForm.totalComp}
                    onChange={(e) => setSubmissionForm({ ...submissionForm, totalComp: e.target.value })}
                    required
                    className="w-full p-2.5 text-xs sm:text-sm rounded-[10px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-slate-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A5CF0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-[600] text-[#3A3C40] dark:text-slate-300 mb-1">
                    YOE
                  </label>
                  <input
                    type="number"
                    value={submissionForm.yoe}
                    onChange={(e) => setSubmissionForm({ ...submissionForm, yoe: e.target.value })}
                    required
                    className="w-full p-2.5 text-xs sm:text-sm rounded-[10px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-slate-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A5CF0]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-[600] text-[#3A3C40] dark:text-slate-300 mb-1">
                  Negotiation Advice or Tactics Used
                </label>
                <textarea
                  rows={3}
                  value={submissionForm.tips}
                  onChange={(e) => setSubmissionForm({ ...submissionForm, tips: e.target.value })}
                  placeholder="e.g. I leveraged competing offers and cited California Equal Pay law regarding substantially similar work..."
                  required
                  className="w-full p-2.5 text-xs sm:text-sm rounded-[10px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-slate-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A5CF0]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-[500] text-[#5E6064] hover:bg-slate-100 dark:hover:bg-slate-800 border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full text-xs font-[600] bg-[#000000] hover:bg-neutral-800 text-white shadow-sm border-none cursor-pointer"
                >
                  Publish Datapoint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
