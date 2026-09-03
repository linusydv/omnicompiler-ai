import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Activity,
  Layers
} from 'lucide-react';

export function ExecutionFlowWalkthrough({ steps }) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  if (!steps || steps.length === 0) return null;

  const currentStep = steps[currentStepIdx] || steps[0];

  return (
    <div className="bg-slate-900/90 rounded-xl border border-teal-900/50 shadow-xl overflow-hidden">
      
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 p-3 sm:px-5 sm:py-3 border-b border-teal-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-500/20 border border-teal-500/30 text-teal-400 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-teal-200">
              Interactive Execution Flow & Debugger
            </h2>
            <p className="text-[11px] sm:text-xs text-teal-300/80">
              Step-by-step line evaluation & stack state
            </p>
          </div>
        </div>

        {/* Step Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setCurrentStepIdx(0)}
            title="Reset to step 1"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))}
            disabled={currentStepIdx === 0}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white transition shadow-md shadow-teal-500/20"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>

          <button
            onClick={() => setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStepIdx === steps.length - 1}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="text-[11px] sm:text-xs font-mono font-semibold text-teal-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
            {currentStepIdx + 1}/{steps.length}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 space-y-4">
        
        {/* Step Explanation Card */}
        <div className="p-3.5 rounded-lg bg-slate-950 border border-teal-800/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-teal-300">
            <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">
              Line {currentStep.line}
            </span>
            <span>{currentStep.text}</span>
          </div>
        </div>

        {/* Live Variable Inspector Table */}
        {currentStep.variables && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live Stack Variables:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 font-mono text-xs">
              {Object.entries(currentStep.variables).map(([key, val], idx) => (
                <div
                  key={idx}
                  className="p-2 rounded bg-slate-950 border border-slate-800 flex flex-col justify-between"
                >
                  <span className="text-[10px] text-slate-400 truncate">{key}</span>
                  <span className="text-cyan-300 font-bold truncate">
                    {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
