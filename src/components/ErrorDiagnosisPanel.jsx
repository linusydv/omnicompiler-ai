import React from 'react';
import { AlertTriangle, AlertCircle, Sparkles, LineChart } from 'lucide-react';

export function ErrorDiagnosisPanel({ lineError, sourceCode }) {
  if (!lineError) {
    return (
      <div className="p-6 bg-slate-900/60 rounded-xl border border-slate-800 text-center text-slate-400 space-y-2">
        <Sparkles className="w-8 h-8 mx-auto text-emerald-400 opacity-60" />
        <h3 className="text-base font-semibold text-slate-200">No Line Errors Detected</h3>
        <p className="text-xs text-slate-400">
          Your source code compiled cleanly without any syntax or runtime exceptions!
        </p>
      </div>
    );
  }

  const lines = sourceCode.split('\n');
  const errorLineContent = lines[lineError.lineNumber - 1] || '';

  return (
    <div className="bg-slate-900/90 rounded-xl border border-rose-900/50 shadow-xl overflow-hidden">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-slate-900 px-5 py-3 border-b border-rose-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-400">
            <AlertTriangle className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-rose-200">
              Error Pinpointed on Line {lineError.lineNumber}
            </h2>
            <p className="text-xs text-rose-300/80">
              Classification: <strong className="text-rose-100">{lineError.errorType}</strong>
            </p>
          </div>
        </div>

        <span className="px-3 py-1 text-xs font-bold rounded-full bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/30">
          LINE {lineError.lineNumber}
        </span>
      </div>

      {/* Body Content */}
      <div className="p-5 space-y-4">
        
        {/* Error Line Code Snippet Highlight */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Error Location Code Snippet:
          </label>
          <div className="flex items-center rounded-lg bg-slate-950 border border-rose-800/80 overflow-hidden font-mono text-xs">
            <div className="bg-rose-950/80 text-rose-300 px-3 py-2 border-r border-rose-800/60 font-bold">
              Line {lineError.lineNumber}
            </div>
            <div className="p-2.5 text-rose-200 font-semibold overflow-x-auto flex-1 bg-rose-950/20">
              <code>{errorLineContent || lineError.message}</code>
            </div>
          </div>
        </div>

        {/* Detailed Explanation Card */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <AlertCircle className="w-4 h-4" />
            <span>Root Cause Breakdown:</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-300">
            {lineError.explanation}
          </p>
        </div>

      </div>

    </div>
  );
}
