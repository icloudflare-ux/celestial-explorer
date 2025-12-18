
import React from 'react';
import Card from './common/Card';

const InfoBlock: React.FC<{ title: string; children: React.ReactNode; colorClass: string; }> = ({ title, children, colorClass }) => (
    <div className={`bg-slate-800/40 p-5 rounded-lg border-r-4 ${colorClass}`}>
        <h6 className="font-lalezar text-xl text-gray-100 mb-2">{title}</h6>
        <div className="font-tanha text-gray-300 space-y-2">{children}</div>
    </div>
);

const TalehSaadNahsSection: React.FC = () => {
  return (
    <section id="taleh-saad-nahs">
      <h3 className="text-4xl md:text-5xl font-bold text-center mb-6 font-lalezar tracking-wider bg-gradient-to-r from-green-400 to-red-500 text-transparent bg-clip-text">
        چطور بفهمیم طالع ما سعد است یا نحس؟
      </h3>
      <p className="text-center text-gray-400 mb-12 max-w-4xl mx-auto font-tanha text-lg leading-relaxed">
        و چگونه طالع نحس را به طالع سعد تبدیل کنیم. راهنمایی جامع بر اساس مکاتب علوم باطنی برای شناخت کیفیت انرژی و بهبود مسیر زندگی.
      </p>

      <Card>
        <div className="prose prose-lg prose-invert max-w-none text-gray-300 prose-p:my-4 prose-headings:text-indigo-300 leading-relaxed font-tanha prose-headings:font-lalezar prose-headings:tracking-wider prose-headings:text-2xl">
            {/* Introduction */}
            <p>در تمام مکتب‌های علوم غریبه، از جفر و حروف گرفته تا صوفیه و طالع‌شناسی قدیم، یک باور مهم وجود دارد: هر انسان با یک «کیفیت انرژی» وارد دنیا می‌شود که به آن «طالع» می‌گویند. طالع، قانون خشک و سرنوشت تغییرناپذیر نیست؛ بلکه کیفیت نوری یا سایه‌ای است که روح انسان در لحظه تولد با آن وارد جهان می‌شود.</p>
            <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30 text-center">
                    <h4 className="!text-green-400 !mt-0">طالع سعد ✨</h4>
                    <p className="!mb-0">انرژی سبک، روشن، همراه و هدایت‌شونده که مسیرها را باز می‌کند.</p>
                </div>
                <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30 text-center">
                    <h4 className="!text-red-400 !mt-0">طالع نحس ⚠️</h4>
                    <p className="!mb-0">انرژی سنگین، کند و پرفشار که مسیرها را بسته یا سخت می‌کند.</p>
                </div>
            </div>
            <p className="font-bold text-center text-xl !text-amber-300">نکته کلیدی: هیچ طالع نحسی برای همیشه نحس نیست. طالع نحس یک وضعیت موقتی است و با آگاهی و عمل، می‌تواند به طالع سعد تبدیل شود.</p>
            
            <hr className="border-slate-700 my-12" />

            {/* Part 1: Diagnosis */}
            <h4 className="text-center">بخش اول: سه روش تشخیص طالع</h4>
            
            <h5>۱. تشخیص از طریق نام و نام مادر (عدد طالع اسمی)</h5>
            <p>در مکتب حروف و جفر، اسم شما (فرکانس بیرونی) و اسم مادر (ریشه اتصال به دنیا) دو ستون اصلی هویت نوری شما هستند. با جمع ابجد این دو نام و رساندن آن به یک عدد تک‌رقمی (۱ تا ۹)، «عدد طالع اسمی» شما به دست می‌آید.</p>
            <div className="space-y-6 my-8">
                <InfoBlock title="عدد ۱: سعد قوی (نیازمند مدیریت)" colorClass="border-red-500">
                    <p>شخصیت پیشرو و رهبر. اگر کنترل نشود، به تندی و تک‌روی می‌گراید. سعد قوی است اما نیازمند مدیریت خشم و غرور.</p>
                </InfoBlock>
                <InfoBlock title="عدد ۲: نیمه‌سعد (حساس)" colorClass="border-blue-500">
                    <p>روح لطیف و عاطفی. اگر از نظر احساسی مراقبت شود، سعد است؛ در غیر این صورت به سمت غم و وابستگی می‌رود.</p>
                </InfoBlock>
                <InfoBlock title="عدد ۳: سعد اجتماعی" colorClass="border-cyan-400">
                    <p>اجتماعی، خوش‌صحبت و خلاق. فرصت‌ها برایش زیاد است اما باید حواس‌پرتی و بازیگوشی کنترل شود.</p>
                </InfoBlock>
                <InfoBlock title="عدد ۴: نیمه‌نحس (سنگین اما پایدار)" colorClass="border-emerald-500">
                    <p>زندگی آرام ولی کند. برای رسیدن به هر چیز باید زحمت بکشد، اما دستاوردهایش پایدار است.</p>
                </InfoBlock>
                 <InfoBlock title="عدد ۵: سعد پرتحرک" colorClass="border-yellow-500">
                    <p>روح بی‌قرار و دوستدار تنوع. اگر بخواهد موفق شود، باید تمرکز و برنامه‌ریزی را یاد بگیرد.</p>
                </InfoBlock>
                <InfoBlock title="عدد ۶: سعد عاطفی" colorClass="border-rose-400">
                    <p>مهربان و خانواده‌دوست. برای عشق و ازدواج طالع خوبی است اما باید مراقب فرسودگی عاطفی باشد.</p>
                </InfoBlock>
                <InfoBlock title="عدد ۷: نیمه‌نحس دنیوی (باطن بلند)" colorClass="border-purple-400">
                    <p>در امور دنیوی مسیر پر از امتحان است، اما در باطن، اگر راه معنوی را پیدا کند، از بلندترین طالع‌هاست.</p>
                </InfoBlock>
                <InfoBlock title="عدد ۸: سنگین (نوسان بین سعد و نحس)" colorClass="border-gray-500">
                    <p>فراز و فرود شدید در پول و موقعیت. بسته به اینکه صاحبش چگونه از قدرت استفاده کند، سعد یا نحس می‌شود.</p>
                </InfoBlock>
                <InfoBlock title="عدد ۹: ترکیب نور و آتش (مسئولیت)" colorClass="border-orange-500">
                    <p>اگر خودش را بشناسد، سعد و بزرگ است؛ اگر خودش را فراموش کند، به نحسی و خستگی می‌رسد.</p>
                </InfoBlock>
            </div>
            
            <h5>۲. تشخیص از طریق روز تولد و سیاره حاکم</h5>
            <p>هر روز هفته تحت فرمان یک سیاره است که کیفیت طالع را مشخص می‌کند.</p>
             <div className="space-y-4 my-6">
                <p><strong>یک‌شنبه (شمس):</strong> سعد قوی در عزت و مقام.</p>
                <p><strong>دوشنبه (قمر):</strong> سعد لطیف اما متغیر، مناسب برای امور خانواده و الهام.</p>
                <p><strong>سه‌شنبه (مریخ):</strong> نحس اما مفید برای شجاعت و کارهای سخت.</p>
                <p><strong>چهارشنبه (عطارد):</strong> نحس خفیف یا حساس، نیازمند مراقبت از وسواس و سردرگمی.</p>
                <p><strong>پنج‌شنبه (مشتری):</strong> سعد عظیم برای رزق، علم و موفقیت.</p>
                <p><strong>جمعه (زهره):</strong> سعد در محبت، آرامش و هنر.</p>
                <p><strong>شنبه (زحل):</strong> نحس قوی اما آموزگار؛ با صبر به ثبات و احترام می‌رسد.</p>
            </div>
            
            <h5>۳. تشخیص از طریق عدد روحی (تاریخ تولد)</h5>
            <p>این عدد که از جمع روز و ماه تولد به دست می‌آید، ریتم و سرعت روح شما را نشان می‌دهد.</p>
            <div className="space-y-4 my-6">
                <p><strong>۱:</strong> روح سریع و تصمیم‌گیر (سعد با هدف روشن).</p>
                <p><strong>۲:</strong> روح لطیف و وابسته (سعد در کنار آدم درست).</p>
                <p><strong>۳:</strong> روح شاد و خلاق (سعد در محیط درست).</p>
                <p><strong>۴:</strong> روح منظم و سازنده (سعد برای کارهای بلندمدت).</p>
                <p><strong>۵:</strong> روح پرتحرک و تجربه‌گر (سعد در محیط‌های متنوع).</p>
                <p><strong>۶:</strong> روح خدمتگزار و خانواده‌دوست (سعد در خدمت به دیگران).</p>
                <p><strong>۷:</strong> روح عارف و تنها (سعد برای کارهای عمیق).</p>
                <p><strong>۸:</strong> روح قدرت و امتحان (بسته به نحوه استفاده از قدرت).</p>
                <p><strong>۹:</strong> روح مسئولیت‌پذیر (سعد با درک رسالت خود).</p>
            </div>
            
            <hr className="border-slate-700 my-12" />
            
            {/* Part 2: Conversion */}
            <h4 className="text-center">بخش دوم: سه روش عملی برای تبدیل طالع نحس به سعد</h4>
            <p>هیچ طالع نحسی، سرنوشت قطعی نیست. با تنظیم انرژی، می‌توان آن را به سعد تبدیل کرد.</p>
            
            <div className="space-y-8 mt-8">
                <InfoBlock title="روش اول: سبک‌سازی روح (پاک کردن بار انرژی)" colorClass="border-cyan-400">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>رهاسازی انرژی مرده:</strong> قبل از خواب ۱۰ دقیقه تکرار کنید: «بار امروز از من جدا شود.»</li>
                        <li><strong>قطع ارتباط سمی:</strong> تماس با افراد یا محیط‌هایی که انرژیتان را می‌کشند، کم کنید.</li>
                        <li><strong>عمل نوری ساده:</strong> قبل از خواب، دست روی سینه گذاشته و ۳ بار بگویید: «خدایا دل من را سبک و روشن کن.»</li>
                    </ul>
                </InfoBlock>
                <InfoBlock title="روش دوم: هماهنگ‌سازی با ساعات سعد روزانه" colorClass="border-amber-400">
                    <p><strong>ساعت سعد ثابت و همیشگی:</strong> یک ساعت اول پس از طلوع خورشید.</p>
                    <p>در این یک ساعت، نوشتن برنامه روز، برداشتن اولین قدم برای یک کار مهم، یا نیت‌گذاری روشن (مثلاً: «امروز خیر وارد زندگی من شود.») اثر فوق‌العاده‌ای در سبک کردن طالع دارد.</p>
                </InfoBlock>
                <InfoBlock title="روش سوم: ذکر هماهنگ با طالع" colorClass="border-fuchsia-400">
                    <p>این سه ذکر نوری و امن، یک چرخه کامل برای تبدیل طالع می‌سازند:</p>
                    <ul className="list-disc list-inside space-y-2 mt-4">
                        <li><strong>یا لطیف (۱۲۹ بار روزانه):</strong> برای نرم کردن سختی‌ها.</li>
                        <li><strong>یا فتاح (۱۰۰ بار روزانه):</strong> برای باز شدن راه‌های بسته.</li>
                        <li><strong>یا نور (۱۱ بار قبل خواب):</strong> برای افزایش سعد و روشن شدن مسیر.</li>
                    </ul>
                </InfoBlock>
            </div>

            <div className="mt-12 p-6 bg-slate-800 rounded-lg border border-indigo-500/50 text-center">
                <h4 className="!text-indigo-300 !mt-0">فرمول کامل تبدیل طالع در ۳۰ روز</h4>
                <p>اگر کسی ۳۰ روز این سه پایه (سبک‌سازی روح، کار در ساعات سعد، و ذکرهای هماهنگ) را اجرا کند، در ۹۹٪ موارد، طالع از حالت سنگین خارج شده و وارد مدار نور می‌گردد.</p>
            </div>
        </div>
      </Card>
    </section>
  );
};

export default TalehSaadNahsSection;
