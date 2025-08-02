export type Locale = 'en' | 'ar';

export interface Translations {
  common: {
    search: string;
    searchPlaceholder: string;
    readMore: string;
    publishedOn: string;
    source: string;
    by: string;
    loading: string;
    noResults: string;
    error: string;
    retry: string;
    backToNews: string; 

  };
  pagination: {
    previous: string;
    next: string;
    showing: string;
    of: string;
  }; 
  footer: {
    poweredBy: string;
    newsApi: string;
    guardian: string;
    nyTimes: string;
  };
  header: {
    title: string;
    subtitle: string;
  };
  errors: {
    somethingWentWrong: string;
    unknownError: string;
    reloadPage: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    common: {
      search: 'Search',
      searchPlaceholder: 'Search for news...',
      readMore: 'Read More',
      publishedOn: 'Published on',
      source: 'Source',
      by: 'By',
      loading: 'Loading...',
      noResults: 'No results found',
      error: 'Error',
      retry: 'Retry',
      backToNews: 'Back to News',
    },
    footer: {
      poweredBy: 'Powered by',
      newsApi: 'NewsAPI',
      guardian: 'The Guardian',
      nyTimes: 'The New York Times',
    },
    pagination: {
      previous: 'Previous',
      next: 'Next',
      showing: 'Showing',
      of: 'of',
    }, 
    header: {
      title: 'News',
      subtitle: 'The latest news from around the world',
    },
    errors: {
      somethingWentWrong: 'Something went wrong',
      unknownError: 'An unknown error occurred',
      reloadPage: 'Reload Page',
    },
  },
  ar: {
    common: {
      search: 'بحث',
      searchPlaceholder: 'البحث عن الأخبار...',
      readMore: 'اقرأ المزيد',
      publishedOn: 'نشر في',
      source: 'المصدر',
      by: 'بواسطة',
      loading: 'جاري التحميل...',
      noResults: 'لم يتم العثور على نتائج',
      error: 'خطأ',
      retry: 'إعادة المحاولة',
      backToNews: 'العودة إلى الأخبار',
    },
    pagination: {
      previous: 'السابق',
      next: 'التالي',
      showing: 'الصفحة',
      of: 'من',
    },
    header: {
      title: 'الأخبار',
      subtitle: 'أحدث الأخبار من جميع أنحاء العالم',
    }, 
    footer: {
      poweredBy: 'مدعوم من',
      newsApi: 'نيوز ايبي',
      guardian: 'الجارديان',
      nyTimes: 'نيويورك تايمز',
    },
    errors: {
      somethingWentWrong: 'حدث خطأ ما',
      unknownError: 'حدث خطأ غير معروف',
      reloadPage: 'إعادة تحميل الصفحة',
    },
  },
};

export const getTranslation = (locale: Locale, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if translation not found
      value = translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return the key if translation not found
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
};

export const isRTL = (locale: Locale): boolean => {
  return locale === 'ar';
}; 