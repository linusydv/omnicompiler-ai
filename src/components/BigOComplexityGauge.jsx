import React from 'react';
import { Gauge, Clock, HardDrive, ArrowRight, Zap } from 'lucide-react';

export function BigOComplexityGauge({ complexity }) {
  if (!complexity) return null;

  const getComplexityColor = (comp) => {
    if (comp === 'O(1)') return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (comp === 'O(log N)') return 'text-teal-400 border-teal-500/40 bg-teal-500/10';
    if (comp === 'O(N)') return 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10';
    if (comp === 'O(N log N)') return 'text-indigo-400 border-indigo-500/40 bg-indigo-500/10';
    if (comp === 'O(N²)') return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  return (
    <div className="bg-slate-900/90 rounded-xl border border-blue-900/50 shadow-xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 px-5 py-3 border-b border-blue-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-blue-200">
              Big-O Time & Space Complexity Analyzer
            </h2>
            <p className="text-xs text-blue-300/80">
              Theoretical upper bound performance scaling
            </p>
          </div>
        </div>
      </div>

      {/* Gauges Grid */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Time Complexity Card */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" /> Time Complexity
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-mono">CPU Execution</span>
          </div>

          <div className="flex items-center justify-around py-2">
            <div className="text-center space-y-1">
              <span className="text-[11px] text-slate-400 block">Original Code</span>
              <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold font-mono border ${getComplexityColor(complexity.buggyTime)}`}>
                {complexity.buggyTime}
              </span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-600" />

            <div className="text-center space-y-1">
              <span className="text-[11px] text-slate-400 block">Fixed Code</span>
              <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold font-mono border ${getComplexityColor(complexity.fixedTime)}`}>
                {complexity.fixedTime}
              </span>
            </div>
          </div>
        </div>

        {/* Space Complexity Card */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-purple-400" /> Space Complexity
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-mono">RAM Memory</span>
          </div>

          <div className="flex items-center justify-around py-2">
            <div className="text-center space-y-1">
              <span className="text-[11px] text-slate-400 block">Original Code</span>
              <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold font-mono border ${getComplexityColor(complexity.buggySpace)}`}>
                {complexity.buggySpace}
              </span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-600" />

            <div className="text-center space-y-1">
              <span className="text-[11px] text-slate-400 block">Fixed Code</span>
              <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold font-mono border ${getComplexityColor(complexity.fixedSpace)}`}>
                {complexity.fixedSpace}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
