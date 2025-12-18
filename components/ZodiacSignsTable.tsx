
import React, { useState } from 'react';
import Card from './common/Card';
import ZodiacDetailModal from './ZodiacDetailModal';

const zodiacData = [
  { traditional: 'حمل', modern: 'فروردین', planet: 'مریخ', planetType: 'علوی', element: 'آتش', color: 'border-red-500', iconColor: 'text-red-400', svgPath: 'M1 10a5 5 0 0 0 5-5m5 0a5 5 0 0 0-5 5m0-5V1', elementBg: 'bg-gradient-to-t from-red-900/30 to-slate-900/30', nature: 'گرم و خشک', auspiciousness: 'نحس اصغر', auspiciousnessColor: 'text-red-400' },
  { traditional: 'ثور', modern: 'اردیبهشت', planet: 'زهره', planetType: 'سفلی', element: 'خاک', color: 'border-emerald-600', iconColor: 'text-emerald-400', svgPath: 'M1 6a5 5 0 1 0 10 0A5 5 0 0 0 1 6zm5 0V1m-3-1a3 3 0 0 1 6 0', elementBg: 'bg-gradient-to-t from-emerald-900/30 to-slate-900/30', nature: 'گرم و تر', auspiciousness: 'سعد اصغر', auspiciousnessColor: 'text-green-400' },
  { traditional: 'جوزا', modern: 'خرداد', planet: 'عطارد', planetType: 'سفلی', element: 'هوا', color: 'border-cyan-400', iconColor: 'text-cyan-300', svgPath: 'M1 1v10m10-10v10M2 2h8m-8 8h8', elementBg: 'bg-gradient-to-t from-cyan-800/20 to-slate-900/30', nature: 'گرم و تر', auspiciousness: 'خنثی', auspiciousnessColor: 'text-yellow-400' },
  { traditional: 'سرطان', modern: 'تیر', planet: 'قمر', planetType: 'سفلی', element: 'آب', color: 'border-blue-500', iconColor: 'text-blue-400', svgPath: 'M1 6a5 5 0 0 0 10 0M11 6a5 5 0 0 1-10 0', elementBg: 'bg-gradient-to-t from-blue-900/30 to-slate-900/30', nature: 'سرد و تر', auspiciousness: 'بی‌حکم', auspiciousnessColor: 'text-gray-300' },
  { traditional: 'اسد', modern: 'مرداد', planet: 'شمس', planetType: 'علوی', element: 'آتش', color: 'border-red-500', iconColor: 'text-red-400', svgPath: 'M1 6a5 5 0 1 0 10 0v5l-3-2', elementBg: 'bg-gradient-to-t from-red-900/30 to-slate-900/30', nature: 'گرم و خشک', auspiciousness: 'بی‌حکم', auspiciousnessColor: 'text-gray-300' },
  { traditional: 'سنبله', modern: 'شهریور', planet: 'عطارد', planetType: 'سفلی', element: 'خاک', color: 'border-emerald-600', iconColor: 'text-emerald-400', svgPath: 'M1 1v10m3-10v10m3-10v10m3-5l2 5 2-10', elementBg: 'bg-gradient-to-t from-emerald-900/30 to-slate-900/30', nature: 'سرد و خشک', auspiciousness: 'خنثی', auspiciousnessColor: 'text-yellow-400' },
  { traditional: 'میزان', modern: 'مهر', planet: 'زهره', planetType: 'سفلی', element: 'هوا', color: 'border-cyan-400', iconColor: 'text-cyan-300', svgPath: 'M1 10h10M2 8l4-4 4 4M3 1h6', elementBg: 'bg-gradient-to-t from-cyan-800/20 to-slate-900/30', nature: 'گرم و تر', auspiciousness: 'سعد اصغر', auspiciousnessColor: 'text-green-400' },
  { traditional: 'عقرب', modern: 'آبان', planet: 'مریخ', planetType: 'علوی', element: 'آب', color: 'border-blue-500', iconColor: 'text-blue-400', svgPath: 'M1 1v7m3-7v7m3-7v7m4 0l-3 3 3 3h-3', elementBg: 'bg-gradient-to-t from-blue-900/30 to-slate-900/30', nature: 'گرم و خشک', auspiciousness: 'نحس اصغر', auspiciousnessColor: 'text-red-400' },
  { traditional: 'قوس', modern: 'آذر', planet: 'مشتری', planetType: 'علوی', element: 'آتش', color: 'border-red-500', iconColor: 'text-red-400', svgPath: 'M1 11l10-10m-5 0h5v5m-1-6l-4 4', elementBg: 'bg-gradient-to-t from-red-900/30 to-slate-900/30', nature: 'گرم و تر', auspiciousness: 'سعد اکبر', auspiciousnessColor: 'text-green-400' },
  { traditional: 'جدی', modern: 'دی', planet: 'زحل', planetType: 'علوی', element: 'خاک', color: 'border-emerald-600', iconColor: 'text-emerald-400', svgPath: 'M1 1v5a3 3 0 0 0 3 3h1a3 3 0 0 1 3 3v1m0-3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z', elementBg: 'bg-gradient-to-t from-emerald-900/30 to-slate-900/30', nature: 'سرد و خشک', auspiciousness: 'نحس اکبر', auspiciousnessColor: 'text-red-400' },
  { traditional: 'دلو', modern: 'بهمن', planet: 'زحل', planetType: 'علوی', element: 'هوا', color: 'border-cyan-400', iconColor: 'text-cyan-300', svgPath: 'M1 4l2-2 2 2 2-2 2 2 2-2M1 9l2-2 2 2 2-2 2 2 2-2', elementBg: 'bg-gradient-to-t from-cyan-800/20 to-slate-900/30', nature: 'سرد و خشک', auspiciousness: 'نحس اکبر', auspiciousnessColor: 'text-red-400' },
  { traditional: 'حوت', modern: 'اسفند', planet: 'مشتری', planetType: 'علوی', element: 'آب', color: 'border-blue-500', iconColor: 'text-blue-400', svgPath: 'M1 1a5 5 0 0 0 0 10m10-10a5 5 0 0 1 0 10M1 6h10', elementBg: 'bg-gradient-to-t from-blue-900/30 to-slate-900/30', nature: 'گرم و تر', auspiciousness: 'سعد اکبر', auspiciousnessColor: 'text-green-400' },
];

type ZodiacSign = typeof zodiacData[0];

interface ZodiacSignsTableProps {
  calculatedSign: string | null;
}

const ZodiacSignsTable: React.FC<ZodiacSignsTableProps> = ({ calculatedSign }) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);

  return (
    <section id="zodiac">
      <h3 className="text-4xl md:text-5xl font-bold text-center mb-12 font-lalezar tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
        برج‌های فلکی و طبایع آن‌ها
      </h3>
      <Card>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {zodiacData.map((sign) => {
            const isCalculated = sign.traditional === calculatedSign;
            const highlightClass = isCalculated
              ? 'ring-4 ring-amber-400 ring-offset-slate-900 ring-offset-2 scale-105 shadow-2xl shadow-amber-500/40 z-10'
              : 'hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/20';

            return (
              <div 
                key={sign.traditional} 
                onClick={() => setSelectedSign(sign)}
                className={`p-6 rounded-lg text-center flex flex-col items-center justify-start border-b-4 ${sign.color} transform transition-all duration-300 cursor-pointer ${sign.elementBg} ${highlightClass}`}
              >
                <svg 
                  className={`w-16 h-16 mb-4 ${sign.iconColor}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 12 12" 
                  strokeWidth="1.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d={sign.svgPath} />
                </svg>
                <h4 className="text-4xl font-lalezar text-white">{sign.traditional}</h4>
                <p className="text-gray-400 font-tanha text-lg mb-4">({sign.modern})</p>
                <div className="text-sm space-y-2 mt-auto border-t border-slate-700/50 w-full pt-3">
                  <p className="text-gray-300 flex justify-between w-full"><span>سیاره حاکم:</span> <strong>{sign.planet}</strong></p>
                  <p className="text-gray-300 flex justify-between w-full"><span>نوع کوکب:</span> <strong>{sign.planetType}</strong></p>
                  <p className="text-gray-300 flex justify-between w-full"><span>عنصر:</span> <strong>{sign.element}</strong></p>
                  <p className="text-gray-300 flex justify-between w-full"><span>طبع:</span> <strong>{sign.nature}</strong></p>
                  <p className="text-gray-300 flex justify-between w-full"><span>کیفیت:</span> <strong className={`font-bold ${sign.auspiciousnessColor}`}>{sign.auspiciousness}</strong></p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      {selectedSign && <ZodiacDetailModal sign={selectedSign} onClose={() => setSelectedSign(null)} />}
    </section>
  );
};

export default ZodiacSignsTable;
