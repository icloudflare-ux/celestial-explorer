import React, { useState, useCallback, useEffect } from 'react';
import { generateAstrologicalReading } from '../services/geminiService';
import { calculateAbjad } from '../utils/abjad';
import { zodiacRulers } from '../data/rabAlTalehData';
import Card from './common/Card';
import Spinner from './common/Spinner';
import AbjadTable from './AbjadTable';
import FormattedReading from './common/FormattedReading';
import ResultActions from './common/ResultActions';
import { useTranslation } from '../contexts/i18n';
import { Profile } from '../types';
import FormulaExplanation from './common/FormulaExplanation';

interface AstrologicalCalculatorProps {
  onZodiacSignCalculate: (sign: string) => void;
  activeProfile: Profile | null;
}

const AstrologicalCalculator: React.FC<AstrologicalCalculatorProps> = ({ onZodiacSignCalculate, activeProfile }) => {
  const [name, setName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [reading, setReading] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAbjad, setShowAbjad] = useState(false);
  const { t } = useTranslation();

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
    if (!name || !motherName) return;
    setIsLoading(true);
    setReading('');
    
    const nameAbjad = calculateAbjad(name);
    const motherNameAbjad = calculateAbjad(motherName);
    const totalAbjad = nameAbjad + motherNameAbjad;
    const remainder = totalAbjad % 12;
    const rabTale = remainder === 0 ? 12 : remainder;

    const signName = zodiacRulers[rabTale - 1]?.sign;
    if (signName) {
      onZodiacSignCalculate(signName);
    }

    const result = await generateAstrologicalReading(name, motherName, rabTale, activeProfile?.birthDate, activeProfile?.birthTime);
    setReading(result);
    setIsLoading(false);
  }, [name, motherName, onZodiacSignCalculate, activeProfile]);

  const rawDesc = t('astrological_calc_desc');
  const descParts = rawDesc.split(/<(\d+)>([^<]+)<\/\1>/g);

  return (
    <Card>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <h4 className="text-3xl font-semibold text-white font-lalezar tracking-wide">{t('astrological_calc_title')}</h4>
          <p className="font-tanha text-gray-300 leading-relaxed">
            {descParts.map((part, index) => {
              if (index % 3 === 2) {
                return (
                  <strong key={index} className="text-indigo-300">
                    {part}
                  </strong>
                );
              } else if (index % 3 === 0) {
                return part;
              }
              return null;
            })}
          </p>
          <div className="p-4 bg-slate-800/50 rounded-lg border-l-4 border-indigo-500">
            <p className="font-tanha text-indigo-200 text-lg" dangerouslySetInnerHTML={{ __html: t('astrological_calc_summary') }} />
          </div>
          
          <div className="space-y-4">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('name_placeholder')} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500" />
            <input type="text" value={motherName} onChange={(e) => setMotherName(e.target.value)} placeholder={t('mother_name_placeholder')} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500" />
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={isLoading || !name || !motherName}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-500/40 transform hover:-translate-y-1"
          >
            {isLoading && <Spinner small />}
            <span className="mx-2">{t('astrological_calc_button')}</span>
          </button>
        </div>
        <div className={`bg-black/40 rounded-lg p-6 min-h-[300px] flex flex-col border border-slate-800 ring-1 ring-indigo-500/10 shadow-inner shadow-indigo-900/10 printable-content ${!reading && !isLoading && 'items-center justify-center'}`}>
            {isLoading ? (
                 <div className="flex flex-col items-center justify-center h-full">
                    <Spinner />
                    <p className="mt-4 text-gray-300 font-tanha">{t('loading_astrological')}</p>
                 </div>
            ) : reading ? (
              <>
                <div className="flex-grow">
                  <FormattedReading text={reading} />
                </div>
                <ResultActions textToCopy={reading} />
              </>
            ) : (
                <p className="text-gray-400 text-center font-tanha text-lg">{t('astrological_calc_placeholder_result')}</p>
            )}
        </div>
      </div>

      <FormulaExplanation>
          <ol>
            <li><strong>محاسبه ابجد:</strong> مقدار عددی ابجد کبیر نام شما و نام مادرتان محاسبه می‌شود.</li>
            <li><strong>جمع کل:</strong> این دو عدد با هم جمع می‌شوند.</li>
            <li><strong>محاسبه باقیمانده:</strong> حاصل جمع بر عدد ۱۲ (تعداد برج‌های فلکی) تقسیم می‌شود.</li>
            <li><strong>تعیین رب‌الطالع:</strong> باقیمانده این تقسیم (اگر صفر باشد، ۱۲ در نظر گرفته می‌شود) عدد رب‌الطالع شماست که متناظر با یکی از برج‌هاست (۱=حمل، ۲=ثور، ...).</li>
          </ol>
      </FormulaExplanation>

      <div className="mt-8 border-t border-slate-800/50 pt-6">
        <div className="text-center">
            <button 
                onClick={() => setShowAbjad(!showAbjad)}
                className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 text-lg"
            >
                {showAbjad ? t('hide_abjad_table') : t('show_abjad_table')}
            </button>
        </div>
        {showAbjad && <AbjadTable />}
      </div>
    </Card>
  );
};

export default AstrologicalCalculator;