
import { GoogleGenAI, Type } from "@google/genai";
import { Profile, BirthChartData } from "../types";

const model = 'gemini-3-flash-preview';

// Singleton AI instance to avoid re-initialization
let ai: GoogleGenAI | null = null;

const CONFIGURATION_ERROR_MESSAGE = "خطای پیکربندی: کلید API در محیط برنامه تنظیم نشده است. لطفاً با مدیر سیستم تماس بگیرید.";

/**
 * Initializes and returns the GoogleGenAI client instance.
 * Returns null if the API key is not found in environment variables.
 */
const getAi = (): GoogleGenAI | null => {
    if (ai) {
        return ai;
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("Gemini API Key is not set in environment variables.");
        return null;
    }
    
    ai = new GoogleGenAI({ apiKey });
    return ai;
};

export const generateAstrologicalReading = async (
    name: string,
    motherName: string,
    rabTale: number,
    birthDate?: string,
    birthTime?: string
): Promise<string> => {
    const ai = getAi();
    if (!ai) return CONFIGURATION_ERROR_MESSAGE;

    if (!name || !motherName) return "لطفاً نام و نام مادر را وارد کنید.";
    try {
        const birthInfo = birthDate 
            ? `که در تاریخ شمسی "${birthDate}" ${birthTime ? `حدود ساعت ${birthTime}` : ''} متولد شده است` 
            : '';

        const prompt = `
        بر اساس متد شیخ بهایی در علوم غریبه، برای فردی به نام "${name}" فرزند "${motherName}" ${birthInfo}، یک تحلیل طالع عمیق، دقیق و ساختارمند بنویس.
        عدد "رب الطالع" این شخص که از محاسبه ابجد کبیر نام او و مادرش به دست آمده، عدد ${rabTale} است.

        بر اساس این عدد، طالع فرد متناظر با برج فلکی زیر است:
        1: حمل, 2: ثور, 3: جوزا, 4: سرطان, 5: اسد, 6: سنبله, 7: میزان, 8: عقرب, 9: قوس, 10: جدی, 11: دلو, 12: حوت.

        **دستورالعمل‌های ساختاری:**
        1.  **لحن:** لحن متن باید شبیه به متون کهن فارسی، اسرارآمیز، محترم و سرشار از حکمت باشد.
        2.  **برجسته‌سازی:** کلمات کلیدی و مهم (مانند نام برج‌ها، سیارات، عناصر، صفات شخصیتی و مفاهیم عرفانی) را با قرار دادن بین دو ستاره برجسته کن. مثال: **شجاعت** یا **سیاره مریخ**.
        3.  **محتوا:** تحلیل خود را با ذکر نام برج فلکی متناظر با عدد ${rabTale} آغاز کن. سپس یک تفسیر عرفانی و کامل بر اساس آن ارائه بده. در این تفسیر به موارد زیر بپرداز:
            - سرشت و طبیعت ذاتی فرد بر اساس برج طالع
            - خصوصیات بارز اخلاقی (نقاط قوت و ضعف)
            - توصیه‌هایی حکیمانه برای موفقیت و تعالی در مسیر زندگی
            - ارتباط این طالع با **عناصر اربعه** و **سیارات حاکم**
        4.  **پایان‌بندی خاص:** متن را با دو پاراگراف پایانی مجزا به این شکل تمام کن:
            - یک پاراگراف جمع‌بندی حماسی و تأثیرگذار که با نشانگر @@EPIC@@ شروع شود.
            - یک پاراگراف نهایی به عنوان خاتمه و پند آخر که با نشانگر @@FINAL@@ شروع شود.

        مثال ساختار خروجی:
        [پاراگراف‌های اصلی تحلیل با کلمات **برجسته** شده]
        ...
        @@EPIC@@این طالع، **نقشه‌ی راهی** است که از افلاک برای تو ترسیم گشته تا مسیر **تعالی** را بپیمایی.
        @@FINAL@@پس راه خود را با **بصیرت** و **آگاهی** ادامه ده که سرنوشت در دستان توست.
        `;
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text || "تحلیلی دریافت نشد.";
    } catch (error) {
        console.error("Error generating astrological reading:", error);
        return "خطا در تولید تحلیل طالع. لطفاً بعداً دوباره امتحان کنید.";
    }
};

export const generateScientificReport = async (celestialBody: string): Promise<string> => {
    const ai = getAi();
    if (!ai) return CONFIGURATION_ERROR_MESSAGE;

    if (!celestialBody) return "لطفاً نام جرم آسمانی را وارد کنید.";
    try {
        const prompt = `
        یک گزارش علمی مختصر و دقیق به زبان فارسی در مورد جرم آسمانی "${celestialBody}" ارائه بده.
        این گزارش باید شامل اطلاعاتی در مورد موقعیت نجومی آن (صورت فلکی)، شرایط رصدی از زمین، و یک حقیقت جالب و کمتر شنیده شده درباره آن باشد.
        **دستورالعمل форматирования:** کلمات و عبارات کلیدی علمی (مانند اسامی خاص، اعداد مهم، مفاهیم فیزیکی) را با قرار دادن بین دو ستاره برجسته کن. مثال: **سحابی خرچنگ** یا **۶۵۰۰ سال نوری**.
        `;
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text || "گزارشی دریافت نشد.";
    } catch (error) {
        console.error("Error generating scientific report:", error);
        return "خطا در تولید گزارش علمی. لطفاً بعداً دوباره امتحان کنید.";
    }
};


const zodiacDetailSchema = {
    type: Type.OBJECT,
    properties: {
        generalAnalysis: { type: Type.STRING, description: "یک پاراگراف کامل در مورد ماهیت کلی این برج" },
        strengths: {
            type: Type.ARRAY,
            description: "لیستی از نقاط قوت شخصیت",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "عنوان نقطه قوت" },
                    description: { type: Type.STRING, description: "توضیح کوتاه نقطه قوت" },
                },
                required: ['title', 'description'],
            },
        },
        weaknesses: {
            type: Type.ARRAY,
            description: "لیستی از نقاط ضعف و چالش‌ها",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "عنوان نقطه ضعف" },
                    description: { type: Type.STRING, description: "توضیح کوتاه نقطه ضعف" },
                },
                required: ['title', 'description'],
            },
        },
        career: { type: Type.STRING, description: "توضیح در مورد مشاغل مناسب و رویکرد این برج به کار و حرفه" },
        relationships: { type: Type.STRING, description: "توضیح در مورد رفتار این برج در روابط عاشقانه، دوستانه و خانوادگی" },
        recommendations: {
            type: Type.OBJECT,
            properties: {
                men: { type: Type.STRING, description: "چند توصیه کاربردی برای مردان متولد این برج" },
                women: { type: Type.STRING, description: "چند توصیه کاربردی برای زنان متولد این برج" },
            },
            required: ['men', 'women'],
        },
    },
    required: ['generalAnalysis', 'strengths', 'weaknesses', 'career', 'relationships', 'recommendations'],
};

export const generateZodiacSignDetails = async (
    sign: { traditional: string; modern: string; planet: string; element: string; }
): Promise<any> => {
    const ai = getAi();
    if (!ai) return null; // Return null for JSON-based functions on config error

    try {
        const prompt = `برای برج فلکی ${sign.traditional} (${sign.modern}) که سیاره حاکم آن ${sign.planet} و عنصر آن ${sign.element} است، یک تحلیل کامل و دقیق شخصیت ارائه بده.
        این تحلیل باید شامل موارد زیر باشد: تحلیل شخصیت کلی، نقاط قوت کلیدی، نقاط ضعف و چالش‌ها، شغل و حرفه، روابط عاطفی و اجتماعی، و توصیه‌هایی مجزا برای مردان و زنان متولد این برج.
        لحن متن باید جذاب، روان و کمی شاعرانه باشد و با موضوعات نجومی تناسب داشته باشد.`;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: zodiacDetailSchema,
            },
        });
        
        const jsonText = response.text?.trim();
        if (!jsonText) {
          throw new Error("No content received from API.");
        }
        
        const cleanJsonText = jsonText.replace(/^```json\s*|```$/g, '');
        
        return JSON.parse(cleanJsonText);
    } catch (error) {
        console.error("Error generating zodiac details:", error);
        return null;
    }
};

const qarinNameSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "نام قرین ساخته شده از حروف داده شده با اعراب کامل" },
        explanation: { type: Type.STRING, description: "توضیح مختصر در مورد چگونگی ساخت نام و معنای احتمالی آن" },
    },
    required: ['name', 'explanation'],
};

export const generateQarinName = async (letters: string[]): Promise<{ name: string; explanation: string; } | null> => {
    const ai = getAi();
    if (!ai) return null;

    try {
        const prompt = `
        بر اساس "روش قطعی اسم قرین"، از سه حرف استخراج شده [${letters.join(', ')}] که به ترتیب حرف آغازین، میانی و پایانی هستند، یک نام خاص برای قرین بساز.
        
        **دستورالعمل‌های حیاتی (Strict Rules):**
        1. **ثبات (Consistency):** اگر همین سه حرف دوباره ارسال شد، باید *دقیقاً* همین نام را بسازی. تغییر نام ممنوع است.
        2. **اعراب‌گذاری کامل (Tashkeel):** نام خروجی **باید و باید** دارای اعراب کامل (فتحه، کسره، ضمه، سکون) باشد. مثال: به جای "ناهز" بنویس "نَاهِزْ" یا "نُهَزْ".
        3. **ساختار:** حروف [${letters.join(', ')}] حروف اصلی هستند. برای روان شدن تلفظ، می‌توانی حروف صدادار (ا، و، ی) اضافه کنی، اما ساختار اصلی باید حفظ شود.
        
        **خروجی:**
        - **name:** نام نهایی با اعراب کامل.
        - **explanation:** توضیح کوتاه (مثلاً: "ترکیب حروف ن، ه، ز با افزودن الف و اعراب‌گذاری خاص").
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: qarinNameSchema,
                temperature: 0.0, // Zero temperature ensures deterministic output (result won't change for same input)
            },
        });
        
        const jsonText = response.text?.trim();
        if (!jsonText) {
          throw new Error("No content received from API.");
        }
        
        const cleanJsonText = jsonText.replace(/^```json\s*|```$/g, '');
        return JSON.parse(cleanJsonText);

    } catch (error) {
        console.error("Error generating Qarin name:", error);
        return null;
    }
};

const nadiReadingSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "عنوان تحلیل، مثلا: 'نادی آبی: جریان شهود و عمق'" },
        archetype: { type: Type.STRING, description: "یک کهن‌الگو یا تیپ شخصیتی برای این نادی، مثلا: 'فرزانه‌ی شهودی'" },
        coreEssence: { type: Type.STRING, description: "توضیح عمیق و شخصی‌سازی شده در مورد ذات این انرژی، با اشاره به حرف ورودی." },
        strengths: {
            type: Type.ARRAY,
            description: "لیستی از نقاط قوت کلیدی",
            items: { type: Type.STRING },
        },
        challenges: {
            type: Type.ARRAY,
            description: "لیستی از چالش‌ها یا جنبه‌های تاریک این انرژی",
            items: { type: Type.STRING },
        },
        awakeningMantra: { type: Type.STRING, description: "یک ذکر یا عبارت تاکیدی کوتاه و قدرتمند برای بیداری این نادی." },
        practicalRecommendations: {
            type: Type.ARRAY,
            description: "چند توصیه عملی و کاربردی برای زندگی روزمره",
            items: { type: Type.STRING },
        },
    },
    required: ['title', 'archetype', 'coreEssence', 'strengths', 'challenges', 'awakeningMantra', 'practicalRecommendations'],
};

export const generateNadiReading = async (letter: string, element: string, elementName: string): Promise<any> => {
    const ai = getAi();
    if (!ai) return null;

    try {
        const prompt = `
        بر اساس علم نادی‌شناسی و عناصر اربعه، یک تحلیل کامل، عمیق و شخصی‌سازی شده برای فردی ارائه بده که حرف اول قرین او حرف «${letter}» است و به نادی «${elementName}» با عنصر «${element}» تعلق دارد.
        لحن متن باید حکیمانه، الهام‌بخش و توانمندساز باشد. تحلیل باید کاملاً ساختارمند و بر اساس schema ارائه شده باشد.

        **دستورالعمل‌های محتوایی:**
        - **شخصی‌سازی:** در بخش "coreEssence"، به وضوح به حرف «${letter}» به عنوان کلید و دروازه‌ی این نادی اشاره کن.
        - **عمق:** تحلیل باید فراتر از کلیشه‌ها باشد و به جنبه‌های روحی و روانشناختی این عنصر بپردازد.
        - **کاربردی:** توصیه‌ها باید عملی و قابل اجرا در زندگی روزمره باشند.
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: nadiReadingSchema,
                temperature: 0.7,
            },
        });
        
        const jsonText = response.text?.trim();
        if (!jsonText) {
          throw new Error("No content received from API.");
        }
        
        const cleanJsonText = jsonText.replace(/^```json\s*|```$/g, '');
        return JSON.parse(cleanJsonText);

    } catch (error) {
        console.error("Error generating Nadi reading:", error);
        return null;
    }
};

const birthChartSchema = {
    type: Type.OBJECT,
    properties: {
        sun: { type: Type.STRING },
        moon: { type: Type.STRING },
        ascendant: { type: Type.STRING },
        mercury: { type: Type.STRING },
        venus: { type: Type.STRING },
        mars: { type: Type.STRING },
        jupiter: { type: Type.STRING },
        saturn: { type: Type.STRING },
    },
    required: ['sun', 'moon', 'ascendant', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'],
};


export const generateBirthChartData = async (
    birthDate: string,
    birthTime: string,
    birthCity: string
): Promise<BirthChartData | null> => {
    const ai = getAi();
    if (!ai) return null;

    try {
        const prompt = `
        As an expert astrologer, calculate the zodiacal positions for the main celestial bodies for a birth chart with the following details:
        - Birth Date: ${birthDate}
        - Birth Time: ${birthTime}
        - Birth City: ${birthCity}

        Return the result as a JSON object that strictly adheres to the provided schema. 
        The names of the zodiac signs **MUST** be in English and chosen from this exact list:
        "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces".
        Calculate the positions for the Sun, Moon, Ascendant, Mercury, Venus, Mars, Jupiter, and Saturn.
        `;
        
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: birthChartSchema,
            },
        });

        const jsonText = response.text?.trim();
        if (!jsonText) {
          throw new Error("No chart data received from API.");
        }
        
        const cleanJsonText = jsonText.replace(/^```json\s*|```$/g, '');
        return JSON.parse(cleanJsonText) as BirthChartData;

    } catch (error) {
        console.error("Error generating birth chart data:", error);
        return null;
    }
};

export const generateHoroscopeAnalysis = async (birthDate: string, birthTime: string, birthCity: string): Promise<string> => {
    const ai = getAi();
    if (!ai) return CONFIGURATION_ERROR_MESSAGE;

    try {
        const prompt = `
        به عنوان یک منجم حرفه‌ای و با لحنی حکیمانه، یک تحلیل زایچه (طالع تولد) برای فردی بنویس که در تاریخ **${birthDate}**، ساعت **${birthTime}** در شهر **${birthCity}** به دنیا آمده است.

        **دستورالعمل‌های ساختاری:**
        1.  **لحن:** حکیمانه، اسرارآمیز و مثبت.
        2.  **برجسته‌سازی:** کلمات کلیدی (نام برج، سیاره، مفاهیم مهم) را با **دو ستاره** برجسته کن.
        3.  **ساختار تحلیل:**
            - **طالع (Ascendant):** ابتدا بر اساس زمان و مکان، طالع (برج در حال طلوع) را تخمین بزن و تحلیل کن. این بخش مهم‌ترین بخش شخصیت ظاهری و مسیر کلی زندگی فرد است.
            - **موقعیت خورشید (Sun Sign):** برج خورشیدی فرد را مشخص کرده و بر اساس آن، هسته اصلی شخصیت، اراده و هدف زندگی او را شرح بده.
            - **موقعیت ماه (Moon Sign):** برج قمری را تخمین زده و دنیای درونی، احساسات، نیازهای عاطفی و غرایز او را تحلیل کن.
            - **تحلیل ترکیبی:** به طور خلاصه توضیح بده که چگونه انرژی‌های طالع، خورشید و ماه با هم ترکیب شده و یک شخصیت منحصربه‌فرد می‌سازند.
            - **توصیه نهایی:** یک پاراگراف به عنوان پند آخر برای رشد و تعالی فرد ارائه بده.
        4.  **پایان‌بندی خاص:** متن را با دو پاراگراف پایانی مجزا به این شکل تمام کن:
            - یک پاراگراف جمع‌بندی حماسی که با نشانگر @@EPIC@@ شروع شود.
            - یک پاراگراف نهایی به عنوان خاتمه که با نشانگر @@FINAL@@ شروع شود.
        `;
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text || "تحلیلی دریافت نشد.";
    } catch (error) {
        console.error("Error generating horoscope analysis:", error);
        return "خطا در تولید تحلیل زایچه. لطفاً بعداً دوباره امتحان کنید.";
    }
};

export const generateElectionalAnalysis = async (eventType: string, dateRange: string): Promise<string> => {
    const ai = getAi();
    if (!ai) return CONFIGURATION_ERROR_MESSAGE;

    try {
        const prompt = `
        به عنوان یک متخصص در علم اختیارات نجومی، بهترین و سعدترین زمان‌ها را برای انجام امر **"${eventType}"** در بازه زمانی **"${dateRange}"** مشخص کن.

        **دستورالعمل‌ها:**
        1.  **لحن:** دقیق، علمی و راهنما.
        2.  **برجسته‌سازی:** تاریخ‌ها، نام سیارات و مفاهیم کلیدی را با **دو ستاره** برجسته کن.
        3.  **ساختار تحلیل:**
            - **مقدمه:** توضیح کوتاهی در مورد اهمیت انتخاب زمان مناسب برای "${eventType}".
            - **زمان‌های سعد:** چند تاریخ و ساعت مشخص را به عنوان بهترین گزینه‌ها معرفی کن. برای هر کدام، دلیل نجومی آن را به طور خلاصه ذکر کن (مثلاً: **موقعیت خوب ماه**، **ارتباط سعد مشتری و زهره**، **خالی بودن از اتصالات نحس**).
            - **زمان‌های نحس:** به زمان‌هایی که باید از آن‌ها پرهیز کرد اشاره کن و دلیل آن را به طور خلاصه توضیح بده (مثلاً: **قمر در عقرب**، **اتصال نحس مریخ و زحل**).
            - **توصیه نهایی:** یک توصیه کلی برای اقدام در زمان‌های پیشنهادی ارائه بده.
        `;
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text || "تحلیلی دریافت نشد.";
    } catch (error) {
        console.error("Error generating electional analysis:", error);
        return "خطا در یافتن بهترین زمان. لطفاً بعداً دوباره امتحان کنید.";
    }
};

export const generateHoraryAnswer = async (question: string, timestamp: Date, location: { latitude: number, longitude: number } | null): Promise<string> => {
    const ai = getAi();
    if (!ai) return CONFIGURATION_ERROR_MESSAGE;

    try {
        const now = new Date();
        now.setSeconds(0, 0);
        const timeContext = timestamp.getTime() > now.getTime() ? 'که در آینده مطرح خواهد شد' : 'که مطرح شده است';
        const timeInfo = `در تاریخ ${timestamp.toLocaleString('fa-IR', { dateStyle: 'full', timeStyle: 'short' })}`;
        const locationInfo = location ? `در موقعیت جغرافیایی (${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)})` : '';
        
        const prompt = `
        به عنوان یک منجم متخصص در طالع‌بینی پرسشی (Horary Astrology)، به پرسش زیر پاسخ بده. این پرسش ${timeInfo} ${locationInfo} ${timeContext}.

        **پرسش:** "${question}"

        **دستورالعمل‌ها:**
        1.  **لحن:** قاطع، حکیمانه و بدون ابهام، اما از دادن پاسخ قطعی "بله" یا "خیر" که ممکن است گمراه‌کننده باشد، پرهیز کن. به جای آن، شرایط و احتمالات را توضیح بده.
        2.  **برجسته‌سازی:** مفاهیم کلیدی (مانند **خانه اول**، **سیاره حاکم**، **اتصالات**) را با **دو ستاره** برجسته کن.
        3.  **ساختار پاسخ:**
            - **تحلیل اولیه:** بر اساس ساعت و موقعیت، **طالع پرسش** (Ascendant) و سیاره حاکم بر آن را مشخص کن. این سیاره نماینده پرسش‌کننده است.
            - **تحلیل موضوع پرسش:** خانه‌ای که موضوع پرسش به آن مربوط می‌شود (مثلاً خانه هفتم برای ازدواج، خانه دهم برای شغل) و سیاره حاکم بر آن را مشخص کن.
            - **بررسی اتصالات:** مهم‌ترین بخش. اتصال بین سیاره حاکم بر پرسش‌کننده و سیاره حاکم بر موضوع پرسش را بررسی کن. آیا اتصال سعد (مانند تثلیث یا تسدیس) دارند یا نحس (مانند مقابله یا تربیع)؟ آیا اتصالی در آینده نزدیک خواهند داشت؟
            - **نتیجه‌گیری:** بر اساس تحلیل بالا، یک نتیجه‌گیری منطقی ارائه بده. توضیح بده که آیا شرایط برای به نتیجه رسیدن موضوع، **آسان** و **هموار** است یا با **مانع** و **دشواری** همراه خواهد بود.
        `;
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text || "پاسخی دریافت نشد.";
    } catch (error) {
        console.error("Error generating horary answer:", error);
        return "خطا در دریافت پاسخ. لطفاً بعداً دوباره امتحان کنید.";
    }
};

export const generatePersonalDignityAnalysis = async (sign: string, ruler: string): Promise<string> => {
    const ai = getAi();
    if (!ai) return CONFIGURATION_ERROR_MESSAGE;

    try {
        const prompt = `
        به عنوان یک استاد احکام نجوم، یک تحلیل شخصی عمیق برای فردی بنویس که برج طالع او (بر اساس روش رب‌الطالع) **${sign}** و کوکب حاکم بر طالع او **${ruler}** است.

        **دستورالعمل‌های ساختاری:**
        1.  **لحن:** حکیمانه، توانمندساز و راهنما.
        2.  **برجسته‌سازی:** کلمات کلیدی (نام سیارات، برج‌ها، مفاهیم) را با **دو ستاره** برجسته کن.
        3.  **ساختار تحلیل:**
            - **مقدمه:** با معرفی **${ruler}** به عنوان سیاره حاکم بر سرنوشت این فرد شروع کن و ماهیت اصلی این سیاره را توضیح بده.
            - **اوج قدرت (شرف و حاکمیت):** توضیح بده که سیاره **${ruler}** در کدام برج‌ها در اوج قدرت خود (حاکمیت یا شرف) قرار دارد. شرح بده که این قدرت چگونه در شخصیت و استعدادهای این فرد تجلی پیدا می‌کند و چگونه می‌تواند از این پتانسیل استفاده کند.
            - **نقاط چالش (هبوط و وبال):** توضیح بده که سیاره **${ruler}** در کدام برج‌ها ضعیف (هبوط یا وبال) است. شرح بده که این ضعف‌ها چه چالش‌ها یا نقاط کوری را در زندگی این فرد ایجاد می‌کنند.
            - **راهنمای عملی:** بر اساس نقاط قوت و ضعف سیاره حاکم، چند توصیه عملی و شخصی‌سازی شده برای رشد فردی ارائه بده. (مثلاً: چگونه از قدرت مریخ برای رهبری استفاده کند و چگونه از پرخاشگری آن دوری جوید).
        4.  **پایان‌بندی خاص:** متن را با دو پاراگراف پایانی مجزا به این شکل تمام کن:
            - یک پاراگراف جمع‌بندی حماسی که با نشانگر @@EPIC@@ شروع شود.
            - یک پاراگراف نهایی به عنوان خاتمه که با نشانگر @@FINAL@@ شروع شود.
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text || "تحلیلی دریافت نشد.";
    } catch (error) {
        console.error("Error generating personal dignity analysis:", error);
        return "خطا در تولید تحلیل شخصی. لطفاً بعداً دوباره امتحان کنید.";
    }
};

export const generateDreamInterpretation = async (dream: string): Promise<string> => {
    const ai = getAi();
    if (!ai) return CONFIGURATION_ERROR_MESSAGE;

    const prompt = `
        به عنوان یک معبر خواب حکیم و همدل به نام «حکیم رویا»، خواب زیر را به زبان فارسی تعبیر کن.
        تعبیر تو باید عمیق و چندوجهی باشد و از منابع زیر الهام بگیرد:
        1.  **نمادشناسی سنتی (مانند ابن سیرین).**
        2.  **روانشناسی یونگ** (برای تحلیل کهن‌الگوها، سایه و فردیت).
        3.  **دیدگاه روانشناسی مدرن** (ارتباط خواب با استرس‌ها و آرزوها).
        4.  **عرفان و حکمت اسلامی** (الهام از روایات ائمه شیعه و سنی).
        5.  **نمادشناسی ادیان ابراهیمی** (الهام از داستان‌های پیامبران یهودی و مسیحی در کتب مقدس).

        **ساختار پاسخ:**
        1.  **نمادهای اصلی:** ۲ تا ۳ نماد مهم در خواب را شناسایی کرده و با **دو ستاره** برجسته کن.
        2.  **تحلیل موضوعی:** داستان یا احساس اصلی خواب را توصیف کن.
        3.  **تعبیر چندلایه:** چند پاراگراف بنویس که معانی احتمالی خواب را از دیدگاه‌های مختلف (سنتی، روانشناسی، عرفانی) توضیح دهد.
        4.  **پرسش‌های راهنما:** در پایان، ۲ تا ۳ پرسش درونگرایانه برای بیننده خواب مطرح کن تا به آن‌ها فکر کند.
        5.  **لحن:** لحن تو باید آرامش‌بخش، بدون قضاوت و توانمندساز باشد. از پیش‌بینی‌های قطعی پرهیز کن و تعابیر را به عنوان امکان‌هایی برای خودشناسی ارائه بده.
        6.  **پایان‌بندی:** متن را با یک پاراگراف نهایی به عنوان پند آخر که با نشانگر @@FINAL@@ شروع شود، تمام کن.

        خواب این است:
        "${dream}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text || "تعبیری دریافت نشد.";
    } catch (error) {
        console.error("Error generating dream interpretation:", error);
        return "خطا در تعبیر خواب. لطفاً بعداً دوباره امتحان کنید.";
    }
};

export const generateDailyAdvice = async (sign: string): Promise<string> => {
    const ai = getAi();
    if (!ai) return "خطا در اتصال به سرویس هوش مصنوعی.";

    const prompt = `
    برای فردی که طالع او برج **${sign}** است، یک پند روزانه کوتاه (حداکثر دو جمله)، حکیمانه و الهام‌بخش به زبان فارسی بنویس.
    این پند باید انرژی امروز را در نظر بگیرد و به او در مسیر رشد شخصی کمک کند.
    لحن باید مثبت و توانمندساز باشد.
    `;
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                temperature: 0.9,
            }
        });
        return response.text || "امروز، به ندای قلبت گوش بسپار.";
    } catch (error) {
        console.error("Error generating daily advice:", error);
        return "امروز فرصتی برای درخشش توست. از آن به بهترین شکل استفاده کن.";
    }
};

const relationshipAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        elementalHarmony: { type: Type.STRING, description: "تحلیل سازگاری بر اساس عناصر اربعه (آتش، خاک، هوا، آب)." },
        planetaryDynamics: { type: Type.STRING, description: "تحلیل تعامل سیارات حاکم بر طالع دو فرد." },
        numerologicalConnection: { type: Type.STRING, description: "تحلیل ارتباط بر اساس اعداد طالع اسمی (ریشه ابجد)." },
        strengths: {
            type: Type.ARRAY,
            description: "لیستی از نقاط قوت کلیدی در این رابطه.",
            items: { type: Type.STRING },
        },
        challenges: {
            type: Type.ARRAY,
            description: "لیستی از چالش‌ها و نقاط ضعف احتمالی در این رابطه.",
            items: { type: Type.STRING },
        },
        conclusion: { type: Type.STRING, description: "یک جمع‌بندی و توصیه نهایی برای این رابطه." },
    },
    required: ['elementalHarmony', 'planetaryDynamics', 'numerologicalConnection', 'strengths', 'challenges', 'conclusion'],
};

export const generateRelationshipAnalysis = async (
    profile1: Profile,
    analysis1: { sign: string; ruler: string; element: string; number: number; },
    profile2: Profile,
    analysis2: { sign: string; ruler: string; element: string; number: number; },
    relationshipType: string
): Promise<any | null> => {
    const ai = getAi();
    if (!ai) return null;

    try {
        const prompt = `
        به عنوان یک منجم متخصص در تحلیل روابط، یک تحلیل جامع و عمیق برای رابطه بین دو فرد زیر ارائه بده. نوع رابطه آن‌ها "${relationshipType}" است.

        **فرد اول: ${profile1.name} فرزند ${profile1.motherName}**
        - برج طالع: ${analysis1.sign}
        - سیاره حاکم: ${analysis1.ruler}
        - عنصر: ${analysis1.element}
        - عدد طالع اسمی: ${analysis1.number}

        **فرد دوم: ${profile2.name} فرزند ${profile2.motherName}**
        - برج طالع: ${analysis2.sign}
        - سیاره حاکم: ${analysis2.ruler}
        - عنصر: ${analysis2.element}
        - عدد طالع اسمی: ${analysis2.number}

        **دستورالعمل‌های تحلیل:**
        1.  **لحن:** حکیمانه، سازنده و بی‌طرف. هدف راهنمایی است، نه قضاوت.
        2.  **تحلیل عناصر (Elemental Harmony):** سازگاری عناصر اربعه (آتش، خاک، هوا، آب) دو فرد را تحلیل کن. آیا عناصرشان مکمل یکدیگرند (مثل آب و خاک) یا در تضاد (مثل آتش و آب)؟
        3.  **تحلیل سیارات (Planetary Dynamics):** تعامل بین سیارات حاکم بر طالع دو فرد (${analysis1.ruler} و ${analysis2.ruler}) را بررسی کن. آیا این سیارات با هم دوست هستند (مثل زهره و مریخ) یا دشمن (مثل زحل و شمس)؟
        4.  **تحلیل اعداد (Numerological Connection):** ارتباط بین اعداد طالع اسمی (${analysis1.number} و ${analysis2.number}) را تحلیل کن. این اعداد نشان‌دهنده مسیر کلی زندگی و انرژی پایه افراد هستند.
        5.  **نقاط قوت و ضعف (Strengths & Challenges):** بر اساس تحلیل‌های بالا، چند نقطه قوت کلیدی و چند چالش مهم در این رابطه را به صورت لیستی مشخص کن.
        6.  **جمع‌بندی (Conclusion):** یک نتیجه‌گیری نهایی و توصیه‌ای سازنده برای بهبود و موفقیت این رابطه ارائه بده.

        **خروجی باید دقیقاً بر اساس schema ارائه‌شده باشد.**
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: relationshipAnalysisSchema,
                temperature: 0.5,
            },
        });
        
        const jsonText = response.text?.trim();
        if (!jsonText) {
          throw new Error("No content received from API.");
        }
        
        const cleanJsonText = jsonText.replace(/^```json\s*|```$/g, '');
        return JSON.parse(cleanJsonText);

    } catch (error) {
        console.error("Error generating relationship analysis:", error);
        return null;
    }
};

const jafarSchema = {
    type: Type.OBJECT,
    properties: {
        steps: {
            type: Type.ARRAY,
            description: "آرایه‌ای از رشته‌ها که هر کدام یک مرحله از فرآیند مستحصله را به صورت خلاصه نشان می‌دهد (مثال: 'مرحله اساس: ...' یا 'مرحله نظیره: ...').",
            items: { type: Type.STRING },
        },
        finalAnswer: { type: Type.STRING, description: "پاسخ نهایی که به صورت یک جمله حکیمانه و کوتاه استخراج شده است." },
    },
    required: ['steps', 'finalAnswer'],
};

export const generateJafarAnswer = async (question: string): Promise<{ steps: string[], finalAnswer: string } | null> => {
    const ai = getAi();
    if (!ai) return null;

    try {
        const prompt = `
        به عنوان یک استاد اعظم در علم جفر، سؤال زیر را با استفاده از روش «مستحصله» تحلیل کرده و پاسخ آن را استخراج کن.
        
        **سؤال:** "${question}"

        **دستورالعمل‌ها:**
        1.  **شبیه‌سازی فرآیند:** مراحل اصلی فرآیند مستحصله را به صورت خلاصه شبیه‌سازی کن. این مراحل باید شامل تجزیه حروف، مرحله «اساس» و مرحله «نظیره» باشند. نیازی به نمایش جداول کامل نیست، فقط یک توضیح کوتاه از هر مرحله و نتیجه آن کافیست.
        2.  **استخراج پاسخ:** بر اساس این مراحل، یک پاسخ نهایی (مستحصله) بساز.
        3.  **لحن پاسخ نهایی:** پاسخ نهایی باید کوتاه، حکیمانه، کمی شاعرانه و در عین حال مرتبط با سؤال باشد.
        4.  **خروجی JSON:** نتیجه را دقیقاً در قالب JSON و بر اساس schema ارائه شده برگردان.

        **مثال برای خروجی:**
        اگر سؤال "آیا در این کار موفق می‌شوم؟" باشد، خروجی می‌تواند چیزی شبیه به این باشد:
        {
          "steps": [
            "۱. تجزیه حروف سؤال و حذف حروف تکراری.",
            "۲. اجرای مرحله اساس و استخراج حروف مبنا.",
            "۳. اجرای مرحله نظیره و یافتن حروف متناظر.",
            "۴. ترکیب و استنطاق حروف نهایی."
          ],
          "finalAnswer": "عاقبت خیر است اگر با صبر همراه شود."
        }
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: jafarSchema,
                temperature: 0.6,
            },
        });
        
        const jsonText = response.text?.trim();
        if (!jsonText) {
          throw new Error("No content received from API.");
        }
        
        const cleanJsonText = jsonText.replace(/^```json\s*|```$/g, '');
        return JSON.parse(cleanJsonText);

    } catch (error) {
        console.error("Error generating Jafar answer:", error);
        return null;
    }
};

export const generateJafriNameAnalysis = async (name: string, motherName: string): Promise<string> => {
    const ai = getAi();
    if (!ai) return CONFIGURATION_ERROR_MESSAGE;

    try {
        const prompt = `
        به عنوان یک استاد اعظم در علم جفر، یک تحلیل شخصیتی و سرنوشت عمیق برای فردی به نام **${name}** فرزند **${motherName}** ارائه بده. این تحلیل باید فراتر از محاسبه ساده رب‌الطالع باشد و از تکنیک‌های پیچیده‌تر جفری استفاده کند.

        **دستورالعمل‌های ساختاری:**
        1.  **لحن:** بسیار حکیمانه، عرفانی، اسرارآمیز و محترم.
        2.  **برجسته‌سازی:** کلمات و مفاهیم کلیدی (مانند صفات شخصیتی، چالش‌ها، مفاهیم عرفانی) را با **دو ستاره** برجسته کن.
        3.  **ساختار تحلیل:**
            - **مقدمه (بسط حروف):** با اشاره به اینکه هر حرف در نام فرد یک **رمز** است، تحلیل را آغاز کن.
            - **تحلیل هسته شخصیت:** بر اساس محاسبات پیچیده‌ی ابجد (که تو در پشت صحنه انجام می‌دهی)، هسته اصلی شخصیت، **ذات درونی** و طبیعت فرد را شرح بده.
            - **نقاط قوت و ضعف:** استعدادهای بالقوه (نقاط قوت) و چالش‌های اصلی (نقاط ضعف) در مسیر زندگی او را مشخص کن.
            - **مسیر روحی و سرنوشت:** بینشی در مورد مسیر روحی، **امتحانات اصلی** زندگی و هدف غایی او ارائه بده.
        4.  **پایان‌بندی خاص:** متن را با دو پاراگراف پایانی مجزا به این شکل تمام کن:
            - یک پاراگراف جمع‌بندی حماسی که با نشانگر @@EPIC@@ شروع شود.
            - یک پاراگراف نهایی به عنوان پند آخر که با نشانگر @@FINAL@@ شروع شود.
        `;
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text || "تحلیلی دریافت نشد.";
    } catch (error) {
        console.error("Error generating Jafri name analysis:", error);
        return "خطا در تولید تحلیل جفری. لطفاً بعداً دوباره امتحان کنید.";
    }
};