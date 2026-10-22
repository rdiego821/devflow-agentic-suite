import { useState } from 'react';
import { CodeGeneratorForm } from './components/CodeGeneratorForm';
import { CodeViewer } from './components/CodeViewer';
import { CodeSpecification } from './types';
import { Terminal } from 'lucide-react';

export function App() {
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (spec: CodeSpecification) => {
    setIsLoading(true);
    setError(null);
    try {
      // Connects to Spring Boot backend running locally on port 8080
      const response = await fetch('http://localhost:8080/api/engine/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(spec),
      });

      if (!response.ok) {
        throw new Error('Failed to generate code from backend engine.');
      }

      const resultText = await response.text();
      setGeneratedCode(resultText);
    } catch (err: any) {
      setError(err.message || 'An error occurred while communicating with the backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Terminal className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wide text-slate-100">DevFlow Agentic Suite</h1>
            <p className="text-xs text-slate-400">Full-Stack SDLC Automation & Code Generator</p>
          </div>
        </div>
        <div className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-800/50 px-3 py-1 rounded-full font-medium">
          Spring Boot 3.3 + Python MCP + React
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {error && (
          <div className="lg:col-span-2 bg-red-950/50 border border-red-800 text-red-200 px-4 py-3 rounded-lg text-sm">
            {error} Ensure your Spring Boot backend is running on http://localhost:8080.
          </div>
        )}
        <CodeGeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
        <CodeViewer code={generatedCode} />
      </main>
    </div>
  );
}

export default App;