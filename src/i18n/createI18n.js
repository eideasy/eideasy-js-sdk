import en from './en';
import et from './et';
import lt from './lt';
import lv from './lv';
import ru from './ru';

const availableLocales = {
  en,
  et,
  lt,
  lv,
  ru,
};

const createI18n = function createI18n({ currentLanguage = 'en', locales = availableLocales } = {}) {
  const state = {
    currentLanguage,
  };

  const defaultLang = 'en';

  const setLanguage = function setLanguage(language) {
    state.currentLanguage = language;
  };

  const getCurrentLanguage = function getCurrentLanguage() {
    return state.currentLanguage;
  };

  const t = function t(key) {
    let translations = locales[state.currentLanguage];
    if (!translations) {
      translations = locales[defaultLang];
    }
    let value = translations[key] || locales[defaultLang][key];
    if (!value) {
      value = key;
    }

    return value;
  };

  return Object.freeze({
    setLanguage,
    t,
    getCurrentLanguage,
  });
};

export default createI18n;
