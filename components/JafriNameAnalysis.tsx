import React, { useState, useCallback, useEffect } from 'react';
import { generateJafriNameAnalysis } from '../services/geminiService';
import Card from './common/Card';
import Spinner from './common/Spinner';
import FormattedReading from './common/FormattedReading';
import ResultActions from './common/ResultActions';
import { useTranslation } from '../contexts/i18n';
import { Profile } from '../types';
import FormulaExplanation from './common/FormulaExplanation';

interface JafriNameAnalysisProps {
    activeProfile: Profile | null;
}

const JafriNameAnalysis: React.FC<JafriNameAnalysisProps> = ({ activeProfile }) => {
  const { t } = useTranslation();
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleGenerate = useCallback(async () => {
    if (!activeProfile) {
        setError(t('no_profile_selected'));
        return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis('');
    
    try {
        const result = await generateJafriNameAnalysis(activeProfile.name, activeProfile.motherName);
        setAnalysis(result);
    } catch (e: any) {
        setError(e.message || t('error_generic_analysis'));
    } finally {
        setIsLoading(false);
    }
  }, [activeProfile, t]);

  return (
    <Card>
      <h4 className="text-3xl font-semibold text-white font-lalezar tracking-wide text-center">{t('jafri_name_analysis_title')}</h4>
      <p className="font-tanha text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4 text-center">
        {t('jafri_name_analysis_desc')}
      </p>
      
      <div className="p-4 bg-slate-800/50 rounded-lg border-l-4 border-indigo-500 mt-6 max-w-3xl mx-auto">
        <p className="font-tanha text-indigo-200 text-lg text-center" dangerouslySetInnerHTML={{ __html: t('jafri_name_analysis_summary') }} />
      </div>

       {!analysis && !isLoading ? (
        <div className="mt-8 max-w-xl mx-auto space-y-4 animate-fade-in">
          {!activeProfile ? (
            <p className="text-amber-400 text-center font-tanha">{t('no_profile_selected')}</p>
          ) : (
            <div className="text-center font-tanha text-lg text-gray-300">
                <p>تحلیل برای: <strong className="text-white">{activeProfile.name}</strong> فرزند <strong className="text-white">{activeProfile.motherName}</strong></p>
            </div>
          )}
          {error && <p className="text-red-400 text-center font-tanha">{error}</p>}
          <button
            onClick={handleGenerate}
            disabled={isLoading || !activeProfile}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg transform hover:-translate-y-1"
          >
            {isLoading ? <Spinner small /> : t('get_jafri_analysis_button')}
          </button>
           <FormulaExplanation title="روش تحلیل جفری چگونه است؟">
                <p>این تحلیل فراتر از محاسبه ساده ابجد است. در این روش، هوش مصنوعی به عنوان یک استاد علم جفر عمل می‌کند:</p>
                <ol>
                    <li><strong>تحلیل حروف (بَسْط):</strong> هر حرف از نام شما و نام مادرتان به عنوان یک نماد با معنای خاص در نظر گرفته می‌شود.</li>
                    <li><strong>محاسبات پیچیده:</strong> اعداد ابجد با روش‌های مختلفی مانند تقسیم بر اعداد مقدس، یافتن باقیمانده‌ها و ترکیب آن‌ها تحلیل می‌شوند تا کدهای پنهان در نام استخراج شوند.</li>
                    <li><strong>تفسیر یکپارچه:</strong> هوش مصنوعی با ترکیب معانی حروف و نتایج محاسبات، یک تحلیل روایی و عمیق از شخصیت، استعدادها، چالش‌ها و مسیر روحی شما ارائه می‌دهد.</li>
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
            <p className="mt-4 text-gray-300 font-tanha">{t('loading_jafri_analysis')}</p>
        </div>
    )}
    </Card>
  );
};

export default JafriNameAnalysis;