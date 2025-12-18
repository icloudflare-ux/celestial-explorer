import React, { useState, useCallback, useEffect } from 'react';
import { generateHoroscopeAnalysis, generateBirthChartData } from '../services/geminiService';
import Card from './common/Card';
import Spinner from './common/Spinner';
import FormattedReading from './common/FormattedReading';
import ResultActions from './common/ResultActions';
import { Profile, BirthChartData } from '../types';
import { useTranslation } from '../contexts/i18n';
import FormulaExplanation from './common/FormulaExplanation';
import BirthChart from './BirthChart';

interface HoroscopeCalculatorProps {
    activeProfile: Profile | null;
}

const HoroscopeCalculator: React.FC<HoroscopeCalculatorProps> = ({ activeProfile }) => {
    const { t } = useTranslation();
    const [birthDate, setBirthDate] = useState('');
    const [birthTime, setBirthTime] = useState('');
    const [birthCity, setBirthCity] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [chartData, setChartData] = useState<BirthChartData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (activeProfile) {
            setBirthDate(activeProfile.birthDate);
            setBirthTime(activeProfile.birthTime);
            setBirthCity(activeProfile.birthCity);
        } else {
            setBirthDate('');
            setBirthTime('');
            setBirthCity('');
        }
        // Clear results when profile changes
        setAnalysis('');
        setChartData(null);
    }, [activeProfile]);

    const handleGenerate = useCallback(async () => {
        if (!birthDate || !birthTime || !birthCity) {
            setError(t('error_horoscope_all_fields'));
            return;
        }
        setIsLoading(true);
        setError(null);
        setAnalysis('');
        setChartData(null);
        
        try {
            // Fetch both chart data and analysis in parallel for better performance
            const [chartResult, analysisResult] = await Promise.all([
                generateBirthChartData(birthDate, birthTime, birthCity),
                generateHoroscopeAnalysis(birthDate, birthTime, birthCity)
            ]);
            
            if (chartResult) {
                setChartData(chartResult);
            } else {
                console.error("Failed to generate birth chart data.");
            }

            setAnalysis(analysisResult);

        } catch (e: any) {
            setError(e.message || t('error_horoscope_generic'));
        } finally {
            setIsLoading(false);
        }
    }, [birthDate, birthTime, birthCity, t]);

    const handleNew = () => {
        setAnalysis('');
        setChartData(null);
        setError(null);
    };

    return (
        <Card>
            <h4 className="text-3xl font-semibold text-white font-lalezar tracking-wide text-center">{t('horoscope_calc_title')}</h4>
            <p className="font-tanha text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4 text-center">
                {t('horoscope_calc_desc')}
            </p>
            
            {!chartData && !analysis && !isLoading ? (
                <div className="mt-8 max-w-2xl mx-auto space-y-4 animate-fade-in">
                    <input type="text" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} placeholder={t('horoscope_birthdate_placeholder')} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500" />
                    <input type="text" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} placeholder={t('horoscope_birthtime_placeholder')} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500" />
                    <input type="text" value={birthCity} onChange={(e) => setBirthCity(e.target.value)} placeholder={t('horoscope_birthcity_placeholder')} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500" />
                    {error && <p className="text-red-400 text-center font-tanha">{error}</p>}
                    <button onClick={handleGenerate} disabled={isLoading || !birthDate || !birthTime || !birthCity} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg transform hover:-translate-y-1">
                        {isLoading ? <Spinner small /> : t('get_horoscope_analysis_button')}
                    </button>
                    <FormulaExplanation>
                        <p>تحلیل زایچه یک فرآیند پیچیده است که هوش مصنوعی آن را شبیه‌سازی می‌کند:</p>
                        <ul>
                            <li><strong>محاسبه نقشه آسمان:</strong> بر اساس تاریخ، ساعت و موقعیت جغرافیایی، موقعیت سیارات اصلی (شمس، قمر، عطارد و...) و طالع (Ascendant) در برج‌های دوازده‌گانه تخمین زده می‌شود.</li>
                            <li><strong>تحلیل روایی:</strong> هوش مصنوعی با در نظر گرفتن تعامل انرژی این عوامل کلیدی، یک تحلیل یکپارچه و داستانی از شخصیت و مسیر زندگی شما ارائه می‌دهد.</li>
                        </ul>
                    </FormulaExplanation>
                </div>
            ) : null}
            
            {(chartData || analysis) && !isLoading && (
                <div className="mt-8 animate-fade-in space-y-8">
                    {chartData && <BirthChart chartData={chartData} />}
                    
                    {analysis && (
                        <div className="bg-black/40 rounded-lg p-6 flex flex-col border border-slate-800 printable-content">
                            <h3 className="text-3xl font-lalezar text-center mb-6 text-indigo-300">تحلیل زایچه</h3>
                            <div className="flex-grow">
                                <FormattedReading text={analysis} />
                            </div>
                            <ResultActions textToCopy={analysis} />
                        </div>
                    )}
                    
                    <div className="text-center mt-6">
                         <button onClick={handleNew} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">{t('new_horoscope_analysis_button')}</button>
                    </div>
                </div>
            )}
             {isLoading && (
                <div className="flex flex-col items-center justify-center h-full mt-8">
                    <Spinner />
                    <p className="mt-4 text-gray-300 font-tanha">{t('loading_horoscope_analysis')}</p>
                </div>
            )}
        </Card>
    );
};

export default HoroscopeCalculator;