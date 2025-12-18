
import React from 'react';
import Card from './common/Card';

const weeklyData = [
  { day: 'شنبه', type: 'نحس', description: 'آغاز کارهای مهم توصیه نمی‌شود؛ روز تأمل و احتیاط.', icon: '⚠️', color: 'red', planet: 'زحل (کیوان)' },
  { day: 'یک‌شنبه', type: 'سعد', description: 'مناسب برای شروع کارهای جدید، سفر، ازدواج.', icon: '✨', color: 'green', planet: 'شمس (خورشید)' },
  { day: 'دوشنبه', type: 'سعد', description: 'روزی پرانرژی برای برنامه‌ریزی و تصمیم‌گیری.', icon: '✨', color: 'green', planet: 'قمر (ماه)' },
  { day: 'سه‌شنبه', type: 'نحس', description: 'گفته شده روز جنگ، خونریزی و اختلاف است.', icon: '⚠️', color: 'red', planet: 'مریخ (بهرام)' },
  { day: 'چهارشنبه', type: 'نحس', description: 'برخی منابع آن را روز بیماری و بلا دانسته‌اند.', icon: '⚠️', color: 'red', planet: 'عطارد (تیر)' },
  { day: 'پنج‌شنبه', type: 'سعد', description: 'مناسب برای دیدار، صدقه، دعا و امور معنوی.', icon: '✨', color: 'green', planet: 'مشتری (برجیس)' },
  { day: 'جمعه', type: 'سعد', description: 'روز عبادت، آرامش، دعا و برکت.', icon: '✨', color: 'green', planet: 'زهره (ناهید)' },
];

const DayCard: React.FC<typeof weeklyData[0]> = ({ day, type, description, icon, color, planet }) => {
  const typeColor = color === 'green' ? 'text-green-400' : 'text-red-400';
  const borderColor = color === 'green' ? 'border-green-500/50' : 'border-red-500/50';

  return (
    <div className={`bg-slate-800/50 p-6 rounded-lg border-t-4 ${borderColor} flex flex-col h-full transition-transform duration-300 hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-3xl font-lalezar text-white">{day}</h4>
        <span className={`text-2xl ${typeColor}`}>{icon}</span>
      </div>
      <p className={`text-lg font-bold mb-3 ${typeColor}`}>{type}</p>
      
      <div className="border-t border-b border-slate-700/50 my-3 py-2 text-center">
        <span className="text-gray-400 text-sm">کوکب حاکم: </span>
        <strong className="text-indigo-300 font-semibold tracking-wide">{planet}</strong>
      </div>
      
      <p className="text-gray-300 font-tanha leading-relaxed flex-grow">{description}</p>
    </div>
  );
};

const WeeklyAuspices: React.FC = () => {
  return (
    <section id="weekly-auspices">
      <h3 className="text-4xl md:text-5xl font-bold text-center mb-12 font-lalezar tracking-wider bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        ایام سعد و نحس هفته
      </h3>
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {weeklyData.map(day => <DayCard key={day.day} {...day} />)}
        </div>

        <div className="mt-12 border-t border-slate-700/50 pt-8 text-gray-300 font-tanha prose prose-lg prose-invert max-w-none">
            <h4 className="text-2xl font-lalezar text-indigo-300">📜 دیدگاه اسلام و نتیجه‌گیری</h4>
            <p>
                در منابع اسلامی تأکید شده است که سعد و نحس ایام به‌صورت ذاتی وجود ندارد و این باورها بیشتر ریشه در فرهنگ عامه و وقایع تاریخی دارد. هدف از اشاره به نحس بودن برخی ایام، عبرت‌گیری، توسل به خداوند، و تشویق به دعا و صدقه برای دفع بلاست، نه توقف کار یا ترویج خرافات.
            </p>
            <p className="font-semibold text-cyan-400 text-lg">
                بنابراین، بهترین رویکرد، توکل بر خدا و انجام اعمال نیک در همه‌ی روزهاست، چرا که اراده و لطف الهی فراتر از هر زمان و مکانی است.
            </p>
        </div>
      </Card>
    </section>
  );
};

export default WeeklyAuspices;