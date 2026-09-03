import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  HelpCircle, 
  CheckSquare, 
  Code2, 
  Lightbulb 
} from 'lucide-react';

export function AiAssistantChat({ sourceCode, lineError, topics }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your AI Compiler & Refactoring Assistant. Ask me anything about your code, request unit tests, or get interview explanation tips!'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');

  const quickPrompts = [
    "Explain this error in simple terms",
    "Generate Unit Tests for this code",
    "How do I prevent this bug in production?",
    "Give interview tips for these topics"
  ];

  const handleSend = (queryText) => {
    const prompt = queryText || inputQuery;
    if (!prompt.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: prompt };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    // Generate intelligent AI response
    setTimeout(() => {
      let aiResponseText = `Here is my detailed analysis for "${prompt}":\n\n`;
      const qLower = prompt.toLowerCase();

      if (qLower.includes('explain') || qLower.includes('error')) {
        aiResponseText += lineError 
          ? `The error at Line ${lineError.lineNumber} occurs because: ${lineError.explanation}. To avoid this, always check boundaries and validate variable initialization prior to dereferencing or indexing.`
          : `Your code does not contain syntax errors. It uses ${topics?.map(t => t.name).join(', ') || 'standard procedural logic'}.`;
      } else if (qLower.includes('unit test') || qLower.includes('test')) {
        aiResponseText += `Here is a suggested Unit Test suite for your code:\n\`\`\`javascript\ndescribe('Code Execution Suite', () => {\n  test('should execute cleanly with valid inputs', () => {\n    // Test standard cases\n  });\n  test('should handle edge cases safely', () => {\n    // Test boundary conditions\n  });\n});\n\`\`\``;
      } else if (qLower.includes('prevent') || qLower.includes('production')) {
        aiResponseText += `Top 3 production best practices:\n1. Enable strict static type checking (TypeScript / mypy / C++ compiler warnings).\n2. Write automated boundary unit tests for 0, negative, and out-of-bounds values.\n3. Add defensive null guards and input sanitization before processing.`;
      } else {
        aiResponseText += `Regarding your question: When writing code with ${topics?.[0]?.name || 'these concepts'}, always focus on time complexity and space trade-offs. Check out the Alternate Solution tab for an optimized version!`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponseText }]);
    }, 600);
  };

  return (
    <div className="bg-slate-900/90 rounded-xl border border-indigo-900/50 shadow-xl overflow-hidden flex flex-col h-[400px]">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 px-5 py-3 border-b border-indigo-800/60 flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-indigo-200">
            AI Compiler & Refactoring Assistant
          </h2>
          <p className="text-xs text-indigo-300/80">
            Ask follow-up questions, request unit tests, or refactoring advice
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/60 text-xs">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              msg.sender === 'user'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-indigo-600 text-white'
            }`}>
              {msg.sender === 'user' ? 'U' : <Bot className="w-4 h-4" />}
            </div>

            <div className={`p-3 rounded-xl max-w-[80%] leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-cyan-600/20 border border-cyan-500/30 text-cyan-100 rounded-tr-none'
                : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
            }`}>
              <pre className="whitespace-pre-wrap font-sans text-xs">{msg.text}</pre>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 bg-slate-950 border-t border-slate-900 flex items-center gap-2 overflow-x-auto text-[11px]">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 whitespace-nowrap transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask AI anything about your code..."
          className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500/50"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-md shadow-indigo-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
