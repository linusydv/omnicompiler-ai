import React, { useState } from 'react';
import { 
  CheckCircle2, 
  GitCompare, 
  Wand2, 
  Copy, 
  Check, 
  ArrowRight,
  Code2
} from 'lucide-react';

export function SolutionComparison({ 
  fixedCode, 
  fixExplanation, 
  diff, 
  onApplyFix 
}) {
  const [activeView, setActiveView] = useState('fixed'); // 'fixed' | 'diff'
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(fixedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 rounded-xl border border-emerald-900/50 shadow-xl overflow-hidden">
      
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 p-3 sm:px-5 sm:py-3 border-b border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-emerald-200">
              Right Solution & Fix
            </h2>
            <p className="text-[11px] sm:text-xs text-emerald-300/80">
              Corrected Code Implementation
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex items-center text-xs">
            <button
              onClick={() => setActiveView('fixed')}
              className={`px-2.5 py-1 rounded font-medium transition text-[11px] sm:text-xs ${
                activeView === 'fixed'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Fixed Code
            </button>
            <button
              onClick={() => setActiveView('diff')}
              className={`px-2.5 py-1 rounded font-medium transition flex items-center gap-1 text-[11px] sm:text-xs ${
                activeView === 'diff'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GitCompare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Diff</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {onApplyFix && (
            <button
              onClick={onApplyFix}
              className="px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-md shadow-emerald-500/20 transition flex items-center gap-1"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Apply Fix</span>
            </button>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 space-y-4">
        
        {/* Fix Explanation Card */}
        {fixExplanation && (
          <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200 leading-relaxed flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-300 font-semibold block mb-0.5">Summary of Changes:</strong>
              {fixExplanation}
            </div>
          </div>
        )}

        {/* View mode 1: Clean Fixed Code */}
        {activeView === 'fixed' ? (
          <div className="rounded-lg bg-slate-950 border border-slate-800 p-4 font-mono text-xs overflow-x-auto text-emerald-300 leading-relaxed max-h-[320px]">
            <pre>{fixedCode}</pre>
          </div>
        ) : (
          /* View mode 2: Interactive Line Diff Viewer */
          <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 font-mono text-xs overflow-x-auto leading-relaxed max-h-[320px] space-y-0.5">
            {diff && diff.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center px-2 py-0.5 rounded text-xs ${
                  item.type === 'added'
                    ? 'bg-emerald-500/20 text-emerald-300 border-l-2 border-emerald-500 font-semibold'
                    : item.type === 'removed'
                    ? 'bg-rose-500/20 text-rose-300 border-l-2 border-rose-500 line-through opacity-80'
                    : 'text-slate-400'
                }`}
              >
                <span className="w-8 text-slate-600 text-right pr-3 select-none">{item.lineNum}</span>
                <span className="w-4 select-none font-bold">
                  {item.type === 'added' ? '+' : item.type === 'removed' ? '-' : ' '}
                </span>
                <span className="whitespace-pre">{item.content}</span>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
