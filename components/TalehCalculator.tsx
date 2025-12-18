import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { calculateAbjad } from '../utils/abjad';
import { talehAsmiData, dayOfBirthData, adadRuhiData } from '../data/talehSaadNahsData';
import Card from './common/Card';
import Spinner from './common/Spinner';
import ResultActions from './common/ResultActions';
import { useTranslation } from '../contexts/i18n';
import { Profile } from '../types';
import FormulaExplanation from './common/FormulaExplanation';
import { parseFlexibleDate } from '../utils/dateConverter';

type Quality = 'saad' | 'nahs' | 'semi-saad' | 'semi-nahs' | 'neutral' | 'swing';

interface Result {
  talehAsmi: typeof talehAsmiData[0];
  dayOfBirth: typeof dayOfBirthData[0];
  adadRuhi: typeof adadRuhiData[0];
  summary: {
    text: string;
    quality: Quality;
  };
}

const ResultCard: React.FC<{ title: string; quality: Quality; children: React.ReactNode }> = ({ title, quality, children }) => {
    const { t } = useTranslation();
    const qualityMap: { [key in Quality]: { text: string; color: string } } = {
        saad: { text: t('quality_saad'), color: 'border-green-500 text-green-400' },
        'semi-saad': { text: t('quality_semi_saad'), color: 'border-green-500/70 text-green-400/80' },
        nahs: { text: t('quality_nahs'), color: 'border-red-500 text-red-400' },
        'semi-nahs': { text: t('quality_semi_nahs'), color: 'border-red-500/70 text-red-400/80' },
        neutral: { text: t('quality_neutral'), color: 'border-yellow-500 text-yellow-400' },
        swing: { text: t('quality_swing'), color: 'border-cyan-500 text-cyan-400' },
    };
    const { text, color } = qualityMap[quality];

    return (
        <div className={`bg-slate-800/50 p-6 rounded-lg border-t-4 ${color}`}>
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-2xl font-lalezar text-white">{title}</h4>
                <span className={`px-3 py-1 text-sm font-bold rounded-full bg-black/30 ${color}`}>{text}</span>
            </div>
            <div className="font-tanha text-gray-300 leading-relaxed space-y-2">{children}</div>
        </div>
    );
};

const ConversionMethods = () => {
    const { t } = useTranslation();
    return (
    <div className="mt-12 pt-8 border-t border-slate-700/50">
        <h3 className="text-3xl font-lalezar text-center mb-6 text-indigo-300">{t('conversion_title')}</h3>
        <div className="grid md:grid-cols-3 gap-6 font-tanha">
            <div className="bg-slate-800/40 p-5 rounded-lg">
                <h4 className="font-lalezar text-xl text-cyan-400 mb-2">{t('conversion_method1_title')}</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                    <li>{t('conversion_method1_l1')}</li>
                    <li>{t('conversion_method1_l2')}</li>
                    <li>{t('conversion_method1_l3')}</li>
                </ul>
            </div>
            <div className="bg-slate-800/40 p-5 rounded-lg">
                <h4 className="font-lalezar text-xl text-amber-400 mb-2">{t('conversion_method2_title')}</h4>
                <p className="text-gray-300">{t('conversion_method2_desc')}</p>
            </div>
            <div className="bg-slate-800/40 p-5 rounded-lg">
                <h4 className="font-lalezar text-xl text-fuchsia-400 mb-2">{t('conversion_method3_title')}</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                    <li><strong>{t('dhikr_latif')}:</strong> {t('dhikr_latif_desc')}</li>
                    <li><strong>{t('dhikr_fattah')}:</strong> {t('dhikr_fattah_desc')}</li>
                    <li><strong>{t('dhikr_nur')}:</strong> {t('dhikr_nur_desc')}</li>
                </ul>
            </div>
        </div>
    </div>
)};

interface TalehCalculatorProps {
    activeProfile: Profile | null;
}

const reduceToSingleDigit = (num: number): number => {
    let currentNum = num;
    while (currentNum > 9) {
        currentNum = String(currentNum)
            .split('')
            .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return currentNum === 0 && num > 0 ? 9 : currentNum;
};

const TalehCalculator: React.FC<TalehCalculatorProps> = ({ activeProfile }) => {
    const { t } = useTranslation();
    const [inputs, setInputs] = useState({ name: '', motherName: '', birthDayOfWeek: '', birthDay: '', birthMonth: '' });
    const [result, setResult] = useState<Result | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (activeProfile) {
            const parsedDate = parseFlexibleDate(activeProfile.birthDate);
            setInputs({
                name: activeProfile.name,
                motherName: activeProfile.motherName,
                birthDay: parsedDate ? parsedDate.day : '',
                birthMonth: parsedDate ? parsedDate.month : '',
                birthDayOfWeek: activeProfile.birthDayOfWeek || '',
            });
        } else {
            setInputs({ name: '', motherName: '', birthDayOfWeek: '', birthDay: '', birthMonth: '' });
        }
    }, [activeProfile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleCalculate = useCallback(() => {
        const { name, motherName, birthDayOfWeek, birthDay, birthMonth } = inputs;
        if (!name || !motherName || birthDayOfWeek === '' || !birthDay || !birthMonth) {
            setError(t('error_fill_all_fields'));
            return;
        }
        setError(null);
        setIsLoading(true);

        const talehAsmiNumber = reduceToSingleDigit(calculateAbjad(name) + calculateAbjad(motherName));
        const adadRuhiNumber = reduceToSingleDigit(parseInt(birthDay, 10) + parseInt(birthMonth, 10));

        const talehAsmiResult = talehAsmiData.find(d => d.number === talehAsmiNumber)!;
        const dayOfBirthResult = dayOfBirthData[parseInt(birthDayOfWeek, 10)];
        const adadRuhiResult = adadRuhiData.find(d => d.number === adadRuhiNumber)!;

        const qualities: Quality[] = [talehAsmiResult.quality, dayOfBirthResult.quality, adadRuhiResult.quality];
        const saadCount = qualities.filter(q => q.includes('saad')).length;
        const nahsCount = qualities.filter(q => q.includes('nahs')).length;
        
        let summaryText = t('summary_swing');
        let summaryQuality: Quality = 'swing';
        if (saadCount >= 2) {
            summaryText = t('summary_saad');
            summaryQuality = 'saad';
        } else if (nahsCount >= 2) {
            summaryText = t('summary_nahs');
            summaryQuality = 'nahs';
        }

        setTimeout(() => {
            setResult({
                talehAsmi: talehAsmiResult,
                dayOfBirth: dayOfBirthResult,
                adadRuhi: adadRuhiResult,
                summary: { text: summaryText, quality: summaryQuality },
            });
            setIsLoading(false);
        }, 1000);

    }, [inputs, t]);

    const fullResultText = useMemo(() => {
        if (!result) return '';
        return `تحلیل سعد و نحس طالع
================================
جمع‌بندی: ${result.summary.text}
================================
جزئیات:
1. طالع اسمی: عدد ${result.talehAsmi.number} - ${result.talehAsmi.description}
2. طالع روز تولد: ${t(`day_of_birth_${result.dayOfBirth.key}_day`)} (کوکب: ${result.dayOfBirth.planet}) - ${result.dayOfBirth.description}
3. طالع روحی: عدد ${result.adadRuhi.number} - ${result.adadRuhi.description}
        `.trim();
    }, [result, t]);

    return (
        <Card>
            <div className="text-center">
                <h4 className="text-3xl font-semibold text-white font-lalezar tracking-wide">{t('taleh_calc_title')}</h4>
                <p className="font-tanha text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4">{t('taleh_calc_desc')}</p>
            </div>
            
            {!result ? (
                 <div className="mt-8 max-w-2xl mx-auto space-y-4 animate-fade-in">
                    <div className="space-y-4">
                        <input type="text" name="name" placeholder={t('name_placeholder')} value={inputs.name} onChange={handleInputChange} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500" />
                        <input type="text" name="motherName" placeholder={t('mother_name_placeholder')} value={inputs.motherName} onChange={handleInputChange} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500" />
                        <select name="birthDayOfWeek" value={inputs.birthDayOfWeek} onChange={handleInputChange} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500">
                            <option value="" disabled>{t('birth_day_label')}</option>
                            {dayOfBirthData.map((day, index) => <option key={day.key} value={index}>{t(`day_of_birth_${day.key}_day`)}</option>)}
                        </select>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <input type="number" name="birthDay" placeholder={t('birth_day_number_placeholder')} value={inputs.birthDay} onChange={handleInputChange} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500" min="1" max="31" />
                        <input type="number" name="birthMonth" placeholder={t('birth_month_number_placeholder')} value={inputs.birthMonth} onChange={handleInputChange} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500" min="1" max="12" />
                    </div>
                    {error && <p className="text-red-400 text-center font-tanha">{error}</p>}
                    <button onClick={handleCalculate} disabled={isLoading || !inputs.name || !inputs.motherName || inputs.birthDayOfWeek === '' || !inputs.birthDay || !inputs.birthMonth} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg transform hover:-translate-y-1">
                        {isLoading ? <Spinner small /> : t('get_taleh_analysis_button')}
                    </button>
                    <FormulaExplanation>
                        <p>کیفیت طالع شما از ترکیب سه عامل سنجیده می‌شود:</p>
                        <ol>
                            <li><strong>طالع اسمی:</strong> بر اساس عدد ریشه (۱-۹) حاصل از جمع ابجد نام و نام مادر.</li>
                            <li><strong>طالع روز تولد:</strong> هر روز هفته تحت حاکمیت یک سیاره سعد یا نحس است.</li>
                            <li><strong>طالع روحی:</strong> بر اساس عدد ریشه (۱-۹) حاصل از جمع روز و ماه تولد.</li>
                        </ol>
                        <p>اگر حداقل دو عامل از این سه، سعد باشند، طالع کلی شما سعد است. اگر دو عامل نحس باشند، طالع کلی نحس است. در غیر این صورت، طالع نوسانی و تحت تاثیر انتخاب‌های شماست.</p>
                    </FormulaExplanation>
                </div>
            ) : (
                <div className="mt-12 space-y-8 animate-fade-in printable-content">
                    <ResultCard title={t('taleh_summary_title')} quality={result.summary.quality}>
                        <p className="text-lg">{result.summary.text}</p>
                    </ResultCard>

                    <div className="grid lg:grid-cols-3 gap-6">
                        <ResultCard title={t('taleh_asmi_title')} quality={result.talehAsmi.quality}>
                            <p><strong>{t('taleh_number_label')}: {result.talehAsmi.number}</strong></p>
                            <p>{result.talehAsmi.description}</p>
                        </ResultCard>
                        <ResultCard title={t('taleh_day_title')} quality={result.dayOfBirth.quality}>
                            <p><strong>{t('day_label')}: {t(`day_of_birth_${result.dayOfBirth.key}_day`)} ({t('planet_label')}: {result.dayOfBirth.planet})</strong></p>
                            <p>{result.dayOfBirth.description}</p>
                        </ResultCard>
                        <ResultCard title={t('taleh_ruhi_title')} quality={result.adadRuhi.quality}>
                            <p><strong>{t('ruhi_number_label')}: {result.adadRuhi.number}</strong></p>
                            <p>{result.adadRuhi.description}</p>
                        </ResultCard>
                    </div>

                    <ConversionMethods />
                    <ResultActions textToCopy={fullResultText} />
                    <div className="text-center pt-8 print-actions">
                        <button onClick={() => setResult(null)} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                            {t('new_calculation_button')}
                        </button>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default TalehCalculator;