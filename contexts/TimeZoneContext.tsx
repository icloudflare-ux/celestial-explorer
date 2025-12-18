
import React, { createContext, useContext, useEffect, useState } from 'react';

interface TimeZoneContextType {
  timeZone: string;
  setTimeZone: (tz: string) => void;
  formattedTimeZone: string;
}

const TimeZoneContext = createContext<TimeZoneContextType | undefined>(undefined);

export const availableTimeZones = [
  { label: 'زمان سیستم (خودکار)', value: 'auto' },
  { label: 'تهران (ایران)', value: 'Asia/Tehran' },
  { label: 'کابل (افغانستان)', value: 'Asia/Kabul' },
  { label: 'دبی (امارات)', value: 'Asia/Dubai' },
  { label: 'استانبول (ترکیه)', value: 'Europe/Istanbul' },
  { label: 'بغداد (عراق)', value: 'Asia/Baghdad' },
  { label: 'لندن (انگلستان)', value: 'Europe/London' },
  { label: 'نیویورک (آمریکا)', value: 'America/New_York' },
  { label: 'لس‌آنجلس (آمریکا)', value: 'America/Los_Angeles' },
  { label: 'تورنتو (کانادا)', value: 'America/Toronto' },
  { label: 'سیدنی (استرالیا)', value: 'Australia/Sydney' },
  { label: 'برلین (آلمان)', value: 'Europe/Berlin' },
  { label: 'پاریس (فرانسه)', value: 'Europe/Paris' },
];

export const TimeZoneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timeZone, setTimeZoneState] = useState<string>(() => {
    const stored = localStorage.getItem('app_timezone');
    return stored || 'Asia/Tehran'; // Default to Tehran if not set
  });

  const setTimeZone = (tz: string) => {
    localStorage.setItem('app_timezone', tz);
    setTimeZoneState(tz);
  };

  // Helper to get the actual IANA string (resolving 'auto')
  const formattedTimeZone = timeZone === 'auto' 
    ? Intl.DateTimeFormat().resolvedOptions().timeZone 
    : timeZone;

  return (
    <TimeZoneContext.Provider value={{ timeZone, setTimeZone, formattedTimeZone }}>
      {children}
    </TimeZoneContext.Provider>
  );
};

export const useTimeZone = () => {
  const context = useContext(TimeZoneContext);
  if (context === undefined) {
    throw new Error('useTimeZone must be used within a TimeZoneProvider');
  }
  return context;
};
