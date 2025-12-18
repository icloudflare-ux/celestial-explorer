import React, { useState, useCallback } from 'react';
import { calculateAbjad, calculateAbjadSaghir } from '../utils/abjad';
import Card from './common/Card';
import { useTranslation } from '../contexts/i18n';
import FormulaExplanation from './common/FormulaExplanation';

const AbjadCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [text, setText] = useState('');
    const [result, setResult] = useState<{ kabir: number; saghir: number } | null>(null);

    const handleCalculate = useCallback(() => {
        if (!text.trim()) {
            setResult(null);
            return;
        }
        const kabir = calculateAbjad(text);
        const saghir = calculateAbjadSaghir(text);
        setResult({ kabir, saghir });
    }, [text]);

    return (
        <Card>
            <div className="text-center">
                <h4 className="text-3xl font-semibold text-white font-lalezar tracking-wide">{t('abjad_calculator_title')}</h4>
                <p className="font-tanha text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4">{t('abjad_calculator_desc')}</p>
            </div>

            <div className="mt-8 max-w-2xl mx-auto space-y-4">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={t('abjad_calculator_placeholder')}
                    rows={4}
                    className="w-full bg-slate-800/50 border-slate-600 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 text-lg font-tanha"
                />
                <button
                    onClick={handleCalculate}
                    disabled={!text.trim()}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg transform hover:-translate-y-1"
                >
                    {t('abjad_calculator_button')}
                </button>
            </div>

            {result && (
                <div className="mt-10 animate-fade-in">
                    <div className="grid md:grid-cols-2 gap-6 text-center">
                        <div className="bg-slate-800/50 p-6 rounded-lg border-t-4 border-cyan-500">
                            <h5 className="text-2xl font-lalezar text-cyan-300">{t('abjad_kabir')}</h5>
                            <p className="font-roboto-mono text-6xl font-bold text-white my-2" style={{ textShadow: '0 0 10px rgba(34, 211, 238, 0.4)' }}>{result.kabir}</p>
                        </div>
                        <div className="bg-slate-800/50 p-6 rounded-lg border-t-4 border-amber-500">
                            <h5 className="text-2xl font-lalezar text-amber-300">{t('abjad_saghir')}</h5>
                            <p className="font-roboto-mono text-6xl font-bold text-white my-2" style={{ textShadow: '0 0 10px rgba(252, 211, 77, 0.4)' }}>{result.saghir}</p>
                        </div>
                    </div>
                </div>
            )}

            <FormulaExplanation title={t('abjad_explanation_title')}>
                <p>{t('abjad_explanation_p1')}</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                    <li><strong>{t('abjad_kabir')}:</strong> {t('abjad_explanation_kabir')}</li>
                    <li><strong>{t('abjad_saghir')}:</strong> {t('abjad_explanation_saghir')}</li>
                </ul>
            </FormulaExplanation>

        </Card>
    );
};

export default AbjadCalculator;
