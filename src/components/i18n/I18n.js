// i18n.js
import I18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enArticles from '../lang/articles/en.json';
import arArticles from '../lang/articles/ar.json';

// Import other resources similarly

I18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        articles: enArticles,
        // Add other sections here
      },
      ar: {
        articles: arArticles,
        // Add other sections here
      },
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default I18n;