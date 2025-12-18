
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

interface I18nContextType {
    language: string;
    setLanguage: (lang: string) => void;
    t: (key: string, replacements?: { [key: string]: string }) => string;
    dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: { [key: string]: { [key: string]: string } } = {};

const loadTranslations = async (lang: string) => {
    if (translations[lang]) return translations[lang];
    try {
        const response = await fetch(`/locales/${lang}.json`);
        if (!response.ok) {
            // Fallback to Persian if translation file is not found
            const fallbackResponse = await fetch(`/locales/fa.json`);
            const fallbackData = await fallbackResponse.json();
            translations[lang] = fallbackData;
            return fallbackData;
        }
        const data = await response.json();
        translations[lang] = data;
        return data;
    } catch (error) {
        console.error(`Could not load translations for ${lang}`, error);
        // Load fallback on error
        const fallbackResponse = await fetch(`/locales/fa.json`);
        const fallbackData = await fallbackResponse.json();
        translations[lang] = fallbackData;
        return fallbackData;
    }
};

const getInitialLanguage = (): string => {
    const storedLang = localStorage.getItem('language');
    if (storedLang && ['fa', 'en', 'ar', 'hi', 'ur'].includes(storedLang)) {
        return storedLang;
    }
    // Default to Persian if no language is stored from a previous session.
    return 'fa';
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState(getInitialLanguage);
    const [currentTranslations, setCurrentTranslations] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        loadTranslations(language).then(data => {
            setCurrentTranslations(data);
            setIsLoading(false);
        });
    }, [language]);

    const setLanguage = useCallback((lang: string) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    }, []);
    
    const t = (key: string, replacements?: { [key: string]: string }): string => {
        let translation = currentTranslations[key] || key;
        if (replacements) {
            Object.keys(replacements).forEach(rKey => {
                translation = translation.replace(`{${rKey}}`, replacements[rKey]);
            });
        }
        return translation;
    };

    const dir = ['fa', 'ar', 'ur'].includes(language) ? 'rtl' : 'ltr';

    useEffect(() => {
        document.title = t('app_title');
    }, [t]);

    if (isLoading) {
        return null; // Or a loading spinner for the whole app
    }
    
    return (
        <I18nContext.Provider value={{ language, setLanguage, t, dir }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useTranslation = (): I18nContextType => {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within an I18nProvider');
    }
    return context;
};
