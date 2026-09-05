import React, { useState } from 'react';
import { 
  Terminal as TerminalIcon, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Cpu, 
  Play, 
  Sliders,
  Copy,
  Check
} from 'lucide-react';

export function TerminalOutput({ 
  result, 
  testInput, 
  setTestInput, 
  onRunTest 
}) {
  const [activeTab, setActiveTab] = useState('output'); // 'output' | 'input'
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = result ? (result.stderr || result.stdout) : '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl border border-slate-800 shadow-xl overflow-hidden font-mono text-xs">
      
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-slate-300">Console & Terminal Output</span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('output')}
            className={`px-3 py-1 rounded text-xs font-medium transition ${
              activeTab === 'output'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Terminal Logs
          </button>
          <button
            onClick={() => setActiveTab('input')}
            className={`px-3 py-1 rounded text-xs font-medium transition flex items-center gap-1 ${
              activeTab === 'input'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3 h-3" />
            <span>Test Inputs</span>
          </button>

          <button
            onClick={handleCopy}
            title="Copy console output"
            className="p-1 ml-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Terminal Content Body */}
      <div className="flex-1 p-4 overflow-y-auto min-h-[160px] max-h-[260px] bg-slate-950 text-slate-300">
        
        {activeTab === 'output' ? (
          result ? (
            <div className="space-y-3 font-mono">
              
              {/* Stderr Error Log */}
              {result.stderr && (
                <div className="p-3 rounded bg-rose-950/40 border border-rose-900/60 text-rose-300 leading-relaxed font-mono">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-1 flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> Standard Error (stderr)
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-xs">{result.stderr}</pre>
                </div>
              )}

              {/* Stdout Log */}
              {result.stdout && (
                <div className="p-3 rounded bg-slate-900/80 border border-slate-800 text-slate-200 leading-relaxed font-mono">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1">
                    <TerminalIcon className="w-3 h-3" /> Standard Output (stdout)
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-xs text-emerald-400">{result.stdout}</pre>
                </div>
              )}

              {/* Execution Performance Metrics */}
              <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-900 text-slate-400 text-[11px]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" /> Runtime: <strong className="text-slate-200">{result.executionTimeMs} ms</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-indigo-400" /> Memory: <strong className="text-slate-200">{result.memoryKB} KB</strong>
                </span>
                <span>
                  Exit Status: <strong className={result.exitCode === 0 ? 'text-emerald-400' : 'text-rose-400'}>{result.exitCode}</strong>
                </span>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2 py-8">
              <TerminalIcon className="w-8 h-8 opacity-40 text-slate-400" />
              <p>Ready to compile. Click "Compile & Solve Bug" to see stdout/stderr logs.</p>
            </div>
          )
        ) : (
          /* Custom Test Inputs Tab */
          <div className="space-y-3">
            <label className="block text-xs font-medium text-slate-300">
              Custom Execution Test Parameters (Stdin / Variables):
            </label>
            <textarea
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="e.g. nums = [2, 7, 11, 15], target = 9"
              className="w-full h-24 p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500/50"
            />
            <button
              onClick={onRunTest}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run with Test Parameters</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
