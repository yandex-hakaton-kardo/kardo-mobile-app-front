import { createContext, useCallback, useMemo, useState, type PropsWithChildren } from 'react';
import type { TLang, TLanguageContext, TLocale } from './types';

const DEFAULT_LOCALE: TLocale = 'ru';

const defaultLang = await fetch(`/locale/${DEFAULT_LOCALE}.json`).then<TLang>(res => res.json());

const langs: Partial<Record<TLocale, TLang>> = {
  [DEFAULT_LOCALE]: defaultLang,
};

export const LanguageContext = createContext<TLanguageContext>({
  lang: defaultLang,
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

export const LangProvider = ({ children }: PropsWithChildren) => {
  const [locale, setLocale] = useState<TLocale>(DEFAULT_LOCALE);

  const changeLocale = useCallback(async (newLocale: TLocale) => {
    const newLang = await fetch(`/locale/${newLocale}.json`).then<TLang>(res => res.json());
    langs[newLocale] = newLang;
    setLocale(newLocale);
  }, []);

  const value = useMemo(
    () => ({ lang: langs[locale] ?? defaultLang, locale, setLocale: changeLocale }),
    [changeLocale, locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
