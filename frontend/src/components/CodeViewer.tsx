import React, { useState } from 'react';
import { Copy, Check, Code } from 'lucide-react';

interface CodeViewerProps {
  code: string;
}

/**
 * Component to display generated Java source code with syntax formatting and copy utility.
 */
export const CodeViewer: React.FC<CodeViewerProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
        <div className="flex items-center space-x-2">
          <Code className="w-5 h-5 text-indigo-400" />
          <span className="font-medium text-slate-200">Generated Blueprint Output</span>
        </div>
        {code && (
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-md transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        )}
      </div>

      <div className="p-6 flex-1 bg-slate-950 font-mono text-sm text-slate-300 overflow-auto max-h-[500px]">
        {code ? (
          <pre className="whitespace-pre-wrap">{code}</pre>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2 py-12">
            <Code className="w-12 h-12 stroke-1" />
            <p>Configure your specifications and click generate to view source output.</p>
          </div>
        )}
      </div>
    </div>
  );
};