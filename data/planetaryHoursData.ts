
export const planetaryHoursData = {
  planets: [
    { name: 'Saturn', persian: 'زحل', icon: '🪐', auspiciousness: 'نحس اکبر', auspiciousnessType: 'نحس', recommendation: 'صبر و تأمل، امور ساختمانی، کشاورزی. باید از شروع کارهای مهم پرهیز کرد.' },
    { name: 'Jupiter', persian: 'مشتری', icon: '✨', auspiciousness: 'سعد اکبر', auspiciousnessType: 'سعد', recommendation: 'امور مالی، طلب حاجت از بزرگان، شروع کسب و کار، ازدواج و امور خیر.' },
    { name: 'Mars', persian: 'مریخ', icon: '🔥', auspiciousness: 'نحس اصغر', auspiciousnessType: 'نحس', recommendation: 'امور نظامی، ورزش‌های سنگین. باید از درگیری، جراحی و شروع کارها پرهیز کرد.' },
    { name: 'Sun', persian: 'شمس', icon: '☀️', auspiciousness: 'بی‌حکم', auspiciousnessType: 'بی‌حکم', recommendation: 'دیدار با پادشاهان و مقامات، درخواست مقام و مرتبه، ساخت و ساز.' },
    { name: 'Venus', persian: 'زهره', icon: '💖', auspiciousness: 'سعد اصغر', auspiciousnessType: 'سعد', recommendation: 'ازدواج، امور عشقی، مهمانی، خرید لباس و زیورآلات، هنر و موسیقی.' },
    { name: 'Mercury', persian: 'عطارد', icon: '✍️', auspiciousness: 'خنثی', auspiciousnessType: 'خنثی', recommendation: 'تحصیل، نوشتن، معامله، ارسال پیام، کارهای دقیق و فکری.' },
    { name: 'Moon', persian: 'قمر', icon: '🌙', auspiciousness: 'بی‌حکم', auspiciousnessType: 'بی‌حکم', recommendation: 'سفر، امور روزمره، ارسال پیام، ملاقات با دیگران. اثر آن متغیر است.' },
  ],
  chaldeanOrder: ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'],
  dayStarters: [ // 0: شنبه, 1: یک‌شنبه, ...
    'Saturn',    // شنبه
    'Sun',       // یک‌شنبه
    'Moon',      // دوشنبه
    'Mars',      // سه‌شنبه
    'Mercury',   // چهارشنبه
    'Jupiter',   // پنج‌شنبه
    'Venus',     // جمعه
  ],
};

export const dayNames = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];

const planetMap = new Map(planetaryHoursData.planets.map(p => [p.name, p]));

export const generateHoursForDay = (dayIndex: number) => {
    const startPlanetName = planetaryHoursData.dayStarters[dayIndex];
    const startIndex = planetaryHoursData.chaldeanOrder.indexOf(startPlanetName);
    
    const allHours = [];
    for (let i = 0; i < 24; i++) {
        const planetIndex = (startIndex + i) % planetaryHoursData.chaldeanOrder.length;
        const planetName = planetaryHoursData.chaldeanOrder[planetIndex];
        allHours.push(planetMap.get(planetName));
    }
    
    return {
        dayHours: allHours.slice(0, 12),
        nightHours: allHours.slice(12, 24),
    };
};
