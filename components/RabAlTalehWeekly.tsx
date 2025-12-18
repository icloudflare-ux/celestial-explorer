
import React, { useState, useMemo, useEffect } from 'react';
import Card from './common/Card';
import { zodiacRulers, weeklyRulers } from '../data/rabAlTalehData';

interface RabAlTalehWeeklyProps {
  calculatedSign: string | null;
}

const RabAlTalehWeekly: React.FC<RabAlTalehWeeklyProps> = ({ calculatedSign }) => {
  const [selectedSign, setSelectedSign] = useState<string>('');

  useEffect(() => {
    if (calculatedSign) {
      setSelectedSign(calculatedSign);
    }
  }, [calculatedSign]);

  const personalWeeklyData = useMemo(() => {
    if (!selectedSign) return null;

    const rulerInfo = zodiacRulers.find(z => z.sign === selectedSign);
    if (!rulerInfo) return null;

    const personalRuler = rulerInfo.ruler;

    return weeklyRulers.map(dayInfo => ({
      ...dayInfo,
      significance: dayInfo.ruler === personalRuler ? 'روز حاکم' : 'عادی',
      isSpecial: dayInfo.ruler === personalRuler,
    }));
  }, [selectedSign]);

  return (
    <section id="rab-al-taleh">
      <h3 className="text-4xl md:text-5xl font-bold text-center mb-6 font-lalezar tracking-wider bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-transparent bg-clip-text">
        طالع هفتگی شخصی شما
      </h3>
      <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto font-tanha text-lg leading-relaxed">
        این بخش به شما کمک می‌کند تا بر اساس برج طالع خود، مهم‌ترین و تأثیرگذارترین روز هفته‌تان را بشناسید. روزی که کوکب حاکم آن با «رب‌الطالع» (سیاره حاکم بر برج شما) یکی باشد، به عنوان «روز حاکم» شما مشخص شده و بهترین زمان برای امور مهم شماست.
      </p>
      <Card>
        <div className="text-center mb-8">
          <label htmlFor="zodiac-select" className="block text-lg font-tanha text-gray-300 mb-3">
            برای مشاهده طالع هفتگی شخصی، برج خود را انتخاب کنید:
          </label>
          <select
            id="zodiac-select"
            value={selectedSign}
            onChange={(e) => setSelectedSign(e.target.value)}
            className="bg-slate-800/60 border border-slate-600 text-white text-lg rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full max-w-sm mx-auto p-3 transition duration-300"
          >
            <option value="">-- انتخاب برج --</option>
            {zodiacRulers.map(z => (
              <option key={z.sign} value={z.sign}>{z.sign}</option>
            ))}
          </select>
        </div>

        {selectedSign && personalWeeklyData ? (
          <div className="overflow-x-auto w-full animate-fade-in">
            <table className="min-w-full bg-slate-900/40 rounded-lg">
              <thead className="bg-slate-800/70">
                <tr>
                  <th className="p-4 text-sm font-semibold tracking-wider text-right whitespace-nowrap">روز هفته</th>
                  <th className="p-4 text-sm font-semibold tracking-wider text-right whitespace-nowrap">کوکب حاکم روز</th>
                  <th className="p-4 text-sm font-semibold tracking-wider text-right whitespace-nowrap">اهمیت برای شما</th>
                  <th className="p-4 text-sm font-semibold tracking-wider text-right whitespace-nowrap">حکم کلی روز</th>
                </tr>
              </thead>
              <tbody>
                {personalWeeklyData.map(day => (
                  <tr 
                    key={day.day} 
                    className={`border-b border-slate-700/50 transition-colors duration-300 ${day.isSpecial ? 'bg-indigo-900/40 ring-2 ring-indigo-500/50' : 'hover:bg-slate-800/40'}`}
                  >
                    <td className="p-4 font-bold text-white text-base md:text-lg whitespace-nowrap">{day.day}</td>
                    <td className="p-4 text-gray-300 whitespace-nowrap">{day.ruler}</td>
                    <td className="p-4 whitespace-nowrap">
                      {day.isSpecial ? (
                        <span className="px-3 py-1 text-sm font-bold bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white rounded-full shadow-lg shadow-indigo-500/20">
                          ✨ {day.significance}
                        </span>
                      ) : (
                        <span className="text-gray-400">{day.significance}</span>
                      )}
                    </td>
                    <td className={`p-4 font-bold whitespace-nowrap ${day.color}`}>{day.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-8 bg-slate-800/30 rounded-lg">
            <p className="text-gray-400 font-tanha text-xl">جدول شخصی شما پس از محاسبه طالع یا انتخاب دستی برج، در اینجا نمایش داده خواهد شد.</p>
          </div>
        )}
      </Card>
    </section>
  );
};

export default RabAlTalehWeekly;
