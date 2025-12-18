import React, { useState, useCallback } from 'react';
import { generateJafarAnswer } from '../services/geminiService';
import Card from './common/Card';
import Spinner from './common/Spinner';
import ResultActions from './common/ResultActions';
import { useTranslation } from '../contexts/i18n';
import FormulaExplanation from './common/FormulaExplanation';

interface JafarResult {
    steps: string[];
    finalAnswer: string;
}

const JafarResultDisplay: React.FC<{ result: JafarResult, question: string }> = ({ result, question }) => {
    const fullTextToCopy = `
سؤال: ${question}
====================
مراحل مستحصله:
${result.steps.join('\n')}
====================
پاسخ نهایی:
${result.finalAnswer}
    `.trim();

    return (
        <div className="mt-8 animate-fade-in printable-content">
            <div className="bg-black/40 rounded-lg p-6 min-h-[300px] flex flex-col border border-slate-800">
                <p className="font-tanha text-gray-400 mb-4 border-b border-slate-700/50 pb-3"><strong>سؤال شما:</strong> {question}</p>
                <div className="flex-grow space-y-6">
                    <div>
                        <h4 className="font-lalezar text-xl text-indigo-300 mb-2">مراحل مستحصله:</h4>
                        <div className="font-roboto-mono text-gray-300 space-y-2 text-sm bg-slate-900/50 p-4 rounded-md">
                            {result.steps.map((step, index) => (
                                <p key={index} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>{step}</p>
                            ))}
                        </div>
                    </div>
                    <div className="pt-6 border-t border-slate-700/50">
                        <h4 className="font-lalezar text-xl text-indigo-300 mb-2">پاسخ نهایی:</h4>
                        <p className="font-amiri text-3xl text-amber-300 leading-relaxed text-center" style={{ textShadow: '0 0 15px rgba(252, 211, 77, 0.4)' }}>
                           « {result.finalAnswer} »
                        </p>
                    </div>
                </div>
                <ResultActions textToCopy={fullTextToCopy} />
            </div>
        </div>
    );
};

const JafarCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [question, setQuestion] = useState('');
    const [result, setResult] = useState<JafarResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!question.trim()) {
            setError("لطفاً سؤال خود را وارد کنید.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await generateJafarAnswer(question);
            if (!res) throw new Error("پاسخی از سرویس هوش مصنوعی دریافت نشد.");
            setResult(res);
        } catch (e: any) {
            setError(e.message || "خطا در تولید پاسخ. لطفاً بعداً دوباره امتحان کنید.");
        } finally {
            setIsLoading(false);
        }
    }, [question]);

    return (
        <Card>
            <div className="text-center">
                <h4 className="text-3xl font-semibold text-white font-lalezar tracking-wide">{t('jafar_title')}</h4>
                <p className="font-tanha text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4">{t('jafar_desc')}</p>
            </div>

            {!result && !isLoading ? (
                <div className="mt-8 max-w-2xl mx-auto space-y-4 animate-fade-in">
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder={t('jafar_placeholder')}
                        rows={5}
                        className="w-full bg-slate-800/50 border-slate-600 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 text-lg font-tanha"
                    />
                    {error && <p className="text-red-400 text-center font-tanha">{error}</p>}
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !question}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg transform hover:-translate-y-1"
                    >
                        {isLoading ? <Spinner small /> : t('jafar_button')}
                    </button>
                    <FormulaExplanation title="روش مستحصله چگونه کار می‌کند؟">
                        <p>علم جفر فرآیندی پیچیده و الگوریتمیک برای تبدیل حروف یک سؤال به یک جواب است. این ابزار با استفاده از هوش مصنوعی، مراحل اصلی این فرآیند را شبیه‌سازی می‌کند:</p>
                        <ul>
                            <li><strong>مرحله اساس:</strong> حروف سؤال تجزیه و در یک جدول مبنا قرار می‌گیرند.</li>
                            <li><strong>مرحله نظیره:</strong> هر حرف به حرف متناظر خود در دایره ابجد تبدیل می‌شود.</li>
                            <li><strong>مرحله مستحصله:</strong> از ترکیب نتایج مراحل قبل و اعمال قوانین دیگر، حروف جواب استخراج شده و در نهایت به یک جمله معنادار تبدیل می‌شوند.</li>
                        </ul>
                        <p>این ابزار یک شبیه‌سازی مدرن از این دانش کهن است و پاسخی الهام‌بخش ارائه می‌دهد.</p>
                    </FormulaExplanation>
                </div>
            ) : null}

            {isLoading && (
                <div className="flex flex-col items-center justify-center h-full mt-8">
                    <Spinner />
                    <p className="mt-4 text-gray-300 font-tanha">{t('jafar_loading')}</p>
                </div>
            )}
            
            {result && (
                <>
                    <JafarResultDisplay result={result} question={question} />
                    <div className="text-center mt-6">
                        <button onClick={() => { setResult(null); setQuestion(''); }} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">طرح سؤال جدید</button>
                    </div>
                </>
            )}

        </Card>
    );
};

export default JafarCalculator;
