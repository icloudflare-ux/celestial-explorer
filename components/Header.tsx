
import React, { useState } from 'react';
import { useTranslation } from '../contexts/i18n';
import { useTheme } from '../contexts/ThemeContext';
import { useTimeZone, availableTimeZones } from '../contexts/TimeZoneContext';

const navLinks = [
  { href: '#history', textKey: 'nav_history' },
  { href: '#astrology-depth', textKey: 'nav_astrology_depth' },
  { href: '#calculator', textKey: 'nav_calculator' },
  { href: '#zodiac', textKey: 'nav_zodiac' },
  { href: '#rab-al-taleh', textKey: 'nav_rab_al_taleh' },
  { href: '#qamar-dar-aghrab', textKey: 'nav_qamar_dar_aghrab' },
  { href: '#monthly-calendar', textKey: 'nav_monthly_calendar' },
  { href: '#weekly-auspices', textKey: 'nav_weekly_auspices' },
  { href: '#planetary-hours', textKey: 'nav_planetary_hours' },
  { href: '#traditional-sources', textKey: 'nav_traditional_sources' },
  { href: '#astrolabe', textKey: 'nav_astrolabe' },
  { href: '#taleh-saad-nahs', textKey: 'nav_taleh_saad_nahs' },
  { href: '#terms', textKey: 'nav_terms' },
];

const languages = {
  fa: { name: 'فارسی', flag: '🇮🇷' },
  en: { name: 'English', flag: '🇬🇧' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  hi: { name: 'हिन्दी', flag: '🇮🇳' },
  ur: { name: 'اردو', flag: '🇵🇰' },
};

const Header: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { timeZone, setTimeZone } = useTimeZone();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsNavOpen(false); // Close nav on click
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80; // Height of the sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
      });
    }
  };

  return (
    <header className="bg-white/70 dark:bg-black/30 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200/50 dark:border-slate-700/50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2 md:space-x-4 space-x-reverse shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l1.09 2.18L15 6l-2.18 1.09L11.73 9 11 11.18 8.82 12l-1.09 2.18L6 15l2.18 1.09L9.27 18 10 20.18 12.18 21l1.09-2.18L15 18l2.18-1.09L18.27 15l1.09-2.18L21 12l-2.18-1.09L17.73 9 17 6.82 14.82 6l-1.09-2.18L12 3z" />
            </svg>
            {/* Responsive text size: smaller on mobile, larger on md+ */}
            <h1 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white font-lalezar tracking-wider transition-colors duration-300 whitespace-nowrap">
              {t('app_title')}
            </h1>
          </div>
          <div className="flex items-center">
            
            {/* Time Zone Selector */}
            <div className="relative group mx-1 md:mx-2 hidden md:block">
              <button className="p-2 rounded-full text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all duration-300" aria-label="منطقه زمانی">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </button>
              <div className="absolute ltr:right-0 rtl:left-0 mt-2 p-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible z-50 h-64 overflow-y-auto">
                  <p className="text-xs text-gray-500 px-4 py-2 border-b border-slate-200 dark:border-slate-700 mb-1">منطقه زمانی</p>
                  {availableTimeZones.map((tz) => (
                      <button key={tz.value} onClick={() => setTimeZone(tz.value)} className={`w-full text-right flex items-center px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-500/30 rounded-md ${timeZone === tz.value ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-700 dark:text-gray-200'}`}>
                           <span>{tz.label}</span>
                           {timeZone === tz.value && <svg className="w-4 h-4 mr-auto text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                      </button>
                  ))}
              </div>
            </div>

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all duration-300 ml-1 rtl:mr-1 md:ml-2 md:rtl:mr-2"
              aria-label="تغییر تم"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <div className="hidden md:flex items-center ml-4 rtl:mr-4">
              <div className="relative group">
                <button className="flex items-center space-x-2 space-x-reverse text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md transition-colors duration-300">
                    <span>{languages[language as keyof typeof languages].flag}</span>
                    <span>{languages[language as keyof typeof languages].name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className="absolute ltr:right-0 rtl:left-0 mt-2 p-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible z-50">
                    {Object.entries(languages).map(([langCode, langData]) => (
                        <button key={langCode} onClick={() => setLanguage(langCode)} className="w-full text-right flex items-center px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-500/30 rounded-md">
                             <span className="ml-3">{langData.flag}</span>
                             <span>{langData.name}</span>
                        </button>
                    ))}
                </div>
              </div>
            </div>
            
            <nav className="hidden xl:flex space-x-4 space-x-reverse text-md ml-4">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href.substring(1))} className="text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 px-2 py-1">
                  {t(link.textKey)}
                </a>
              ))}
            </nav>

             <button onClick={() => setIsNavOpen(!isNavOpen)} className="xl:hidden ml-2 rtl:mr-2 text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav */}
      {isNavOpen && (
        <div className="xl:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm absolute top-20 left-0 w-full animate-fade-in-down border-b border-slate-200 dark:border-slate-700 shadow-xl overflow-y-auto max-h-[80vh]">
            <nav className="flex flex-col items-center space-y-2 p-4">
               {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href.substring(1))} className="text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 py-2 text-lg">
                  {t(link.textKey)}
                </a>
              ))}
               <div className="pt-4 border-t border-slate-200 dark:border-slate-700 w-full flex flex-col items-center space-y-4">
                 
                 {/* Mobile Time Zone */}
                 <div className="w-full max-w-xs">
                    <label className="block text-sm text-gray-500 mb-1 text-center">منطقه زمانی</label>
                    <select 
                      value={timeZone} 
                      onChange={(e) => setTimeZone(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded p-2 text-sm"
                    >
                      {availableTimeZones.map(tz => (
                        <option key={tz.value} value={tz.value}>{tz.label}</option>
                      ))}
                    </select>
                 </div>

                 <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                    {Object.entries(languages).map(([langCode, langData]) => (
                        <button key={langCode} onClick={() => setLanguage(langCode)} className={`flex items-center justify-center py-2 text-sm rounded-md ${language === langCode ? 'bg-indigo-600 text-white' : 'text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-indigo-500/30'}`}>
                             <span className="ml-2">{langData.flag}</span>
                             <span>{langData.name}</span>
                        </button>
                    ))}
                 </div>
               </div>
            </nav>
        </div>
      )}

    </header>
  );
};

export default Header;
