
import React, { useState, useCallback } from 'react';
import { generateElectionalAnalysis } from '../services/geminiService';
import Card from './common/Card';
import Spinner from './common/Spinner';
import FormattedReading from './common/FormattedReading';
import ResultActions from './common/ResultActions';

const eventTypes = [
    'ازدواج و عقد',
    'شروع کسب و کار',
    'انعقاد قرارداد مهم',
    'آغاز سفر',
    'خرید و فروش ملک',
    'امور درمانی و جراحی'
];

const ElectionalCalculator: React.FC = () => {
    const [eventType, setEventType] = useState(eventTypes[0]);
    const [dateRange, setDateRange] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!eventType || !dateRange) {
            setError("لطفاً نوع امر و بازه زمانی مورد نظر را مشخص کنید.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setAnalysis('');
        
        try {
            const result = await generateElectionalAnalysis(eventType, dateRange);
            setAnalysis(result);
        } catch (e: any) {
            setError(e.message || "خطا در تولید تحلیل. لطفاً بعداً دوباره امتحان کنید.");
        } finally {
            setIsLoading(false);
        }
    }, [eventType, dateRange]);

    return (
        <Card>
            <h4 className="text-3xl font-semibold text-white font-lalezar tracking-wide text-center">علم اختیارات (Electional Astrology)</h4>
            <p className="font-tanha text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4 text-center">
                این شاخه از علم نجوم به شما کمک می‌کند تا بهترین و سعدترین زمان را برای انجام یک کار مهم (مانند ازدواج، شروع کسب و کار یا سفر) انتخاب کنید. با مشخص کردن نوع امر و بازه زمانی، توصیه‌هایی برای انتخاب بهترین وقت دریافت کنید.
            </p>
            
            {!analysis && !isLoading ? (
                <div className="mt-8 max-w-2xl mx-auto space-y-4 animate-fade-in">
                    <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500 text-lg">
                        {eventTypes.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                    <input type="text" value={dateRange} onChange={(e) => setDateRange(e.target.value)} placeholder="بازه زمانی مورد نظر (مثال: هفته آینده، ماه مهر)" className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500" />
                    {error && <p className="text-red-400 text-center font-tanha">{error}</p>}
                    <button onClick={handleGenerate} disabled={isLoading || !eventType || !dateRange} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg transform hover:-translate-y-1">
                        {isLoading ? <Spinner small /> : 'یافتن بهترین زمان'}
                    </button>
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
                         <button onClick={() => setAnalysis('')} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">انجام تحلیل جدید</button>
                    </div>
                </div>
            )}
            {isLoading && (
                <div className="flex flex-col items-center justify-center h-full mt-8">
                    <Spinner />
                    <p className="mt-4 text-gray-300 font-tanha">در حال بررسی موقعیت کواکب...</p>
                </div>
            )}
        </Card>
    );
};

export default ElectionalCalculator;
