import { I18n } from 'i18n-js';
import en from './translations/en.json';
import sv from './translations/sv.json';

const i18n = new I18n({
  en,
  sv
});

i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export const t = (key, options) => i18n.t(key, options);

export const changeLanguage = (lang) => {
  console.log('lang', lang);
  i18n.locale = lang === 'Svenska' ? 'sv' : 'en';
};

export default i18n;
