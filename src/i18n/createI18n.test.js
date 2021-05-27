import createI18n from './createI18n';

const availableLocales = {
  en: {
    testText: 'I am a piece of text for testing.',
    testText2: 'I am testText2.',
  },
  et: {
    testText: 'Ma olen tekstijupp testimiseks.',
  },
  lv: {
    testText: 'Es esmu teksta gabals testēšanai.',
  },
};

describe('createI18n', () => {
  let i18n;
  beforeEach(() => {
    i18n = createI18n({
      locales: availableLocales,
      currentLanguage: 'et',
    });
  });

  it('should have a method "getCurrentLanguage"', () => {
    expect(typeof i18n.getCurrentLanguage).toBe('function');
  });

  it('should have a method "setLanguage"', () => {
    expect(typeof i18n.setLanguage).toBe('function');
  });

  it('should have a method "t"', () => {
    expect(typeof i18n.t).toBe('function');
  });

  it('without settings, getCurrentLanguage should return default value en', () => {
    const i18nWithoutSettings = createI18n();
    expect(i18nWithoutSettings.getCurrentLanguage()).toBe('en');
  });

  it('getCurrentLanguage should return "et" when currentLanguage "et" is provided in settings', () => {
    const i18nEt = createI18n({
      currentLanguage: 'et',
    });
    expect(i18nEt.getCurrentLanguage()).toBe('et');
  });

  it('calling getCurrentLanguage after setting the language to "lv" should return "lv"', () => {
    i18n.setLanguage('lv');
    expect(i18n.getCurrentLanguage()).toBe('lv');
  });

  it('method t should return the correct translation', () => {
    i18n.setLanguage('lv');
    expect(i18n.t('testText')).toBe(availableLocales.lv.testText);
  });

  it('if translation does not exist, then method t should return the translation in the default language', () => {
    i18n.setLanguage('lv');
    expect(i18n.t('testText2')).toBe(availableLocales.en.testText2);
  });
});
