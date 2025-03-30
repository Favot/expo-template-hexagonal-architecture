import { getLocales } from 'expo-localization'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import fr from './locales/fr.json'

const resources = {
  en: {
    translation: en
  },
  fr: {
    translation: fr
  }
}

const getLocale = () => {
  const local = getLocales()[0]?.languageCode
  console.log("local", local)
  return local ?? 'en'
}

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng: getLocale(),
    fallbackLng: 'en',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n


