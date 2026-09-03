import React, { useState } from 'react';
import { X, Bug, ArrowRight, Code2, AlertTriangle, Sparkles } from 'lucide-react';
import { PRESET_CODES } from '../data/presetCodes';

export function PresetLibraryModal({ isOpen, onClose, onSelectPreset }) {
  const [activeFilter, setActiveFilter] = useState('all');

  if (!isOpen) return null;

  const filteredPresets = activeFilter === 'all' 
    ? PRESET_CODES 
    : PRESET_CODES.filter(p => p.language.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 sm:p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
              <Bug className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-100">
                Preset Bug Library
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Select any code sample to test line error pinpointing & solution features
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 sm:px-6 sm:py-3 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
          {['all', 'python', 'javascript', 'cpp', 'java', 'sql'].map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveFilter(lang)}
              className={`px-3 py-1 rounded-full font-semibold uppercase tracking-wider transition ${
                activeFilter === lang
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Grid List */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {filteredPresets.map((preset) => (
            <div
              key={preset.id}
              onClick={() => {
                onSelectPreset(preset);
                onClose();
              }}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition cursor-pointer group flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition">
                    {preset.name}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-400 uppercase">
                    {preset.difficulty}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-rose-400">
                  <AlertTriangle className="w-3.5 h-3.5" /> Line {preset.lineError.lineNumber}: {preset.lineError.errorType}
                </span>
                <span className="group-hover:translate-x-1 transition text-cyan-400 flex items-center gap-1 font-semibold">
                  Load Code <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
