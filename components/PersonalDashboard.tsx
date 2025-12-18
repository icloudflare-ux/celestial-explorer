import React, { useMemo, useState, useEffect } from 'react';
import { Profile } from '../types';
import { useTranslation } from '../contexts/i18n';
import { calculateAbjad } from '../utils/abjad';
import { zodiacRulers, weeklyRulers } from '../data/rabAlTalehData';
import { qamarDarAghrabData } from '../data/qamarDarAghrabData';
import { generateDailyAdvice } from '../services/geminiService';
import Spinner from './common/Spinner';

const DashboardCard: React.FC<{ title: string, icon: string, children: React.ReactNode, className?: string }> = ({ title, icon, children, className }) => (
    <div className={`bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 flex flex-col ${className}`}>
        <div className="flex items-center mb-3">
            <span className="text-2xl ml-3">{icon}</span>
            <h4 className="font-lalezar text-lg text-indigo-300">{title}</h4>
        </div>
        <div className="flex-grow flex items-center justify-center text-center">
            {children}
        </div>
    </div>
);

const PersonalDashboard: React.FC<{ activeProfile: Profile }> = ({ activeProfile }) => {
    const { t } = useTranslation();
    const [now, setNow] = useState(new Date());
    const [dailyAdvice, setDailyAdvice] = useState<{ advice: string; loading: boolean; error: boolean }>({ advice: '', loading: true, error: false });
    
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 60000); // Update every minute for live data
        return () => clearInterval(timer);
    }, []);


    // 1. Calculate user's ascendant sign and ruler
    const { ascendantSign, rulerPlanet } = useMemo(() => {
        const totalAbjad = calculateAbjad(activeProfile.name) + calculateAbjad(activeProfile.motherName);
        const remainder = totalAbjad % 12;
        const rabTale = remainder === 0 ? 12 : remainder;
        const signInfo = zodiacRulers[rabTale - 1];
        return { ascendantSign: signInfo?.sign || null, rulerPlanet: signInfo?.ruler || null };
    }, [activeProfile]);

    // 2. Determine today's ruling planet
    const todayRulerInfo = useMemo(() => {
        const todayIndex = (now.getDay() + 1) % 7; // 0 for Saturday
        return weeklyRulers[todayIndex];
    }, [now]);

    const isRulerDay = rulerPlanet === todayRulerInfo.ruler;

    // 3. Qamar Dar Aghrab status
    const isQamar = useMemo(() => {
        const nowTime = now.getTime();
        // Check both methods for safety
        const allEvents = [...qamarDarAghrabData.constellation, ...qamarDarAghrabData.sign];
        return allEvents.some(event => {
            const startTime = new Date(event.start).getTime();
            const endTime = new Date(event.end).getTime();
            return nowTime >= startTime && nowTime <= endTime;
        });
    }, [now]);

    // 4. Fetch daily advice
    useEffect(() => {
        if (!ascendantSign) return;

        const today = new Date().toISOString().split('T')[0];
        const cacheKey = `dailyAdvice-${today}-${ascendantSign}`;
        
        const cachedAdvice = localStorage.getItem(cacheKey);
        if (cachedAdvice) {
            setDailyAdvice({ advice: cachedAdvice, loading: false, error: false });
            return;
        }

        const fetchAdvice = async () => {
            setDailyAdvice({ advice: '', loading: true, error: false });
            try {
                const result = await generateDailyAdvice(ascendantSign);
                setDailyAdvice({ advice: result, loading: false, error: false });
                localStorage.setItem(cacheKey, result);
            } catch (error) {
                console.error(error);
                setDailyAdvice({ advice: '', loading: false, error: true });
            }
        };

        fetchAdvice();
    }, [ascendantSign]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="bg-black/40 backdrop-blur-lg border border-slate-800/50 rounded-2xl shadow-2xl shadow-indigo-900/40 p-6">
                <h3 className="text-3xl font-lalezar text-center mb-6">{t('dashboard_title', { name: activeProfile.name })}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DashboardCard title={t('dashboard_ruler_day_title')} icon="👑">
                        <div className="font-tanha text-lg">
                            {isRulerDay ? (
                                <p className="text-green-400 font-bold">{t('dashboard_ruler_day_special')}</p>
                            ) : (
                                <p className="text-gray-300">{t('dashboard_ruler_day_normal', { planet: todayRulerInfo.ruler })}</p>
                            )}
                        </div>
                    </DashboardCard>
                    <DashboardCard title={t('dashboard_qamar_title')} icon="🦂">
                         <div className="font-tanha text-lg">
                             {isQamar ? (
                                 <p className="text-red-400 font-bold">{t('qamar_status_true')}</p>
                             ) : (
                                <p className="text-green-400 font-bold">{t('qamar_status_false')}</p>
                             )}
                        </div>
                    </DashboardCard>
                    <DashboardCard title={t('dashboard_daily_advice_title')} icon="🔮" className="md:col-span-2 lg:col-span-1">
                        <div className="font-tanha text-lg text-cyan-300 min-h-[50px] flex items-center justify-center">
                            {dailyAdvice.loading && <Spinner small />}
                            {dailyAdvice.error && <p className="text-red-400 text-sm">خطا در دریافت پند روزانه</p>}
                            {!dailyAdvice.loading && !dailyAdvice.error && <p>"{dailyAdvice.advice}"</p>}
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
};

export default PersonalDashboard;