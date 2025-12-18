
import React from 'react';
import { useTranslation } from '../contexts/i18n';

const UserStats: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-slate-900/50 border-b border-slate-700/50 text-white text-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-12">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex items-center">
            <span className="relative flex h-3 w-3 ltr:mr-2 rtl:ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span>{t('online_users')}: <span className="font-bold text-green-400">111</span></span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ltr:mr-2 rtl:ml-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span>{t('registered_users')}: <span className="font-bold text-indigo-400">15,941</span></span>
          </div>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ltr:mr-2 rtl:ml-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{t('session_duration')}: <span className="font-roboto-mono font-bold text-gray-300">10:49:13</span></span>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
