import React, { useState } from 'react';
import { CodeSpecification } from '../types';
import { Cpu, Loader2, Sparkles } from 'lucide-react';

interface CodeGeneratorFormProps {
  onGenerate: (spec: CodeSpecification) => Promise<void>;
  isLoading: boolean;
}

/**
 * Interactive form component for specifying entity parameters for code generation.
 */
export const CodeGeneratorForm: React.FC<CodeGeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [entityName, setEntityName] = useState('Product');
  const [packageName, setPackageName] = useState('com.devflow.store');
  const [includeRepository, setIncludeRepository] = useState(true);
  const [includeUnitTests, setIncludeUnitTests] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onGenerate({ entityName, packageName, includeRepository, includeUnitTests });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
        <Cpu className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-semibold text-slate-100">Spring Boot Code Generator Engine</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Entity Name</label>
        <input
          type="text"
          value={entityName}
          onChange={(e) => setEntityName(e.target.value)}
          required
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
          placeholder="e.g. Order, Customer, Product"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Package Name</label>
        <input
          type="text"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          required
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
          placeholder="e.g. com.devflow.store"
        />
      </div>

      <div className="space-y-3 pt-2">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={includeRepository}
            onChange={(e) => setIncludeRepository(e.target.checked)}
            className="w-4 h-4 rounded border-slate-800 text-indigo-600 focus:ring-indigo-500 bg-slate-950"
          />
          <span className="text-sm text-slate-300">Generate Spring Data JPA Repository</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={includeUnitTests}
            onChange={(e) => setIncludeUnitTests(e.target.checked)}
            className="w-4 h-4 rounded border-slate-800 text-indigo-600 focus:ring-indigo-500 bg-slate-950"
          />
          <span className="text-sm text-slate-300">Generate JUnit 5 Unit Tests</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating Blueprint...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Generate Spring Boot Component</span>
          </>
        )}
      </button>
    </form>
  );
};