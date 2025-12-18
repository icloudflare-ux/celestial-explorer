import React, { useState, useCallback, useEffect } from 'react';
import { generatePersonalDignityAnalysis } from '../services/geminiService';
import { calculateAbjad } from '../utils/abjad';
import { zodiacRulers } from '../data/rabAlTalehData';
import Card from './common/Card';
import Spinner from './common/Spinner';
import FormattedReading from './common/FormattedReading';
import ResultActions from './common/ResultActions';
import { useTranslation } from '../contexts/i18n';
import { Profile } from '../types';
import FormulaExplanation from './common/FormulaExplanation';

interface PersonalDignitiesCalculatorProps {
    activeProfile: Profile | null;
}

const PersonalDignitiesCalculator: React.FC<PersonalDignitiesCalculatorProps> = ({ activeProfile }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (activeProfile) {
      setName(activeProfile.name);
      setMotherName(activeProfile.motherName);
    } else {
      setName('');
      setMotherName('');
    }
  }, [activeProfile]);

  const handleGenerate = useCallback(async () => {
    if (!name || !motherName) {
        setError(t('error_enter_names'));
        return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis('');
    
    try {
        const totalAbjad = calculateAbjad(name) + calculateAbjad(motherName);
        const remainder = totalAbjad % 12;
        const rabTale = remainder === 0 ? 12 : remainder;

        const signInfo = zodiacRulers[rabTale - 1];
        if (!signInfo) throw new Error(t('error_ascendant_calc'));

        const result = await generatePersonalDignityAnalysis(signInfo.sign, signInfo.ruler);
        setAnalysis(result);
    } catch (e: any) {
        setError(e.message || t('error_generic_analysis'));
    } finally {
        setIsLoading(false);
    }
  }, [name, motherName, t]);

  return (
    <Card>
      <h4 className="text-3xl font-semibold text-white font-lalezar tracking-wide text-center">{t('pd_title')}</h4>
      <p className="font-tanha text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4 text-center">
        {t('pd_desc')}
      </p>
      
      <div className="p-4 bg-slate-800/50 rounded-lg border-l-4 border-indigo-500 mt-6 max-w-3xl mx-auto">
        <p className="font-tanha text-indigo-200 text-lg text-center" dangerouslySetInnerHTML={{ __html: t('pd_summary') }} />
      </div>

       {!analysis && !isLoading ? (
        <div className="mt-8 max-w-xl mx-auto space-y-4 animate-fade-in">
            <div className="space-y-4">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('name_placeholder')} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500" />
                <input type="text" value={motherName} onChange={(e) => setMotherName(e.target.value)} placeholder={t('mother_name_placeholder')} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500" />
            </div>
          {error && <p className="text-red-400 text-center font-tanha">{error}</p>}
          <button
            onClick={handleGenerate}
            disabled={isLoading || !name || !motherName}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg transform hover:-translate-y-1"
          >
            {isLoading ? <Spinner small /> : t('get_personal_analysis_button')}
          </button>
           <FormulaExplanation>
                <p>این تحلیل بر اساس دو مرحله انجام می‌شود:</p>
                <ol>
                    <li><strong>یافتن کوکب حاکم:</strong> ابتدا «رب‌الطالع» شما با همان روش محاسبه ابجد نام و نام مادر پیدا می‌شود تا سیاره حاکم بر طالع شما مشخص گردد.</li>
                    <li><strong>تحلیل نقاط قوت و ضعف:</strong> هوش مصنوعی با دانستن سیاره حاکم شما، به بررسی برج‌هایی می‌پردازد که این سیاره در آن‌ها در اوج قدرت (شرف و حاکمیت) یا در اوج ضعف (هبوط و وبال) قرار دارد. سپس این اطلاعات را به صورت یک راهنمای شخصی برای استفاده از پتانسیل‌ها و غلبه بر چالش‌ها به شما ارائه می‌دهد.</li>
                </ol>
            </FormulaExplanation>
        </div>
      ) : null}

       {analysis && (
        <div className="mt-8 animate-fade-in">
            <div className="bg-black/40 rounded-lg p-6 min-h-[300px] flex flex-col border border-slate-800 printable-content">
                <div className="flex-grow">
                    <FormattedReading text={analysis} />
                </div>
                <ResultActions textToCopy={analysis} />
            </div>
            <div className="text-center mt-6">
                 <button onClick={() => setAnalysis('')} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">{t('new_analysis_button')}</button>
            </div>
        </div>
    )}
     {isLoading && (
        <div className="flex flex-col items-center justify-center h-full mt-8">
            <Spinner />
            <p className="mt-4 text-gray-300 font-tanha">{t('loading_ruler_planet')}</p>
        </div>
    )}
    </Card>
  );
};

export default PersonalDignitiesCalculator;