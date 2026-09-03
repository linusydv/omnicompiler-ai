import React, { useState } from 'react';
import { X, Download, FileText, Copy, Check, Sparkles, FileCode } from 'lucide-react';

export function ReportExportModal({ isOpen, onClose, result, sourceCode, language }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !result) return null;

  const markdownReport = `# OmniCompiler AI - Diagnostic Report
Generated: ${new Date().toLocaleString()}
Language: ${language}
Execution Status: ${result.status}

## 1. Source Code (Input)
\`\`\`${language}
${sourceCode}
\`\`\`

## 2. Line Error Diagnosis
${result.lineError ? `
- **Error Line**: Line ${result.lineError.lineNumber}
- **Error Type**: ${result.lineError.errorType}
- **Message**: ${result.lineError.message}
- **Root Cause**: ${result.lineError.explanation}
` : 'No errors detected in source code.'}

## 3. Right Solution (Fixed Code)
\`\`\`${language}
${result.fixedCode}
\`\`\`

**Fix Summary**: ${result.fixExplanation}

## 4. Topics Covered
${result.topics?.map(t => `- **${t.name}** (${t.category}): ${t.explanation}`).join('\n')}

## 5. Alternate Solution
**${result.alternateSolution?.title}**
- Time Complexity: ${result.alternateSolution?.timeComplexity}
- Space Complexity: ${result.alternateSolution?.spaceComplexity}

\`\`\`${language}
${result.alternateSolution?.code}
\`\`\`
`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = (format) => {
    const content = format === 'json' ? JSON.stringify(result, null, 2) : markdownReport;
    const filename = `compiler-report-${Date.now()}.${format === 'json' ? 'json' : 'md'}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] sm:max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 sm:p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-100">
                Export Diagnostic Report
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Download markdown or JSON summary for documentation
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

        {/* Content Preview */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 font-mono text-xs text-slate-300 bg-slate-950/80">
          <pre className="whitespace-pre-wrap">{markdownReport}</pre>
        </div>

        {/* Footer Actions */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Markdown' : 'Copy Markdown'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDownloadFile('json')}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
            >
              <FileCode className="w-4 h-4 text-cyan-400" />
              <span>Download JSON</span>
            </button>
            <button
              onClick={() => handleDownloadFile('md')}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1.5 shadow-md shadow-indigo-500/20"
            >
              <FileText className="w-4 h-4" />
              <span>Download Markdown (.md)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
