import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import svTranslation from './translations/sv.json';
import enTranslation from './translations/en.json';

// Initialize i18next
i18n
  .use(initReactI18next) // Passes i18n down to React components
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      sv: {
        translation: svTranslation,
      },
    },
    lng: 'sv', // Default language
    fallbackLng: 'en', // Fallback language if the current language is not available
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;
