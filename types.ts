export enum CalculatorMode {
  Astrological = 'astrological',
  Scientific = 'scientific',
  Qarin = 'qarin',
  Nadi = 'nadi',
  TalehSaadNahs = 'talehSaadNahs',
  Horoscope = 'horoscope',
  Electional = 'electional',
  Horary = 'horary',
  Dignities = 'dignities',
  PersonalDignities = 'personalDignities',
  Dream = 'dream',
  Relationship = 'relationship',
  Jafar = 'jafar',
  JafriNameAnalysis = 'jafriNameAnalysis',
  Abjad = 'abjad',
  Ofagh = 'ofagh',
  Ramal = 'ramal',
}

export interface QarinResult {
    name: string;
    motherName: string;
    birthDay: number;
    totalAbjad: number;
    rootNumber: number;
    startLetter: string;
    middleLetter: string;
    finalLetter: string;
    qarinName: string;
    explanation: string;
}

export type ZodiacSignName = 
    | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo'
    | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface BirthChartData {
    sun: ZodiacSignName;
    moon: ZodiacSignName;
    ascendant: ZodiacSignName;
    mercury: ZodiacSignName;
    venus: ZodiacSignName;
    mars: ZodiacSignName;
    jupiter: ZodiacSignName;
    saturn: ZodiacSignName;
}

export interface Profile {
  id: string; // Unique ID for each profile
  name: string;
  motherName: string;
  birthDate: string; // e.g., "1370/05/24"
  birthTime: string; // e.g., "18:45"
  birthCity: string;
  birthDayOfWeek?: string; // Optional: index of the day ('0' for sat, '1' for sun...)
}