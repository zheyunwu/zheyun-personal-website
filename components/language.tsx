'use client';
import { createContext, useContext } from 'react';
import type { Language } from '@/lib/i18n';
const LanguageContext = createContext<{lang: Language; t:(en:string,zh:string)=>string}>({lang:'en',t:en=>en});
export function LanguageProvider({children,language}:{children:React.ReactNode;language:Language}) {
  return <LanguageContext.Provider value={{lang:language,t:(en,zh)=>language==='en'?en:zh}}>{children}</LanguageContext.Provider>;
}
export const useLanguage=()=>useContext(LanguageContext);
