
import React, { useState, useMemo } from 'react';
import Card from './common/Card';
import { generateNadiReading } from '../services/geminiService';
import Spinner from './common/Spinner';

const nadiData = [
  { 
    name: 'آبی', 
    element: 'آب', 
    letters: ['ج', 'ز', 'ک', 'س', 'ق', 'ث', 'ظ'], 
    icon: '💧', 
    colorClasses: 'text-blue-400 border-blue-500 bg-blue-900/20',
  },
  { 
    name: 'خاکی', 
    element: 'خاک', 
    letters: ['ب', 'و', 'ی', 'ن', 'ص', 'ت', 'ض'], 
    icon: '🌳', 
    colorClasses: 'text-emerald-400 border-emerald-500 bg-emerald-900/20',
  },
  { 
    name: 'بادی', 
    element: 'هوا', 
    letters: ['د', 'ح', 'ل', 'ع', 'ر', 'خ', 'غ'], 
    icon: '💨', 
    colorClasses: 'text-cyan-400 border-cyan-500 bg-cyan-900/20',
  },
  { 
    name: 'ناری', 
    element: 'آتش', 
    letters: ['ا', 'ه', 'ط', 'م', 'ف', 'ش', 'ذ'], 
    icon: '🔥', 
    colorClasses: 'text-red-400 border-red-500 bg-red-900/20',
  },
];

interface NadiReading {
    title: string;
    archetype: string;
    coreEssence: string;
    strengths: string[];
    challenges: string[];
    awakeningMantra: string;
    practicalRecommendations: string[];
}

const NadiReadingDisplay: React.FC<{ reading: NadiReading, nadiInfo: typeof nadiData[0] }> = ({ reading, nadiInfo }) => (
    <div className={`mt-10 p-8 rounded-xl border-2 ${nadiInfo.colorClasses.replace('bg-', 'bg-opacity-20 bg-')} backdrop-blur-sm animate-fade-in`}>
        <h3 className={`text-4xl font-lalezar flex items-center justify-center mb-2 ${nadiInfo.colorClasses.replace('border-', 'text-')}`}>
            <span className="text-5xl ml-4">{nadiInfo.icon}</span>
            {reading.title}
        </h3>
        <p className="text-center text-xl text-gray-300 font-tanha mb-8">کهن‌الگوی شما: <strong className={nadiInfo.colorClasses.replace('border-', 'text-')}>{reading.archetype}</strong></p>

        <div className="space-y-8 font-tanha">
            <section>
                <h4 className="text-2xl font-lalezar text-indigo-300 mb-3 border-b-2 border-indigo-500/30 pb-2 inline-block">ذات اصلی انرژی</h4>
                <p className="text-gray-300 leading-loose text-lg">{reading.coreEssence}</p>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8">
                 <section>
                  <h4 className="text-xl font-lalezar text-green-400 mb-4">نقاط قوت</h4>
                  <ul className="space-y-3 list-disc list-inside text-gray-300">
                    {reading.strengths.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </section>
                <section>
                  <h4 className="text-xl font-lalezar text-red-400 mb-4">چالش‌ها</h4>
                  <ul className="space-y-3 list-disc list-inside text-gray-300">
                    {reading.challenges.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </section>
            </div>

            <section className="text-center bg-slate-800/50 p-6 rounded-lg">
                <h4 className="text-xl font-lalezar text-amber-300 mb-3">ذکر بیداری</h4>
                <p className="text-2xl text-white font-semibold font-tanha tracking-wide">« {reading.awakeningMantra} »</p>
            </section>

             <section>
                <h4 className="text-2xl font-lalezar text-cyan-300 mb-4 border-b-2 border-cyan-500/30 pb-2 inline-block">توصیه‌های عملی</h4>
                <ul className="space-y-3 list-disc list-inside text-gray-300 text-lg">
                    {reading.practicalRecommendations.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
        </div>
    </div>
);


const QarinNadiGuide: React.FC = () => {
    const [qarinLetter, setQarinLetter] = useState('');
    const [reading, setReading] = useState<NadiReading | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submittedLetter, setSubmittedLetter] = useState<string | null>(null);

    const nadiInfo = useMemo(() => {
        if (!submittedLetter) return null;
        return nadiData.find(nadi => nadi.letters.includes(submittedLetter));
    }, [submittedLetter]);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        const letter = qarinLetter.trim()[0];
        if (!letter) {
            setError("لطفاً یک حرف وارد کنید.");
            return;
        }

        const foundNadi = nadiData.find(nadi => nadi.letters.includes(letter));
        if (!foundNadi) {
            setError("حرف وارد شده در هیچ یک از دسته‌های نادی یافت نشد. لطفاً حرف را بررسی کنید.");
            setReading(null);
            setSubmittedLetter(null);
            return;
        }

        setIsLoading(true);
        setError(null);
        setReading(null);
        setSubmittedLetter(letter);

        try {
            const result = await generateNadiReading(letter, foundNadi.element, foundNadi.name);
            if (!result) throw new Error("پاسخی از سرویس هوش مصنوعی دریافت نشد.");
            setReading(result);
        } catch (err: any) {
            setError(err.message || "خطا در تولید تحلیل. لطفاً دوباره تلاش کنید.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <Card>
            <div className="text-center">
                <h4 className="text-3xl font-semibold text-white font-lalezar tracking-wide">راهنمای نادی قرین (تحلیل شخصی)</h4>
                <p className="font-tanha text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4">
                    «نادی» کانال اصلی جریان انرژی در وجود شماست که بر اساس حرف اول نام قرین‌تان مشخص می‌شود. با وارد کردن این حرف، یک تحلیل عمیق و شخصی‌سازی شده از طبیعت انرژی، نقاط قوت، چالش‌ها و راهکارهای هماهنگی با آن را دریافت کنید.
                </p>
            </div>

            <form onSubmit={handleGenerate} className="text-center mt-12">
                 <label htmlFor="qarin-letter" className="block text-xl font-tanha text-gray-200 mb-4">
                    برای دریافت تحلیل شخصی، حرف اول نام قرین‌تان را وارد کنید:
                </label>
                <div className="flex justify-center items-center gap-4">
                    <input 
                        id="qarin-letter"
                        type="text"
                        maxLength={1}
                        value={qarinLetter}
                        onChange={(e) => {
                            setQarinLetter(e.target.value);
                            setError(null);
                            setReading(null);
                            setSubmittedLetter(null);
                        }}
                        className="w-24 h-24 bg-slate-800/70 border-2 border-slate-600 text-white rounded-lg p-3 focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 text-center text-6xl font-lalezar"
                        placeholder="ق"
                    />
                    <button type="submit" disabled={isLoading || !qarinLetter} className="h-24 px-8 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 text-white font-bold text-2xl rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg transform hover:-translate-y-1">
                        {isLoading ? <Spinner /> : <span>کشف نادی</span>}
                    </button>
                </div>
            </form>

            <div className="mt-10 min-h-[100px]">
                {error && (
                     <div className="text-center p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 font-tanha animate-fade-in">
                        {error}
                    </div>
                )}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full">
                        <Spinner />
                        <p className="mt-4 text-gray-300 font-tanha">در حال دریافت تحلیل شخصی شما...</p>
                    </div>
                )}
                {reading && nadiInfo && <NadiReadingDisplay reading={reading} nadiInfo={nadiInfo} />}
            </div>

        </Card>
    );
};

export default QarinNadiGuide;
