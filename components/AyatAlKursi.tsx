import React from 'react';
import { useTranslation } from '../contexts/i18n';

const AyatAlKursi: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 px-4 text-center">
      <p className="font-amiri text-3xl md:text-4xl bg-gradient-to-r from-purple-400 via-white to-purple-300 text-transparent bg-clip-text leading-loose tracking-normal">
        {t('ayat_al_kursi_text')}
      </p>
    </section>
  );
};

export default AyatAlKursi;