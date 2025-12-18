export const abjadMap: { [key: string]: number } = {
    'ا': 1, 'أ': 1, 'آ': 1,
    'ب': 2,
    'ج': 3,
    'د': 4,
    'ه': 5, 'ة': 5,
    'و': 6,
    'ز': 7,
    'ح': 8,
    'ط': 9,
    'ی': 10, 'ئ': 10, 'ي': 10,
    'ک': 20,
    'ل': 30,
    'م': 40,
    'ن': 50,
    'س': 60,
    'ع': 70,
    'ف': 80,
    'ص': 90,
    'ق': 100,
    'ر': 200,
    'ش': 300,
    'ت': 400,
    'ث': 500,
    'خ': 600,
    'ذ': 700,
    'ض': 800,
    'ظ': 900,
    'غ': 1000,
    // Persian characters mapping
    'پ': 2,  // same as ب
    'چ': 3,  // same as ج
    'ژ': 7,  // same as ز
    'گ': 20, // same as ک
};

export const calculateAbjad = (str: string): number => {
    let sum = 0;
    for (const char of str) {
        if (abjadMap[char]) {
            sum += abjadMap[char];
        }
    }
    return sum;
};

export const calculateAbjadSaghir = (str: string): number => {
    let sum = 0;
    for (const char of str) {
        if (abjadMap[char]) {
            const kabirValue = abjadMap[char];
            const saghirValue = kabirValue % 9;
            sum += saghirValue === 0 ? 9 : saghirValue;
        }
    }
    return sum;
};
