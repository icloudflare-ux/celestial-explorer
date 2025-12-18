
import React, { useState, useMemo } from 'react';
import { CalculatorMode, Profile } from '../types';
import AstrologicalCalculator from './AstrologicalCalculator';
import ScientificCalculator from './ScientificCalculator';
import QarinCalculator from './QarinCalculator';
import QarinNadiGuide from './QarinNadiGuide';
import TalehCalculator from './TalehCalculator';
import HoroscopeCalculator from './HoroscopeCalculator';
import ElectionalCalculator from './ElectionalCalculator';
import HoraryCalculator from './HoraryCalculator';
import DignitiesCalculator from './DignitiesCalculator';
import PersonalDignitiesCalculator from './PersonalDignitiesCalculator';
import DreamInterpreter from './DreamInterpreter';
import { useTranslation } from '../contexts/i18n';
import ProfileManager, { useProfiles } from './common/ProfileManager';
import PersonalDashboard from './PersonalDashboard';
import RelationshipCalculator from './RelationshipCalculator';
import JafarCalculator from './JafarCalculator';
import JafriNameAnalysis from './JafriNameAnalysis';
import AbjadCalculator from './AbjadCalculator';
import OfaghCalculator from './OfaghCalculator';
import RamalCalculator from './RamalCalculator';

interface CalculatorSectionProps {
  onZodiacSignCalculate: (sign: string) => void;
  onProfileChange: (profile: Profile | null) => void;
  activeProfile: Profile | null;
}

type Category = 'self' | 'timing' | 'esoteric' | 'ai';

const CalculatorSection: React.FC<CalculatorSectionProps> = ({ onZodiacSignCalculate, onProfileChange, activeProfile }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('self');
  const [mode, setMode] = useState<CalculatorMode>(CalculatorMode.Astrological);
  const { t } = useTranslation();
  const { profiles, saveProfile, deleteProfile } = useProfiles();

  // Define tools structure
  const tools = useMemo(() => ({
    self: [
      { id: CalculatorMode.Astrological, label: t('tab_rab_taleh'), icon: '🌟' },
      { id: CalculatorMode.Qarin, label: t('tab_qarin'), icon: '👻' },
      { id: CalculatorMode.TalehSaadNahs, label: t('tab_taleh_saad_nahs'), icon: '⚖️' },
      { id: CalculatorMode.JafriNameAnalysis, label: t('tab_jafri_name_analysis'), icon: '📜' },
      { id: CalculatorMode.PersonalDignities, label: t('tab_personal_dignities'), icon: '🪐' },
      { id: CalculatorMode.Nadi, label: t('tab_nadi'), icon: '🧘' },
    ],
    timing: [
      { id: CalculatorMode.Electional, label: t('tab_electional'), icon: '📅' },
      { id: CalculatorMode.Horary, label: t('tab_horary'), icon: '❓' },
      { id: CalculatorMode.Dignities, label: t('tab_dignities'), icon: '📊' },
    ],
    esoteric: [
      { id: CalculatorMode.Jafar, label: t('tab_jafar'), icon: '🔢' },
      { id: CalculatorMode.Ramal, label: t('tab_ramal'), icon: '🎲' },
      { id: CalculatorMode.Ofagh, label: t('tab_ofagh'), icon: '⬛' },
      { id: CalculatorMode.Abjad, label: t('tab_abjad'), icon: '🔤' },
    ],
    ai: [
      { id: CalculatorMode.Dream, label: t('tab_dream_interpreter'), icon: '😴' },
      { id: CalculatorMode.Relationship, label: t('tab_relationship'), icon: '❤️' },
      { id: CalculatorMode.Horoscope, label: t('tab_horoscope'), icon: '🔭' },
      { id: CalculatorMode.Scientific, label: t('tab_scientific'), icon: '🔬' },
    ]
  }), [t]);

  // Categories metadata
  const categories: { id: Category; label: string; icon: string }[] = [
    { id: 'self', label: 'شناخت خود', icon: '👤' },
    { id: 'timing', label: 'زمان‌شناسی', icon: '⏳' },
    { id: 'esoteric', label: 'علوم کهن', icon: '📜' },
    { id: 'ai', label: 'مشاور هوشمند', icon: '🤖' },
  ];

  return (
    <section id="calculator" className="py-16 min-h-screen">
      <h3 className="text-4xl md:text-5xl font-bold text-center mb-4 text-indigo-400 font-lalezar tracking-wider">
        {t('calculator_section_title')}
      </h3>
      <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto font-tanha text-lg leading-relaxed">
        {t('calculator_section_subtitle')}
      </p>

      {/* Profile Manager */}
      <div className="mb-10 max-w-3xl mx-auto">
        <ProfileManager 
            onProfileChange={onProfileChange}
            profiles={profiles}
            saveProfile={saveProfile}
            deleteProfile={deleteProfile}
        />
      </div>

      {activeProfile && (
        <div className="mb-12">
            <PersonalDashboard activeProfile={activeProfile} />
        </div>
      )}

      {/* Categories Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center px-6 py-3 rounded-full text-lg font-lalezar transition-all duration-300 transform hover:scale-105 ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-300 ring-offset-2 ring-offset-slate-900'
                : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            <span className="ml-2 text-2xl">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sub-tools Navigation (Pills) */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 px-4">
        {tools[activeCategory].map((tool) => (
          <button
            key={tool.id}
            onClick={() => setMode(tool.id)}
            className={`flex items-center px-4 py-2 rounded-lg text-sm md:text-base font-tanha transition-all duration-200 ${
              mode === tool.id
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 shadow-md'
                : 'bg-slate-800/30 text-gray-400 hover:bg-slate-800 hover:text-gray-200 border border-transparent'
            }`}
          >
            <span className="ml-2">{tool.icon}</span>
            {tool.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="transition-all duration-500 ease-in-out min-h-[400px]">
        {mode === CalculatorMode.Astrological && <AstrologicalCalculator onZodiacSignCalculate={onZodiacSignCalculate} activeProfile={activeProfile} />}
        {mode === CalculatorMode.Relationship && <RelationshipCalculator profiles={profiles} />}
        {mode === CalculatorMode.Jafar && <JafarCalculator />}
        {mode === CalculatorMode.Ramal && <RamalCalculator />}
        {mode === CalculatorMode.Ofagh && <OfaghCalculator />}
        {mode === CalculatorMode.JafriNameAnalysis && <JafriNameAnalysis activeProfile={activeProfile} />}
        {mode === CalculatorMode.Abjad && <AbjadCalculator />}
        {mode === CalculatorMode.PersonalDignities && <PersonalDignitiesCalculator activeProfile={activeProfile} />}
        {mode === CalculatorMode.TalehSaadNahs && <TalehCalculator activeProfile={activeProfile} />}
        {mode === CalculatorMode.Qarin && <QarinCalculator activeProfile={activeProfile} />}
        {mode === CalculatorMode.Nadi && <QarinNadiGuide />}
        {mode === CalculatorMode.Horoscope && <HoroscopeCalculator activeProfile={activeProfile} />}
        {mode === CalculatorMode.Electional && <ElectionalCalculator />}
        {mode === CalculatorMode.Horary && <HoraryCalculator />}
        {mode === CalculatorMode.Dignities && <DignitiesCalculator />}
        {mode === CalculatorMode.Dream && <DreamInterpreter />}
        {mode === CalculatorMode.Scientific && <ScientificCalculator />}
      </div>
    </section>
  );
};

export default CalculatorSection;
