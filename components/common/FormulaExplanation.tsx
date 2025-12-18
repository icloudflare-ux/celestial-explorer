import React, { useState } from 'react';

interface FormulaExplanationProps {
  title?: string;
  children: React.ReactNode;
}

const FormulaExplanation: React.FC<FormulaExplanationProps> = ({ title = "روش محاسبه", children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8 border-t border-slate-800/50 pt-6">
      <div className="text-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 text-lg flex items-center gap-2 mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <span>{title}</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="mt-4 p-4 bg-black/40 rounded-lg border border-slate-800 animate-fade-in-down prose prose-invert prose-sm max-w-none font-tanha">
          {children}
        </div>
      )}
    </div>
  );
};

export default FormulaExplanation;