import React, { useState } from 'react';
import { Shield, Phone, ExternalLink, X, AlertTriangle, Lock, LogOut, CheckCircle2 } from 'lucide-react';
import { SAFETY_RESOURCES } from '../data/safetyResources';

export default function SafetyModal({ isOpen, onClose }) {
  const [copiedText, setCopiedText] = useState(null);

  if (!isOpen) return null;

  // Safe Exit function - instantly redirects tab to neutral site (Wikipedia / Google Weather)
  const handleSafeExit = () => {
    window.location.replace("https://www.wikipedia.org");
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-purple-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="safety-modal-title"
      >
        {/* Header with Quick Safe Exit Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-rose-50 via-purple-50 to-white dark:from-slate-900 dark:via-purple-950/30 dark:to-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 id="safety-modal-title" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Workplace Safety & Rights Hub
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                  Confidential
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Catalyst California Conference Legal, Labor & Crisis Support
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Panic / Safe Exit button */}
            <button
              onClick={handleSafeExit}
              title="Instantly exit to Wikipedia if you are in a non-private space"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Quick Safe Exit</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Advisory Banner */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200/60 dark:border-amber-900/40 px-6 py-2.5 flex items-center gap-2 text-xs text-amber-800 dark:text-amber-200">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>
            <strong>Safety Note:</strong> If browsing on a company-owned device or network, IT monitors browser URLs. Switch to a personal phone or private network when reviewing legal advice.
          </span>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {SAFETY_RESOURCES.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                {section.category}
              </h3>

              <div className="grid gap-3 sm:grid-cols-1">
                {section.items.map((item, itemIdx) => {
                  const uniqueId = `item-${idx}-${itemIdx}`;
                  return (
                    <div
                      key={itemIdx}
                      className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-purple-300 dark:hover:border-purple-700 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                            {item.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-deepViolet hover:bg-purple-700 text-white transition-all shadow-sm"
                          >
                            <span>{item.actionText}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <button
                            onClick={() => copyToClipboard(item.description, uniqueId)}
                            className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
                          >
                            {copiedText === uniqueId ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#7A5CF0]" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <span>Copy Protocol</span>
                            )}
                          </button>
                        )}
                      </div>

                      {item.contact && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center gap-2 text-xs font-mono text-purple-700 dark:text-purple-300">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{item.contact}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex justify-between items-center text-xs text-slate-500">
          <span>GraceNet is dedicated to safe, equitable workplaces.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-medium bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
