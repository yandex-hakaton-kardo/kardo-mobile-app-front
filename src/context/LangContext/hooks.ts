import { useContext } from 'react';
import { LanguageContext } from './context';
import type { TLanguageContext, TLocale } from './types';

export const useLang = () => useContext(LanguageContext).lang;

export const useLocale = (): [TLocale, TLanguageContext['setLocale']] => {
  const context = useContext(LanguageContext);
  return [context.locale, context.setLocale];
};
