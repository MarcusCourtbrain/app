import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import locales from "_assets/locales";

const resources: any = {};

locales.forEach((lang: string) => {
  try {
    resources[lang] = {
      translation: require(`_assets/locales/${lang}.json`),
    };
  } catch (err) {
    console.warn(`Translation file for ${lang} not found.`);
  }
});

const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? "en";
const resolvedLanguage = locales.includes(deviceLanguage)
  ? deviceLanguage
  : "en";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: resolvedLanguage,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
