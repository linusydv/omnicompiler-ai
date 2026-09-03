import React, { useState, useRef, useEffect } from 'react';
import { 
  Copy, 
  Check, 
  Trash2, 
  Sparkles, 
  Code, 
  AlertCircle,
  FileCode2
} from 'lucide-react';

export function CodeEditor({ 
  code, 
  setCode, 
  language, 
  errorLine, 
  onFormatCode 
}) {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  const lines = code.split('\n');
  const lineCount = lines.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e) => {
    // Handle Tab key indenting
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 rounded-xl border border-slate-800 shadow-xl overflow-hidden">
      
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FileCode2 className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Source Code ({language})
          </span>
          {errorLine && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 animate-pulse">
              <AlertCircle className="w-3 h-3" /> Error on Line {errorLine}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onFormatCode}
            title="Auto format code"
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Format</span>
          </button>
          
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={() => setCode('')}
            title="Clear editor"
            className="p-1 rounded bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-700/60 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editor Body with Gutter & Textarea */}
      <div className="relative flex-1 flex overflow-hidden font-mono text-sm">
        
        {/* Line Numbers Gutter */}
        <div className="w-10 sm:w-12 bg-slate-950/60 select-none py-3 border-r border-slate-800/60 text-right pr-2 sm:pr-3 text-slate-600 font-mono text-[11px] sm:text-xs flex flex-col gap-0.5 shrink-0">
          {lines.map((_, idx) => {
            const lineNum = idx + 1;
            const isError = lineNum === errorLine;
            return (
              <div
                key={idx}
                className={`h-5 leading-5 ${
                  isError
                    ? 'text-rose-400 font-bold bg-rose-500/20 border-l-2 border-rose-500 px-1 -mr-2 sm:-mr-3 rounded-l'
                    : 'hover:text-slate-400'
                }`}
              >
                {lineNum}
              </div>
            );
          })}
        </div>

        {/* Interactive Text Input Area */}
        <div className="relative flex-1 h-full overflow-x-auto">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="// Type or paste your errored code here..."
            spellCheck="false"
            className="w-full h-full p-2.5 sm:p-3 bg-transparent text-slate-100 placeholder-slate-600 font-mono text-xs sm:text-sm leading-5 resize-none focus:outline-none focus:ring-0 selection:bg-cyan-500/30 whitespace-pre tab-4 min-h-[260px] sm:min-h-[380px]"
          />

          {/* Background Line Error Highlight Overlay */}
          {errorLine && errorLine <= lineCount && (
            <div
              className="absolute left-0 right-0 pointer-events-none bg-rose-500/10 border-l-4 border-rose-500 transition-all duration-300"
              style={{
                top: `${(errorLine - 1) * 20 + 10}px`,
                height: '20px'
              }}
            />
          )}
        </div>

      </div>

      {/* Footer Info Strip */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-950/90 border-t border-slate-800 text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span>Lines: <strong className="text-slate-200">{lineCount}</strong></span>
          <span>Chars: <strong className="text-slate-200">{code.length}</strong></span>
        </div>
        <div>
          <span>Tab: <strong>4 spaces</strong></span>
        </div>
      </div>

    </div>
  );
}
