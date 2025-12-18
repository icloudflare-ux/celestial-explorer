
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HistorySection from './components/HistorySection';
import ZodiacSignsTable from './components/ZodiacSignsTable';
import CalculatorSection from './components/CalculatorSection';
import AstronomicalTerms from './components/AstronomicalTerms';
import Footer from './components/Footer';
import AstrologyInDepth from './components/AstrologyInDepth';
import WeeklyAuspices from './components/WeeklyAuspices';
import PlanetaryHours from './components/PlanetaryHours';
import TraditionalSources from './components/TraditionalSources';
import RabAlTalehWeekly from './components/RabAlTalehWeekly';
import MonthlyCalendar from './components/MonthlyCalendar';
import AstrolabeSection from './components/AstrolabeSection';
import TalehSaadNahsSection from './components/TalehSaadNahsSection';
import { I18nProvider, useTranslation } from './contexts/i18n';
import UserStats from './components/UserStats';
import QamarDarAghrabSection from './components/QamarDarAghrabSection';
import { Profile } from './types';

const AppContent: React.FC = () => {
  const [calculatedZodiacSign, setCalculatedZodiacSign] = useState<string | null>(null);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const { language, dir } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.body.dir = dir;
  }, [language, dir]);

  return (
    <div className={`min-h-screen text-slate-800 dark:text-gray-200 transition-colors duration-300 ${dir === 'rtl' ? 'font-vazir' : 'font-sans'} overflow-x-hidden`}>
      <Header />
      <main>
        <UserStats />
        <Hero />
        {/* Adjusted spacing: space-y-16 for mobile, space-y-24 for desktop */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16 md:space-y-24">
          <HistorySection />
          <AstrologyInDepth />
          <CalculatorSection 
            onZodiacSignCalculate={setCalculatedZodiacSign} 
            onProfileChange={setActiveProfile} 
            activeProfile={activeProfile}
          />
          <ZodiacSignsTable calculatedSign={calculatedZodiacSign} />
          <RabAlTalehWeekly calculatedSign={calculatedZodiacSign} />
          <QamarDarAghrabSection />
          <MonthlyCalendar calculatedSign={calculatedZodiacSign} />
          <WeeklyAuspices />
          <PlanetaryHours />
          <TraditionalSources />
          <AstrolabeSection />
          <TalehSaadNahsSection />
          <AstronomicalTerms />
        </div>
      </main>
      <Footer />
    </div>
  );
}

const App: React.FC = () => {
  // ThemeProvider is already wrapping App in index.tsx
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
};

export default App;
