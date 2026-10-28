import React, { useEffect, useRef } from 'react';
import Logo from './Logo';

export default function Hero({ onExploreSponsors, onExplorePayEquity, onOpenJoin }) {
  const videoRef = useRef(null);
  const heartbeatSvgRef = useRef(null);
  const panelStripRef = useRef(null);

  // 1. Build pixel ECG heartbeat trace
  useEffect(() => {
    const svg = heartbeatSvgRef.current;
    if (!svg) return;

    const W = 1514;
    const gx = 9.6;
    const gy = 9.6;
    const s = 6.2;
    const y0 = 50; // baseline y in the 100u tall container

    const center = W / 2; // 757u
    const hbCenters = [
      center - 462, // 295u
      center - 225, // 532u
      center + 231, // 988u
      center + 468  // 1225u
    ];

    const totalCols = Math.floor(W / gx);
    const rects = [];

    for (let col = 0; col <= totalCols; col++) {
      const x = col * gx;
      const t = Math.min(1, Math.max(0, x / W));

      // Edge thinning & fading
      const distFromEdge = Math.min(x, W - x);
      if (distFromEdge < 120 && col % 2 !== 0) continue;
      if (distFromEdge < 60 && col % 3 !== 0) continue;

      let matchedHb = null;
      let offsetInHb = 0;

      for (const hc of hbCenters) {
        const diff = x - hc;
        if (Math.abs(diff) <= 4.5 * gx) {
          matchedHb = hc;
          offsetInHb = Math.round(diff / gx);
          break;
        }
      }

      if (matchedHb === null) {
        // Baseline dot in soft amethyst / violet tint
        rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 - s/2).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #C4B5FD;" />`);
      } else {
        // Cardiac waveform staircase in brand deep violet & rose
        switch (offsetInHb) {
          case -3:
            rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 - 8).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #8B5CF6;" />`);
            break;
          case -2:
            rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 - 13).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #8B5CF6;" />`);
            break;
          case -1:
            rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 + 10).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #6D28D9;" />`);
            break;
          case 0: // Tall R spike (≈60u up staircase)
            for (let y = y0 + 4; y >= y0 - 58; y -= gy) {
              rects.push(`<rect x="${x.toFixed(1)}" y="${(y - s/2).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #F43F5E;" />`);
            }
            break;
          case 1: // S drop (≈47u down staircase)
            for (let y = y0 - 36; y <= y0 + 46; y -= gy) {
              rects.push(`<rect x="${x.toFixed(1)}" y="${(y - s/2).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #6D28D9;" />`);
            }
            break;
          case 2: // S recovery
            rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 + 20).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #7C3AED;" />`);
            rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 + 6).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #7C3AED;" />`);
            break;
          case 3:
            rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 - 10).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #8B5CF6;" />`);
            break;
          case 4:
            rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 - 16).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #8B5CF6;" />`);
            break;
          default:
            rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 - s/2).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #C4B5FD;" />`);
            break;
        }
      }
    }

    svg.innerHTML = rects.join('');
  }, []);

  // 2. Video fade-in on play
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlaying = () => {
      video.classList.add('is-active');
    };

    video.addEventListener('playing', handlePlaying);
    video.play().catch(() => {});

    return () => {
      video.removeEventListener('playing', handlePlaying);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden flex flex-col items-center">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="w-full h-[38px] bg-gradient-to-r from-deepViolet via-purple-700 to-rose-600 flex items-center justify-center text-white text-xs sm:text-[13.5px] font-medium tracking-tight px-4 z-20 shrink-0">
        <div className="inline-flex items-center gap-2">
          <Logo size={16} />
          <span>Catalyst California Conference (C3) Hackathon • Advancing Women in Tech</span>
          <button 
            onClick={onOpenJoin}
            className="underline underline-offset-4 font-bold text-[12px] tracking-wide hover:opacity-90 transition-opacity ml-1 cursor-pointer"
          >
            CLAIM YOUR SPONSOR NOW
          </button>
        </div>
      </div>

      {/* 2. HEADLINE & SUBLINE SECTION */}
      <div className="w-full max-w-[1514px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 text-center flex flex-col items-center z-10">
        {/* Headline */}
        <div className="overflow-hidden">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-medium tracking-[-0.045em] text-slate-900 dark:text-white leading-[1.08]">
            The Career Copilot Built For
          </h1>
        </div>
        <div className="overflow-hidden">
          <div className="text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-medium tracking-[-0.045em] bg-gradient-to-r from-deepViolet via-purple-600 to-rose-500 bg-clip-text text-transparent leading-[1.08]">
            Women In Technology
          </div>
        </div>

        {/* Subline */}
        <div className="mt-4 sm:mt-5 max-w-3xl">
          <p className="text-sm sm:text-lg md:text-[22.4px] leading-relaxed md:leading-[31px] text-slate-600 dark:text-slate-300 font-normal tracking-[-0.015em]">
            From salary parity audits to executive sponsorship doors, take control of your career trajectory while cultivating allies who advocate for you in closed-door calibration rooms.
          </p>
        </div>

        {/* 3. HEARTBEAT FIELD & MAIN BUTTON */}
        <div className="relative w-full h-[90px] flex items-center justify-center my-4 sm:my-6">
          {/* Edge-to-edge pixel ECG heartbeat line running behind button */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <svg 
              ref={heartbeatSvgRef}
              className="w-full h-full block" 
              viewBox="0 0 1514 100" 
              preserveAspectRatio="none"
            />
          </div>

          {/* Frosted Glass Ring around Black Pill Button */}
          <div className="relative z-10 w-[240px] sm:w-[260px] h-[72px] rounded-full bg-white/75 dark:bg-slate-900/80 backdrop-blur-md border border-white/90 dark:border-slate-700 shadow-xl flex items-center justify-center p-1.5 transition-transform hover:scale-[1.02]">
            <button
              onClick={onExploreSponsors}
              className="w-full h-full rounded-full bg-slate-950 dark:bg-deepViolet hover:bg-slate-900 dark:hover:bg-purple-700 text-white font-medium text-base sm:text-lg tracking-[-0.02em] flex items-center justify-center gap-2 shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Logo size={20} />
              <span>Match With A Sponsor</span>
            </button>
          </div>
        </div>

        {/* 4. THREE TALL ROUNDED PANELS (1313.5 x 429.5u) */}
        <div className="w-full max-w-[1314px] mx-auto mb-8 sm:mb-12">
          <div 
            ref={panelStripRef}
            className="w-full min-h-[420px] sm:h-[430px] rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-3 p-1"
          >
            {/* PANEL 1: EXECUTIVE SPONSOR PANEL (436.5u / ~4 cols) */}
            <div className="md:col-span-4 h-full min-h-[380px] rounded-2xl overflow-hidden relative shadow-sm border border-slate-200/60 dark:border-slate-800 bg-gradient-to-br from-[#a4e6ce] via-[#b6e5db] to-[#bde8f5]">
              {/* Still image fallback */}
              <img
                src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/c43c6772-ae79-45f3-a2ff-90a401f03b48.webp"
                alt="Executive Sponsor Leader"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Looping video at 107.78% width, -3.89% left */}
              <video
                ref={videoRef}
                src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/39c69b84-0ac5-485f-ae42-3bd7d521989e.mp4"
                className="absolute top-0 -left-[3.89%] w-[107.78%] h-full object-cover opacity-0 transition-opacity duration-700 pointer-events-none [&.is-active]:opacity-100"
                autoPlay
                loop
                muted
                playsInline
              />

              {/* Verified Sponsor Pill Header */}
              <div className="absolute top-4 left-4 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/90 dark:border-slate-700 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-sm text-xs font-semibold text-slate-800 dark:text-white">
                <Logo size={14} />
                <span>Executive Sponsor • Google Cloud</span>
              </div>

              {/* Bottom Leader Impact Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-white/90 dark:border-slate-700 rounded-2xl p-3 flex items-center justify-between shadow-md">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Dr. Maya Lin-Vanderbilt</div>
                  <div className="text-[11px] text-slate-500">VP of Engineering & Distributed Systems</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  14 Promoted
                </span>
              </div>
            </div>

            {/* PANEL 2: WAGE TRANSPARENCY METRIC PANEL (425.5u / ~4 cols) */}
            <div className="md:col-span-4 h-full min-h-[380px] rounded-2xl bg-[#EAEAEA] dark:bg-slate-800/80 p-5 flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
              <div className="w-full max-w-[340px] h-[320px] bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm flex flex-col justify-between border border-slate-100 dark:border-slate-800">
                {/* Header with › button */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Audited Pay Parity
                  </span>
                  <button
                    onClick={onExplorePayEquity}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Explore pay equity details"
                  >
                    ›
                  </button>
                </div>

                {/* Big Stat Value */}
                <div className="mt-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">$240</span>
                    <span className="text-2xl font-medium text-slate-700 dark:text-slate-300">K</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                      +18.4%
                    </span>
                    <span className="text-xs text-slate-500">vs Market Benchmark</span>
                  </div>
                </div>

                {/* Dual Trajectory SVG Chart */}
                <div className="w-full h-28 relative mt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 290 90" fill="none">
                    {/* Bottom ticks */}
                    <line x1="20" y1="86" x2="20" y2="90" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="65" y1="86" x2="65" y2="90" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="110" y1="86" x2="110" y2="90" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="155" y1="86" x2="155" y2="90" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="200" y1="86" x2="200" y2="90" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="245" y1="86" x2="245" y2="90" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="280" y1="86" x2="280" y2="90" stroke="#CBD5E1" strokeWidth="1" />

                    {/* Vertical drop line */}
                    <line x1="272" y1="18" x2="272" y2="86" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="2.5 2.5" />

                    {/* Violet trajectory (Female Tech Median) */}
                    <path
                      d="M 15 68 C 65 64, 110 52, 160 46 C 205 40, 235 32, 265 24"
                      stroke="#6D28D9"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Rose trajectory (Market Parity Target) */}
                    <path
                      d="M 15 54 C 60 48, 105 38, 155 30 C 195 24, 230 18, 272 18"
                      stroke="#F43F5E"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Violet ringed dot */}
                    <circle cx="265" cy="24" r="4.5" stroke="#6D28D9" strokeWidth="2" fill="#FFFFFF" />
                    <circle cx="265" cy="24" r="1.5" fill="#6D28D9" />

                    {/* Coral/Rose filled dot with soft ring */}
                    <circle cx="272" cy="18" r="7" fill="rgba(244, 63, 94, 0.25)" />
                    <circle cx="272" cy="18" r="4" fill="#F43F5E" />
                  </svg>
                </div>
              </div>
            </div>

            {/* PANEL 3: GRACE HOPPER TRUST & PROMOTION PANEL (436.5u / ~4 cols) */}
            <div 
              className="md:col-span-4 h-full min-h-[380px] rounded-2xl p-5 flex flex-col items-center justify-center gap-3 relative overflow-hidden shadow-sm border border-slate-200/60 dark:border-slate-800 bg-cover bg-center"
              style={{ backgroundImage: `url('https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b6730025-6d74-465e-8978-f9909c47095a.webp')` }}
            >
              {/* Frosted Trust Card */}
              <div className="w-full max-w-[290px] h-[235px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-white/90 dark:border-slate-700 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Promotion Calibration Rate
                  </span>
                  <Logo size={18} />
                </div>

                <div>
                  <div className="text-4xl font-normal text-slate-950 dark:text-white tracking-tight">
                    98%
                  </div>
                </div>

                {/* Symmetric Bar-Wave Meter */}
                <div className="w-full h-8 flex items-center justify-between gap-1 py-1" aria-hidden="true">
                  <div className="flex-1 bg-deepViolet rounded-full h-[22%]" />
                  <div className="flex-1 bg-deepViolet rounded-full h-[35%]" />
                  <div className="flex-1 bg-deepViolet rounded-full h-[52%]" />
                  <div className="flex-1 bg-deepViolet rounded-full h-[70%]" />
                  <div className="flex-1 bg-deepViolet rounded-full h-[88%]" />
                  <div className="flex-1 bg-deepViolet rounded-full h-[100%]" />
                  <div className="flex-1 bg-deepViolet rounded-full h-[88%]" />
                  <div className="flex-1 bg-deepViolet rounded-full h-[70%]" />
                  <div className="flex-1 bg-deepViolet rounded-full h-[52%]" />
                  <div className="flex-1 bg-deepViolet rounded-full h-[35%]" />
                  <div className="flex-1 bg-deepViolet rounded-full h-[22%]" />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-deepViolet dark:text-purple-300">Calibrated to Staff+</span>
                  <span className="text-amber-500">★★★★★</span>
                </div>
              </div>

              {/* White Avatars Card */}
              <div className="w-full max-w-[290px] h-[64px] bg-white dark:bg-slate-900 rounded-2xl p-3 flex items-center justify-between shadow-md border border-slate-100 dark:border-slate-800">
                <div className="flex items-center -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80"
                    alt="Promoted Engineer"
                    className="w-8 h-8 rounded-xl border-2 border-white dark:border-slate-900 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80"
                    alt="Promoted Staff Architect"
                    className="w-8 h-8 rounded-xl border-2 border-white dark:border-slate-900 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                    alt="Promoted Tech Lead"
                    className="w-8 h-8 rounded-xl border-2 border-white dark:border-slate-900 object-cover"
                  />
                </div>

                <div className="text-right">
                  <div className="text-base font-bold text-slate-900 dark:text-white leading-none">142+</div>
                  <div className="text-[11px] text-slate-500">Women Promoted</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
