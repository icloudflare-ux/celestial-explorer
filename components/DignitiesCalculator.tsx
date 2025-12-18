
import React, { useState, useMemo } from 'react';
import { planets, signs, dignities } from '../data/dignitiesData';
import Card from './common/Card';

const DignityExplanationCard: React.FC<{ title: string, color: string, icon: string, definition: string, dos: string, donts: string }> = ({ title, color, icon, definition, dos, donts }) => (
    <div className={`bg-slate-800/40 p-6 rounded-lg border-t-4 ${color}`}>
        <div className="flex items-center mb-4">
            <span className="text-4xl ml-4">{icon}</span>
            <h5 className={`text-3xl font-lalezar ${color.replace('border-', 'text-')}`}>{title}</h5>
        </div>
        <p className="font-tanha text-gray-300 text-lg mb-4">{definition}</p>
        <div className="font-tanha text-base space-y-3">
            <div className="p-3 bg-green-900/20 rounded-md">
                <strong className="text-green-400">✅ باید کرد:</strong>
                <p className="text-gray-300">{dos}</p>
            </div>
            <div className="p-3 bg-red-900/20 rounded-md">
                <strong className="text-red-400">❌ نباید کرد:</strong>
                <p className="text-gray-300">{donts}</p>
            </div>
        </div>
    </div>
);

const DignitiesCalculator: React.FC = () => {
    const [selectedPlanet, setSelectedPlanet] = useState(planets[0].id);
    const [selectedSign, setSelectedSign] = useState(signs[0].id);

    const result = useMemo(() => {
        const planetDignities = dignities[selectedPlanet];
        if (planetDignities && planetDignities[selectedSign]) {
            return planetDignities[selectedSign];
        }
        return {
            type: 'عادی',
            explanation: 'این سیاره در این برج وضعیت خاصی (حاکمیت، شرف، وبال یا هبوط) ندارد و انرژی آن به صورت عادی و بدون تأکید خاصی بروز می‌کند.',
            color: 'text-gray-300',
        };
    }, [selectedPlanet, selectedSign]);

    return (
        <Card>
            <div className="text-center">
                <h4 className="text-3xl font-semibold text-white font-lalezar tracking-wide">جدول و راهنمای شرف، هبوط و وبال کواکب</h4>
                <p className="font-tanha text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4">
                    در علم احکام نجوم، هر سیاره در برخی برج‌های فلکی قدرتمند و در برخی دیگر ضعیف است. این وضعیت‌ها بر کیفیت تأثیر آن سیاره بر طالع و رویدادها اثر می‌گذارد. با انتخاب سیاره و برج، وضعیت آن را مشاهده کرده و با معنای هر وضعیت آشنا شوید.
                </p>
            </div>
            
            <div className="mt-8 max-w-xl mx-auto space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="planet-select" className="block text-lg font-tanha text-gray-300 mb-2">سیاره:</label>
                        <select
                            id="planet-select"
                            value={selectedPlanet}
                            onChange={(e) => setSelectedPlanet(e.target.value)}
                            className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500 text-lg"
                        >
                            {planets.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="sign-select" className="block text-lg font-tanha text-gray-300 mb-2">برج فلکی:</label>
                        <select
                            id="sign-select"
                            value={selectedSign}
                            onChange={(e) => setSelectedSign(e.target.value)}
                            className="w-full bg-slate-800/50 border-slate-600 rounded p-3 focus:ring-2 focus:ring-indigo-500 text-lg"
                        >
                            {signs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                </div>

                {result && (
                    <div className="mt-8 pt-6 border-t border-slate-700/50 text-center animate-fade-in">
                        <p className="text-gray-400 font-tanha text-xl">وضعیت <strong className="text-white">{planets.find(p=>p.id === selectedPlanet)?.name}</strong> در برج <strong className="text-white">{signs.find(s=>s.id === selectedSign)?.name}</strong>:</p>
                        <h5 className={`text-5xl font-lalezar my-4 ${result.color}`}>
                            {result.type}
                        </h5>
                        <p className="font-tanha text-gray-300 leading-loose text-lg max-w-2xl mx-auto">{result.explanation}</p>
                    </div>
                )}
            </div>

            <div className="mt-16 pt-10 border-t border-slate-700/50">
                 <h4 className="text-3xl font-lalezar text-center mb-10 text-indigo-300">راهنمای کامل وضعیت‌های کواکب</h4>
                 <div className="grid lg:grid-cols-2 gap-8">
                    <DignityExplanationCard
                        title="حاکمیت (Rulership)"
                        color="border-amber-400"
                        icon="👑"
                        definition="قوی‌ترین حالت سیاره. سیاره در خانه خود است و انرژی آن خالص، قدرتمند و باثبات عمل می‌کند. مانند پادشاهی که بر تخت خود نشسته است."
                        dos="آغاز کارهای بزرگ، تصمیم‌گیری‌های کلیدی، استفاده از استعدادهای ذاتی."
                        donts="شک و تردید، به تعویق انداختن فرصت‌ها."
                    />
                    <DignityExplanationCard
                        title="شرف (Exaltation)"
                        color="border-green-400"
                        icon="✨"
                        definition="جایگاهی که سیاره در آن به اوج افتخار و قدرت می‌رسد. انرژی آن بسیار سازنده، درخشان و مثبت است. مانند مهمان عزیزی که در بهترین جایگاه پذیرایی می‌شود."
                        dos="شروع پروژه‌های خلاقانه، امور مربوط به شهرت و اعتبار، کارهای خیر و معنوی."
                        donts="کارهای پنهانی، اعمال منفی و بدخواهانه."
                    />
                     <DignityExplanationCard
                        title="وبال (Detriment)"
                        color="border-gray-400"
                        icon=" exiled "
                        definition="سیاره در برج مقابل خانه خود قرار دارد و احساس بیگانگی و ضعف می‌کند. انرژی آن ناپایدار و در جهت نامناسب بروز می‌کند. مانند پادشاهی در تبعید."
                        dos="تأمل و بازنگری، یادگیری از اشتباهات، احتیاط در تصمیم‌گیری."
                        donts="شروع شراکت‌های جدید، تصمیمات عجولانه، پافشاری بر روش‌های قدیمی."
                    />
                    <DignityExplanationCard
                        title="هبوط (Fall)"
                        color="border-red-400"
                        icon="🌪️"
                        definition="ضعیف‌ترین و آسیب‌پذیرترین حالت سیاره. انرژی آن سرکوب شده، منحرف یا ویرانگر است. مانند یک قهرمان شکست‌خورده."
                        dos="استراحت و بازیابی انرژی، درخواست کمک از دیگران، تمرکز بر سلامت جسم و روان."
                        donts="آغاز کارهای بسیار مهم، ریسک‌های بزرگ مالی یا عاطفی، رویارویی مستقیم با دشمنان."
                    />
                 </div>
            </div>
        </Card>
    );
};

export default DignitiesCalculator;
