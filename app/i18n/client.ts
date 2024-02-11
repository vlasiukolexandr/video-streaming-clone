'use client'

import i18next, { KeyPrefix } from 'i18next';
import { UseTranslationOptions, initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getOptions, languages } from './settings';
import { useAppSelector } from '@/redux/hooks';

export const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : []
  });

export function useTranslation(ns?: string, lng?: string, options?: UseTranslationOptions<KeyPrefix<string>>) {
  const { lng: lang } = useAppSelector(state => state.appDefaults);
  const currentLng = !lng ? lang : lng;
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;
  if (runsOnServerSide && i18n.resolvedLanguage !== currentLng) {
    i18n.changeLanguage(currentLng);
  }
  
  return ret;
}