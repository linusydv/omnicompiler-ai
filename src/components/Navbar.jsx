import React from 'react';
import { 
  Terminal, 
  Play, 
  Sparkles, 
  BookOpen, 
  Download, 
  RotateCcw, 
  Code2,
  Bug,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export function Navbar({
  selectedLang,
  setSelectedLang,
  onRunCompile,
  isCompiling,
  onOpenPresetModal,
  onOpenExportModal,
  onResetCode,
  analysisResult
}) {
  const languages = [
    { id: 'python', name: 'Python 3', icon: '🐍' },
    { id: 'javascript', name: 'JavaScript (Node)', icon: '⚡' },
    { id: 'cpp', name: 'C++ 20', icon: '⚙️' },
    { id: 'java', name: 'Java 17', icon: '☕' },
    { id: 'sql', name: 'SQL Query', icon: '🗄️' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 shrink-0">
              <Terminal className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-xl font-bold font-heading bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                  OmniCompiler AI
                </h1>
                <span className="px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> v2.5
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 hidden xs:block">
                Smart Compiler & Error Solver
              </p>
            </div>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none w-full md:w-auto justify-between sm:justify-end">
          
          {/* Language Selector */}
          <div className="relative shrink-0">
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="bg-slate-900 border border-slate-700/80 text-slate-200 text-xs sm:text-sm font-medium rounded-lg px-2.5 sm:px-3 py-2 pr-7 hover:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.icon} {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Preset Bug Library Launcher */}
          <button
            onClick={onOpenPresetModal}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 transition shrink-0"
          >
            <Bug className="w-4 h-4 text-amber-400" />
            <span className="hidden xs:inline">Presets</span>
            <span className="xs:hidden">Presets</span>
          </button>

          {/* Reset Code Button */}
          <button
            onClick={onResetCode}
            title="Reset to blank template"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/80 transition shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Export Report Button */}
          <button
            onClick={onOpenExportModal}
            title="Export Report"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 transition shrink-0"
          >
            <Download className="w-4 h-4" />
            <span className="hidden md:inline">Export</span>
          </button>

          {/* Main Compile & Solve Button */}
          <button
            onClick={onRunCompile}
            disabled={isCompiling}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 rounded-lg font-semibold text-xs sm:text-sm shadow-lg transition transform active:scale-95 shrink-0 ${
              isCompiling
                ? 'bg-cyan-600/50 text-cyan-200 cursor-wait'
                : 'bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-cyan-500/25'
            }`}
          >
            {isCompiling ? (
              <>
                <Zap className="w-4 h-4 animate-spin" />
                <span>Compiling...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Compile & Solve</span>
              </>
            )}
          </button>

        </div>

      </div>

      {/* Compiler Status Bar Banner */}
      {analysisResult && (
        <div className="max-w-7xl mx-auto mt-2.5 pt-2 border-t border-slate-800/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {analysisResult.success ? (
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> Code Compiled Cleanly
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-rose-400 font-medium bg-rose-500/10 px-2.5 py-0.5 rounded border border-rose-500/20">
                <AlertTriangle className="w-3.5 h-3.5" /> Line {analysisResult.lineError?.lineNumber}: {analysisResult.lineError?.errorType}
              </span>
            )}
            <span className="text-slate-400 hidden sm:inline">
              | Time: <strong className="text-slate-200">{analysisResult.executionTimeMs}ms</strong>
            </span>
            <span className="text-slate-400 hidden sm:inline">
              | Memory: <strong className="text-slate-200">{analysisResult.memoryKB} KB</strong>
            </span>
          </div>

          <div className="text-slate-400 flex items-center gap-2">
            <span>Topics Detected: <strong className="text-cyan-300">{analysisResult.topics?.length || 0}</strong></span>
          </div>
        </div>
      )}
    </header>
  );
}
