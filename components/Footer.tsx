
import React from 'react';
import { useTranslation } from '../contexts/i18n';

const SocialLink: React.FC<{ href: string; ariaLabel: string; children: React.ReactNode }> = ({ href, ariaLabel, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="text-slate-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-transform duration-300 transform hover:scale-110"
  >
    {children}
  </a>
);


const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-white/80 dark:bg-black/30 backdrop-blur-lg border-t border-slate-200 dark:border-slate-700/50 mt-24 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-600 dark:text-gray-400">
        
        <div className="mb-8">
          <h3 className="text-xl font-lalezar tracking-wider text-indigo-600 dark:text-indigo-300 mb-6">{t('footer_contact_title')}</h3>
          <div className="flex justify-center items-center space-x-8 rtl:space-x-reverse">
            <SocialLink href="mailto:cloudflarei388@gmail.com" ariaLabel={t('footer_contact_email_aria')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </SocialLink>
            <SocialLink href="https://t.me/icloudflare" ariaLabel={t('footer_contact_telegram_aria')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.57c-.28 1.1-.86 1.32-1.74.84l-4.9-3.57l-2.38 2.31c-.26.26-.49.5-.92.5z"/></svg>
            </SocialLink>
            <SocialLink href="https://instagram.com/_king_yahoo" ariaLabel={t('footer_contact_instagram_aria')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.441c-3.161 0-3.522.012-4.755.068-2.912.132-4.11 1.31-4.243 4.243C3.012 9.277 3 9.638 3 12.001s.012 2.724.068 3.957c.133 2.933 1.33 4.11 4.243 4.243 1.233.056 1.594.068 4.755.068s3.522-.012 4.755-.068c2.912-.133 4.11-1.31 4.243-4.243.056-1.233.068-1.594.068-3.957s-.012-2.724-.068-3.957c-.133-2.933-1.33-4.11-4.243-4.243-1.233-.056-1.594-.068-4.755-.068zM12 6.837a5.163 5.163 0 100 10.326 5.163 5.163 0 000-10.326zm0 8.441a3.278 3.278 0 110-6.556 3.278 3.278 0 010 6.556zm4.965-8.402a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/></svg>
            </SocialLink>
            <SocialLink href="https://wa.me/989301992253" ariaLabel={t('footer_contact_whatsapp_aria')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.383 1.83 6.182l-.341 1.236 1.241-.328zM9.06 7.426c.494-.473.355-.49.25-.491-.073-.002-1.085-.01-1.838.652-.767.659-1.222 1.528-1.222 2.67.0 1.144.432 2.223 1.222 3.018 1.134 1.133 2.507 2.013 4.135 2.732 2.042.875 3.36 1.176 4.364.912.992-.26 1.583-1.04 1.838-1.915.255-.875.255-1.722.183-1.838-.073-.117-.245-.164-.52-.288-.275-.124-.92-.455-1.19-.533-.27-.079-.47-.117-.67.164-.19.282-.44.533-.53.611-.1.078-.18.096-.34.038-.16-.057-1.13-.386-2.22-1.332-.85-.733-1.37-1.59-1.53-1.858-.16-.282-.01-1.32.08-1.44z"/></svg>
            </SocialLink>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-700/50 pt-6">
          <p>&copy; {new Date().getFullYear()} {t('app_title')}. {t('footer_rights')}</p>
          <p className="text-sm mt-2">{t('footer_credit')} <span className="font-semibold text-indigo-600 dark:text-indigo-400">{t('footer_credit_name')}</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
