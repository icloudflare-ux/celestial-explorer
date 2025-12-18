import React, { useState, useCallback } from 'react';
import { generateRamalChart, getFigureInfo, RamalFigureShape } from '../utils/ramal';
import Card from './common/Card';
import { useTranslation } from '../contexts/i18n';
import FormulaExplanation from './common/FormulaExplanation';

const FigureDisplay: React.FC<{ shape: RamalFigureShape }> = ({ shape }) => (
    <div className="flex flex-col items-center space-y-1.5">
        {shape.map((dot, index) => (
            <div key={index} className="flex space-x-1">
                <span className={`w-2 h-2 rounded-full bg-white`}></span>
                {dot === 0 && <span className={`w-2 h-2 rounded-full bg-white`}></span>}
            </div>
        ))}
    </div>
);

const RamalCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [chart, setChart] = useState<RamalFigureShape[] | null>(null);

    const handleCast = useCallback(() => {
        const newChart = generateRamalChart();
        setChart(newChart);
    }, []);

    const houses = Array.from({ length: 16 }, (_, i) => ({
        titleKey: `ramal_house_${i + 1}_title`,
        descKey: `ramal_house_${i + 1}_desc`,
    }));

    return (
        <Card>
            <div className="text-center">
                <h4 className="text-3xl font-semibold text-white font-lalezar tracking-wide">{t('ramal_title')}</h4>
                <p className="font-tanha text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4">{t('ramal_desc')}</p>
            </div>

            <div className="text-center my-10">
                <button
                    onClick={handleCast}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 text-2xl font-lalezar tracking-wider shadow-lg shadow-indigo-500/30 transform hover:-translate-y-1"
                >
                    {t('ramal_cast_button')}
                </button>
            </div>

            {chart && (
                <div className="animate-fade-in">
                    <h3 className="text-3xl font-lalezar text-center mb-8 text-indigo-300">{t('ramal_chart_title')}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {chart.map((shape, index) => {
                            const info = getFigureInfo(shape);
                            let qualityColor = '';
                            if (info.quality === 'سعد') qualityColor = 'border-green-500';
                            else if (info.quality === 'نحس') qualityColor = 'border-red-500';
                            else qualityColor = 'border-yellow-500';

                            return (
                                <div key={index} className={`bg-slate-800/50 p-4 rounded-lg border-t-4 ${qualityColor} flex flex-col items-center text-center`}>
                                    <span className="font-roboto-mono text-sm text-gray-400 mb-2">خانه {index + 1}</span>
                                    <FigureDisplay shape={shape} />
                                    <span className="font-lalezar text-xl text-white mt-3">{t(info.translationKey)}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-12">
                        <h3 className="text-3xl font-lalezar text-center mb-8 text-indigo-300">{t('ramal_house_analysis_title')}</h3>
                        <div className="grid md:grid-cols-2 gap-6 font-tanha">
                            {houses.map((house, index) => (
                                <div key={index} className="bg-slate-800/40 p-4 rounded-lg flex items-start gap-4">
                                    <div className="bg-slate-900/70 text-indigo-300 font-bold rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center font-roboto-mono text-lg">{index + 1}</div>
                                    <div>
                                        <h5 className="font-bold text-lg text-gray-100">{t(house.titleKey)}</h5>
                                        <p className="text-gray-400">{t(house.descKey)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            )}
            
            <FormulaExplanation title={t('ramal_explanation_title')}>
                <p>{t('ramal_explanation_p1')}</p>
                <ol>
                    <li><strong>{t('ramal_explanation_step1_title')}:</strong> {t('ramal_explanation_step1_desc')}</li>
                    <li><strong>{t('ramal_explanation_step2_title')}:</strong> {t('ramal_explanation_step2_desc')}</li>
                    <li><strong>{t('ramal_explanation_step3_title')}:</strong> {t('ramal_explanation_step3_desc')}</li>
                    <li><strong>{t('ramal_explanation_step4_title')}:</strong> {t('ramal_explanation_step4_desc')}</li>
                </ol>
            </FormulaExplanation>

        </Card>
    );
};

export default RamalCalculator;
