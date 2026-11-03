import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import '@fontsource/newsreader/latin-400.css';
import '@fontsource/newsreader/latin-500.css';
import '@/app/globals.css';
import { htmlLanguage, type Language } from '@/lib/i18n';
import { LanguageProvider } from './language';
import { Header, Footer } from './shell';

export default function SiteLayout({ children, language, languageSwitchPath }: { children: React.ReactNode; language: Language; languageSwitchPath?: string }) {
  return <html lang={htmlLanguage[language]}><body id="top"><LanguageProvider language={language}><Header languageSwitchPath={languageSwitchPath} />{children}<Footer /></LanguageProvider></body></html>;
}
