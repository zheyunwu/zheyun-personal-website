'use client';
import { createContext, useContext, useEffect, useState } from 'react';
type Language = 'en' | 'zh';
const LanguageContext = createContext<{lang: Language; t:(en:string,zh:string)=>string; setLang:(lang:Language)=>void}>({lang:'en',t:en=>en,setLang:()=>{}});
export function LanguageProvider({children}:{children:React.ReactNode}) {
  const [lang,setLanguage] = useState<Language>('en');
  useEffect(()=>{try {if(localStorage.getItem('zheyun-language')==='zh')setLanguage('zh');}catch{}},[]);
  useEffect(()=>{document.documentElement.lang=lang==='zh'?'zh-CN':'en';},[lang]);
  const setLang=(value:Language)=>{setLanguage(value);try{localStorage.setItem('zheyun-language',value);}catch{}};
  return <LanguageContext.Provider value={{lang,setLang,t:(en,zh)=>lang==='en'?en:zh}}>{children}</LanguageContext.Provider>;
}
export const useLanguage=()=>useContext(LanguageContext);
