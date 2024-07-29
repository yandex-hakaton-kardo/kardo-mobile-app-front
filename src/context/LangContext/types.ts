import type lang from '../../../public/locale/ru.json';

export type TLang = typeof lang;
export type TLocale = 'ru';

export interface TLanguageContext {
  lang: TLang;
  locale: TLocale;
  setLocale: (locale: TLocale) => void;
}
