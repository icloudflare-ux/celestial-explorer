
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Card from './common/Card';
import { zodiacRulers, weeklyRulers, planetDetails } from '../data/rabAlTalehData';
import { dayNames as persianDayNames } from '../data/planetaryHoursData';
import { qamarDarAghrabData } from '../data/qamarDarAghrabData';
import { getJalaliInfo, getGregorianInfo, getIslamicInfo } from '../utils/dateConverter';
import { useTranslation } from '../contexts/i18n';
import { useTimeZone } from '../contexts/TimeZoneContext';

type DayStatus = 'special' | 'auspicious' | 'inauspicious' | 'neutral' | 'qamar' | 'none';
type CalculationMethod = 'constellation' | 'sign';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  status: DayStatus;
}

interface MonthlyCalendarProps {
  calculatedSign: string | null;
}

const isQamarDarAghrab = (date: Date, events: { start: string; end: string }[]): boolean => {
    const dayStartTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const dayEndTime = dayStartTime + 24 * 60 * 60 * 1000 - 1;

    for (const event of events) {
        const startTime = new Date(event.start).getTime();
        const endTime = new Date(event.end).getTime();

        if (dayStartTime < endTime && dayEndTime > startTime) {
            return true;
        }
    }
    return false;
};


const PersonalizedAnalysis = ({ analysisData }: { analysisData: any }) => {
  if (!analysisData) return null;

  return (
    <div className="mt-12 pt-8 border-t border-slate-700/50 animate-fade-in">
      <h3 className="text-3xl font-lalezar text-center mb-4 text-indigo-300">
        🗓️ راهنمای ماهانه ویژه برج {analysisData.sign}
      </h3>
      <p className="text-center text-lg text-gray-400 mb-8 font-tanha">
        رب‌الطالع شما <strong>{analysisData.ruler}</strong> است. این سیاره و ارتباط آن با دیگر کواکب، روزهای شما را چنین رقم می‌زند:
      </p>

      <div className="prose prose-lg prose-invert max-w-none font-tanha leading-relaxed space-y-6">
        {analysisData.dayBreakdown.map((day: any) => (
          <div key={day.day} className={`p-4 rounded-lg flex items-start gap-x-4 border-r-4 ${day.borderColor}`}>
            <span className="text-3xl mt-1">{day.icon}</span>
            <div>
              <h4 className={`text-xl font-bold !m-0 ${day.color}`}>{day.day} - {day.status}</h4>
              <p className="text-gray-300 !mt-2">{day.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 pt-6 border-t border-slate-600/50">
        <h4 className="text-2xl font-lalezar text-center text-indigo-300 mb-6">✨ جمع‌بندی برای برج {analysisData.sign}</h4>
        <div className="grid md:grid-cols-2 gap-6 text-lg font-tanha">
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h5 className="font-bold text-green-400 mb-2">✅ روزهای سعد و مناسب</h5>
            <ul className="list-disc list-inside space-y-1 text-gray-200">
              <li><strong>روز حاکم (ویژه):</strong> {analysisData.summary.primaryAuspicious}</li>
              {analysisData.summary.secondaryAuspicious.map((d:string) => <li key={d}>{d}</li>)}
            </ul>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h5 className="font-bold text-red-400 mb-2">⚠️ روزهای نیازمند احتیاط</h5>
            <ul className="list-disc list-inside space-y-1 text-gray-200">
              {analysisData.summary.inauspicious.map((d:string) => <li key={d}>{d}</li>)}
            </ul>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg md:col-span-2">
            <h5 className="font-bold text-yellow-400 mb-2">🔮 روزهای بی‌حکم و موقعیتی</h5>
            <ul className="list-disc list-inside space-y-1 text-gray-200">
              {analysisData.summary.neutral.map((d:string) => <li key={d}>{d}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarDayCell: React.FC<{ day: CalendarDay }> = ({ day }) => {
    const jalali = getJalaliInfo(day.date);
    const gregorian = getGregorianInfo(day.date);
    const islamic = getIslamicInfo(day.date);

    let classes = 'h-28 rounded-lg flex flex-col items-center justify-center p-1.5 relative transition-colors duration-300';
    
    if (!day.isCurrentMonth) {
        classes += ' text-gray-700 bg-slate-800/20';
    } else {
        classes += ' text-white';
        if (day.isToday) classes += ' ring-2 ring-blue-500 z-10';

        switch(day.status) {
            case 'qamar':
                classes += ' bg-purple-600/60 hover:bg-purple-500/80 font-bold';
                break;
            case 'special':
                classes += ' bg-amber-600/60 hover:bg-amber-500/80 font-bold';
                break;
            case 'auspicious':
                classes += ' bg-green-600/40 hover:bg-green-500/60';
                break;
            case 'inauspicious':
                classes += ' bg-red-600/40 hover:bg-red-500/60';
                break;
            case 'neutral':
                classes += ' bg-slate-700/50 hover:bg-slate-600/70';
                break;
            default:
                classes += ' bg-slate-800/60 hover:bg-slate-700/80';
        }
    }

    const numberColor = day.isCurrentMonth ? 'text-gray-400' : 'text-gray-600';

    return (
        <div className={classes}>
            {day.isCurrentMonth && day.status === 'qamar' && <span className="absolute top-1.5 left-1.5 text-xl opacity-90" role="img" aria-label="قمر در عقرب">🦂</span>}
            
            <div className={`absolute top-1.5 right-1.5 text-xs ${numberColor} font-roboto-mono`}>{islamic.day}</div>

            <div className="flex-grow flex flex-col items-center justify-center">
                <span className="text-4xl font-roboto-mono">{jalali.day}</span>
            </div>
            
            <div className={`absolute bottom-1.5 left-1.5 text-xs ${numberColor} font-roboto-mono`}>{gregorian.day}</div>
        </div>
    );
};

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({ calculatedSign }) => {
  const { t } = useTranslation();
  const { formattedTimeZone } = useTimeZone();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState('');
  const [selectedSign, setSelectedSign] = useState<string>('');
  const [qamarMethod, setQamarMethod] = useState<CalculationMethod>('constellation');

  useEffect(() => {
    if (calculatedSign) {
      setSelectedSign(calculatedSign);
    }
  }, [calculatedSign]);

  // Update current time display based on timezone
  useEffect(() => {
    const updateTime = () => {
        const timeStr = new Date().toLocaleTimeString('fa-IR', { 
            hour: '2-digit', 
            minute: '2-digit', 
            timeZone: formattedTimeZone 
        });
        setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [formattedTimeZone]);
  
  const userRuler = useMemo(() => {
    if (!selectedSign) return null;
    return zodiacRulers.find(z => z.sign === selectedSign)?.ruler || null;
  }, [selectedSign]);

  const getDayStatus = useCallback((date: Date): DayStatus => {
    const events = qamarDarAghrabData[qamarMethod];
    if (isQamarDarAghrab(date, events)) return 'qamar';

    if (!userRuler) return 'none';

    const dayIndex = (date.getDay() + 1) % 7; // 0 for Saturday, 1 for Sunday...
    const dayInfo = weeklyRulers[dayIndex];
    
    if (dayInfo.ruler === userRuler) return 'special';
    if (dayInfo.type === 'سعد') return 'auspicious';
    if (dayInfo.type === 'نحس') return 'inauspicious';

    return 'neutral';
  }, [userRuler, qamarMethod]);

  const personalAnalysis = useMemo(() => {
    if (!selectedSign) return null;

    const rulerInfo = zodiacRulers.find(z => z.sign === selectedSign);
    if (!rulerInfo) return null;

    const userRuler = rulerInfo.ruler;

    const summary = {
        primaryAuspicious: '',
        secondaryAuspicious: [] as string[],
        inauspicious: [] as string[],
        neutral: [] as string[],
    };

    const dayBreakdown = weeklyRulers.map(day => {
        let status, icon, color, borderColor;
        const dayTitle = `${day.day} (کوکب: ${day.ruler})`;

        if (day.ruler === userRuler) {
            status = 'روز حاکم (سعد ویژه)';
            icon = '🌟';
            color = 'text-amber-400';
            borderColor = 'border-amber-500';
            summary.primaryAuspicious = dayTitle;
        } else if (day.type === 'سعد') {
            status = 'سعد';
            icon = '✨';
            color = 'text-green-400';
            borderColor = 'border-green-500';
            summary.secondaryAuspicious.push(dayTitle);
        } else if (day.type === 'نحس') {
            status = 'نحس';
            icon = '⚠️';
            color = 'text-red-400';
            borderColor = 'border-red-500';
            summary.inauspicious.push(dayTitle);
        } else { // 'بی‌حکم' or 'خنثی'
            status = day.type === 'خنثی' ? 'خنثی (ممتزج)' : 'بی‌حکم (سلطانی)';
            icon = '🔮';
            color = 'text-cyan-400';
            borderColor = 'border-cyan-500';
            summary.neutral.push(dayTitle);
        }
        
        return {
            ...day,
            status,
            icon,
            color,
            borderColor,
            description: planetDetails[day.ruler as keyof typeof planetDetails]?.description || ''
        };
    });

    return { sign: selectedSign, ruler: userRuler, summary, dayBreakdown };
  }, [selectedSign]);
  
  const calendarGrid = useMemo<CalendarDay[]>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const grid: CalendarDay[] = [];
    
    const startDayOfWeek = (firstDayOfMonth.getDay() + 1) % 7; 

    for (let i = 0; i < startDayOfWeek; i++) {
        const date = new Date(firstDayOfMonth);
        date.setDate(date.getDate() - (startDayOfWeek - i));
        grid.push({ date, isCurrentMonth: false, isToday: false, status: 'none' });
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const date = new Date(year, month, i);
        const isToday = date.getTime() === today.getTime();
        grid.push({ date, isCurrentMonth: true, isToday, status: getDayStatus(date) });
    }

    const gridEndOffset = 42 - grid.length;
    for (let i = 1; i <= gridEndOffset; i++) {
        const date = new Date(lastDayOfMonth);
        date.setDate(date.getDate() + i);
        grid.push({ date, isCurrentMonth: false, isToday: false, status: 'none' });
    }

    return grid;
  }, [currentDate, getDayStatus]);

  const changeMonth = (offset: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  const LegendItem = ({ color, label, icon }: { color?: string; label: string; icon?: string }) => (
    <div className="flex items-center space-x-2 space-x-reverse">
        {icon ? <span className="text-lg">{icon}</span> : <span className={`w-5 h-5 rounded-full ${color || ''}`}></span>}
        <span className="text-sm text-gray-300">{label}</span>
    </div>
  );

  const jalaliHeader = getJalaliInfo(currentDate).monthYear;
  const gregorianHeader = getGregorianInfo(currentDate).monthYear;
  const islamicHeader = getIslamicInfo(currentDate).monthYear;
  
  const QamarMethodButton: React.FC<{ value: CalculationMethod; label: string }> = ({ value, label }) => (
    <button
        onClick={() => setQamarMethod(value)}
        className={`w-full py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-300 border-2 ${qamarMethod === value ? 'bg-purple-600 border-purple-500 text-white shadow-md' : 'bg-slate-800/60 border-slate-700 hover:bg-slate-700/80'}`}
    >
        {label}
    </button>
  );

  return (
    <section id="monthly-calendar">
      <h3 className="text-4xl md:text-5xl font-bold text-center mb-6 font-lalezar tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
        تقویم نجومی ماهانه
      </h3>
       <p className="text-center text-gray-400 mb-6 max-w-3xl mx-auto font-tanha text-lg leading-relaxed">
        بر اساس برج طالع خود، روزهای سعد و نحس ماه را مشاهده کرده و برای امور مهم خود بهترین زمان را انتخاب کنید.
      </p>
      
      <div className="text-center mb-8">
        <span className="text-xl font-roboto-mono text-cyan-300 font-bold bg-slate-800/50 px-4 py-2 rounded-lg border border-cyan-500/30">
            {currentTime}
        </span>
      </div>

      <Card>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
                <label htmlFor="zodiac-select-calendar" className="block text-lg font-tanha text-gray-300 mb-3 text-center md:text-right">
                ۱. برج طالع خود را انتخاب کنید:
                </label>
                <select
                id="zodiac-select-calendar"
                value={selectedSign}
                onChange={(e) => setSelectedSign(e.target.value)}
                className="bg-slate-800/60 border border-slate-600 text-white text-lg rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 transition duration-300"
                >
                <option value="">-- انتخاب برج --</option>
                {zodiacRulers.map(z => (
                    <option key={z.sign} value={z.sign}>{z.sign}</option>
                ))}
                </select>
            </div>
             <div>
                <label className="block text-lg font-tanha text-gray-300 mb-3 text-center md:text-right">
                ۲. روش محاسبه قمر در عقرب:
                </label>
                 <div className="grid grid-cols-2 gap-4">
                    <QamarMethodButton value="constellation" label={t('qamar_method_constellation')} />
                    <QamarMethodButton value="sign" label={t('qamar_method_sign')} />
                </div>
            </div>
        </div>
        
        <div className="flex items-center justify-between mb-6 px-4">
            <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-700 transition-colors" aria-label="ماه قبل">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="text-center font-lalezar text-indigo-300 tracking-wider">
                <h4 className="text-2xl font-bold">{jalaliHeader}</h4>
                <p className="text-sm text-gray-400 font-sans">{gregorianHeader} / {islamicHeader}</p>
            </div>
            <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-700 transition-colors" aria-label="ماه بعد">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-400 mb-2">
            {persianDayNames.map(day => <div key={day} className="py-2">{day}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-1">
            {calendarGrid.map((day, index) => (
                <CalendarDayCell key={index} day={day} />
            ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700/50 flex flex-wrap justify-center gap-x-6 gap-y-3">
            <LegendItem color="ring-2 ring-blue-500" label="امروز" />
            <LegendItem icon="🦂" label="قمر در عقرب" />
            {selectedSign && (
                <>
                <LegendItem color="bg-amber-600/60" label="روز حاکم (ویژه)" />
                <LegendItem color="bg-green-600/40" label="روز سعد" />
                <LegendItem color="bg-red-600/40" label="روز نحس" />
                <LegendItem color="bg-slate-700/50" label="روز خنثی/بی‌حکم" />
                </>
            )}
        </div>

        {selectedSign && <PersonalizedAnalysis analysisData={personalAnalysis} />}
        
        {!selectedSign && (
             <div className="text-center mt-8 p-8 bg-slate-800/30 rounded-lg">
                <p className="text-gray-400 font-tanha text-xl">برای مشاهده تحلیل شخصی روزها، برج طالع خود را از منوی بالا انتخاب کنید.</p>
            </div>
        )}
      </Card>
    </section>
  );
};

export default MonthlyCalendar;
