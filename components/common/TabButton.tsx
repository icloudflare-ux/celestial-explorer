
import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  const activeClasses = 'border-indigo-500 text-white bg-indigo-500/20';
  const inactiveClasses = 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5';

  return (
    <button
      onClick={onClick}
      className={`py-3 px-6 block font-medium text-lg border-b-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-t-lg ${isActive ? activeClasses : inactiveClasses}`}
    >
      {label}
    </button>
  );
};

export default TabButton;
