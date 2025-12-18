
import React from 'react';
import Card from './common/Card';
import { useTranslation } from '../contexts/i18n';

const HistorySection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="history">
      <h3 className="text-4xl md:text-5xl font-bold text-center mb-12 font-lalezar tracking-wider bg-gradient-to-r from-indigo-400 to-fuchsia-500 text-transparent bg-clip-text">
        {t('history_main_title')}
      </h3>
      <Card>
        <div className="prose prose-lg prose-invert max-w-none text-gray-300 prose-p:my-4 prose-headings:text-indigo-400 leading-relaxed font-tanha prose-headings:font-lalezar prose-headings:tracking-wider prose-headings:text-2xl">
          <h4 className="text-3xl font-lalezar !text-fuchsia-400 text-center">{t('history_subtitle1')}</h4>
          <p>{t('history_p1')}</p>
          
          <h4>{t('history_subtitle2')}</h4>
          <p dangerouslySetInnerHTML={{ __html: t('history_p2') }} />

          <h4>{t('history_subtitle3')}</h4>
          <p dangerouslySetInnerHTML={{ __html: t('history_p3') }} />

          <h4>{t('history_subtitle4')}</h4>
          <p dangerouslySetInnerHTML={{ __html: t('history_p4') }} />

          <h4>{t('history_subtitle5')}</h4>
          <p dangerouslySetInnerHTML={{ __html: t('history_p5') }} />

          <p className="text-center !text-2xl !my-10 font-bold !text-indigo-300 tracking-wide leading-loose" dangerouslySetInnerHTML={{ __html: t('history_quote') }} />

          <p>{t('history_p6')}</p>
        </div>
      </Card>
    </section>
  );
};

export default HistorySection;
