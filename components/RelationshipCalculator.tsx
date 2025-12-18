import React, { useState, useMemo, useCallback } from 'react';
import { Profile } from '../types';
import Card from './common/Card';
import { useTranslation } from '../contexts/i18n';
import Spinner from './common/Spinner';
import { zodiacRulers } from '../data/rabAlTalehData';
import { calculateAbjad } from '../utils/abjad';
import { generateRelationshipAnalysis } from '../services/geminiService';

interface RelationshipCalculatorProps {
  profiles: Profile[];
}

const reduceToSingleDigit = (num: number): number => {
    let currentNum = num;
    while (currentNum > 9) {
        currentNum = String(currentNum).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return currentNum === 0 && num > 0 ? 9 : currentNum;
};

const getAnalysisData = (profile: Profile) => {
    const totalAbjad = calculateAbjad(profile.name) + calculateAbjad(profile.motherName);
    const remainder = totalAbjad % 12;
    const rabTale = remainder === 0 ? 12 : remainder;
    const signInfo = zodiacRulers[rabTale - 1];
    
    const zodiacData = [
        { element: 'آتش' }, { element: 'خاک' }, { element: 'هوا' }, { element: 'آب' },
        { element: 'آتش' }, { element: 'خاک' }, { element: 'هوا' }, { element: 'آب' },
        { element: 'آتش' }, { element: 'خاک' }, { element: 'هوا' }, { element: 'آب' },
    ];
    
    return {
        sign: signInfo?.sign || 'نامشخص',
        ruler: signInfo?.ruler || 'نامشخص',
        element: zodiacData[rabTale - 1]?.element || 'نامشخص',
        number: reduceToSingleDigit(totalAbjad),
    };
};

const AnalysisResultDisplay = ({ analysis }: { analysis: any }) => {
    const { t } = useTranslation();
    const Section: React.FC<{ title: string, children: React.ReactNode, icon: string }> = ({ title, children, icon }) => (
        <div className="bg-slate-800/40 p-6 rounded-lg">
            <h4 className="flex items-center text-2xl font-lalezar text-indigo-300 mb-4">
                <span className="text-3xl ml-3">{icon}</span>
                {title}
            </h4>
            <div className="prose prose-lg prose-invert max-w-none font-tanha leading-loose space-y-3">{children}</div>
        </div>
    );
    
    return (
        <div className="mt-12 space-y-8 animate-fade-in">
            <Section title={t('relationship_elemental_harmony')} icon="🌍">
                <p>{analysis.elementalHarmony}</p>
            </Section>
            <Section title={t('relationship_planetary_dynamics')} icon="🪐">
                <p>{analysis.planetaryDynamics}</p>
            </Section>
            <Section title={t('relationship_numerological_connection')} icon="🔢">
                <p>{analysis.numerologicalConnection}</p>
            </Section>

            <div className="grid md:grid-cols-2 gap-8">
                <Section title={t('relationship_strengths')} icon="✨">
                    <ul className="list-disc list-inside">
                        {analysis.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                    </ul>
                </Section>
                <Section title={t('relationship_challenges')} icon="🌪️">
                     <ul className="list-disc list-inside">
                        {analysis.challenges.map((c: string, i: number) => <li key={i}>{c}</li>)}
                    </ul>
                </Section>
            </div>

            <Section title={t('relationship_conclusion')} icon="📜">
                <p>{analysis.conclusion}</p>
            </Section>
        </div>
    );
};

const relationshipTypes = [
    { key: 'marriage' },
    { key: 'business_partnership' },
    { key: 'friendship' },
    { key: 'family' }
];

const RelationshipCalculator: React.FC<RelationshipCalculatorProps> = ({ profiles }) => {
  const { t } = useTranslation();
  const [profile1Id, setProfile1Id] = useState('');
  const [profile2Id, setProfile2Id] = useState('');
  const [relationshipTypeKey, setRelationshipTypeKey] = useState(relationshipTypes[0].key);
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableProfilesForP2 = useMemo(() => profiles.filter(p => p.id !== profile1Id), [profiles, profile1Id]);
  const availableProfilesForP1 = useMemo(() => profiles.filter(p => p.id !== profile2Id), [profiles, profile2Id]);

  const handleAnalysis = useCallback(async () => {
    const relationshipType = t(`relationship_type_${relationshipTypeKey}`);
    if (!profile1Id || !profile2Id || !relationshipType) {
        setError(t('relationship_error_all_fields'));
        return;
    }
    if (profile1Id === profile2Id) {
        setError(t('relationship_error_same_profile'));
        return;
    }

    setError(null);
    setIsLoading(true);
    setAnalysis(null);

    const profile1 = profiles.find(p => p.id === profile1Id);
    const profile2 = profiles.find(p => p.id === profile2Id);

    if (!profile1 || !profile2) {
        setError("پروفایل‌های انتخاب شده یافت نشدند.");
        setIsLoading(false);
        return;
    }

    try {
        const analysis1 = getAnalysisData(profile1);
        const analysis2 = getAnalysisData(profile2);
        
        const result = await generateRelationshipAnalysis(
            profile1, analysis1,
            profile2, analysis2,
            relationshipType
        );

        if (!result) throw new Error("پاسخی از سرویس هوش مصنوعی دریافت نشد.");
        setAnalysis(result);

    } catch(e: any) {
        setError(e.message || "خطا در تولید تحلیل.");
    } finally {
        setIsLoading(false);
    }

  }, [profile1Id, profile2Id, relationshipTypeKey, profiles, t]);

  const ProfileSelector: React.FC<{ value: string; onChange: (id: string) => void; options: Profile[]; label: string; }> = ({ value, onChange, options, label }) => (
    <div>
        <label className="block text-lg font-tanha text-gray-300 mb-2">{label}</label>
        <select value={value} onChange={e => onChange(e.target.value)} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500 text-lg">
            <option value="">-- انتخاب پروفایل --</option>
            {options.map(p => <option key={p.id} value={p.id}>{p.name} ({t('child_of')} {p.motherName})</option>)}
        </select>
    </div>
  );

  return (
    <Card>
      <div className="text-center">
        <h4 className="text-3xl font-semibold text-white font-lalezar tracking-wide">{t('relationship_title')}</h4>
        <p className="font-tanha text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4">{t('relationship_desc')}</p>
      </div>
      
      {!analysis && !isLoading && (
        <div className="mt-8 max-w-2xl mx-auto space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
                <ProfileSelector value={profile1Id} onChange={setProfile1Id} options={availableProfilesForP1} label={t('relationship_person1')} />
                <ProfileSelector value={profile2Id} onChange={setProfile2Id} options={availableProfilesForP2} label={t('relationship_person2')} />
            </div>
            <div>
                 <label className="block text-lg font-tanha text-gray-300 mb-2">{t('relationship_type')}</label>
                 <select 
                    value={relationshipTypeKey} 
                    onChange={e => setRelationshipTypeKey(e.target.value)} 
                    className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500 text-lg"
                 >
                    {relationshipTypes.map(type => (
                        <option key={type.key} value={type.key}>
                            {t(`relationship_type_${type.key}`)}
                        </option>
                    ))}
                </select>
            </div>
            {error && <p className="text-red-400 text-center font-tanha">{error}</p>}
            <button onClick={handleAnalysis} disabled={isLoading || !profile1Id || !profile2Id || !relationshipTypeKey} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg transform hover:-translate-y-1">
                {isLoading ? <Spinner small /> : t('relationship_get_analysis')}
            </button>
            {profiles.length < 2 && <p className="text-center text-amber-400 font-tanha mt-4">{t('relationship_error_not_enough_profiles')}</p>}
        </div>
      )}

      {isLoading && (
         <div className="flex flex-col items-center justify-center h-full mt-12">
            <Spinner />
            <p className="mt-4 text-gray-300 font-tanha">{t('relationship_loading')}</p>
        </div>
      )}

      {analysis && (
        <>
          <AnalysisResultDisplay analysis={analysis} />
          <div className="text-center mt-12">
            <button onClick={() => setAnalysis(null)} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">{t('relationship_new_analysis')}</button>
          </div>
        </>
      )}

    </Card>
  );
};

export default RelationshipCalculator;