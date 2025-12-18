import React, { useState, useCallback, useEffect } from 'react';
import { generateQarinName } from '../services/geminiService';
import { calculateAbjad, abjadMap } from '../utils/abjad';
import { QarinResult, Profile } from '../types';
import Card from './common/Card';
import Spinner from './common/Spinner';
import QarinResultGuide from './QarinResultGuide';
import { useTranslation } from '../contexts/i18n';
import FormulaExplanation from './common/FormulaExplanation';
import { parseFlexibleDate } from '../utils/dateConverter';

interface QarinCalculatorProps {
    activeProfile: Profile | null;
}

const rootLetterMap: { [key: number]: string } = {
    1: 'ق', 2: 'ن', 3: 'ح', 4: 'ع', 5: 'س', 6: 'و', 7: 'ل', 8: 'غ', 9: 'ن',
};

const QarinCalculator: React.FC<QarinCalculatorProps> = ({ activeProfile }) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [birthDay, setBirthDay] = useState<string>('');
    const [result, setResult] = useState<QarinResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [view, setView] = useState<'form' | 'result'>('form');

     useEffect(() => {
        if (activeProfile) {
            setName(activeProfile.name);
            setMotherName(activeProfile.motherName);
            const parsedDate = parseFlexibleDate(activeProfile.birthDate);
            const day = parsedDate ? parsedDate.day : '';
            setBirthDay(day || '');
        } else {
            setName('');
            setMotherName('');
            setBirthDay('');
        }
    }, [activeProfile]);

    const handleGenerate = useCallback(async () => {
        const day = parseInt(birthDay, 10);
        if (!name || !motherName || !birthDay || isNaN(day) || day < 1 || day > 31) {
            setError(t('qarin_error_all_fields'));
            return;
        }
        
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const nameAbjad = calculateAbjad(name);
            const motherAbjad = calculateAbjad(motherName);
            const totalSum = nameAbjad + motherAbjad + day;
            let rootNumber = totalSum;
            while (rootNumber > 9) {
                rootNumber = String(rootNumber).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
            }
            if (rootNumber === 0 && totalSum > 0) rootNumber = 9;

            const startLetter = rootLetterMap[rootNumber];
            if (!startLetter) throw new Error(t('qarin_error_start_letter'));

            if (name.length < 2) throw new Error(t('qarin_error_name_length'));
            const middleLetter = name[1];
            
            let finalLetter = '';
            for (let i = motherName.length - 1; i >= 0; i--) {
                const char = motherName[i];
                const val = abjadMap[char];
                if (val !== undefined && val < 10) {
                    finalLetter = char;
                    break;
                }
            }

            if (!finalLetter && motherName.length > 0) {
                let minAbjad = Infinity;
                let minAbjadChar = '';
                
                for (const char of motherName) {
                    const val = abjadMap[char];
                    if (val !== undefined && val < minAbjad) {
                        minAbjad = val;
                        minAbjadChar = char;
                    }
                }
                finalLetter = minAbjadChar;
            }

            if (!finalLetter) {
                throw new Error(t('qarin_error_final_letter', { motherName }));
            }

            const letters = [startLetter, middleLetter, finalLetter];
            const aiResult = await generateQarinName(letters);

            if (!aiResult) throw new Error(t('qarin_error_ai'));

            setResult({
                name, motherName, birthDay: day, totalAbjad: totalSum, rootNumber,
                startLetter, middleLetter, finalLetter,
                qarinName: aiResult.name, explanation: aiResult.explanation,
            });
            setView('result');

        } catch (e: any) {
            setError(e.message || t('qarin_error_unknown'));
        } finally {
            setIsLoading(false);
        }
    }, [name, motherName, birthDay, t]);

    const handleBackToForm = () => {
        setView('form');
        setResult(null);
        setError(null);
    };
    
    if (view === 'result' && result) {
        return (
            <Card>
                <QarinResultGuide result={result} onBack={handleBackToForm} />
            </Card>
        );
    }

    return (
        <Card>
            <div className="space-y-6">
                <div className="text-center">
                    <h4 className="text-3xl font-semibold text-white font-lalezar tracking-wide">{t('qarin_title')}</h4>
                    <p className="font-tanha text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4" dangerouslySetInnerHTML={{__html: t('qarin_desc')}} />
                </div>
                
                <div className="max-w-xl mx-auto space-y-4">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('name_placeholder')} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500" />
                    <input type="text" value={motherName} onChange={(e) => setMotherName(e.target.value)} placeholder={t('mother_name_placeholder')} className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500" />
                    <div>
                        <label htmlFor="qarin-day" className="sr-only">{t('qarin_day_label')}</label>
                        <input type="number" id="qarin-day" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} placeholder={t('qarin_day_placeholder')} min="1" max="31" className="w-full bg-slate-800/50 border-slate-600 text-white rounded-md p-3 focus:ring-2 focus:ring-indigo-500 transition"/>
                    </div>
                
                    <button onClick={handleGenerate} disabled={isLoading || !name || !motherName || !birthDay} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg transform hover:-translate-y-1">
                        {isLoading ? <Spinner small /> : t('qarin_button_text')}
                    </button>
                    {error && <p className="text-red-400 text-center font-tanha">{error}</p>}
                </div>

                 <FormulaExplanation>
                    <p>نام قرین از سه حرف تشکیل می‌شود:</p>
                    <ol>
                        <li><strong>حرف اول:</strong> از جمع ابجد نام شما + نام مادر + روز تولد به دست می‌آید. حاصل جمع آنقدر با خودش جمع می‌شود تا به یک عدد ریشه (۱ تا ۹) برسد. هر عدد ریشه متناظر با یک حرف است (۱=ق، ۲=ن، ...).</li>
                        <li><strong>حرف دوم:</strong> دومین حرف از نام کوچک شماست.</li>
                        <li><strong>حرف سوم:</strong> اولین حرف با مقدار ابجد کمتر از ۱۰ از انتهای نام مادر استخراج می‌شود.</li>
                    </ol>
                    <p>سپس این سه حرف به هوش مصنوعی داده می‌شود تا یک نام خوش‌آهنگ و معنادار بسازد.</p>
                </FormulaExplanation>
            </div>
        </Card>
    );
};

export default QarinCalculator;