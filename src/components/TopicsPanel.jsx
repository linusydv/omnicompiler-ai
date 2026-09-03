import React from 'react';
import { BookOpen, Tag, Sparkles, Code, CheckCircle } from 'lucide-react';

export function TopicsPanel({ topics }) {
  if (!topics || topics.length === 0) {
    return (
      <div className="p-6 bg-slate-900/60 rounded-xl border border-slate-800 text-center text-slate-400">
        <p>No topics extracted yet. Compile some code to see concept analysis.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 rounded-xl border border-cyan-900/50 shadow-xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-950 via-blue-950 to-slate-900 px-5 py-3 border-b border-cyan-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-cyan-200">
              Programming Topics & Concepts Covered
            </h2>
            <p className="text-xs text-cyan-300/80">
              Key algorithms, data structures & paradigms identified in code
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          {topics.length} Topics Detected
        </span>
      </div>

      {/* Topics Grid */}
      <div className="p-5 space-y-4">
        
        {/* Topic Tag Badges */}
        <div className="flex flex-wrap gap-2">
          {topics.map((t, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm"
            >
              <Tag className="w-3 h-3 text-cyan-400" />
              <span>{t.name}</span>
            </span>
          ))}
        </div>

        {/* Detailed Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  {topic.name}
                </h3>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  {topic.category}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {topic.explanation}
              </p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
