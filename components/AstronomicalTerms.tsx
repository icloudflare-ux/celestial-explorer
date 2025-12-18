
import React from 'react';
import Card from './common/Card';
import { useTranslation } from '../contexts/i18n';

const AstronomicalTerms: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="terms">
      <h3 className="text-4xl md-text-5xl font-bold text-center mb-12 font-lalezar tracking-wider bg-gradient-to-r from-teal-400 to-cyan-500 text-transparent bg-clip-text">
        {t('terms_main_title')}
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="flex flex-col">
          <h4 className="text-2xl font-lalezar text-teal-300 mb-3">{t('term_ascendant_title')}</h4>
          <p className="text-gray-300 font-tanha leading-relaxed flex-grow">
            {t('term_ascendant_desc')}
          </p>
        </Card>
        <Card className="flex flex-col">
          <h4 className="text-2xl font-lalezar text-teal-300 mb-3">{t('term_ruler_title')}</h4>
          <p className="text-gray-300 font-tanha leading-relaxed flex-grow">
            {t('term_ruler_desc')}
          </p>
        </Card>
        <Card className="flex flex-col">
          <h4 className="text-2xl font-lalezar text-teal-300 mb-3">{t('term_nature_title')}</h4>
          <p className="text-gray-300 font-tanha leading-relaxed flex-grow">
            {t('term_nature_desc')}
          </p>
        </Card>
        <Card className="flex flex-col">
          <h4 className="text-2xl font-lalezar text-teal-300 mb-3">{t('term_dignities_title')}</h4>
          <div className="text-gray-300 font-tanha leading-relaxed flex-grow">
            <p>{t('term_dignities_desc')}</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li dangerouslySetInnerHTML={{ __html: t('term_dignity_exaltation') }} />
              <li dangerouslySetInnerHTML={{ __html: t('term_dignity_fall') }} />
              <li dangerouslySetInnerHTML={{ __html: t('term_dignity_detriment') }} />
            </ul>
          </div>
        </Card>
        <Card className="flex flex-col">
          <h4 className="text-2xl font-lalezar text-teal-300 mb-3">{t('term_planets_type_title')}</h4>
          <div className="text-gray-300 font-tanha leading-relaxed flex-grow">
            <p>{t('term_planets_type_desc')}</p>
            <h5 className="text-xl font-lalezar text-teal-400 mt-4 mb-2">{t('term_planets_classification_title')}</h5>
            <p>{t('term_planets_classification_desc')}</p>
            <div className="mt-4">
              <h6 className="font-semibold text-cyan-400">{t('term_inferior_planets_title')}</h6>
              <ul className="list-disc list-inside mt-2 space-y-1 pr-4" dangerouslySetInnerHTML={{ __html: t('term_inferior_planets_list') }}/>
            </div>
            <div className="mt-4">
              <h6 className="font-semibold text-cyan-400">{t('term_superior_planets_title')}</h6>
              <ul className="list-disc list-inside mt-2 space-y-1 pr-4" dangerouslySetInnerHTML={{ __html: t('term_superior_planets_list') }} />
            </div>
            <h5 className="text-xl font-lalezar text-teal-400 mt-6 mb-2">{t('term_philosophy_basis_title')}</h5>
            <ul className="list-disc list-inside space-y-2 mt-2" dangerouslySetInnerHTML={{ __html: t('term_philosophy_basis_list') }} />
          </div>
        </Card>
        <Card className="flex flex-col">
          <h4 className="text-2xl font-lalezar text-teal-300 mb-3">{t('term_ausp_inausp_title')}</h4>
          <div className="text-gray-300 font-tanha leading-relaxed flex-grow">
              <p className="italic mb-4">{t('term_ausp_inausp_desc')}</p>
              
              <h5 className="text-xl font-lalezar text-teal-400 mt-4 mb-2">{t('term_seven_planets_title')}</h5>
              <div className="mt-2 space-y-4 text-gray-400">
                  <div>
                      <h6 className="font-semibold text-red-400/90">{t('term_malefics_title')}</h6>
                      <ul className="list-disc list-inside mt-2 space-y-1 pr-4" dangerouslySetInnerHTML={{ __html: t('term_malefics_list') }} />
                  </div>
                  <div>
                      <h6 className="font-semibold text-green-400/90">{t('term_benefics_title')}</h6>
                      <ul className="list-disc list-inside mt-2 space-y-1 pr-4" dangerouslySetInnerHTML={{ __html: t('term_benefics_list') }} />
                  </div>
                    <div>
                      <h6 className="font-semibold text-gray-300/90">{t('term_luminaries_title')}</h6>
                      <ul className="list-disc list-inside mt-2 space-y-1 pr-4" dangerouslySetInnerHTML={{ __html: t('term_luminaries_list') }} />
                    </div>
                  <div>
                      <h6 className="font-semibold text-yellow-400/90">{t('term_neutral_title')}</h6>
                      <ul className="list-disc list-inside mt-2 space-y-1 pr-4" dangerouslySetInnerHTML={{ __html: t('term_neutral_list') }} />
                  </div>
              </div>

              <h5 className="text-xl font-lalezar text-teal-400 mt-6 mb-2">{t('term_summary_table_title')}</h5>
              <div className="overflow-x-auto mt-4">
                  <table className="w-full text-center border-collapse border border-slate-700">
                      <thead>
                          <tr className="bg-slate-800/50">
                              <th className="border border-slate-600 p-2 font-lalezar">{t('term_table_planet')}</th>
                              <th className="border border-slate-600 p-2 font-lalezar">{t('term_table_symbol')}</th>
                              <th className="border border-slate-600 p-2 font-lalezar">{t('term_table_ruling')}</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr className="bg-slate-900/30"><td className="border border-slate-700 p-2">{t('term_table_saturn')}</td><td className="border border-slate-700 p-2"><svg className="w-6 h-6 mx-auto text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 100-18 9 9 0 000 18z"/><path d="M12 3v18"/><path d="M18 9H6"/></svg></td><td className="border border-slate-700 p-2 font-bold text-red-400">{t('term_table_major_malefic')}</td></tr>
                          <tr><td className="border border-slate-700 p-2">{t('term_table_mars')}</td><td className="border border-slate-700 p-2"><svg className="w-6 h-6 mx-auto text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="7"/><path d="M17 7l-10 10"/><path d="M17 12V7h-5"/></svg></td><td className="border border-slate-700 p-2 font-bold text-red-400">{t('term_table_minor_malefic')}</td></tr>
                          <tr className="bg-slate-900/30"><td className="border border-slate-700 p-2">{t('term_table_jupiter')}</td><td className="border border-slate-700 p-2"><svg className="w-6 h-6 mx-auto text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13.67V21"/><path d="M6 13.67V21"/><path d="M12 7v14"/><path d="M6 7h12"/></svg></td><td className="border border-slate-700 p-2 font-bold text-green-400">{t('term_table_major_benefic')}</td></tr>
                          <tr><td className="border border-slate-700 p-2">{t('term_table_venus')}</td><td className="border border-slate-700 p-2"><svg className="w-6 h-6 mx-auto text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="6"/><path d="M12 15v9"/><path d="M9 18h6"/></svg></td><td className="border border-slate-700 p-2 font-bold text-green-400">{t('term_table_minor_benefic')}</td></tr>
                          <tr className="bg-slate-900/30"><td className="border border-slate-700 p-2">{t('term_table_sun')}</td><td className="border border-slate-700 p-2"><svg className="w-6 h-6 mx-auto text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg></td><td className="border border-slate-700 p-2 font-bold text-gray-300">{t('term_table_luminary')}</td></tr>
                          <tr><td className="border border-slate-700 p-2">{t('term_table_moon')}</td><td className="border border-slate-700 p-2"><svg className="w-6 h-6 mx-auto text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg></td><td className="border border-slate-700 p-2 font-bold text-gray-300">{t('term_table_luminary')}</td></tr>
                          <tr className="bg-slate-900/30"><td className="border border-slate-700 p-2">{t('term_table_mercury')}</td><td className="border border-slate-700 p-2"><svg className="w-6 h-6 mx-auto text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="6"/><path d="M12 15v9"/><path d="M9 18h6"/><path d="M12 3a3 3 0 100-6 3 3 0 000 6z"/></svg></td><td className="border border-slate-700 p-2 font-bold text-yellow-400">{t('term_table_neutral')}</td></tr>
                      </tbody>
                  </table>
              </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AstronomicalTerms;
