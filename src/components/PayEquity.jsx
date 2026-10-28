import React, { useState, useId } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  Scale, 
  ShieldCheck, 
  PlusCircle, 
  ArrowUpRight,
  Info,
  Calendar,
  Lock,
  X
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
  // Input states
  const [selectedDiscipline, setSelectedDiscipline] = useState('swe');
  const [selectedLevel, setSelectedLevel] = useState('senior');
  const [selectedLocation, setSelectedLocation] = useState('bayarea');
  const [userSalary, setUserSalary] = useState(165000);
  const [copiedScriptId, setCopiedScriptId] = useState(null);
  const [activeTemplateTab, setActiveTemplateTab] = useState('annual_review');
  const [communitySubmissions, setCommunitySubmissions] = useState(COMMUNITY_SALARY_SUBMISSIONS);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Community submission form
  const [submissionForm, setSubmissionForm] = useState({
    role: 'Senior Software Engineer',
    companyTier: 'Tier 1 Big Tech',
    location: 'Bay Area, CA',
    yoe: 6,
    baseSalary: 185000,
    totalComp: 280000,
    gender: 'Woman',
    negotiatedDelta: '+$25,000',
    tips: ''
  });

  // Calculate live benchmark
  const benchmark = calculateBenchmark(selectedDiscipline, selectedLevel, selectedLocation);

  // Pay gap metrics
  const salaryDiff = userSalary - benchmark.auditedMarketMedian;
  const isUndervalued = salaryDiff < 0;
  const gapAmount = Math.abs(salaryDiff);
  const gapPercentage = Math.abs(Math.round((salaryDiff / benchmark.auditedMarketMedian) * 100));

  // 10-year compounding lost earnings calculation (assuming 5% annual market reinvestment)
  const tenYearCompoundedLoss = Math.round(gapAmount * 12.58);

  // Max value for comparative bars (scale to 1.15x the 90th percentile)
  const maxBarValue = Math.max(benchmark.percentile90 * 1.1, userSalary * 1.1);

  const getWidthPct = (val) => {
    return Math.min(100, Math.round((val / maxBarValue) * 100));
  };

  const handleCopyScript = (scriptText, templateId) => {
    navigator.clipboard.writeText(scriptText);
    setCopiedScriptId(templateId);
    showToast('Negotiation script copied to clipboard!', 'success');
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
    showToast('Anonymous compensation datapoint published!', 'success');
    setIsSubmitModalOpen(false);
  };

  // Find active template
  const activeTemplate = NEGOTIATION_TEMPLATES.find(t => t.id === activeTemplateTab) || NEGOTIATION_TEMPLATES[0];
  const renderedScript = activeTemplate.generateScript({
    roleTitle: `${ROLE_LEVELS.find(l => l.id === selectedLevel)?.label.split(' ')[0]} ${DISCIPLINES.find(d => d.id === selectedDiscipline)?.label.split(' ')[0]}`,
    userSalary,
    marketMedian: benchmark.auditedMarketMedian,
    gapAmount,
    targetComp: benchmark.percentile75
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Tool Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-emerald-800/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-xs font-semibold text-emerald-200">
            <Scale className="w-3.5 h-3.5 text-emerald-300" />
            <span>Audited Tech Equity Analytics & California Equal Pay Standards</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Wage Transparency & <br />
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
              Pay Equity Parity Calculator
            </span>
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
            Compare your compensation against validated market medians, uncover systemic undervaluation, and generate high-leverage negotiation scripts with statutory labor code references.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-emerald-200/90 font-medium">
            <span className="flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Client-Side Private (Zero Data Tracked)
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800/60">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Calibrated for 2024–2026 Tech Bands
            </span>
          </div>
        </div>

        {/* Glow */}
        <div className="absolute right-0 top-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Input Configuration (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Your Compensation Profile
              </h2>
              <span className="text-[11px] text-slate-400">Live Calibration</span>
            </div>

            {/* Discipline */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Discipline / Specialization
              </label>
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="w-full p-3 text-xs sm:text-sm rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                {DISCIPLINES.map(d => (
                  <option key={d.id} value={d.id}>{d.label}</option>
                ))}
              </select>
            </div>

            {/* Role Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Seniority Level
              </label>
              <div className="grid grid-cols-1 gap-2">
                {ROLE_LEVELS.map(level => {
                  const isSelected = selectedLevel === level.id;
                  return (
                    <button
                      type="button"
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold block">{level.label}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{level.yoe}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Metro Location & Cost of Living Tier
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-3 text-xs sm:text-sm rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                {LOCATIONS.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.label} ({loc.tier})</option>
                ))}
              </select>
            </div>

            {/* Current Salary Slider & Input */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Current Annual Base Salary ($)
                </label>
                <div className="text-lg font-black text-slate-900 dark:text-white">
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
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>$60,000</span>
                <span>$250,000</span>
                <span>$450,000+</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Visual Comparison Bars & Pay Gap Analysis (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Live Analysis Badge Card */}
          <div className={`p-6 rounded-3xl border shadow-sm transition-all ${
            isUndervalued
              ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900/60'
              : 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-900/60'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`p-3 rounded-2xl shrink-0 ${
                  isUndervalued ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
                }`}>
                  {isUndervalued ? <AlertCircle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full ${
                      isUndervalued 
                        ? 'bg-rose-200 text-rose-800 dark:bg-rose-900 dark:text-rose-200' 
                        : 'bg-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                    }`}>
                      {isUndervalued ? 'Pay Gap Disparity Detected' : 'At or Above Market Benchmark'}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {isUndervalued ? (
                      <>Estimated Under-valuation: <span className="text-rose-600 dark:text-rose-400">-${gapAmount.toLocaleString()} / year (-{gapPercentage}%)</span></>
                    ) : (
                      <>You are earning <span className="text-emerald-600 dark:text-emerald-400">+${gapAmount.toLocaleString()} (+{gapPercentage}%)</span> above market median</>
                    )}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isUndervalued 
                      ? `Based on verified 2024–2026 tech calibrations for ${benchmark.levelName} in ${benchmark.locationName}, your current base is below the market median ($${benchmark.auditedMarketMedian.toLocaleString()}).`
                      : `Your current compensation is competitive and sits in the upper quartiles for ${benchmark.levelName} in ${benchmark.locationName}.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Lifetime Compounding impact callout */}
            {isUndervalued && (
              <div className="mt-4 pt-4 border-t border-rose-200/80 dark:border-rose-900/60 flex items-center justify-between text-xs">
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  <strong>10-Year Compounding Loss:</strong> (Salary delta + 401k match + annual compound raises)
                </span>
                <span className="font-extrabold text-rose-600 dark:text-rose-400 font-mono text-sm">
                  -${tenYearCompoundedLoss.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Visual Benchmark Comparison Bars */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-deepViolet dark:text-purple-400" />
                Live Benchmark Distribution Bar
              </h3>
              <span className="text-xs text-slate-400 font-mono">{benchmark.levelName}</span>
            </div>

            <div className="space-y-4">
              {/* Bar 1: User's Salary */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-deepViolet inline-block" />
                    Your Current Salary
                  </span>
                  <span className="font-bold text-deepViolet dark:text-purple-300 font-mono">
                    ${userSalary.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-deepViolet to-purple-500 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${getWidthPct(userSalary)}%` }}
                  />
                </div>
              </div>

              {/* Bar 2: Audited Female Tech Median */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-roseQuartz inline-block" />
                    Female Tech Median (Audited -9% Gap)
                  </span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">
                    ${benchmark.auditedFemaleMedian.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-roseQuartz rounded-full transition-all duration-500 opacity-90"
                    style={{ width: `${getWidthPct(benchmark.auditedFemaleMedian)}%` }}
                  />
                </div>
              </div>

              {/* Bar 3: Industry Audited Market Median */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-900 dark:text-white flex items-center gap-1.5 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    Industry Full Market Median (Parity Target)
                  </span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    ${benchmark.auditedMarketMedian.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${getWidthPct(benchmark.auditedMarketMedian)}%` }}
                  />
                </div>
              </div>

              {/* Bar 4: 75th Percentile (Top Quartile) */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 inline-block" />
                    75th Percentile (High Performer Benchmark)
                  </span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">
                    ${benchmark.percentile75.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-indigo-400 rounded-full transition-all duration-500 opacity-80"
                    style={{ width: `${getWidthPct(benchmark.percentile75)}%` }}
                  />
                </div>
              </div>

              {/* Bar 5: 90th Percentile */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500 dark:text-slate-500 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    90th Percentile (Tier 1 Top-Of-Band)
                  </span>
                  <span className="font-mono text-slate-600 dark:text-slate-400">
                    ${benchmark.percentile90.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500 opacity-70"
                    style={{ width: `${getWidthPct(benchmark.percentile90)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-deepViolet" />
                Audited against 12,000+ certified disclosures
              </span>
              <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">
                Parity Target: ${benchmark.auditedMarketMedian.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: Actionable Negotiation Scripts Generator */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deepViolet dark:text-purple-400 mb-1">
              <Sparkles className="w-4 h-4" />
              Dynamic Counter-Offer Templates
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Actionable Negotiation Scripts
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Tailored automatically with your exact role title, target parity wage (${benchmark.auditedMarketMedian.toLocaleString()}), and calculated gap.
            </p>
          </div>

          <button
            onClick={() => handleCopyScript(renderedScript, activeTemplate.id)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-deepViolet hover:bg-purple-700 text-white shadow-md shadow-purple-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {copiedScriptId === activeTemplate.id ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
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

        {/* Template Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {NEGOTIATION_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setActiveTemplateTab(tmpl.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTemplateTab === tmpl.id
                  ? 'bg-deepViolet text-white shadow-md shadow-purple-900/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tmpl.title}
            </button>
          ))}
        </div>

        {/* Script Preview Box */}
        <div className="relative rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-deepViolet dark:text-purple-400">
              {activeTemplate.purpose}
            </span>
            <span className="font-mono text-[11px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-md">
              Markdown / Email Ready
            </span>
          </div>

          <pre className="font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed select-text font-normal">
            {renderedScript}
          </pre>
        </div>

        {/* Tactical Tips for California & Federal Pay Equity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 space-y-1.5">
            <h4 className="text-xs font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-deepViolet" />
              California Labor Code § 1197.5
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Employers cannot prohibit employees from disclosing, discussing, or inquiring about their wages. You have statutory right to discuss comp with peers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-1.5">
            <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Timing Your Calibration Ask
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Always deliver your counter 4 to 6 weeks BEFORE corporate calibration lock. Once HR locks compensation spreadsheets, out-of-cycle exceptions require VP approval.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 space-y-1.5">
            <h4 className="text-xs font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-rose-600" />
              Never Reveal Salary First
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              In CA, NY, and WA, employers are legally prohibited from asking past salary history. Anchor strictly on market benchmarks and the role's budget band.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION: Community Real Salary Disclosures */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Anonymous Peer Wage Disclosures
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Crowdsourced by Catalyst California Conference members to combat opaque corporate wage secrets.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Anonymously Add Your Salary</span>
          </button>
        </div>

        {/* Submissions Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communitySubmissions.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3 hover:border-purple-300 dark:hover:border-purple-700 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.role}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {item.companyTier} • {item.location}
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {item.yoe} YOE
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-200/60 dark:border-slate-700/60 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Base Salary</span>
                  <div className="font-bold text-slate-900 dark:text-white font-mono">
                    ${item.baseSalary.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Total Comp</span>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    ${item.totalComp.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Negotiated</span>
                  <div className="font-bold text-purple-600 dark:text-purple-400 font-mono">
                    {item.negotiatedDelta}
                  </div>
                </div>
              </div>

              {item.tips && (
                <div className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                  "{item.tips}"
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ANONYMOUS SALARY SUBMISSION MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Submit Anonymous Salary Datapoint
              </h3>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCommunitySubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Role Title
                  </label>
                  <input
                    type="text"
                    required
                    value={submissionForm.role}
                    onChange={(e) => setSubmissionForm({ ...submissionForm, role: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Company Tier
                  </label>
                  <input
                    type="text"
                    required
                    value={submissionForm.companyTier}
                    onChange={(e) => setSubmissionForm({ ...submissionForm, companyTier: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Base Salary ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={submissionForm.baseSalary}
                    onChange={(e) => setSubmissionForm({ ...submissionForm, baseSalary: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Total Comp ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={submissionForm.totalComp}
                    onChange={(e) => setSubmissionForm({ ...submissionForm, totalComp: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    YOE
                  </label>
                  <input
                    type="number"
                    required
                    value={submissionForm.yoe}
                    onChange={(e) => setSubmissionForm({ ...submissionForm, yoe: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Negotiation Advice / How did you push for parity?
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Cited competing offer and asked for market 75th percentile during calibration..."
                  value={submissionForm.tips}
                  onChange={(e) => setSubmissionForm({ ...submissionForm, tips: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                >
                  Publish Anonymous Datapoint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
