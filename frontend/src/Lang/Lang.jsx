import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "./ENG/EngCommon.json";

import arCommon from "./AR/ArCommon.json";
import ruCommon from "./RUS/RuCommon.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "ar", "ru"],
    ns: ["common"],
    defaultNS: "common",
    resources: {
      en: {
        common: enCommon,
        // home: enHome,
      },
      ar: {
        common: arCommon,
        // home: arHome,
      },
      ru: {
        common: ruCommon,
      },
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
