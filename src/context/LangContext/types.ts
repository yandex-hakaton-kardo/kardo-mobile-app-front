import { type lang } from '../../locale/ru';

export type TLang = typeof lang;
export type TLocale = 'ru';
export interface TLangModule {
  lang: TLang;
}

export interface TLanguageContext {
  lang: TLang;
  locale: TLocale;
  setLocale: (locale: TLocale) => void;
}
