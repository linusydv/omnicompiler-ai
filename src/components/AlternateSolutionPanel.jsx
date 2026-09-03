import React, { useState } from 'react';
import { 
  GitFork, 
  Check, 
  Copy, 
  Zap, 
  ShieldCheck, 
  AlertCircle,
  BarChart2
} from 'lucide-react';

export function AlternateSolutionPanel({ alternateSolution, onApplyAlternate }) {
  const [copied, setCopied] = useState(false);

  if (!alternateSolution) {
    return (
      <div className="p-6 bg-slate-900/60 rounded-xl border border-slate-800 text-center text-slate-400">
        <p>No alternate solution available for this snippet.</p>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(alternateSolution.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 rounded-xl border border-indigo-900/50 shadow-xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 p-3 sm:px-5 sm:py-3 border-b border-indigo-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 shrink-0">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-indigo-200">
              Alternate Solution & Trade-offs
            </h2>
            <p className="text-[11px] sm:text-xs text-indigo-300/80">
              {alternateSolution.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleCopy}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          
          {onApplyAlternate && (
            <button
              onClick={() => onApplyAlternate(alternateSolution.code)}
              className="px-3 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1 shadow-md shadow-indigo-500/20"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Use Alternate</span>
            </button>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 space-y-4">
        
        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
          {alternateSolution.description}
        </p>

        {/* Complexity Badges */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
            <span className="text-slate-400">Time Complexity:</span>
            <strong className="text-cyan-400 font-mono">{alternateSolution.timeComplexity}</strong>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
            <span className="text-slate-400">Space Complexity:</span>
            <strong className="text-purple-400 font-mono">{alternateSolution.spaceComplexity}</strong>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="rounded-lg bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-indigo-300 leading-relaxed overflow-x-auto max-h-[260px]">
          <pre>{alternateSolution.code}</pre>
        </div>

        {/* Pros and Cons Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          
          {/* Pros */}
          <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Advantages & Pros:</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-300">
              {alternateSolution.pros?.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-900/40 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
              <AlertCircle className="w-4 h-4" />
              <span>Trade-offs & Considerations:</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-300">
              {alternateSolution.cons?.map((con, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
