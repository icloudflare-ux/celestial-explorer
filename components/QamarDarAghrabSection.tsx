
import React, { useState, useEffect, useMemo } from 'react';
import Card from './common/Card';
import { useTranslation } from '../contexts/i18n';
import { qamarDarAghrabData } from '../data/qamarDarAghrabData';
import { useTimeZone } from '../contexts/TimeZoneContext';

type CalculationMethod = 'constellation' | 'sign';

const QamarDarAghrabSection: React.FC = () => {
    const { t } = useTranslation();
    const { formattedTimeZone } = useTimeZone();
    const [now, setNow] = useState(new Date());
    const [method, setMethod] = useState<CalculationMethod>('constellation');

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);

    const events = useMemo(() => {
        return qamarDarAghrabData[method];
    }, [method]);

    const currentEvent = useMemo(() => {
        const nowTime = now.getTime();
        return events.find(event => {
            const startTime = new Date(event.start).getTime();
            const endTime = new Date(event.end).getTime();
            return nowTime >= startTime && nowTime <= endTime;
        });
    }, [now, events]);

    const upcomingEvents = useMemo(() => {
        const nowTime = now.getTime();
        return events
            .filter(event => new Date(event.end).getTime() > nowTime)
            .slice(0, 5); // Show next 5 events
    }, [now, events]);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('fa-IR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: formattedTimeZone,
        });
    };

     const formatTime = (date: Date) => {
        return date.toLocaleTimeString('fa-IR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: formattedTimeZone,
        });
    };
    
    const MethodButton: React.FC<{ value: CalculationMethod; label: string }> = ({ value, label }) => (
        <button
            onClick={() => setMethod(value)}
            className={`w-full py-3 px-4 rounded-lg text-lg font-semibold transition-all duration-300 border-2 ${method === value ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'bg-slate-800/60 border-slate-700 hover:bg-slate-700/80'}`}
        >
            {label}
        </button>
    );

    return (
        <section id="qamar-dar-aghrab">
            <h3 className="text-4xl md:text-5xl font-bold text-center mb-6 font-lalezar tracking-wider bg-gradient-to-r from-purple-400 to-red-500 text-transparent bg-clip-text">
                {t('qamar_section_title')}
            </h3>
            <p className="text-center text-gray-400 mb-12 max-w-4xl mx-auto font-tanha text-lg leading-relaxed">
                {t('qamar_section_subtitle')}
            </p>

            <Card>
                <div className="max-w-3xl mx-auto mb-12">
                    <h4 className="text-xl font-lalezar text-center text-gray-200 mb-4">{t('qamar_method_title')}</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <MethodButton value="constellation" label={t('qamar_method_constellation')} />
                        <MethodButton value="sign" label={t('qamar_method_sign')} />
                    </div>
                    <div className="text-center mt-4">
                        <span className="text-sm text-indigo-300 font-tanha border border-indigo-500/30 px-3 py-1 rounded-full bg-indigo-900/20">
                            منطقه زمانی محاسبه: {formattedTimeZone}
                        </span>
                    </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Current Status */}
                    <div>
                        <h4 className="text-2xl font-lalezar text-center text-indigo-300 mb-6">{t('qamar_current_status_title')}</h4>
                        {currentEvent ? (
                            <div className="bg-red-900/30 border-2 border-red-500/50 rounded-2xl p-8 text-center animate-fade-in shadow-2xl shadow-red-500/20">
                                <div className="text-7xl mb-4 animate-pulse">🦂</div>
                                <h5 className="text-3xl font-bold text-red-400 font-lalezar">{t('qamar_status_true')}</h5>
                                <p className="text-gray-300 mt-4 font-tanha text-lg">
                                    {t('qamar_current_period')}
                                    <br/>
                                    <span className="font-bold text-white font-roboto-mono block mt-2 text-xl">
                                       {t('qamar_ends_at')} {formatDate(new Date(currentEvent.end))} - {t('qamar_hour')} {formatTime(new Date(currentEvent.end))}
                                    </span>
                                </p>
                            </div>
                        ) : (
                            <div className="bg-green-900/20 border-2 border-green-500/30 rounded-2xl p-8 text-center animate-fade-in shadow-2xl shadow-green-500/10">
                                <div className="text-7xl mb-4">✅</div>
                                <h5 className="text-3xl font-bold text-green-400 font-lalezar">{t('qamar_status_false')}</h5>
                                <p className="text-gray-300 mt-2 font-tanha text-lg">{t('qamar_status_false_desc')}</p>
                            </div>
                        )}
                    </div>

                    {/* Upcoming Events */}
                    <div>
                        <h4 className="text-2xl font-lalezar text-center text-indigo-300 mb-6">{t('qamar_upcoming_title')}</h4>
                        <div className="space-y-4">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map((event, index) => (
                                    <div key={index} className="bg-slate-800/60 p-4 rounded-lg border-l-4 border-purple-500">
                                        <div className="font-tanha">
                                            <p className="font-bold text-lg text-purple-300">
                                               {t('qamar_from')} {formatDate(new Date(event.start))} ({t('qamar_hour')} {formatTime(new Date(event.start))})
                                            </p>
                                            <p className="text-gray-300">
                                               {t('qamar_to')} {formatDate(new Date(event.end))} ({t('qamar_hour')} {formatTime(new Date(event.end))})
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-400 font-tanha">{t('qamar_no_upcoming')}</p>
                            )}
                        </div>
                    </div>
                </div>

                 {/* Additional Info Section */}
                <div className="mt-16 pt-10 border-t border-slate-700/50 space-y-12">
                    <div className="bg-slate-800/40 p-6 rounded-lg">
                        <h4 className="text-2xl font-lalezar text-center text-indigo-300 mb-4">{t('qamar_method_explanation_title')}</h4>
                        <p className="font-tanha text-gray-300 text-center leading-relaxed max-w-3xl mx-auto">
                            {t('qamar_method_explanation_text')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-red-900/20 p-6 rounded-lg">
                             <h4 className="text-2xl font-lalezar text-red-300 mb-4">{t('qamar_prohibited_title')}</h4>
                             <ul className="list-disc list-inside space-y-2 font-tanha text-red-200" dangerouslySetInnerHTML={{ __html: t('qamar_prohibited_list') }} />
                        </div>
                         <div className="bg-green-900/20 p-6 rounded-lg">
                             <h4 className="text-2xl font-lalezar text-green-300 mb-4">{t('qamar_mitigation_title')}</h4>
                             <p className="font-tanha text-green-200 mb-4">{t('qamar_mitigation_p1')}</p>
                             <ul className="list-disc list-inside space-y-3 font-tanha text-green-200">
                                <li dangerouslySetInnerHTML={{ __html: t('qamar_mitigation_l1') }} />
                                <li dangerouslySetInnerHTML={{ __html: t('qamar_mitigation_l2') }} />
                             </ul>
                        </div>
                    </div>
                </div>
            </Card>
        </section>
    );
};

export default QamarDarAghrabSection;
