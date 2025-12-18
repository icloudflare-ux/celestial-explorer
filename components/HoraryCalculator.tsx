import React, { useState, useCallback } from 'react';
import { generateHoraryAnswer } from '../services/geminiService';
import Card from './common/Card';
import Spinner from './common/Spinner';
import FormattedReading from './common/FormattedReading';
import ResultActions from './common/ResultActions';
import { useTranslation } from '../contexts/i18n';

type TimeMode = 'now' | 'past' | 'future';

const HoraryCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [timeMode, setTimeMode] = useState<TimeMode>('now');
    const [customDate, setCustomDate] = useState('');
    const [customTime, setCustomTime] = useState('');

    const handleGenerate = useCallback(async () => {
        if (!question.trim()) {
            setError(t('horary_error_question'));
            return;
        }

        let timestamp: Date;
        if (timeMode === 'now') {
            timestamp = new Date();
        } else {
            if (!customDate || !customTime) {
                setError("لطفا تاریخ و ساعت را برای زمان گذشته یا آینده وارد کنید.");
                return;
            }
            // A simple attempt to parse Persian-like date strings.
            // The AI will receive the original strings, which is more important.
            // This Date object is mainly for context (past/future).
            const dateStringForParsing = customDate.replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/[/]/g, '-');
            const timeStringForParsing = customTime.replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
            timestamp = new Date(`${dateStringForParsing}T${timeStringForParsing}`);
            
            // Override the locale string to ensure the AI gets the exact input
            timestamp.toLocaleString = () => `${customDate} ${customTime}`;
        }

        setIsLoading(true);
        setError(null);
        setAnswer('');
        
        const getAnswer = (position: GeolocationPosition | null) => {
            const location = position ? { latitude: position.coords.latitude, longitude: position.coords.longitude } : null;
            generateHoraryAnswer(question, timestamp, location)
                .then(result => setAnswer(result))
                .catch(e => setError(e.message || "خطا در تولید تحلیل."))
                .finally(() => setIsLoading(false));
        };

        navigator.geolocation.getCurrentPosition(
            position => getAnswer(position),
            () => getAnswer(null), // Proceed without location on error
            { timeout: 5000 }
        );
    }, [question, timeMode, customDate, customTime, t]);
    
    const TimeModeSelector = () => (
        <div className="mb-4">
            <label className="block text-lg font-tanha text-gray-300 mb-3 text-center">{t('horary_select_time')}</label>
            <div className="flex justify-center bg-slate-900/50 rounded-lg p-1.5 border border-slate-700">
                {(['now', 'past', 'future'] as TimeMode[]).map(mode => (
                    <button
                        key={mode}
                        onClick={() => setTimeMode(mode)}
                        className={`w-1/3 py-2 text-center rounded-md transition-all duration-300 font-semibold ${timeMode === mode ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:bg-slate-700/50'}`}
                    >
                        {t(`horary_time_${mode}`)}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <Card>
            <h4 className="text-3xl font-semibold text-white font-lalezar tracking-wide text-center">{t('horary_calc_title')}</h4>
            <p className="font-tanha text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4 text-center">
                {t('horary_calc_desc')}
            </p>
            
            {!answer && !isLoading ? (
                <div className="mt-8 max-w-2xl mx-auto space-y-4 animate-fade-in">
                    <textarea 
                        value={question} 
                        onChange={(e) => setQuestion(e.target.value)} 
                        placeholder="پرسش خود را در اینجا بنویسید... (مثال: آیا این معامله به سرانجام می‌رسد؟)" 
                        rows={4}
                        className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500"
                    />
                    
                    <TimeModeSelector />

                    {timeMode !== 'now' && (
                        <div className="grid sm:grid-cols-2 gap-4 animate-fade-in-down">
                            <input type="text" value={customDate} onChange={e => setCustomDate(e.target.value)} placeholder={t('horary_date_placeholder')} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500"/>
                            <input type="text" value={customTime} onChange={e => setCustomTime(e.target.value)} placeholder={t('horary_time_placeholder')} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500"/>
                        </div>
                    )}

                    {error && <p className="text-red-400 text-center font-tanha">{error}</p>}
                    <button onClick={handleGenerate} disabled={isLoading || !question} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg transform hover:-translate-y-1">
                        {isLoading ? <Spinner small /> : t('horary_get_answer_button')}
                    </button>
                    <p className="text-xs text-gray-500 text-center pt-2">برای دقت بیشتر، این ابزار از موقعیت مکانی شما استفاده می‌کند.</p>
                </div>
            ) : null }

            {answer && (
                 <div className="mt-8 animate-fade-in">
                    <div className="bg-black/40 rounded-lg p-6 min-h-[300px] flex flex-col border border-slate-800 printable-content">
                        <p className="font-tanha text-gray-400 mb-4 border-b border-slate-700/50 pb-3"><strong>پرسش شما:</strong> {question}</p>
                        <div className="flex-grow">
                            <FormattedReading text={answer} />
                        </div>
                        <ResultActions textToCopy={`پرسش: ${question}\n\nپاسخ:\n${answer}`} />
                    </div>
                    <div className="text-center mt-6">
                         <button onClick={() => {setAnswer(''); setQuestion('');}} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">{t('horary_new_question_button')}</button>
                    </div>
                </div>
            )}
            {isLoading && (
                <div className="flex flex-col items-center justify-center h-full mt-8">
                    <Spinner />
                    <p className="mt-4 text-gray-300 font-tanha">{t('horary_loading_text')}</p>
                </div>
            )}
        </Card>
    );
};

export default HoraryCalculator;