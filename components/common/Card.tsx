
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/80 dark:bg-black/40 backdrop-blur-lg border border-slate-200 dark:border-slate-800/50 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-indigo-900/40 p-5 md:p-8 transition-colors duration-300 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default Card;
