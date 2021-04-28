import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

function getSupportLanguages() {
  return [
    { code: 'kh', title: 'ភាសាខ្មែរ', getSource: () => require('./kh.json') },
    { code: 'en', title: 'English', getSource: () => require('./en.json') }
  ];
}

const configure = (onLanguageChanged) => {
  const supportLanguages = getSupportLanguages();
  const resources = {};

  supportLanguages.forEach(l => {
    resources[l.code] = l.getSource();
  });

  i18n.use(initReactI18next);
  i18n.on('languageChanged', onLanguageChanged || (lang => { }));
  return i18n.init({
    fallbackLng: Object.keys(resources),
    ns: ['translation'],
    defaultNS: 'translation',
    resources,
    keySeparator: "."
  });
};

function setMomentLocale(lang) {
  switch (lang) {
    case 'en':
      moment?.updateLocale('en', require('moment/locale/en-gb'));
      break;
    default:
      moment?.updateLocale(lang, require('./momentLocalizations'));
      break;
  }
}

async function changeLanguage(lang) {
  setMomentLocale(lang);
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem('lang', lang);
}

async function loadLanguage() {
  await AsyncStorage.getItem('lang').then(async lang => {
    setMomentLocale(lang || 'en');
    await i18n.changeLanguage(lang || 'en');
  });
}

const TranslationHelper = {
  configure,
  getSupportLanguages,
  changeLanguage,
  loadLanguage
};

export default TranslationHelper;
