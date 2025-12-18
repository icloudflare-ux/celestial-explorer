
import React from 'react';
import { useTranslation } from '../contexts/i18n';
import CosmicClock from './CosmicClock';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section 
      className="relative min-h-[85vh] flex flex-col items-center justify-start text-center pt-8 overflow-hidden"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/60 dark:from-transparent dark:via-black/20 dark:to-black/80 transition-colors duration-300 pointer-events-none z-0"></div>
      
      {/* The Cosmic Clock (Now acts as the main Planetarium visual + Clock) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 mt-4">
        {/* Clock Section */}
        <div className="mb-6 md:mb-10 animate-fade-in-down origin-top">
            <CosmicClock />
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-800 dark:text-white leading-tight font-lalezar tracking-wide transition-colors duration-300 drop-shadow-lg mt-2 md:mt-4">
          {t('hero_title_part1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500">{t('hero_title_span')}</span> {t('hero_title_part2')}
        </h2>
        <p className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-gray-300 max-w-3xl mx-auto font-tanha leading-relaxed font-medium transition-colors duration-300 drop-shadow-md bg-white/30 dark:bg-black/30 backdrop-blur-sm p-3 md:p-4 rounded-xl">
          {t('hero_subtitle')}
        </p>
      </div>
    </section>
  );
};

export default Hero;
