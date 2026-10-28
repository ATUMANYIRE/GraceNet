import React, { useEffect, useRef } from 'react';
import Logo from './Logo';
import { Award, ArrowRight, Sparkles, Building, CheckCircle2 } from 'lucide-react';

export default function Hero({ onExploreSponsors, onExplorePayEquity, onOpenJoin }) {
  const heartbeatSvgRef = useRef(null);

  // Exact Corvana Pixel ECG Heartbeat Trace:
  // 6.2u squares on a 9.6u grid, coral #F8533F with lighter #FB7565 baseline dots.
  // Baseline sits 9u below the button center.
  // Four heartbeats at -462, -225, +231 and +468u from centre (757u).
  useEffect(() => {
    const svg = heartbeatSvgRef.current;
    if (!svg) return;

    const W = 1514;
    const gx = 9.6;
    const gy = 9.6;
    const s = 6.2;
    const y0 = 50; // baseline y in the 100u container

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

      // Ends thin to sparse dots and fade toward both ends
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
        // Baseline dot: lighter #FB7565
        rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 - s/2).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #FB7565;" />`);
      } else {
        // Vertical pixel staircases: coral #F8533F
        switch (offsetInHb) {
          case -3:
            rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 - 8).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #F8533F;" />`);
            break;
          case -2:
            rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 - 13).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #F8533F;" />`);
            break;
          case -1:
            rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 + 10).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #F8533F;" />`);
            break;
          case 0: // Tall R spike (≈60u up staircase)
            for (let y = y0 + 4; y >= y0 - 58; y -= gy) {
              rects.push(`<rect x="${x.toFixed(1)}" y="${(y - s/2).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #F8533F;" />`);
            }
            break;
          case 1: // S drop (≈47u down staircase)
            for (let y = y0 - 36; y <= y0 + 46; y -= gy) {
              rects.push(`<rect x="${x.toFixed(1)}" y="${(y - s/2).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #F8533F;" />`);
            }
            break;
          case 2: // S recovery
            rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 + 20).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #F8533F;" />`);
            rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 + 6).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #F8533F;" />`);
            break;
          case 3:
            rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 - 10).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #F8533F;" />`);
            break;
          case 4:
            rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 - 16).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #F8533F;" />`);
            break;
          default:
            rects.push(`<rect x="${x.toFixed(1)}" y="${(y0 - s/2).toFixed(1)}" width="${s}" height="${s}" class="ecg-pixel" style="--t: ${t.toFixed(3)}; --col: #FB7565;" />`);
            break;
        }
      }
    }

    svg.innerHTML = rects.join('');
  }, []);

  return (
    <section className="relative w-full overflow-hidden flex flex-col items-center bg-[#FEFEFE] dark:bg-slate-950 font-sans transition-colors duration-200">
      {/* 1. ANNOUNCEMENT BAR: exact 38px, coral #FA6E5C, 13.5px font, underlined link */}
      <div className="w-full h-[38px] bg-[#FA6E5C] flex items-center justify-center text-white text-[13.5px] font-[500] tracking-[-0.01em] px-4 z-20 shrink-0">
        <div className="inline-flex items-center gap-1.5 flex-wrap justify-center text-center">
          <span>Catalyst California Conference (C3) Hackathon • Advancing Women in Tech.</span>
          <button 
            onClick={onOpenJoin}
            className="underline underline-offset-[3px] font-[600] text-[12.5px] tracking-[0.02em] hover:opacity-90 cursor-pointer ml-1 text-white bg-transparent border-none"
          >
            REQUEST SPONSORSHIP NOW
          </button>
        </div>
      </div>

      {/* 2. HEADLINE & SUBLINE SECTION (Reduced font size to refined elegance) */}
      <div className="w-full max-w-[1514px] mx-auto px-4 sm:px-6 pt-8 sm:pt-11 text-center flex flex-col items-center z-10">
        <div className="overflow-hidden">
          <h1 className="text-2xl sm:text-4xl md:text-[46px] lg:text-[54px] font-[500] tracking-[-0.035em] text-[#000000] dark:text-white leading-[1.12]">
            The Career Copilot Made For
          </h1>
        </div>
        <div className="overflow-hidden">
          <div className="text-2xl sm:text-4xl md:text-[46px] lg:text-[54px] font-[500] tracking-[-0.035em] text-[#000000] dark:text-white leading-[1.12]">
            Women In Technology
          </div>
        </div>

        {/* Subline: balanced, comfortable reading size */}
        <div className="mt-3.5 sm:mt-4 max-w-[760px]">
          <p className="text-sm sm:text-base md:text-[17.5px] leading-relaxed md:leading-[27px] text-[#5E6064] dark:text-slate-300 font-[400] tracking-[-0.015em]">
            From salary parity audits to executive sponsorship doors, take control of your career trajectory while cultivating allies who advocate for you in closed-door calibration rooms.
          </p>
        </div>

        {/* 3. HEARTBEAT FIELD & MAIN BUTTON */}
        <div className="relative w-full h-[90px] flex items-center justify-center my-3 sm:my-5">
          {/* Edge-to-edge pixel ECG trace: 6.2u squares on 9.6u grid, coral #F8533F with lighter #FB7565 dots */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <svg 
              ref={heartbeatSvgRef}
              className="w-full h-full block" 
              viewBox="0 0 1514 100" 
              preserveAspectRatio="none"
            />
          </div>

          {/* 233 x 71.5u Glass Ring around Black Pill Button: 20px text */}
          <div className="relative z-10 w-[233px] sm:w-[245px] h-[71.5px] rounded-full bg-white/75 dark:bg-slate-900/80 backdrop-blur-[14px] border border-white/90 dark:border-slate-700 shadow-[0_10px_32px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-center p-1.5 transition-transform hover:scale-[1.01] group cursor-pointer">
            <button
              onClick={onExploreSponsors}
              className="w-full h-full rounded-full bg-[#000000] hover:bg-neutral-800 text-white font-[500] text-base sm:text-[19px] tracking-[-0.02em] flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all group-hover:-translate-y-[1px] group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.22)] active:translate-y-0 border-none cursor-pointer"
            >
              <span>Match With A Sponsor</span>
            </button>
          </div>
        </div>

        {/* 4. PANEL STRIP: 1313.5 x 429.5u, radius 16, three columns 436.5 / 425.5 / 436.5u with 7.5u gaps */}
        <div className="w-full max-w-[1313.5px] mx-auto mb-8 sm:mb-12">
          <div className="w-full min-h-[420px] sm:h-[429.5px] rounded-[16px] grid grid-cols-1 md:grid-cols-12 gap-[7.5px] p-0.5">
            
            {/* PANEL 1: EXECUTIVE SPONSOR PANEL (Warm porcelain & lavender studio aesthetic - NO GREEN) */}
            <div className="md:col-span-4 h-full min-h-[380px] rounded-[16px] overflow-hidden relative shadow-sm bg-gradient-to-br from-[#FAF9F6] via-[#F4F1FD] to-[#EDE9FE] dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/40 border border-black/[0.06] dark:border-white/10 p-6 flex flex-col justify-between">
              
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/90 dark:border-slate-700 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[11px] font-[600] text-[#3A3C40] dark:text-white">
                  <Logo size={14} />
                  <span>Executive Sponsor</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-[500] text-[#7A5CF0] bg-white/70 dark:bg-slate-800/60 px-2.5 py-1 rounded-full border border-purple-100 dark:border-purple-900/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A5CF0] animate-pulse"></span>
                  <span>2 Open Slots</span>
                </div>
              </div>

              {/* Sponsor Profile Spotlight */}
              <div className="my-auto py-2 text-center flex flex-col items-center">
                <div className="relative mb-3">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#7A5CF0] via-[#F8533F] to-[#FA6E5C] shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
                      alt="Dr. Maya Lin-Vanderbilt"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 rounded-full p-1 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#7A5CF0]" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-[600] text-[#000000] dark:text-white tracking-[-0.02em]">
                  Dr. Maya Lin-Vanderbilt
                </h3>
                <p className="text-xs sm:text-[13px] font-[500] text-[#5E6064] dark:text-slate-300 mt-0.5">
                  VP of Engineering • Google Cloud
                </p>

                {/* Key Tags */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
                  <span className="text-[10.5px] font-[500] px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-800 text-[#3A3C40] dark:text-slate-200 shadow-2xs border border-black/[0.04] dark:border-white/[0.06]">
                    Distributed Systems
                  </span>
                  <span className="text-[10.5px] font-[500] px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-800 text-[#3A3C40] dark:text-slate-200 shadow-2xs border border-black/[0.04] dark:border-white/[0.06]">
                    Staff+ Dossiers
                  </span>
                  <span className="text-[10.5px] font-[500] px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-800 text-[#3A3C40] dark:text-slate-200 shadow-2xs border border-black/[0.04] dark:border-white/[0.06]">
                    Parity Advocacy
                  </span>
                </div>
              </div>

              {/* Bottom Glass Action Bar */}
              <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-white/90 dark:border-slate-700 rounded-[14px] p-3 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-[600] px-2.5 py-1 rounded-full bg-[#F1EDFE] text-[#6A4CEB] dark:bg-purple-950/60 dark:text-purple-300">
                    14 Promoted
                  </span>
                  <span className="text-[11px] font-[600] px-2.5 py-1 rounded-full bg-[#FFF0EE] text-[#F8533F] dark:bg-rose-950/60 dark:text-rose-300">
                    100% Equity
                  </span>
                </div>

                <button
                  onClick={onExploreSponsors}
                  className="flex items-center gap-1 text-[12px] font-[600] text-[#000000] dark:text-white hover:text-[#7A5CF0] transition-colors cursor-pointer border-none bg-transparent"
                >
                  <span>Connect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* PANEL 2: WAGE TRANSPARENCY METRIC PANEL (Pure white card with hairline border - NO GREY BG) */}
            <div className="md:col-span-4 h-full min-h-[380px] rounded-[16px] bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-white/10 p-5 flex items-center justify-center shadow-sm">
              <div className="w-full max-w-[339px] h-[316px] bg-[#FAF9F8] dark:bg-slate-800/70 rounded-[16px] p-6 border border-black/[0.04] dark:border-white/[0.06] shadow-xs flex flex-col justify-between">
                {/* Header: Pay Parity Reached + › button with soft hover */}
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-[500] text-[#3A3C40] dark:text-slate-300 tracking-[-0.01em]">
                    Pay Parity Reached
                  </span>
                  <button
                    onClick={onExplorePayEquity}
                    className="w-[28px] h-[28px] rounded-full flex items-center justify-center text-[#5E6064] hover:text-[#000000] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors cursor-pointer border-none bg-transparent"
                    aria-label="Open Wage Transparency Tool"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>

                {/* Big Stat Value: $240 (50u, 600) with small K */}
                <div className="mt-2">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-[50px] font-[600] tracking-[-0.035em] text-[#000000] dark:text-white leading-none">$240</span>
                    <span className="text-[26px] font-[500] text-[#000000] dark:text-white">K</span>
                  </div>

                  {/* Lavender Chip: +21.3% (#F1EDFE -> #E8E2FD, text #6A4CEB) + vs Past Review */}
                  <div className="flex items-center gap-2 mt-2.5">
                    <span className="text-[12px] font-[600] px-2 py-0.5 rounded-full bg-gradient-to-r from-[#F1EDFE] to-[#E8E2FD] text-[#6A4CEB] tracking-[-0.01em]">
                      +21.3%
                    </span>
                    <span className="text-[12.5px] font-[400] text-[#5E6064] dark:text-slate-400">vs Past Review</span>
                  </div>
                </div>

                {/* SVG Chart: Violet line #7A5CF0 and Coral line #F8533F */}
                <div className="w-full h-[118px] relative mt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 290 90" fill="none">
                    {/* Bottom ticks */}
                    <line x1="20" y1="86" x2="20" y2="90" stroke="#D5D5D8" strokeWidth="1" />
                    <line x1="65" y1="86" x2="65" y2="90" stroke="#D5D5D8" strokeWidth="1" />
                    <line x1="110" y1="86" x2="110" y2="90" stroke="#D5D5D8" strokeWidth="1" />
                    <line x1="155" y1="86" x2="155" y2="90" stroke="#D5D5D8" strokeWidth="1" />
                    <line x1="200" y1="86" x2="200" y2="90" stroke="#D5D5D8" strokeWidth="1" />
                    <line x1="245" y1="86" x2="245" y2="90" stroke="#D5D5D8" strokeWidth="1" />
                    <line x1="280" y1="86" x2="280" y2="90" stroke="#D5D5D8" strokeWidth="1" />

                    {/* Grey vertical drop line */}
                    <line x1="272" y1="18" x2="272" y2="86" stroke="#D0D0D2" strokeWidth="1.2" strokeDasharray="2.5 2.5" />

                    {/* Violet trajectory #7A5CF0 (Industry Market Target) */}
                    <path
                      d="M 15 68 C 65 64, 110 52, 160 46 C 205 40, 235 32, 265 24"
                      stroke="#7A5CF0"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Coral trajectory #F8533F (Negotiated Parity) */}
                    <path
                      d="M 15 54 C 60 48, 105 38, 155 30 C 195 24, 230 18, 272 18"
                      stroke="#F8533F"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Violet ringed dot */}
                    <circle cx="265" cy="24" r="4.5" stroke="#7A5CF0" strokeWidth="2" fill="#FFFFFF" />
                    <circle cx="265" cy="24" r="1.5" fill="#7A5CF0" />

                    {/* Coral filled dot with soft ring */}
                    <circle cx="272" cy="18" r="7" fill="rgba(248, 83, 63, 0.25)" />
                    <circle cx="272" cy="18" r="4" fill="#F8533F" />
                  </svg>
                </div>
              </div>
            </div>

            {/* PANEL 3: PEONY PANEL (436.5u / 4 cols): Macro ruffled coral peony petals */}
            <div 
              className="md:col-span-4 h-full min-h-[380px] rounded-[16px] p-5 flex flex-col items-center justify-center gap-3 relative overflow-hidden shadow-sm bg-cover bg-center"
              style={{ backgroundImage: `url('https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b6730025-6d74-465e-8978-f9909c47095a.webp')` }}
            >
              {/* Frosted Trust Card: 292 x 241u, 98% (44.5u, 400), violet bar-wave meter */}
              <div className="w-full max-w-[292px] h-[241px] bg-white/76 dark:bg-slate-900/80 backdrop-blur-[18px] border border-white/88 dark:border-slate-700 rounded-[16px] p-5 flex flex-col justify-between shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-[500] text-[#3A3C40] dark:text-slate-300">
                    Promotion Success Rating
                  </span>
                  <Logo size={18} />
                </div>

                <div>
                  <div className="text-[44.5px] font-[400] text-[#000000] dark:text-white tracking-[-0.03em] leading-none">
                    98%
                  </div>
                </div>

                {/* Symmetric violet bar-wave meter */}
                <div className="w-full h-[36px] flex items-center justify-between gap-1 py-1" aria-hidden="true">
                  <div className="flex-1 bg-[#7A5CF0] rounded-full h-[22%]" />
                  <div className="flex-1 bg-[#7A5CF0] rounded-full h-[35%]" />
                  <div className="flex-1 bg-[#7A5CF0] rounded-full h-[52%]" />
                  <div className="flex-1 bg-[#7A5CF0] rounded-full h-[70%]" />
                  <div className="flex-1 bg-[#7A5CF0] rounded-full h-[88%]" />
                  <div className="flex-1 bg-[#7A5CF0] rounded-full h-[100%]" />
                  <div className="flex-1 bg-[#7A5CF0] rounded-full h-[88%]" />
                  <div className="flex-1 bg-[#7A5CF0] rounded-full h-[70%]" />
                  <div className="flex-1 bg-[#7A5CF0] rounded-full h-[52%]" />
                  <div className="flex-1 bg-[#7A5CF0] rounded-full h-[35%]" />
                  <div className="flex-1 bg-[#7A5CF0] rounded-full h-[22%]" />
                </div>

                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-[600] text-[#7A5CF0]">Calibrated to Staff+</span>
                  <div className="flex items-center gap-0.5 text-[#F59E0B] text-[11px]">
                    ★★★★★
                  </div>
                </div>
              </div>

              {/* White Avatars Card: 66.5u tall, 3 overlapping avatars, 142+ Women Promoted */}
              <div className="w-full max-w-[292px] h-[66.5px] bg-[#FFFFFF] dark:bg-slate-900 rounded-[16px] px-4 flex items-center justify-between shadow-[0_10px_24px_rgba(0,0,0,0.06)] border border-slate-100 dark:border-slate-800">
                <div className="flex items-center -space-x-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80"
                    alt="Engineer Promoted"
                    className="w-[34px] h-[34px] rounded-[9px] border-2 border-white dark:border-slate-900 object-cover shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80"
                    alt="Staff Architect Promoted"
                    className="w-[34px] h-[34px] rounded-[9px] border-2 border-white dark:border-slate-900 object-cover shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                    alt="Principal Engineer Promoted"
                    className="w-[34px] h-[34px] rounded-[9px] border-2 border-white dark:border-slate-900 object-cover shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
                  />
                </div>

                <div className="text-right flex flex-col items-end">
                  <div className="text-[16.5px] font-[600] text-[#000000] dark:text-white tracking-[-0.02em] leading-tight">142+</div>
                  <div className="text-[11px] font-[400] text-[#5E6064] dark:text-slate-400">Women Promoted in Tech</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
