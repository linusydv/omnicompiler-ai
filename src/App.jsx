import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  GitFork, 
  Gauge, 
  Activity, 
  Bot, 
  Sparkles,
  Zap,
  Code2,
  Terminal as TerminalIcon
} from 'lucide-react';

import { Navbar } from './components/Navbar';
import { CodeEditor } from './components/CodeEditor';
import { TerminalOutput } from './components/TerminalOutput';
import { ErrorDiagnosisPanel } from './components/ErrorDiagnosisPanel';
import { SolutionComparison } from './components/SolutionComparison';
import { TopicsPanel } from './components/TopicsPanel';
import { AlternateSolutionPanel } from './components/AlternateSolutionPanel';
import { BigOComplexityGauge } from './components/BigOComplexityGauge';
import { ExecutionFlowWalkthrough } from './components/ExecutionFlowWalkthrough';
import { AiAssistantChat } from './components/AiAssistantChat';
import { PresetLibraryModal } from './components/PresetLibraryModal';
import { ReportExportModal } from './components/ReportExportModal';

import { analyzeAndCompileCode } from './utils/compilerEngine';
import { PRESET_CODES } from './data/presetCodes';

export default function App() {
  const [selectedLang, setSelectedLang] = useState('python');
  const [code, setCode] = useState(PRESET_CODES[0].buggyCode);
  const [testInput, setTestInput] = useState('nums = [2, 7, 11, 15], target = 9');
  const [isCompiling, setIsCompiling] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  
  // Right side active tab
  const [activeTab, setActiveTab] = useState('error'); // 'error' | 'solution' | 'topics' | 'alternate' | 'complexity' | 'debugger' | 'ai'

  // Modals
  const [presetModalOpen, setPresetModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Initial compile on load
  useEffect(() => {
    handleRunCompile();
  }, []);

  // Update default code template when language changes
  const handleLanguageChange = (newLang) => {
    setSelectedLang(newLang);
    const matchingPreset = PRESET_CODES.find(p => p.language.toLowerCase() === newLang.toLowerCase());
    if (matchingPreset) {
      setCode(matchingPreset.buggyCode);
    } else {
      setCode(`// Type or paste your ${newLang} code here\n`);
    }
  };

  const handleRunCompile = () => {
    setIsCompiling(true);
    setTimeout(() => {
      const res = analyzeAndCompileCode(code, selectedLang, testInput);
      setAnalysisResult(res);
      setIsCompiling(false);

      if (res.success) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
        setActiveTab('solution');
      } else {
        setActiveTab('error');
      }
    }, 400);
  };

  const handleApplyFix = () => {
    if (analysisResult && analysisResult.fixedCode) {
      setCode(analysisResult.fixedCode);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.7 }
      });
      // Re-run compilation on fixed code
      setTimeout(() => {
        const updatedRes = analyzeAndCompileCode(analysisResult.fixedCode, selectedLang, testInput);
        setAnalysisResult(updatedRes);
      }, 200);
    }
  };

  const handleSelectPreset = (preset) => {
    setSelectedLang(preset.language);
    setCode(preset.buggyCode);
    setTimeout(() => {
      const res = analyzeAndCompileCode(preset.buggyCode, preset.language, testInput);
      setAnalysisResult(res);
      setActiveTab('error');
    }, 100);
  };

  const handleFormatCode = () => {
    const formatted = code
      .split('\n')
      .map(line => line.trimEnd())
      .join('\n');
    setCode(formatted);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-cyan-500 selection:text-black font-sans">
      
      {/* Top Navbar */}
      <Navbar
        selectedLang={selectedLang}
        setSelectedLang={handleLanguageChange}
        onRunCompile={handleRunCompile}
        isCompiling={isCompiling}
        onOpenPresetModal={() => setPresetModalOpen(true)}
        onOpenExportModal={() => setExportModalOpen(true)}
        onResetCode={() => setCode('')}
        analysisResult={analysisResult}
      />

      {/* Main Workspace Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Code Editor & Terminal (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          
          {/* Code Editor */}
          <div className="flex-1 min-h-[420px]">
            <CodeEditor
              code={code}
              setCode={setCode}
              language={selectedLang}
              errorLine={analysisResult?.lineError?.lineNumber}
              onFormatCode={handleFormatCode}
            />
          </div>

          {/* Terminal Console Output */}
          <TerminalOutput
            result={analysisResult}
            testInput={testInput}
            setTestInput={setTestInput}
            onRunTest={handleRunCompile}
          />

        </div>

        {/* Right Column: Intelligent Analysis, Solutions & Enhancements (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          
          {/* Tabs Navigation Header */}
          <div className="bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 flex items-center gap-1 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab('error')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'error'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Line Error</span>
            </button>

            <button
              onClick={() => setActiveTab('solution')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'solution'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Right Solution</span>
            </button>

            <button
              onClick={() => setActiveTab('topics')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'topics'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Topics</span>
            </button>

            <button
              onClick={() => setActiveTab('alternate')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'alternate'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Alternate Fix</span>
            </button>

            <button
              onClick={() => setActiveTab('complexity')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'complexity'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>Big-O Gauge</span>
            </button>

            <button
              onClick={() => setActiveTab('debugger')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'debugger'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Debugger</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'ai'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Chat</span>
            </button>
          </div>

          {/* Active Tab View Body */}
          <div className="flex-1">
            {activeTab === 'error' && (
              <ErrorDiagnosisPanel
                lineError={analysisResult?.lineError}
                sourceCode={code}
              />
            )}

            {activeTab === 'solution' && (
              <SolutionComparison
                fixedCode={analysisResult?.fixedCode}
                fixExplanation={analysisResult?.fixExplanation}
                diff={analysisResult?.diff}
                onApplyFix={handleApplyFix}
              />
            )}

            {activeTab === 'topics' && (
              <TopicsPanel topics={analysisResult?.topics} />
            )}

            {activeTab === 'alternate' && (
              <AlternateSolutionPanel
                alternateSolution={analysisResult?.alternateSolution}
                onApplyAlternate={(altCode) => setCode(altCode)}
              />
            )}

            {activeTab === 'complexity' && (
              <BigOComplexityGauge complexity={analysisResult?.complexity} />
            )}

            {activeTab === 'debugger' && (
              <ExecutionFlowWalkthrough steps={analysisResult?.executionSteps} />
            )}

            {activeTab === 'ai' && (
              <AiAssistantChat
                sourceCode={code}
                lineError={analysisResult?.lineError}
                topics={analysisResult?.topics}
              />
            )}
          </div>

        </div>

      </main>

      {/* Preset Bug Library Modal */}
      <PresetLibraryModal
        isOpen={presetModalOpen}
        onClose={() => setPresetModalOpen(false)}
        onSelectPreset={handleSelectPreset}
      />

      {/* Report Export Modal */}
      <ReportExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        result={analysisResult}
        sourceCode={code}
        language={selectedLang}
      />

      {/* Footer */}
      <footer className="py-4 border-t border-slate-900 bg-slate-950 text-center text-xs text-slate-500">
        <p>
          OmniCompiler AI Platform — Real-Time Bug Solver & Educational Code Diagnostics
        </p>
      </footer>

    </div>
  );
}
