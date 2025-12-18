
import React, { useState, useCallback } from 'react';
import { generateScientificReport } from '../services/geminiService';
import Card from './common/Card';
import Spinner from './common/Spinner';
import FormattedReading from './common/FormattedReading';
import ResultActions from './common/ResultActions';
import { useTranslation } from '../contexts/i18n';

const ScientificCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [celestialBody, setCelestialBody] = useState('');
  const [report, setReport] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!celestialBody) return;
    setIsLoading(true);
    setReport('');
    const result = await generateScientificReport(celestialBody);
    setReport(result);
    setIsLoading(false);
  }, [celestialBody]);
  
  return (
    <Card>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <h4 className="text-3xl font-semibold text-white font-lalezar tracking-wide">{t('scientific_calc_title')}</h4>
          <div>
            <label htmlFor="celestialBody" className="block text-sm font-medium text-gray-300 mb-2">{t('celestial_body_name_label')}</label>
            <input
              type="text"
              id="celestialBody"
              value={celestialBody}
              onChange={(e) => setCelestialBody(e.target.value)}
              placeholder={t('celestial_body_placeholder')}
              className="w-full bg-slate-900/50 border-slate-700 text-white rounded-md p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-300"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading || !celestialBody}
            className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-teal-900/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-500/40 transform hover:-translate-y-1"
          >
            {isLoading && <Spinner small />}
            <span className="mx-2">{t('get_report_button')}</span>
          </button>
        </div>
        <div className={`bg-black/40 rounded-lg p-6 min-h-[200px] flex flex-col border border-slate-800 ring-1 ring-indigo-500/10 shadow-inner shadow-indigo-900/10 printable-content ${!report && 'items-center justify-center'}`}>
            {isLoading ? (
                 <Spinner />
            ) : report ? (
              <>
                <div className="flex-grow">
                  <FormattedReading text={report} />
                </div>
                <ResultActions textToCopy={report} />
              </>
            ) : (
                <p className="text-gray-400 text-center font-tanha text-lg">{t('scientific_report_placeholder')}</p>
            )}
        </div>
      </div>
    </Card>
  );
};

export default ScientificCalculator;
