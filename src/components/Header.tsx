'use client';
import { useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useGSAP } from '../hooks/useGSAP';

interface HeaderProps {
  headerRef: React.RefObject<HTMLElement | null>;
}

export default function Header({ headerRef }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t, isRTL } = useLanguage();
  const { gsap } = useGSAP();

  useEffect(() => {
    if (gsap && headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, [gsap, headerRef]);

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  const headerClasses = theme === 'dark'
    ? "bg-gray-900/90 backdrop-blur-sm border-b border-gray-700"
    : "bg-white/90 backdrop-blur-sm border-b border-gray-200";

  const titleClasses = theme === 'dark'
    ? "text-white"
    : "text-gray-900";

  const subtitleClasses = theme === 'dark'
    ? "text-gray-300"
    : "text-gray-600";

  const buttonClasses = theme === 'dark'
    ? "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border-gray-600"
    : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 border-gray-300";

  return (
    <header 
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${headerClasses}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-1">
            <h1 className={`text-2xl font-bold ${titleClasses}`}>
              {t('header.title')}
            </h1>
            <p className={`text-sm ${subtitleClasses}`}>
              {t('header.subtitle')}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {/* <button
              onClick={toggleLanguage}
              className={`px-3 py-2 rounded-lg border transition-all duration-200 ${buttonClasses}`}
              title={t('header.toggleLanguage')}
            >
              {locale === 'en' ? 'العربية' : 'English'}
            </button> */}
            
            <button
              onClick={toggleTheme}
              className={`px-3 py-2 rounded-lg border transition-all duration-200 ${buttonClasses}`}
              title={t('header.toggleTheme')}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 