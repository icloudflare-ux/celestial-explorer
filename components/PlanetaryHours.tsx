
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Card from './common/Card';
import { planetaryHoursData, generateHoursForDay, dayNames } from '../data/planetaryHoursData';
import Spinner from './common/Spinner';
import { useTimeZone } from '../contexts/TimeZoneContext';

const HourRow: React.FC<{ timeRange: string; planet: typeof planetaryHoursData.planets[0] }> = ({ timeRange, planet }) => {
    let auspiciousnessClass = '';
    switch (planet.auspiciousnessType) {
        case 'سعد':
            auspiciousnessClass = 'text-green-400';
            break;
        case 'نحس':
            auspiciousnessClass = 'text-red-400';
            break;
        case 'خنثی':
            auspiciousnessClass = 'text-yellow-400';
            break;
        default:
            auspiciousnessClass = 'text-gray-300';
    }

    return (
        <tr className="border-b border-slate-700/50 hover:bg-slate-800/40 transition-colors duration-200">
            <td className="p-3 text-center font-medium font-roboto-mono text-gray-200 tracking-wider text-sm md:text-lg whitespace-nowrap">{timeRange}</td>
            <td className="p-3 text-center whitespace-nowrap">{planet.persian} {planet.icon}</td>
            <td className={`p-3 text-center font-bold whitespace-nowrap ${auspiciousnessClass}`}>{planet.auspiciousness}</td>
            <td className="p-3 text-right text-sm text-gray-300 leading-relaxed min-w-[200px]">{planet.recommendation}</td>
        </tr>
    );
};

const HoursTable: React.FC<{ title: string; hours: { timeRange: string; planet: any }[] }> = ({ title, hours }) => (
    <div className="mt-8">
        <h4 className="text-xl md:text-2xl font-lalezar text-center text-indigo-300 mb-4">{title}</h4>
        <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-slate-900/40 rounded-lg">
                <thead className="bg-slate-800/70">
                    <tr>
                        <th className="p-3 text-sm font-semibold tracking-wider text-center whitespace-nowrap w-32 md:w-40">بازه زمانی</th>
                        <th className="p-3 text-sm font-semibold tracking-wider text-center whitespace-nowrap">کوکب حاکم</th>
                        <th className="p-3 text-sm font-semibold tracking-wider text-center whitespace-nowrap">حکم</th>
                        <th className="p-3 text-sm font-semibold tracking-wider text-right min-w-[200px]">امور مناسب</th>
                    </tr>
                </thead>
                <tbody>
                    {hours.map((hourData, index) => (
                        <HourRow key={index} timeRange={hourData.timeRange} planet={hourData.planet} />
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const getPersianDayIndex = () => (new Date().getDay() + 1) % 7;

const PlanetaryHours: React.FC = () => {
    const { formattedTimeZone } = useTimeZone();
    const [selectedDay, setSelectedDay] = useState(getPersianDayIndex);
    const [displayTimes, setDisplayTimes] = useState<{ sunrise: string | null; sunset: string | null; }>({ sunrise: null, sunset: null });
    const [weeklyCelestialDates, setWeeklyCelestialDates] = useState<{ sunrise: Date; sunset: Date; }[]>([]);
    const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('loading');
    const [locationError, setLocationError] = useState<string | null>(null);
    const [manualCity, setManualCity] = useState('');
    const [isManualLoading, setIsManualLoading] = useState(false);
    const [displayedCity, setDisplayedCity] = useState<string | null>(null);
    const [timedHours, setTimedHours] = useState<{ day: any[], night: any[] } | null>(null);

    const formatTime = useCallback((date: Date) => {
        return date.toLocaleTimeString('fa-IR', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false,
            timeZone: formattedTimeZone 
        });
    }, [formattedTimeZone]);

    const fetchCelestialTimes = useCallback(async (latitude: number, longitude: number, timezone: string) => {
        try {
            const tzParam = encodeURIComponent(timezone);
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset&timezone=${tzParam}&forecast_days=8`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error(`خطا در ارتباط با سرور آب‌وهوا (کد ${response.status}).`);
            
            const data = await response.json();
            
            if (data.daily && data.daily.sunrise && data.daily.sunset) {
                const weeklyData = data.daily.sunrise.map((sunriseISO: string, index: number) => ({
                    sunrise: new Date(sunriseISO),
                    sunset: new Date(data.daily.sunset[index]),
                }));
                setWeeklyCelestialDates(weeklyData);
                setLocationStatus('success');
                setLocationError(null);
            } else {
                throw new Error('فرمت اطلاعات دریافتی صحیح نیست.');
            }
        } catch (err: any) {
            console.error("Error fetching celestial times:", err);
            throw new Error(err.message || "خطای ناشناخته در دریافت اطلاعات.");
        }
    }, []);

    useEffect(() => {
        if (weeklyCelestialDates.length > 0) {
            const todayIndex = getPersianDayIndex();
            const displayIndex = (selectedDay - todayIndex + 7) % 7;
            const dayData = weeklyCelestialDates[displayIndex];
            if (dayData) {
                setDisplayTimes({
                    sunrise: formatTime(dayData.sunrise),
                    sunset: formatTime(dayData.sunset),
                });

                const { dayHours, nightHours } = generateHoursForDay(selectedDay);
                const nextDayData = weeklyCelestialDates[displayIndex + 1];

                if(nextDayData) {
                    const todaySunriseMs = dayData.sunrise.getTime();
                    const todaySunsetMs = dayData.sunset.getTime();
                    const nextDaySunriseMs = nextDayData.sunrise.getTime();
                    
                    const dayDurationMs = todaySunsetMs - todaySunriseMs;
                    const nightDurationMs = nextDaySunriseMs - todaySunsetMs;

                    const dayHourLengthMs = dayDurationMs / 12;
                    const nightHourLengthMs = nightDurationMs / 12;

                    const calculatedDayHours = dayHours.map((planet, i) => {
                        const startTime = new Date(todaySunriseMs + (i * dayHourLengthMs));
                        const endTime = new Date(todaySunriseMs + ((i + 1) * dayHourLengthMs));
                        return { planet, timeRange: `${formatTime(startTime)} - ${formatTime(endTime)}` };
                    });

                    const calculatedNightHours = nightHours.map((planet, i) => {
                        const startTime = new Date(todaySunsetMs + (i * nightHourLengthMs));
                        const endTime = new Date(todaySunsetMs + ((i + 1) * nightHourLengthMs));
                        return { planet, timeRange: `${formatTime(startTime)} - ${formatTime(endTime)}` };
                    });

                    setTimedHours({ day: calculatedDayHours, night: calculatedNightHours });
                }
            }
        }
    }, [selectedDay, weeklyCelestialDates, formatTime]);

    const handleManualLocationSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!manualCity) return;
        setIsManualLoading(true);
        setLocationError(null);
        setTimedHours(null);
        try {
            const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(manualCity)}&count=1&language=fa&format=json`);
            if (!geoResponse.ok) throw new Error("خطا در ارتباط با سرویس موقعیت‌یابی.");
            const geoData = await geoResponse.json();

            if (!geoData.results || geoData.results.length === 0) throw new Error("شهر مورد نظر یافت نشد. لطفاً نام را بررسی کنید.");
            
            const cityData = geoData.results[0];
            const { latitude, longitude, name: foundCity } = cityData;
            // Use context timezone instead of city location timezone for calculation consistency
            await fetchCelestialTimes(latitude, longitude, formattedTimeZone);
            setDisplayedCity(foundCity);
            setSelectedDay(getPersianDayIndex());
        } catch (error: any) {
            setLocationError(error.message);
            setLocationStatus('error');
            setDisplayedCity(null);
        } finally {
            setIsManualLoading(false);
        }
    }, [manualCity, fetchCelestialTimes, formattedTimeZone]);
    
    useEffect(() => {
        setLocationStatus('loading');
        setTimedHours(null);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                await fetchCelestialTimes(position.coords.latitude, position.coords.longitude, formattedTimeZone);
                setDisplayedCity('موقعیت فعلی شما');
            },
            (error) => {
                let errorMessage = 'برای نمایش ساعات، شهر خود را به صورت دستی وارد کنید.';
                if (error.code === 1) errorMessage = "دسترسی به موقعیت مکانی رد شد. می‌توانید شهر خود را دستی وارد کنید.";
                setLocationError(errorMessage);
                setLocationStatus('error');
                setDisplayedCity(null);
            },
            { timeout: 8000 }
        );
    }, [fetchCelestialTimes, formattedTimeZone]);

    const handleChangeLocation = () => {
        setLocationStatus('error');
        setLocationError('برای تغییر مکان، نام شهر جدید را وارد کرده و جستجو کنید.');
        setDisplayedCity(null);
        setTimedHours(null);
    };

    return (
        <section id="planetary-hours">
            <h3 className="text-4xl md:text-5xl font-bold text-center mb-12 font-lalezar tracking-wider bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text">
                ساعات سعد و نحس در شبانه‌روز
            </h3>
            <div className="text-center mb-6">
                <span className="bg-slate-800/60 px-3 py-1 rounded-full text-sm text-indigo-300 font-tanha border border-slate-700">
                    منطقه زمانی: {formattedTimeZone}
                </span>
            </div>
            <Card>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {dayNames.map((day, index) => (
                        <button key={index} onClick={() => setSelectedDay(index)} className={`px-4 py-2 rounded-lg text-sm md:text-lg font-semibold transition-all duration-300 border-2 ${selectedDay === index ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800/60 border-slate-700 hover:bg-slate-700/80 hover:border-slate-600'}`}>
                            {day}
                        </button>
                    ))}
                </div>

                <div className="text-center mb-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700 min-h-[140px] flex items-center justify-center">
                    {locationStatus === 'loading' && <div className="flex items-center justify-center text-gray-300"><Spinner small /> <span className="mr-3">در حال دریافت زمان طلوع و غروب...</span></div>}
                    {locationStatus === 'error' && (
                        <div className="w-full max-w-md mx-auto">
                            <p className="text-red-400 font-semibold mb-4">{locationError}</p>
                            <form onSubmit={handleManualLocationSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={manualCity}
                                    onChange={(e) => setManualCity(e.target.value)}
                                    placeholder="مثال: تهران"
                                    className="flex-grow bg-slate-900/70 border-slate-600 text-white rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                                    aria-label="نام شهر"
                                />
                                <button type="submit" disabled={isManualLoading || !manualCity} className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center w-24">
                                    {isManualLoading ? <Spinner small /> : 'جستجو'}
                                </button>
                            </form>
                        </div>
                    )}
                    {locationStatus === 'success' && displayTimes.sunrise && (
                        <div className="w-full flex flex-col items-center gap-6 animate-fade-in">
                            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="text-lg text-gray-300 font-semibold">
                                    {displayedCity ? `📍 ${displayedCity}` : ''}
                                </div>
                                <button 
                                    onClick={handleChangeLocation} 
                                    className="text-sm bg-slate-700/80 hover:bg-slate-600/90 text-indigo-300 font-semibold py-1.5 px-3 rounded-md transition-colors"
                                >
                                    تغییر مکان
                                </button>
                            </div>
                            
                            <div className="flex justify-around items-center w-full border-t border-slate-700/50 pt-5">
                                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-12 md:w-12 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 18a5 5 0 0 0-10 0"></path>
                                        <line x1="12" y1="2" x2="12" y2="9"></line>
                                        <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line>
                                        <line x1="1" y1="18" x2="3" y2="18"></line>
                                        <line x1="21" y1="18" x2="23" y2="18"></line>
                                        <line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line>
                                        <line x1="23" y1="22" x2="1" y2="22"></line>
                                        <polyline points="8 6 12 2 16 6"></polyline>
                                    </svg>
                                    <div className="text-center md:text-right">
                                        <span className="text-gray-300 font-semibold text-sm md:text-lg block">طلوع آفتاب</span>
                                        <p className="font-medium text-amber-300 text-xl md:text-3xl font-roboto-mono tracking-wide">{displayTimes.sunrise}</p>
                                    </div>
                                </div>
                                <div className="hidden md:block w-px bg-slate-600 h-16"></div>
                                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-12 md:w-12 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 18a5 5 0 0 0-10 0"></path>
                                        <line x1="12" y1="9" x2="12" y2="2"></line>
                                        <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line>
                                        <line x1="1" y1="18" x2="3" y2="18"></line>
                                        <line x1="21" y1="18" x2="23" y2="18"></line>
                                        <line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line>
                                        <line x1="23" y1="22" x2="1" y2="22"></line>
                                        <polyline points="16 5 12 9 8 5"></polyline>
                                    </svg>
                                    <div className="text-center md:text-right">
                                        <span className="text-gray-300 font-semibold text-sm md:text-lg block">غروب آفتاب</span>
                                        <p className="font-medium text-orange-400 text-xl md:text-3xl font-roboto-mono tracking-wide">{displayTimes.sunset}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {timedHours ? (
                    <div className="animate-fade-in">
                        <HoursTable title={`🌞 ساعات روز ${dayNames[selectedDay]} (از طلوع تا غروب آفتاب)`} hours={timedHours.day} />
                        <HoursTable title={`🌚 ساعات شب ${dayNames[selectedDay]} (از غروب تا طلوع آفتاب)`} hours={timedHours.night} />
                    </div>
                ) : locationStatus === 'success' && (
                    <div className="text-center p-8"><Spinner /></div>
                )}
                
                <div className="mt-8 pt-6 border-t border-slate-700/50 text-center text-gray-400">
                    <p className="font-tanha text-sm md:text-base">
                        <strong>نکته مهم:</strong> «ساعات سیاره‌ای» برابر با ۶۰ دقیقه نیستند. طول هر ساعت روزانه برابر با یک دوازدهم فاصله زمانی بین طلوع تا غروب آفتاب، و طول هر ساعت شبانه برابر با یک دوازدهم فاصله زمانی بین غروب تا طلوع بعدی است.
                    </p>
                </div>
            </Card>
        </section>
    );
};

export default PlanetaryHours;
