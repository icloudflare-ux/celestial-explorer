import React, { useState, useCallback } from 'react';
import { generateDreamInterpretation } from '../services/geminiService';
import Card from './common/Card';
import Spinner from './common/Spinner';
import FormattedReading from './common/FormattedReading';
import ResultActions from './common/ResultActions';
import { useTranslation } from '../contexts/i18n';
import FormulaExplanation from './common/FormulaExplanation';

const DreamInterpreter: React.FC = () => {
  const { t } = useTranslation();
  const [dream, setDream] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!dream.trim()) {
      setError("لطفاً خواب خود را وارد کنید.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setInterpretation('');
    
    try {
        const result = await generateDreamInterpretation(dream);
        setInterpretation(result);
    } catch (e: any) {
        setError(e.message || "خطا در تولید تعبیر. لطفاً بعداً دوباره امتحان کنید.");
    } finally {
        setIsLoading(false);
    }
  }, [dream]);

  const handleNewInterpretation = () => {
    setInterpretation('');
    setDream('');
    setError(null);
  };

  return (
    <Card>
      <h4 className="text-3xl font-semibold text-white font-lalezar tracking-wide text-center">{t('dream_interpreter_title')}</h4>
      <p className="font-tanha text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4 text-center">
        {t('dream_interpreter_desc')}
      </p>
      
      {!interpretation && !isLoading ? (
        <div className="mt-8 max-w-2xl mx-auto space-y-4 animate-fade-in">
          <textarea 
            value={dream} 
            onChange={(e) => setDream(e.target.value)} 
            placeholder={t('dream_interpreter_placeholder')}
            rows={6}
            className="w-full bg-slate-800/50 border-slate-600 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 text-lg font-tanha"
          />
          {error && <p className="text-red-400 text-center font-tanha">{error}</p>}
          <button 
            onClick={handleGenerate} 
            disabled={isLoading || !dream} 
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg transform hover:-translate-y-1"
          >
            {isLoading ? <Spinner small /> : t('dream_interpreter_button')}
          </button>
          <FormulaExplanation title="روش تحلیل چگونه است؟">
            <p>این ابزار از هوش مصنوعی پیشرفته برای ارائه یک تحلیل چندوجهی استفاده می‌کند. خواب شما به همراه دستورالعملی برای «حکیم رویا» ارسال می‌شود تا آن را از دیدگاه‌های زیر بررسی کند:</p>
            <ul>
                <li><strong>نمادشناسی سنتی:</strong> مانند تعابیر ابن سیرین و دیگر معبران کهن.</li>
                <li><strong>روانشناسی تحلیلی:</strong> بررسی کهن‌الگوها و نمادها بر اساس نظریات کارل یونگ.</li>
                <li><strong>حکمت و عرفان:</strong> الهام از روایات و داستان‌های معنوی در ادیان مختلف برای یافتن پیام‌های عمیق‌تر.</li>
            </ul>
            <p>هدف، ارائه یک دیدگاه جامع برای خودشناسی است، نه یک پیش‌بینی قطعی.</p>
          </FormulaExplanation>
        </div>
      ) : null}

      {interpretation && (
        <div className="mt-8 animate-fade-in">
          <div className="bg-black/40 rounded-lg p-6 min-h-[300px] flex flex-col border border-slate-800 printable-content">
            <div className="flex-grow">
              <FormattedReading text={interpretation} />
            </div>
            <ResultActions textToCopy={interpretation} />
          </div>
          <div className="text-center mt-6">
            <button onClick={handleNewInterpretation} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">تعبیر یک خواب جدید</button>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-full mt-8">
          <Spinner />
          <p className="mt-4 text-gray-300 font-tanha">{t('dream_interpreter_loading')}</p>
        </div>
      )}
    </Card>
  );
};

export default DreamInterpreter;