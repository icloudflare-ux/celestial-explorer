
import React, { useState } from 'react';
import { QarinResult } from '../types';
import { calculateAbjad } from '../utils/abjad';
import ResultActions from './common/ResultActions';
import { AccordionItem } from './common/Accordion';

interface QarinResultGuideProps {
    result: QarinResult;
    onBack: () => void;
}

const activeSigns = [
    { id: 's1', text: 'خواب‌ها واضح، روشن و قابل یادآوری می‌شوند.' },
    { id: 's2', text: 'شهود یا الهام لحظه‌ای زیاد می‌شود (حس ششم قوی).' },
    { id: 's3', text: 'ذهن برای تصمیم‌گیری سریع و بدون شک عمل می‌کند.' },
    { id: 's4', text: 'مسیرهای نیمه‌کاره تمایل به کامل شدن پیدا می‌کنند.' },
    { id: 's5', text: 'انرژی شما در محیط قابل حس می‌شود (آرامش یا حضور قوی).' },
];

const dormantSigns = [
    { id: 'd1', text: 'خواب‌ها آشفته، تکراری و بی‌معنی هستند.' },
    { id: 'd2', text: 'ذهن گیج و تصمیم‌گیری سخت می‌شود.' },
    { id: 'd3', text: 'حالت درونی با یک حرف کوچک به هم می‌ریزد.' },
    { id: 'd4', text: 'مسیر رزق و اتفاقات خوب کُند می‌شود.' },
    { id: 'd5', text: 'روابط سرد یا بسیار حساس می‌شوند.' },
];

const AwakeningMethodCard: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 flex flex-col h-full">
        <div className="flex items-center mb-4">
            <span className="text-4xl ml-4">{icon}</span>
            <h5 className="text-2xl font-lalezar text-indigo-300">{title}</h5>
        </div>
        <div className="text-gray-300 font-tanha leading-relaxed">{children}</div>
    </div>
);

const QarinResultGuide: React.FC<QarinResultGuideProps> = ({ result, onBack }) => {
    const qarinAbjad = calculateAbjad(result.qarinName);
    const [selectedSigns, setSelectedSigns] = useState<Set<string>>(new Set());

    const handleSignToggle = (id: string) => {
        setSelectedSigns(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };
    
    const fullResultText = `
تحلیل قرین برای ${result.name} فرزند ${result.motherName}
================================
نام قرین: ${result.qarinName} (ابجد: ${qarinAbjad})
عدد ریشه: ${result.rootNumber}
حروف استخراج شده: ${result.startLetter}, ${result.middleLetter}, ${result.finalLetter}
منطق ساخت نام: ${result.explanation}
================================
قرین چیست؟ قرین انعکاس انرژی شماست، نه یک موجود خیر یا شر. اگر آرام باشید، آرام است و اگر آشفته باشید، آشفته می‌شود.
================================
راهکارهای بیداری قرین:
۱. پاکسازی خواب: قبل از خواب، آیت الکرسی، سوره توحید و آیه "آمن الرسول" را بخوانید.
۲. بیدار کردن شهود: روزی ۳ بار، ۳۰ ثانیه دست راست را روی سینه گذاشته و بگویید: «یا نور، یا هادی، یا لطیف، یا علیم».
۳. بستن پرونده‌های نیمه‌تمام: هر روز یک کار کوچک نیمه‌تمام را به سرانجام برسانید.
۴. ذکر مخصوص: شبی یک بار بگویید: «يَا حَيُّ يَا قَيُّومُ، نَوْرْ بَاطِنِي وَاهْدِ رُوحِي».
================================
دانستن نام قرین خطرناک نیست و فقط برای شناخت مسیر روحی مفید است.
    `.trim();

    return (
        <div className="space-y-12 animate-fade-in printable-content">
            {/* --- Header --- */}
            <div className="flex justify-between items-center border-b border-slate-700/50 pb-6">
                <div>
                    <h3 className="text-4xl font-lalezar text-indigo-300">راهنمای کامل قرین شما</h3>
                    <p className="text-lg text-gray-400 font-tanha">برای «{result.name}» فرزند «{result.motherName}»</p>
                </div>
                <button onClick={onBack} className="flex items-center gap-2 text-gray-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/70 px-4 py-2 rounded-lg transition-colors print-actions">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    <span>محاسبه جدید</span>
                </button>
            </div>

            {/* --- Calculation Result --- */}
            <section className="text-center">
                <p className="text-gray-400 font-tanha text-lg mb-2">نام فرکانسی قرین شما:</p>
                <h2 className="text-7xl font-lalezar tracking-wider text-white mb-3" style={{ textShadow: '0 0 25px rgba(129, 140, 248, 0.7)' }}>
                    {result.qarinName}
                </h2>
                <div className="inline-block bg-slate-900/60 px-4 py-1 rounded-full border border-slate-600/50">
                    <span className="text-gray-400 text-sm ml-2">ابجد کبیر:</span>
                    <span className="font-roboto-mono text-amber-400 font-bold text-lg">{qarinAbjad}</span>
                </div>
                <div className="mt-6 text-indigo-200 font-tanha max-w-2xl mx-auto">
                    <p><strong className="text-indigo-300">منطق ساخت:</strong> {result.explanation}</p>
                    <p><strong className="text-indigo-300">بر اساس حروف:</strong> {result.startLetter} (از عدد ریشه {result.rootNumber}) + {result.middleLetter} (از نام شما) + {result.finalLetter} (از نام مادر)</p>
                </div>
            </section>
            
            {/* --- Philosophy Section --- */}
            <section className="p-6 bg-slate-800/40 rounded-lg">
                <h4 className="text-2xl font-lalezar text-cyan-300 mb-4 text-center">قرین چیست و چه نیست؟</h4>
                <div className="font-tanha text-gray-300 text-lg leading-relaxed space-y-3 prose prose-invert max-w-none">
                    <p>قرین <strong className="text-cyan-400">«انعکاس انرژی تو»</strong> از لحظه تولد است. نه فرشته است، نه جن و نه موجودی مستقل. اگر تو آرام باشی، او هم آرام است. اگر آشفته باشی، او هم آشفته می‌شود.</p>
                    <p>داستان پسوندهای «ایل» (برای قرین خوب) و «یوش» (برای قرین بد) دقیق نیست، زیرا قرین خوب و بد نداریم و این پسوندها مربوط به طبقات دیگری از موجودات هستند. نام قرین شما، یک خروجی عددی و فرکانسی است.</p>
                </div>
            </section>
            
            {/* --- Status Checklist Section --- */}
            <section>
                <h4 className="text-2xl font-lalezar text-cyan-300 mb-4 text-center">وضعیت فعلی قرین شما چگونه است؟</h4>
                <p className="text-center text-gray-400 font-tanha mb-8 max-w-3xl mx-auto">علائمی که با وضعیت فعلی شما همخوانی دارند را انتخاب کنید تا درک بهتری از حالت انرژی خود پیدا کنید.</p>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h5 className="text-xl font-lalezar text-green-400 mb-4">نشانه‌های قرین فعال (روشن)</h5>
                        <div className="space-y-3">
                            {activeSigns.map(item => (
                                <label key={item.id} className={`flex items-start p-3 rounded-lg cursor-pointer transition-colors ${selectedSigns.has(item.id) ? 'bg-green-900/50' : 'bg-slate-800/50'}`}>
                                    <input type="checkbox" checked={selectedSigns.has(item.id)} onChange={() => handleSignToggle(item.id)} className="mt-1 ml-3 h-5 w-5 rounded bg-slate-700 border-slate-500 text-green-500 focus:ring-green-500"/>
                                    <span className="text-gray-200 font-tanha">{item.text}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                         <h5 className="text-xl font-lalezar text-red-400 mb-4">نشانه‌های قرین خفته (خاموش)</h5>
                         <div className="space-y-3">
                            {dormantSigns.map(item => (
                                <label key={item.id} className={`flex items-start p-3 rounded-lg cursor-pointer transition-colors ${selectedSigns.has(item.id) ? 'bg-red-900/50' : 'bg-slate-800/50'}`}>
                                    <input type="checkbox" checked={selectedSigns.has(item.id)} onChange={() => handleSignToggle(item.id)} className="mt-1 ml-3 h-5 w-5 rounded bg-slate-700 border-slate-500 text-red-500 focus:ring-red-500"/>
                                    <span className="text-gray-200 font-tanha">{item.text}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Awakening Guide --- */}
            <section>
                <h4 className="text-3xl font-lalezar text-cyan-300 mb-8 text-center">راهنمای عملی بیدار کردن قرین</h4>
                <div className="grid md:grid-cols-2 gap-8">
                    <AwakeningMethodCard icon="🛌" title="۱. پاکسازی خواب">
                        <p>چون اولین جایی که قرین فعالیتش دیده می‌شود «خواب» است، هر شب قبل از خواب این موارد را بخوانید:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>یک بار آیت الکرسی</li>
                            <li>یک بار سوره توحید</li>
                            <li>یک بار آیه «آمن الرسول...» (آخر بقره)</li>
                        </ul>
                    </AwakeningMethodCard>
                    <AwakeningMethodCard icon="💡" title="۲. بیدار کردن شهود">
                         <p>برای روشن کردن فرکانس درونی ذهن، روزانه ۳ بار، فقط ۳۰ ثانیه دست راست را روی سینه بگذارید و بگویید:</p>
                         <p className="font-semibold text-lg text-center my-2 text-indigo-200">«یا نور، یا هادی، یا لطیف، یا علیم»</p>
                    </AwakeningMethodCard>
                    <AwakeningMethodCard icon="🎯" title="۳. بستن پرونده‌های نیمه‌تمام">
                        <p>بزرگترین قاتل انرژی قرین، چیزهای نیمه‌کاره است. هر روز یک مورد کوچک از کارهای نیمه‌تمام (حرفی که نگفته‌اید، کاری که رها کرده‌اید) را انجام دهید. قرین با «بستن چرخه‌ها» فعال می‌شود.</p>
                    </AwakeningMethodCard>
                    <AwakeningMethodCard icon="🔑" title="۴. ذکر مخصوص بیداری">
                        <p>این ذکر را فقط یک بار در شب بگویید. فرکانس آن دقیقاً روی بیداری قرین اثر می‌گذارد:</p>
                        <div className="my-3 p-3 bg-slate-900/70 rounded-md text-center">
                            <p className="text-xl font-lalezar text-amber-300">يَا حَيُّ يَا قَيُّومُ، نَوْرْ بَاطِنِي وَاهْدِ رُوحِي</p>
                            <p className="text-sm text-gray-400 mt-1">«ای زنده جاوید، درونم را نورانی کن و روحم را هدایت کن.»</p>
                        </div>
                    </AwakeningMethodCard>
                </div>
            </section>

            {/* --- FAQ Section --- */}
            <section>
                 <h4 className="text-3xl font-lalezar text-cyan-300 mb-6 text-center">پرسش‌های متداول</h4>
                 <AccordionItem title="دانستن نام قرین چه فایده‌ای دارد؟">
                    <p>دانستن نام قرین، دانستن «هسته‌ی انرژی خودتان» است. این نام یک کلید برای شناخت ریتم انرژی، سبک خواب، نقاط قوت و ضعف، و تقویت شهود شماست. از آن می‌توان به عنوان «کلید تمرکز» در مراقبه برای تنظیم ذهن استفاده کرد.</p>
                 </AccordionItem>
                 <AccordionItem title="آیا دانستن اسم قرین خطرناک است؟">
                    <p>کاملاً روشن و کوتاه: دانستن اسم قرین نه بد است و نه خطرناک. این نام هیچ انرژی خاصی را باز نمی‌کند و اتصال ماورایی ایجاد نمی‌کند، بلکه فقط «شناخت» می‌دهد. شناخت، همیشه قدرت می‌آورد و ضرری ندارد.</p>
                 </AccordionItem>
                 <AccordionItem title="اثر قرین روی خواب، رزق و روابط چیست؟">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>خواب:</strong> قرین فعال ← خواب روشن و پیام‌دار | قرین خفته ← خواب آشفته و بی‌معنی.</li>
                        <li><strong>رزق:</strong> قرین فعال ← مسیر رزق باز می‌شود | قرین خفته ← رزق از بین نمی‌رود، اما «کند» می‌شود.</li>
                        <li><strong>روابط:</strong> قرین فعال ← آرامش و درک متقابل | قرین خفته ← حساسیت، سوءبرداشت و دلخوری.</li>
                    </ul>
                 </AccordionItem>
            </section>
            
            <ResultActions textToCopy={fullResultText} />
        </div>
    );
};

export default QarinResultGuide;
