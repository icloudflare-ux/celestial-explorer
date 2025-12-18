
import React from 'react';
import Card from './common/Card';
import { useTranslation } from '../contexts/i18n';

const AstrologyInDepth: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="astrology-depth">
      <h3 className="text-4xl md:text-5xl font-bold text-center mb-12 font-lalezar tracking-wider bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
        {t('depth_main_title')}
      </h3>
      <Card>
        <div className="prose prose-lg prose-invert max-w-none text-gray-300 prose-p:my-4 prose-headings:text-green-400 leading-relaxed font-tanha prose-headings:font-lalezar prose-headings:tracking-wider prose-headings:text-2xl">
          <h4 className="text-3xl font-lalezar !text-blue-400 text-center">{t('depth_subtitle')}</h4>
          <p>{t('depth_p1')}</p>
          
          <h4>{t('depth_ancient_title')}</h4>
          <p dangerouslySetInnerHTML={{ __html: t('depth_ancient_p') }} />

          <h4>{t('depth_horoscopy_title')}</h4>
          <p dangerouslySetInnerHTML={{ __html: t('depth_horoscopy_p') }} />

          <h4>{t('depth_animals_title')}</h4>
          <p dangerouslySetInnerHTML={{ __html: t('depth_animals_p') }} />

          <h4>{t('depth_modern_title')}</h4>
          <p dangerouslySetInnerHTML={{ __html: t('depth_modern_p') }} />
        </div>
      </Card>
    </section>
  );
};

export default AstrologyInDepth;
